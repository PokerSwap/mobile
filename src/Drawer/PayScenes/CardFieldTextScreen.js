import React, { useState } from 'react'
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import { PaymentCardTextField } from 'tipsi-stripe'

import { KeyboardAvoidingView, View, Text, Platform, StyleSheet } from 'react-native'

import Spoiler from '../components/Spoiler'
import testID from '../../utils/testID'

export default CardFieldTextScreen = () => {

  const [valid, setValid] = useState(false)
  const [params, setParams] = useState({
    number: '',
    expMonth: 0,
    expYear: 0,
    cvc: '',
  })
  

  const handleFieldParamsChange = (is_valid, some_params) => {
    setValid(is_valid)
    setParams(some_params)
  }

  const ContainerView = Platform.select({
    ios: KeyboardAvoidingView,
    android: View,
  })

  return (
    <ContainerView
        behavior="padding"
        style={styles.container}
        onResponderGrant={dismissKeyboard}
        onStartShouldSetResponder={() => true}>
        <View>
          <Text style={styles.header}>
            PaymentCardTextField Example
          </Text>
          <PaymentCardTextField
            accessible={false}
            style={styles.field}
            onParamsChange={() => handleFieldParamsChange()}
            numberPlaceholder="XXXX XXXX XXXX XXXX"
            expirationPlaceholder="MM/YY"
            cvcPlaceholder="CVC"
            {...testID('cardTextField')}
          />
          <Spoiler title="Params" style={styles.spoiler}>
            <View
              style={styles.params}>
              <Text
                style={styles.instruction}
                {...testID('paramValid')}>
                Valid: {String(valid)}
              </Text>
              <Text
                style={styles.instruction}
                {...testID('paramNumber')}>
                Number: {params.number || '-'}
              </Text>
              <Text
                style={styles.instruction}
                {...testID('paramExpMonth')}>
                Month: {params.expMonth || '-'}
              </Text>
              <Text
                style={styles.instruction}
                {...testID('paramExpYear')}>
                Year: {params.expYear || '-'}
              </Text>
              <Text
                style={styles.instruction}
                {...testID('paramCVC')}>
                CVC: {params.cvc || '-'}
              </Text>
            </View>
          </Spoiler>
        </View>
      </ContainerView>
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
  spoiler: {
    width: 300,
  },
  params: {
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  field: {
    width: 300,
    color: '#449aeb',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
})