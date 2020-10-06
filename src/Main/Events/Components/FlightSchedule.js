import React from 'react';
import { View } from 'react-native';
import { ListItem, Text } from 'native-base';

import BuyIn from '../../BuyIn/BuyIn'
import TournamentBuyIn from '../../BuyIn/TournamentBuyIn'

export default FlightSchedule = (props) => {
  var startMonth = props.flight.start_at.substring(8,11)
  var startDay = props.flight.start_at.substring(5,7)
  var startHour = props.flight.start_at.substring(17,19)
  var startMinute = props.flight.start_at.substring(20,22)
  var startTime
  startHour / 12 >= 1 ?
    startHour % 12 !== 0 ?
      startTime =  (startHour % 12) + ':' + startMinute + ' P.M.'
      : startTime = 12 + ':' + startMinute + ' P.M.'
    : startHour % 12 !== 0 ?
      startTime = (startHour % 12) + ':' + startMinute + ' A.M.'
      : startTime = 12 + ':' + startMinute + ' A.M.'

  var Buy_Ins = props.buyins.map((content, index) => {
    return(
      <BuyIn key = {index}
        action={props.action} tournament={props.tournament}
        my_buyin={props.my_buyin} buyin={content.recipient_buyin}
        agreed_swaps = {content.agreed_swaps}
        other_swaps = {content.other_swaps} 
        setRefreshing={props.setRefreshing}/>
    )
  })
    
  var Tournament_Buy_Ins = props.unbuyins.map((content, index) => {
    return(
      <TournamentBuyIn key = {index}
        buyin={content} my_buyin={props.my_buyin}
        tournament={props.tournament} action={props.action}
        setRefreshing={props.setRefreshing}/>
    )
  })

  return(
    <View>
      {/* FLIGHT TIME */}
      <ListItem noIndent seperator style={{
        backgroundColor:'#D3D3D3', justifyContent:'space-between'}}>
        <Text> 
          Day {props.flight.day} - {startMonth}. {startDay} 
        </Text>
        <Text>{startTime}</Text>
      </ListItem> 
      {/* IF MY BUYIN IS IN THIS FLIGHT */}
      {props.my_buyin.length !== 0?
        <BuyIn  
          setRefreshing={props.setRefreshing}
          action = {props.action} tournament ={props.tournament}
          my_buyin= {props.my_buyin} buyin = {props.my_buyin}/>
        : null}
      {/* BUYINS IN FLIGHT I SWAPPED WITH */}
      {Buy_Ins}
      {/* OTHER BUY-INS IN FLIGHT */}
      {Tournament_Buy_Ins}
    </View>
  )
}
