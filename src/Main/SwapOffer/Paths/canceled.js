import React from 'react'
import {Text, Card, CardItem} from 'native-base'

export default CanceledPath = (props) => {
  return(
    <Card transparent>
      <CardItem style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center', fontSize:20}}> 
          You canceled this swap of {props.swap.percentage}%{' '}
          with {props.buyin.user_name} who offered{' '}
          {props.swap.counter_percentage}%
        </Text>
      </CardItem>
    </Card>
  )
}