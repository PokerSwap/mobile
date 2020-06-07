import React, {useState} from 'react'
import { View } from 'react-native'
import { Card, CardItem, Text, Spinner } from 'native-base'

import CompareCard from '../Components/CompareCard'
import CounterPath from './counter'
import OfferPath from './offer'

export default CounterIncomingPath = (props) => {
  const [counter, setCounter] = useState(false)
  var {swap} = props, {buyin} = props;

  return(
    <Card transparent style={{
      alignSelf:'center', width:'95%', justifyContent:'center'}}>
      
      <CardItem style={{ alignSelf:'center'}}>
        {swap.percentage ?
          <View>
          <Text style={{fontSize:20, textAlign:'center'}}>
            {buyin.user_name} countered and wants to do the following swap with you:
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
        counter == false ?
          <OfferPath navigation={props.navigation}
          buyin_id={buyin.id}
            setLoading={props.setLoading} setRefreshing={props.setRefreshing}
            percentage={swap.percentage} counter_percentage={swap.counter_percentage}
            swap_id={swap.id} tournament_id={props.tournament_id}
            counter={counter} setCounter={setCounter} />
          :
          <CounterPath navigation={props.navigation} 
            swap_id={swap.id} tournament_id={props.tournament_id}
            buyin_id={buyin.id} percentage={swap.percentage} counter_percentage={swap.counter_percentage}
            setLoading={props.setLoading} setRefreshing={props.setRefreshing}
            counter={counter} setCounter={setCounter} />
        : null
      }
    </Card>
  )
}