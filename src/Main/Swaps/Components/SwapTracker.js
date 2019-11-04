import React, {useState} from 'react';
import { View } from 'react-native';
import {  Text } from 'native-base';
import { Context } from '../../../Store/appContext';

import BuyIn from '../../Shared/BuyIn'

export default  SwapTracker = (props) => {

  return(
    <View>
      {/* TOURNAMENT TITLE */}
      <View 
        style={{justifyContent:'center', backgroundColor:'black', paddingVertical:10}}>
        <Text 
          style={{fontSize:18, fontWeight:'600', width:'75%',
                  alignSelf:'center',textAlign:'center', color:'white'}}>
          {props.tournament_name}
        </Text>
      </View>
      <BuyIn
        navigation = {props.navigation}
        id = {props.id}
        first_name = {props.first_name} 
        last_name = {props.last_name} 
        table = {props.table}
        seat = {props.seat}
        chips = {props.chips}
        username={props.username}
        tournament_name = {props.tournament_name}
      />
    </View>
  )
}
