import React from 'react'
import {Text, Card, CardItem, Spinner} from 'native-base'

export default RejectedPath = (props) => {
  
  var {swap} = props, {buyin} = props;
  return(
    <Card transparent>
      <CardItem style={{justifyContent:'center'}}>
        {swap ?
          <Text style={{textAlign:'center', fontSize:24}}> 
            You rejected a swap to share {swap.percentage}% of your winnings 
            with {buyin.user_name}'s share of {swap.counter_percentage}%. 
          </Text>
          :
          <Spinner/>
        }
        
      </CardItem>
    </Card>
  )
}