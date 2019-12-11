import React, {} from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import BuyIn from '../../Shared/BuyIn'

export default SwapTracker = (props) => {

  let myID = props.my_buyin.user_id
  let mybID = props.my_buyin.id
  let myName = props.my_buyin.user_name
  let myTable = props.my_buyin.table
  let mySeat = props.my_buyin.seat
  let myChips = props.my_buyin.chips
  let myUpdate = props.my_buyin.updated_at

  let tournament_name = props.tournament.name
  let tournament_start = props.tournament.start_at
  let tournament_end = props.tournament.end_at

  let other_swaps = props.swaps.map((content, index) => 
    <BuyIn
      key = {content.buyin.id}      
      navigation = {props.navigation}
      id = {content.buyin.id}      
      user_id = {content.buyin.user_id}
      user_name = {content.buyin.user_name} 
      table = {content.buyin.table}
      seat = {content.buyin.seat}
      chips = {content.buyin.chips}
      flight_id = {content.buyin.flight_id}

      status = {content.swap.status}
      percentage = {content.swap.percentage}
      updated_at = {content.buyin.updated_at}

      tournament_name={tournament_name}
      start_at={tournament_start}
      end_at={tournament_end}


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
          {tournament_name}
        </Text>
      </View>
      <BuyIn
        buy_id = {mybID}
        navigation = {props.navigation}
        user_id = {myID}
        user_name = {myName} 
        table = {myTable}
        seat = {mySeat}
        chips = {myChips}
        tournament_name={tournament_name}
        updated_at={myUpdate}
        // flight_id = {props.flight_id}
      />

      {other_swaps}

    </View>
  )
}
