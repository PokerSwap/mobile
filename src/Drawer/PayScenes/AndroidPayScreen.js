import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import stripe from 'tipsi-stripe'
import Button from '../components/Button'
import testID from '../../utils/testID'

export default AndroidPayScreen = () => {

  const [loading, setLoading] = useState(false)
  const [allowed, setAllowed] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(() => {
    var isAllowed = allowIt()
    setAllowed(isAllowed)
    return () => {
      // cleanup
    }
  }, [])

  const allowIt = async() => {
    var x = await stripe.deviceSupportsNativePay()
    return x
  }

  const handleAndroidPayPress = async () => {
    try {
      setLoading(true)
      setToken(null)
      const aToken = await stripe.paymentRequestWithNativePay({
        total_price: '100.00',
        currency_code: 'USD',
        shipping_address_required: true,
        phone_number_required: true,
        shipping_countries: ['US', 'CA'],
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
        }, {
          currency_code: 'USD',
          description: 'Tipsi',
          total_price: '1.00',
          unit_price: '1.00',
          quantity: '1',
        }],
      })
      console.log('aToken', aToken)
      setLoading(false)
      setToken(aToken)
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