import React from 'react';
import { View } from 'react-native';
import { ListItem, Text } from 'native-base';

import BuyIn  from '../../Shared/BuyIn'

export default FlightSchedule = (props) => {
     
  var startMonth = props.start_at.substring(8,11)
  var startDay = props.start_at.substring(5,7)
  var startHour = props.start_at.substring(17,19)
  var startMinute = props.start_at.substring(20,22)
  var startTime
  startHour / 12 >= 1 ?
    startTime =  (startHour % 12) + ':' + startMinute + ' P.M.'
    : startTime = (startHour % 12) + ':' + startMinute + ' A.M.'

  var Buy_Ins = props.buy_ins.map((buy_in) => {

    var a_status, a_percentage, a_firstname, a_counter_percentage;

    return(
      <BuyIn
        key = {index}  navigation={props.navigation}
        tournament_id={props.tournament_id}
        buyin={buy_in}

        status={a_status}
        percentage={a_percentage}
        first_name={a_firstname}
        counter_percentage={a_counter_percentage}
        action={props.action}
      />
    )}
  )
    
  return(
    <View>
      {/* FLIGHT TIME */}
      <ListItem noIndent seperator style={{
        backgroundColor:'lightgray', justifyContent:'space-between'}}>
        <Text> 
          Day {props.day} - {startMonth}. {startDay} 
        </Text>
        <Text>
          {startTime}  
        </Text>
      </ListItem> 
      
      {/* FLIGHT BUY-INS */}
      {Buy_Ins}
              
    </View>
  )
}
