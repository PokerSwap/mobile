import React from 'react'
import { View } from 'react-native'
import {Text, Button, Card, CardItem, Spinner} from 'native-base'

import {Context} from '../../../Store/appContext'

export default AgreedPath = (props) => {

  var {swap} = props, {buyin} = props;

  return(
    <Card transparent>
      <CardItem 
        style={{justifyContent:'center', flexDirection:'column'}}>
        {swap.percentage ?
          <View style={{width:'100%'}}>
            <Text style={{textAlign:'center'}}>
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