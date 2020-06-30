import React from 'react'
import { View } from 'react-native'
import { Text, Card, CardItem, Spinner } from 'native-base'

import CompareCard from '../Components/CompareCard'

export default RejectedPath = (props) => {
  
  var {swap} = props, {buyin} = props;
  return(
    <Card transparent>
      <CardItem style={{justifyContent:'center'}}>
        {swap.percentage ?
          <View style={{width:'100%'}}>
            <Text style={{textAlign:'center'}}> 
              REJECTED SWAP{'\n'}{props.swapSince}
            </Text>
            <CompareCard 
              percentage={swap.percentage} 
              youColor={'red'} themColor={'red'}
              counter_percentage={swap.counter_percentage}
              buyin={buyin}/>
          </View>
          : <Spinner/>}
      </CardItem>
    </Card>
  )
}