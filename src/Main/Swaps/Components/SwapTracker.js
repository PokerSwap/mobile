import React, {} from 'react';
import { View } from 'react-native';
import {  Text } from 'native-base';
import { Context } from '../../../Store/appContext';

import BuyIn from '../../Shared/BuyIn'

export default SwapTracker = (props) => {

  return(
    <View>
      {/* TOURNAMENT TITLE */}
      <View 
        style={{justifyContent:'center', backgroundColor:'black', paddingVertical:10}}>
        <Text 
          style={{fontSize:18, fontWeight:'600', width:'75%',
                  alignSelf:'center',textAlign:'center', color:'white'}}>
        </Text>
      </View>
      <BuyIn
        id = {props.id}
        navigation = {props.navigation}
        user_id = {props.user_id}
        user_name = {props.user_name} 
        table = {props.table}
        seat = {props.seat}
        chips = {props.chips}
        flight_id = {props.flight_id}
      />
      {/* <Context.Consumer>
        {({store, actions}) => {
          let tournament = store.tournaments

          return (
            <BuyIn
              id = {props.id}
              navigation = {props.navigation}
              
              user_name = {props.user_name} 
              table = {props.table}
              seat = {props.seat}
              chips = {props.chips}
              flight_id = {props.flight_id}
            />
          )
        }}
      </Context.Consumer> */}
    </View>
  )
}
