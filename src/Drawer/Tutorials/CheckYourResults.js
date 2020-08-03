import React, { useContext, useState } from 'react';
import { Tab, Tabs } from 'native-base'

import { useNavigation } from '@react-navigation/native'


export default HowToSwapScreen = (props) => {

  const navigation = useNavigation()

  
  return(
    <Tabs>
      <Tab heading="First">

      </Tab>
    </Tabs>
  )
}