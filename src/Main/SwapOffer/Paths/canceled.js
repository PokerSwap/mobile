import React from 'react'
import {Text, Card, CardItem} from 'native-base'

export default CanceledPath = (props) => {
  return(
    <Card transparent>
      <CardItem style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center', fontSize:20}}> You canceled this swap of {props.percentage}% with {props.user_name}</Text>
      </CardItem>
    </Card>
  )
}