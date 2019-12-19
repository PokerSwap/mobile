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

  var allSwapsinTournament = props.allSwapsinTournament
  var mySwapsinTournament = props.mySwapsinTournament

  var Buy_Ins = props.buy_ins.map((buy_in) => {

    var a_status, a_percentage, a_counter_percentage;
     
    if (mySwapsinTournament.length !== 0){
      var xx = mySwapsinTournament.filter((swap) => swap.recipient_user.id == buy_in.user_id)
      console.log('xx',xx)
      if (xx.length !== 0){
        a_status=xx[0].status
        a_percentage=xx[0].percentage
        console.log('Got your swap with ' + buy_in.user_name + ' which is ' + a_status)
      } else{
        a_status=''
        a_percentage=''
        console.log('You dont have a swap with ' + buy_in.user_name)
      }
      
    }else{
      a_status=''
      a_percentage=''
    }

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
        percentage={a_percentage}
        // counter_percentage={a_counter_percentage}
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
