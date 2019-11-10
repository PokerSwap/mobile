import React, {} from 'react';
import { View } from 'react-native';
import {  Text } from 'native-base';
import { Context } from '../../../Store/appContext';

import BuyIn from '../../Shared/BuyIn'

export default SwapTracker = (props) => {

  let myID = props.my_current_buy_in.user_id
  let mybID = props.my_current_buy_in.id
  let myName = props.my_current_buy_in.user_name
  let myTable = props.my_current_buy_in.table
  let mySeat = props.my_current_buy_in.seat
  let myChips = props.my_current_buy_in.chips

  let tournamentName = props.tournament.name

  let ww = []
  props.tournament.flights.forEach(flight => ww.push(flight.buy_ins))
  let x = ww.flat()

  let yy = x.filter(buyin => buyin.user_id != myID)
  let buyinlist = yy.map(buyin => buyin.id)

  let incSwaps
  // look for user_id in buyins

  // filter out buyins for most current

  // map their buyins

  let other_swappers = yy.map((content, index) => 
    <BuyIn
      id = {content.id}
      navigation = {props.navigation}
      
      user_name = {content.user_name} 
      table = {content.table}
      seat = {content.seat}
      chips = {content.chips}
      flight_id = {content.flight_id}
    />
  )
    
  return(
    <View>
      {/* TOURNAMENT TITLE */}
      <View 
        style={{justifyContent:'center', backgroundColor:'black', paddingVertical:10}}>
        <Text 
          style={{fontSize:18, fontWeight:'600', width:'75%',
          alignSelf:'center',textAlign:'center', color:'white'}}>
          {tournamentName}
        </Text>
      </View>
      <BuyIn
        id = {mybID}
        navigation = {props.navigation}
        user_id = {myID}
        user_name = {myName} 
        table = {myTable}
        seat = {mySeat}
        chips = {myChips}
        // flight_id = {props.flight_id}
      />

      {other_swappers}

    </View>
  )
}
