import React, {useState} from 'react';
import { View } from 'react-native';
import { ListItem, Text } from 'native-base';
import BuyIn  from '../../Shared/BuyIn'

export default FlightSchedule = (props) => {
    
  var startMonth = props.start_at.substring(8,11)
  var startDay = props.start_at.substring(5,7)
  
  var startTime = props.start_at.substring(16,22)
  var endTime = props.end_at.substring(16,22)

  var buy_ins_list = props.buy_ins

  var Buy_Ins = buy_ins_list.map((buy_in) => 
    <BuyIn
      key = {buy_in.id}
      tournament_id={props.tournament_id}
      user_name={buy_in.user_name}
      user_id={buy_in.user_id}
      table={buy_in.table}
      seat={buy_in.seat}
      chips={buy_in.chips}
      navigation={props.navigation}
    />
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
