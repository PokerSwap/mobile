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
          <View>
            <Text style={{textAlign:'center'}}> 
              You rejected a swap with {buyin.user_name}{'\n'}as of {swap.updated_at}
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