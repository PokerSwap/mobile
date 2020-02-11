import React, {useContext} from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import {Context} from '../../../Store/appContext'

import BuyIn from '../../Shared/BuyIn'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default SwapTracker = (props) => {

  const {store, actions} = useContext(Context)

  let other_swaps = props.swaps.map((content, index) => 
    <BuyIn
      key = {index}      
      navigation = {props.navigation}
      buyin_id = {content.buyin.id}      
      user_id = {content.buyin.user_id}
      user_name = {content.buyin.user_name} 
      table = {content.buyin.table}
      seat = {content.buyin.seat}
      chips = {content.buyin.chips}
      flight_id = {content.buyin.flight_id}
      // updated_at = {content.buyin.updated_at}

      swap_id = {content.swap.id}
      status = {content.swap.status}
      percentage = {content.swap.percentage}
      counter_percentage= {content.swap.counter_percentage}
      swap_updated_at={content.swap.updated_at}

      tournament_name={props.tournament.name}
      tournament_id={props.tournament.id}
      address={props.tournament.address}
      city={props.tournament.city}
      state={props.tournament.state}
      start_at={props.tournament.start_at}

    />
  )
    
  const enterTournament = async() => {
    var answer1 = await actions.tournament.getAction(props.tournament.id);
    var answer2 = console.log('answer', store.action)
    var answer3 = await props.navigation.push('TourneyLobby', {
      action: store.action,
      tournament_id: props.tournament.id,
      name: props.tournament.name,
      address: props.tournament.address,
      city: props.tournament.city,
      state: props.tournament.state,
      longitude: props.tournament.longitude,
      latitude: props.tournament.latitude,
      start_at: props.tournament.start_at,
      buy_ins: props.tournament.buy_ins,
      swaps: props.swaps,
      flights: props.tournament.flights, 
      previousScreen: 'Tournaments'
    });

  }

  return(
    <View>
      {/* TOURNAMENT TITLE */}
      <View 
        style={{justifyContent:'center', backgroundColor:'black', paddingVertical:10}}>
        <TouchableOpacity onPress={()=> enterTournament()}>
          <Text 
            style={{fontSize:18, fontWeight:'600', width:'75%',
            alignSelf:'center',textAlign:'center', color:'white'}}>
            {props.tournament.name}
          </Text>
        </TouchableOpacity>
      </View>
      
      <BuyIn
        navigation = {props.navigation}
        buyin_id = {props.my_buyin.id}
        user_id = {props.my_buyin.user_id}
        user_name = {props.my_buyin.user_name} 
        table = {props.my_buyin.table}
        seat = {props.my_buyin.seat}
        chips = {props.my_buyin.chips}
        tournament_name={props.tournament.name}
        address={props.tournament.address}
        city={props.tournament.city}
        state={props.tournament.state}
        updated_at={props.my_buyin.updated_at}
        start_at={props.tournament.start_at}
        // flight_id = {props.flight_id}
      />

      {other_swaps}
      
    </View>
  )
}
