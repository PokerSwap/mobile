import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { throttle } from 'lodash'

import { Context } from '../../../Store/appContext'
import BuyIn from '../../BuyIn/BuyIn'

export default SwapTracker = (props) => {
  const {store, actions} = useContext(Context) 
   
  let other_swaps = props.buyins.map((content, index) => {
    var x = actions.tournament.retrieveAction(props.tournament.id)
    return(
      <BuyIn
        key = {index} navigation = {props.navigation}
        buyin = {content.recipient_buyin} my_buyin={props.my_buyin}
        tournament= {props.tournament} action={props.action}
        agreed_swaps = {content.agreed_swaps}
        other_swaps = {content.other_swaps} />)
  })

  const enterTournament = () => {
    props.navigation.push('EventLobby', {
      event: props.event,
      tournament_id: props.event.tournament.id,
      tournament_name: props.event.name,
      tournament_start: props.event.tournament.start_at
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
        tournament ={props.tournament} action={props.action}
        my_buyin = {props.my_buyin} buyin = {props.my_buyin} />
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