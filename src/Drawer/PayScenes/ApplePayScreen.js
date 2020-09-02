import React, { useEffect, useState } from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'
import stripe from 'tipsi-stripe'
import Button from '../components/Button'
import testID from '../../utils/testID'

/* eslint-disable no-console */
export default ApplePayScreen = () => {

  const [loading, setLoading] = useState(false)
  const [allowed, setAllowed] = useState(false)
  const [complete, setComplete] = useState(true)
  const [status, setStatus] = useState(null)
  const [token, setToken] = useState(null)
  const [amexAvailable, setAmexAvailable] = useState(false)
  const [discoverAvailable, setDiscoverAvailable] = useState(false)
  const [masterCardAvailable, setMasterCardAvailable] = useState(false)
  const [visaAvailable, setVisaAvailable] = useState(false)

  useEffect(() => {
    onCheck()
    return () => {
      // cleanup
    }
  }, [])

  const onCheck = async() => {
    const isAllowed = await stripe.deviceSupportsNativePay()
    const isAmexAvailable = await stripe.canMakeNativePayPayments({
      networks: ['american_express'],
    })
    const isDiscoverAvailable = await stripe.canMakeNativePayPayments({
      networks: ['discover'],
    })
    const isMasterCardAvailable = await stripe.canMakeNativePayPayments({
      networks: ['master_card'],
    })
    const isVisaAvailable = await stripe.canMakeNativePayPayments({
      networks: ['visa'],
    })
    
    setAllowed(isAllowed)
    setAmexAvailable(isAmexAvailable)
    setDiscoverAvailable(isDiscoverAvailable)
    setMasterCardAvailable(isMasterCardAvailable)
    setVisaAvailable(isVisaAvailable)
  }

  const handleCompleteChange = (isComplete) => (
    setComplete(isComplete)
  )
 
  const handleApplePayPress = async () => {
    try {
      setLoading(true)
      setStatus(null)
      setToken(null)
      const aToken = await stripe.paymentRequestWithNativePay({
        // requiredBillingAddressFields: ['all'],
        // requiredShippingAddressFields: ['all'],
        shippingMethods: [{
          id: 'fedex',
          label: 'FedEX',
          detail: 'Test @ 10',
          amount: '1.00',
        }],
      },
      [{
        label: 'Whisky',
        amount: '1.00',
      }])

      setLoading(false)
      setToken(aToken)

      if (complete) {
        await stripe.completeNativePayRequest()
        setStatus('Apple Pay payment completed')
        console.log("COMPLETE")
      } else {
        await stripe.cancelNativePayRequest()
        setStatus('Apple Pay payment cenceled')
        console.log("CANCLED")

      }
      setLoading(false)

    } catch (error) {
      setLoading(false)
      setStatus(`Error: ${error.message}`)
      console.log('error', error.message)
    }
  }

  const handleSetupApplePayPress = () => (
    stripe.openNativePaySetup()
  )

  const cards = {
    americanExpressAvailabilityStatus: { name: 'American Express', isAvailable: amexAvailable },
    discoverAvailabilityStatus: { name: 'Discover', isAvailable: discoverAvailable },
    masterCardAvailabilityStatus: { name: 'Master Card', isAvailable: masterCardAvailable },
    visaAvailabilityStatus: { name: 'Visa', isAvailable: visaAvailable },
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Apple Pay Example
      </Text>
      <Text style={styles.instruction}>
        Click button to show Apple Pay dialog.
      </Text>
      <Button
        text="Pay with Pay"
        disabledText="Not supported"
        loading={loading}
        disabled={!allowed}
        onPress={() => handleApplePayPress()}
        {...testID('applePayButton')}
      />
      <Text style={styles.instruction}>
        Complete the operation on token
      </Text>
      <Switch
        style={styles.switch}
        value={complete}
        onValueChange={(x) => handleCompleteChange(x)}
        {...testID('applePaySwitch')}
      />
      <View>
        {token ?
          <Text style={styles.instruction} {...testID('applePayToken')}>
            Token: {token.tokenId}
          </Text>
        : null}
        {status ?
          <Text style={styles.instruction} {...testID('applePayStatus')}>
            {status}
          </Text>
        : null}
      </View>
      <View style={styles.hintContainer}>
        <Button
          text="Setup Pay"
          disabledText="Not supported"
          disabled={!allowed}
          onPress={() => handleSetupApplePayPress()}
          {...testID('setupApplePayButton')}
        />
        <Text style={styles.hint}>
          Setup Pay works only on real device
        </Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.status} {...testID('deviceSupportsApplePayStatus')}>
          Device {allowed ? 'supports' : 'doesn\'t support' } Pay
        </Text>
        {Object.entries(cards).map(([id, { name, isAvailable }]) => (
          <Text style={styles.status} key={id} {...testID(id)}>
            {name} is {isAvailable ? 'available' : 'not available'}
          </Text>
        ))}
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
  switch: {
    marginBottom: 10,
  },
  hintContainer: {
    marginTop: 10,
  },
  hint: {
    fontSize: 12,
    textAlign: 'center',
  },
  statusContainer: {
    margin: 20,
    alignSelf: 'stretch',
  },
  status: {
    fontWeight: '300',
    color: 'gray',
  },
})