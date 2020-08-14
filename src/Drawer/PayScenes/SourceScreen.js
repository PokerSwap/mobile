import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import stripe from 'tipsi-stripe'
import Button from '../components/Button'
import testID from '../../utils/testID'

/* eslint-disable no-console */
export default SourceScreen  = () => {

  const [source, setSource] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)


  const onCreateCardSourcePress = async () => {
    try {
      this.setState({ loading: true, source: null })

      const aSource = await stripe.createSourceWithParams({
        type: 'card',
        number: '5555555555554444',
        expMonth: 11,
        expYear: 29,
        cvc: '789',
      })
      this.setState({ loading: false, source })
    } catch (error) {
      this.setState({ error, loading: false })
    }
  }

  const handleCreateSourcePress = async () => {
    try {
      setLoading(true)
      setSource(null)

      const aSource = await stripe.createSourceWithParams({
        type: 'alipay',
        amount: 50,
        currency: 'EUR',
        returnURL: 'example://stripe-redirect',
      })
      setLoading(false)
      setSource(aSource)
    } catch (error) {
      setLoading(false)
    }
  }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Source Example
        </Text>
        <Text style={styles.instruction}>
          Click button to create a source.
        </Text>

        <Button
          text="Create source for card payment"
          loading={loading}
          onPress={() => onCreateCardSourcePress()}
          {...testID('cardSourceButton')}
        />
        <Button
          text="Create source for Alipay payment"
          loading={loading}
          onPress={() => handleCreateSourcePress()}
          {...testID('sourceButton')}
        />

        {source && (
          <Text style={styles.source} {...testID('sourceObject')}>
              Source: {JSON.stringify(source)}
          </Text>
        )}

        {error && (
          <Text style={[styles.source, styles.error]} {...testID('sourceErrorObject')}>
            Error: {JSON.stringify(error)}
          </Text>
        )}
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
  source: {
    color: '#333333',
    margin: 8,
    textAlign: 'center',
    width: '100%',
  },
  error: {
    color: 'darkred',
  },
})