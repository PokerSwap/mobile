import React, {useContext} from 'react';
import { View } from 'react-native';
import { ListItem, Text } from 'native-base';
import BuyIn  from '../../Shared/BuyIn'

import {Context} from '../../../Store/appContext'

export default FlightSchedule = (props) => {
    
  const { store, actions } = useContext(Context)

  var startMonth = props.start_at.substring(8,11)
  var startDay = props.start_at.substring(5,7)
  
  var startTime = props.start_at.substring(16,22)
  var endTime = props.end_at.substring(16,22)

  var ssss = props.swaps.map(swap => swap.swap)

  var Buy_Ins = props.buy_ins.map((buy_in) => {

    return(
    <BuyIn
      key = {buy_in.id}
      tournament_id={props.tournament_id}
      user_name={buy_in.user_name}
      user_id={buy_in.user_id}
      table={buy_in.table}
      seat={buy_in.seat}
      chips={buy_in.chips}
      navigation={props.navigation}

      status={a_status}
    />
    )}
  )
    
  return(
    <View>
      <ListItem noIndent seperator style={{backgroundColor:'lightgray', justifyContent:'space-between'}}>
        <Text> Day {props.day} - {startMonth}. {startDay} </Text>
        <Text>{startTime} - {endTime} </Text>
      </ListItem> 
  
    {Buy_Ins}
              
    </View>
  )
}
