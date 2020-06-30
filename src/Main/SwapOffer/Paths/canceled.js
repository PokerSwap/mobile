import React from 'react'
import { View } from 'react-native';
import {Text, Card, CardItem, Spinner} from 'native-base'

import CompareCard from '../Components/CompareCard'

export default CanceledPath = (props) => {
  var {swap} = props, {buyin} = props;

  return(
    <Card transparent>
      {/* CANCELED SWAP INFO */}
      {swap.percentage ?
        <View style={{width:'100%'}}>
          <Text style={{textAlign:'center'}}> 
            CANCELED SWAP{'\n'}{props.swapSince}
          </Text>
          <CompareCard 
          percentage={swap.percentage} 
          youColor={'#a3a3a3'} themColor={'#c3c3c3'}
          counter_percentage={swap.counter_percentage}
          buyin={buyin}/>
        </View>
        : 
        <CardItem style={{justifyContent:'center'}}>
          <Spinner />
        </CardItem>}
    </Card>
  )
}