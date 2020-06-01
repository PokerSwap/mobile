import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

import { throttle } from 'lodash'

import { Context } from '../../../Store/appContext'
import BuyIn from '../../BuyIn/BuyIn'

export default SwapTracker = (props) => {
  const {store, actions} = useContext(Context) 
  
  var x
  let a_action = () => {
     x = actions.tournament.getAction(props.tournament.id)
  }
  
  let other_swaps = props.buyins.map((content, index) => {
    return(
      <BuyIn
        key = {index} navigation = {props.navigation}
        buyin = {content.recipient_buyin}
        tournament= {props.tournament}
        agreed_swaps = {content.agreed_swaps}
        other_swaps = {content.other_swaps}
        action={x}/>)
  })

  const enterTournament = () => {
    props.navigation.push('EventLobby', {
      tournament_name: props.tournament.name,
      tournament_id: props.tournament.id,
      tournament_start: props.tournament.start_at,
      action: null
    });
  }

  const handler = throttle(enterTournament, 1000, { leading: true, trailing: false });

  return(
    <View>
      {/* TOURNAMENT TITLE */}
      <View style={styles.title.container}>
        <TouchableOpacity onPress={()=> handler()}>
          <Text style={styles.title.text}>
            {props.tournament.name}
          </Text>
        </TouchableOpacity>
      </View>
      {/* MY BUYIN IN TOURNAMENT */}
      <BuyIn navigation = {props.navigation}
        buyin = {props.my_buyin}
        tournament ={props.tournament} />
      {/* OTHER BUYINS YOU SWAPPED TO IN TOURNAMENT */}
      {other_swaps}   
    </View>
  )
}

const styles = {
  title:{
    container:{
      justifyContent:'center', backgroundColor:'black', 
      paddingVertical:10 },
    text:{
      fontSize:18, fontWeight:'600', width:'75%',
      alignSelf:'center',textAlign:'center', color:'white'}
  }
}