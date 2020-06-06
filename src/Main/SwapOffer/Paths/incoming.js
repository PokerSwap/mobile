import React, { useState } from 'react'
import { Card, CardItem, Text, Spinner } from 'native-base'

import CounterPath from './counter'
import OfferPath from './offer'

export default IncomingPath = (props) => {
  const [counter, setCounter] = useState(false)
  var {swap} = props;

  return(
    <Card transparent style={{
      alignSelf:'center', width:'95%', justifyContent:'center'}}>
      
      <CardItem style={{ alignSelf:'center'}}>
        {swap ?
          swap.percentage == swap.counter_percentage ?
            <Text style={{fontSize:20, textAlign:'center'}}>
              {props.buyin.user_name} wants to swap{' '}
              {swap.percentage}% between the both of you
            </Text>
            : 
            <Text style={{fontSize:20, textAlign:'center'}}>
              {props.buyin.user_name} wants to swap{' '}
              {swap.counter_percentage}%{' '}
              while you swap {swap.percentage}%
            </Text>
          : <Spinner />} 
      </CardItem>

      {swap ?
        !counter ?
          <OfferPath navigation={props.navigation}
            swap_id={swap.id}
            percentage={swap.percentage} 
            counter_percentage={swap.counter_percentage}
            tournament_id={props.tournament_id} 
            counter={counter} setCounter={setCounter}/>
          :
          <CounterPath navigation={props.navigation} 
            swap_id={swap.id}
            percentage={swap.percentage} 
            counter_percentage={swap.counter_percentage}
            tournament_id={props.tournament_id} 
            counter={counter} setCounter={setCounter} />
        : null} 
    </Card>
  )
}