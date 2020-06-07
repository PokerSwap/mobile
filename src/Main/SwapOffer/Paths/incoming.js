import React, { useState } from 'react'
import { View } from 'react-native';
import { Card, CardItem, Text, Spinner } from 'native-base'

import CompareCard from '../Components/CompareCard'
import IntroOffer from '../Components/introOffer'
import CounterOffer from '../Components/counterOffer'

export default IncomingPath = (props) => {
  const [ counter, setCounter ] = useState(false)
  var {swap} = props, {buyin} = props;

  return(
    <Card transparent style={{
      alignSelf:'center', width:'95%', justifyContent:'center'}}>
      
      <CardItem style={{ alignSelf:'center'}}>
        {swap.percentage ?
          <View>
            <Text style={{fontSize:20, textAlign:'center'}}>
              {buyin.user_name} wants to do the following swap with you:
            </Text>
            <CompareCard 
              percentage={swap.percentage} 
              youColor={'blue'} themColor={'green'}
              counter_percentage={swap.counter_percentage}
              buyin={buyin}/>
          </View>
            
          : <Spinner />} 
      </CardItem>

      {swap ?
        !counter ?
          <IntroOffer navigation={props.navigation}
            swap_id={swap.id} buyin_id={buyin.id}

            percentage={swap.percentage}
            counter_percentage={swap.counter_percentage}
            tournament_id={props.tournament_id} 
            setRefreshing={props.setRefreshing}
            setLoading={props.setLoading}
            counter={counter} setCounter={setCounter}/>
          :
          <CounterOffer navigation={props.navigation} 
            swap_id={swap.id} buyin_id={buyin.id}
            percentage={swap.percentage} 
            counter_percentage={swap.counter_percentage}
            tournament_id={props.tournament_id} 
            setRefreshing={props.setRefreshing}
            setLoading={props.setLoading}
            counter={counter} setCounter={setCounter} />
        : null} 
    </Card>
  )
}