import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import stripe from 'tipsi-stripe'
import Spoiler from '../components/Spoiler'
import Button from '../components/Button'
import testID from '../../utils/testID'

export default CustomBankScreen = () => {

  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const [params, setParams] = useState({
    number: '4242424242424242',
    expMonth: 12,
    expYear: 24,
    cvc: '223',
    name: 'Test User',
    currency: 'usd',
    addressLine1: '123 Test Street',
    addressLine2: 'Apt. 5',
    addressCity: 'Test City',
    addressState: 'Test State',
    addressCountry: 'Test Country',
    addressZip: '55555',
  })
  const [errorParams, setErrorParams] = useState({
    number: '4242424242424241',
    expMonth: 12,
    expYear: 24,
    cvc: '223',
    name: 'Test User',
    currency: 'usd',
    addressLine1: '123 Test Street',
    addressLine2: 'Apt. 5',
    addressCity: 'Test City',
    addressState: 'Test State',
    addressCountry: 'Test Country',
    addressZip: '55555',
  })

  const handleBankAccountPayPress = async (shouldPass = true) => {
    try {
      setLoading(true)
      setError(null)
      setToken(null)
      const some_params = shouldPass ? params : errorParams
      const aToken = await stripe.createTokenWithBankAccount(some_params)
      setLoading(false)
      setToken(aToken)
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }

  const renderMandatoryFields = (some_params) => (
    <View style={styles.params}>
      <Text style={styles.param}>
        Routing Number: {some_params.routingNumber}
      </Text>
      <Text style={styles.param}>
        Account Number: {some_params.accountNumber}
      </Text>
      <Text style={styles.param}>
        Country Code: {some_params.countryCode}
      </Text>
      <Text style={styles.param}>
        Currency: {some_params.currency}
      </Text>
    </View>
  )


  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Custom Account Params Example
      </Text>
      <Spoiler title="Mandatory Fields">
        {renderMandatoryFields(params)}
      </Spoiler>
      <Spoiler title="Mandatory Fields - Error case" defaultOpen={false}>
        {renderMandatoryFields(errorParams)}
      </Spoiler>
      <Spoiler title="Optional Fields" defaultOpen={false}>
        <View style={styles.params}>
          <Text style={styles.param}>
            Account Type: {params.accountType}
          </Text>
          <Text style={styles.param}>
            Account HolderType: {params.accountHolderType}
          </Text>
          <Text style={styles.param}>
            Account Holder Name: {params.accountHolderName}
          </Text>
          <Text style={styles.param}>
            Fingerprint: {params.fingerprint}
          </Text>
          <Text style={styles.param}>
            Bank name: {params.bankName}
          </Text>
          <Text style={styles.param}>
            Last4: {params.last4}
          </Text>
        </View>
      </Spoiler>
      <Text style={styles.instruction}>
        Click button to get token based on params.
      </Text>
      <Button
        text="Pay with custom params"
        loading={loading}
        onPress={() => handleBankAccountPayPress()}
        {...testID('customAccountButton')}
      />
      <Button
        text="Pay with error custom params"
        loading={loading}
        onPress={() => handleBankAccountPayPress(false)}
        {...testID('customAccountErrorButton')}
      />
      {token &&
        <View
          style={styles.token}
          {...testID('customAccountToken')}>
          <Text style={styles.instruction}>
            Token: {token.tokenId}
          </Text>
        </View>
      }
      {error &&
        <View
          style={styles.token}
          {...testID('customAccountTokenError')}>
          <Text style={styles.instruction}>
            Error: {JSON.stringify(error.message)}
          </Text>
        </View>
      }
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
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  params: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'flex-start',
    margin: 5,
  },
  param: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
})