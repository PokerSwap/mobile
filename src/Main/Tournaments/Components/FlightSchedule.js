import React from 'react';
import { View } from 'react-native';
import { ListItem, Text } from 'native-base';
import TournamentBuyIn  from '../../Shared/TournamentBuyIn'

export default FlightSchedule = (props) => {
     
  var startMonth = props.start_at.substring(8,11)
  var startDay = props.start_at.substring(5,7)
  var startHour = props.start_at.substring(17,19)
  var startMinute = props.start_at.substring(20,22)
  var startTime
  startHour / 12 >= 1 ?
    startTime =  (startHour % 12) + ':' + startMinute + ' P.M.'
    :
    startTime = (startHour % 12) + ':' + startMinute + ' A.M.'

  var mySwapsinTournament = props.mySwapsinTournament

  console.log('buyins',props.buy_ins)
  var Buy_Ins = props.buy_ins.map((buy_in) => {

    var a_status, a_percentage, a_firstname, a_counter_percentage;
     
    if (mySwapsinTournament.length !== 0){
      var xx = mySwapsinTournament.filter((swap) => swap.recipient_user.id == buy_in.user_id)
      if (xx.length !== 0){
        a_status=xx[0].status
        a_percentage=xx[0].percentage
        a_counter_percentage=xx[0].counter_percentage
        a_firstname=xx[0].first_name
      } else{
        a_status=''
        a_percentage=1
        a_counter_percentage=1
      }
      
    }else{
      a_status=''
      a_percentage=1
      a_counter_percentage=1
    }

    return(
      <TournamentBuyIn
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
        <Text> Day {props.day} - {startMonth}. {startDay} </Text>
        <Text>{startTime}  </Text>
      </ListItem> 
      
      {/* FLIGHT BUY-INS */}
      {Buy_Ins}
              
    </View>
  )
}
