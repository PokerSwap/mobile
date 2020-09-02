import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import stripe from 'tipsi-stripe'
import Button from '../components/Button'
import testID from '../../utils/testID'

var pid;
Platform.IOS == 'ios' ? pid = 'merchant.com.swapprofitllc.swapprofitapp' : pid = '7257864798279761'

stripe.setOptions({
  publishableKey: 'pk_live_No3ckprr7lPnxOP2MGPqRDO500aYv6i73M',
  merchantId: pid ,
  androidPayMode: 'test',
});

export default AndroidPayScreen = () => {

  const [loading, setLoading] = useState(false)
  const [allowed, setAllowed] = useState(false)
  const [token, setToken] = useState(null)
  const [complete, setComplete] = useState(true)
  const [status, setStatus] = useState(null)



  useEffect(() => {
    var isAllowed = allowIt()
    setAllowed(isAllowed)
    return () => {
      // cleanup
    }
  }, [])

  const allowIt = async() => {
    var y = await stripe.canMakeNativePayPayments()
    console.log('y', y)
    var x = await stripe.deviceSupportsNativePay()
    return x
  }
 
  // const handleSetupPay = async() => {
  //   var bee = await stripe.openNativePaySetup()
  // }

  const handleAndroidPayPress = async () => {
    try {
      setLoading(true)
      setToken(null)

      const options = {
        total_price: '2.00',
        currency_code: 'USD',
        shipping_address_required: false,
        billing_address_required: true,
        shipping_countries: ["US", "CA"],
        line_items: [{
          currency_code: 'USD',
          description: 'Whisky',
          total_price: '1.00',
          unit_price: '1.00',
          quantity: '1',
        }, {
          currency_code: 'USD',
          description: 'Vine',
          total_price: '1.00',
          unit_price: '1.00',
          quantity: '1',
        }],
      }
      const aToken = await stripe.paymentRequestWithNativePay(options)
      console.log('aToken', aToken)
      setLoading(false)
      setToken(aToken)

      if (complete) {
        await stripe.completeNativePayRequest()
        setStatus('Apple Pay payment completed' )
      } else {
        await stripe.cancelNativePayRequest()
        setStatus('Apple Pay payment cenceled')
      }
    } catch (error) {
      console.log('aToken', token)

      setLoading(false)
      console.log('error:', error)
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header} {...testID('headerText')}>
        Android Pay Example
      </Text>
      <Text style={styles.instruction}>
        Click button to show Android Pay dialog.
      </Text>
      <Button
        text="Pay with Android Pay"
        disabledText="Not supported"
        loading={loading}
        disabled={!allowed}
        onPress={() => handleAndroidPayPress()}
        {...testID('androidPayButton')}
      />
      <View
        style={styles.token}
        {...testID('androidPayToken')}>
        {token &&
          <Text style={styles.instruction}>
            Token: {token.tokenId}
          </Text>
        }
        {status &&
            <Text style={styles.instruction} {...testID('applePayStatus')}>
              {status}
            </Text>
          }
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
})