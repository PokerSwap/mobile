import React, {} from 'react';
import {Root} from 'native-base';
import AppContainer from './AppContainer.js'



global.PaymentRequest = require('react-native-payments').PaymentRequest;


export default  App = () => {
  return(
    <Root>
      <AppContainer />
    </Root>
  )
}

