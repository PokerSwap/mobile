import React, {useContext} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

import {Context} from '../../../Store/appContext'
import BuyIn from '../../BuyIn/BuyIn'

export default SwapTracker = (props) => {

  const {store, actions} = useContext(Context) 
  var x
  let a_action = async() => {
     x = await actions.tournament.getgetAction(props.tournament.id)}
  console.log('action be', x)
  let other_swaps = props.buyins.map((content, index) => {

    return(
    <BuyIn
      key = {index} navigation = {props.navigation}
      buyin = {content.recipient_buyin}
      tournament= {props.tournament}
      agreed_swaps = {content.agreed_swaps}
      other_swaps = {content.other_swaps}
      action={x}
      />)}
  )

    
  const enterTournament = async() => {
    var answer1 = await actions.tournament.getAction(props.tournament.id);
    var answer3 = await props.navigation.push('EventLobby', {
      action: store.action,
      tournament: props.tournament,
      flights: props.tournament.flights,
      buyins: props.buyins,
      navigation: props.navigation,
      my_buyin: props.my_buyin
    });

  }

  return(
    <View>
      {/* TOURNAMENT TITLE */}
      <View style={styles.title.container}>
        <TouchableOpacity onPress={()=> enterTournament()}>
          <Text style={styles.title.text}>
            {props.tournament.name}
          </Text>
        </TouchableOpacity>
      </View>
      
      <BuyIn
        navigation = {props.navigation}
        buyin = {props.my_buyin}
        tournament ={props.tournament} />
      
      {other_swaps}
      
    </View>
  )
}

const styles = {
  title:{
    container:{
      justifyContent:'center', backgroundColor:'black', 
      paddingVertical:10
    },
    text:{
      fontSize:18, fontWeight:'600', width:'75%',
      alignSelf:'center',textAlign:'center', color:'white'}
  }
}