import React, {useState} from 'react'
import {Card, CardItem, Text} from 'native-base'

import CounterPath from './counter'
import OfferPath from './offer'

export default IncomingPath = (props) => {

  const [counter, setCounter] = useState(false)

  return(
    <Card transparent style={{
      alignSelf:'center', width:'95%', justifyContent:'center'}}>
      
      <CardItem style={{ alignSelf:'center'}}>
        {props.percentage == props.counter_percentage ?
          <Text style={{fontSize:20, textAlign:'center'}}>
            {props.buyin.user_name} wants to swap{' '}
            {props.swap.percentage}% between the both of you
          </Text>
          : 
          <Text style={{fontSize:20, textAlign:'center'}}>
            {props.buyin.user_name} wants to swap{' '}
            {props.swap.counter_percentage}%{' '}
            while you swap {props.swap.percentage}%
          </Text>}
      </CardItem>

      {counter == false ?
        <OfferPath navigation={props.navigation}
          percentage={props.percentage} counter_percentage={props.counter_percentage}
          counter={counter} setCounter={setCounter} swap_id={props.swap.id} />
        :
        <CounterPath navigation={props.navigation} swap_id={props.swap.id}
          percentage={props.swap.percentage} counter_percentage={props.swap.counter_percentage}
          counter={counter} setCounter={setCounter} />
      }
    </Card>
  )
}