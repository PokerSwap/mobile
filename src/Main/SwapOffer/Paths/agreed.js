import React, { useState, useContext } from 'react'
import { Context } from '../../../Store/appContext'

import { View } from 'react-native'
import {Text, Button, Card, CardItem, Spinner} from 'native-base'

import lightStyle from '../../../Themes/light'
import darkStyle from '../../../Themes/dark'

export default AgreedPath = (props) => {
  const { store, actions } = useContext(Context)

  var {swap ,buyin} = props;
  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  return(
    <Card transparent style={{backgroundColor:currentStyle.background.color}}>
      <CardItem 
        style={{justifyContent:'center', flexDirection:'column'}}>
        {swap.percentage ?
          <View style={{width:'100%'}}>
            <Text style={{textAlign:'center', color:currentStyle.text.color}}>
              AGREED SWAP{'\n'}{props.swapSince}
            </Text>
            <CompareCard 
              youColor={'green'} themColor={'green'}
              percentage={swap.percentage} 
              counter_percentage={swap.counter_percentage}
              buyin={buyin}/>
          </View>
          :
          <Spinner/>}
      </CardItem>
    </Card>
  )
}