import React, {useContext} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

import {Context} from '../../../Store/appContext'
import BuyIn from '../../Shared/BuyIn'

export default SwapTracker = (props) => {

  const {store, actions} = useContext(Context)

  let other_swaps = props.buyins.map((content, index) => 
    <BuyIn
      key = {index} navigation = {props.navigation}
      buyin = {content.recipient_buyin}
      tournament={props.tournament}
      agreed_swaps = {content.agreed_swaps}
      other_swaps = {content.other_swaps}/>
  )
    
  const enterTournament = async() => {
    var answer1 = await actions.tournament.getAction(props.tournament.id);
    var answer3 = await props.navigation.push('EventLobby', {
      action: store.action,
      tournament: props.tournament,
      swaps: props.swaps,
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