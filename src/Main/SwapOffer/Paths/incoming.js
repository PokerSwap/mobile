import React, {useState} from 'react'
import {Card, CardItem, Text} from 'native-base'

import CounterPath from './counter'
import OfferPath from './offer'

export default IncomingPath = (props) => {

  const [counter, setCounter] = useState(false)

  return(
    <Card transparent style={{alignSelf:'center', width:'80%', justifyContent:'center'}}>
      
      <CardItem style={{ alignSelf:'center'}}>
        {props.percentage == props.counter_percentage ?
          <Text style={{fontSize:20, textAlign:'center'}}>
            {props.user_name} wants to swap {props.percentage}% between the both of you
          </Text>
          : 
          <Text style={{fontSize:20, textAlign:'center'}}>
            {props.user_name} wants to swap {props.counter_percentage}% while you swap {props.percentage}%
          </Text>}
      </CardItem>

      {counter == false ?
        <OfferPath 
          user_name={props.user_name} user_id={props.user_id} 
          tournament_id={props.tournament_id} navigation={props.navigation}
          percentage={props.percentage} counter_percentage={props.counter_percentage}
          counter={counter} setCounter={setCounter}
        />
        :
        <CounterPath 
          user_name={props.user_name} user_id={props.user_id} 
          tournament_id={props.tournament_id} navigation={props.navigation}
          percentage={props.percentage} counter_percentage={props.counter_percentage}
          counter={counter} setCounter={setCounter}
        />
      }
    </Card>
  )
}