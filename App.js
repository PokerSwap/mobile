import React, {} from 'react';
import {Root} from 'native-base';
import AppContainer from './AppContainer.js'


const PaymentRequest = require('react-native-payments').PaymentRequest;
console.log(PaymentRequest)

const METHOD_DATA = [{
  supportedMethods: ['apple-pay'],
  data: {
    merchantIdentifier: 'merchant.com.swapprofitllc.swapprofit',
    supportedNetworks: ['visa', 'mastercard', 'amex'],
    countryCode: 'US',
    currencyCode: 'USD'
  }
}];

export default  App = () => {
  return(
    <Root>
      <AppContainer />
    </Root>
  )
}

