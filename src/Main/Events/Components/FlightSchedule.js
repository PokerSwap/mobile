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
      <BuyIn
        key = {index}  navigation={props.navigation}
        tournament={props.tournament}
        buyin={content.recipient_buyin}
        agreed_swaps = {content.agreed_swaps}
        other_swaps = {content.other_swaps}/>
    )
  })
    

  var Tournament_Buy_Ins = props.unbuyins.map((content, index) => {
    return(
      <TournamentBuyIn key = {index}  
      navigation={props.navigation}
        tournament={props.tournament}
        buyin={content}/>
    )
  })

  // console.log('eeee', props.my_buyin)

  return(
    <View>
      {/* FLIGHT TIME */}
      <ListItem noIndent seperator style={{
        backgroundColor:'#D3D3D3', justifyContent:'space-between'}}>
        <Text> 
          Day {props.flight.day} - {startMonth}. {startDay} 
        </Text>
        <Text>
          {startTime}  
        </Text>
      </ListItem> 
      {props.my_buyin.length !== 0?
        <BuyIn 
        navigation = {props.navigation}
        buyin = {props.my_buyin}
        tournament ={props.tournament}
        />
        : null
      }

      {/* {relatedbuyins} */}
      {Buy_Ins}

      {/* FLIGHT BUY-INS */}
      {Tournament_Buy_Ins}
              
    </View>
  )
}
