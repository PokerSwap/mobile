import React, { useContext, useState } from 'react';
import { Context } from '../../../Store/appContext'
import { useNavigation } from '@react-navigation/native'
import { throttle } from 'lodash'

import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

import BuyIn from '../../BuyIn/BuyIn'

export default SwapTracker = (props) => {
    const { store, actions } = useContext(Context) 
    const [disabled, setDisabled] = useState(false)

    const navigation = useNavigation()

    let other_swaps = props.buyins.map((content, index) => {
        return(
        <BuyIn key = {index}
            buyin = {content.recipient_buyin} my_buyin={props.my_buyin}
            tournament= {props.tournament} action={props.action}
            agreed_swaps = {content.agreed_swaps} other_swaps = {content.other_swaps} />)
    })

    const enterTournament = () => {
        navigation.push('Event Lobby', {
            tournament: props.tournament,
            tournament_id: props.tournament.id
        });
    }
    
    const handler = () => {
        setDisabled(true)
        enterTournament();
        setTimeout(()=>{setDisabled(false)}, 2000)
    }

    return(
        <View style={{width:'100%', color:'black'}}>
            
            {/* TOURNAMENT TITLE */}
            <TouchableOpacity disabled={disabled} onPress={()=> handler()}>
                <View style={styles.title.container}>
                    <Text style={styles.title.text}>
                        {props.tournament.name}
                    </Text>
                    <Text style={{color:'white', textAlign:'center', marginTop:10}}>
                        {props.timeBy} {props.countdown}
                    </Text>
                </View>
            </TouchableOpacity>

            {/* MY BUYIN IN TOURNAMENT */}
            <BuyIn tournament ={props.tournament} action={props.action}
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
        fontSize:18, fontWeight:'600', width:350,
        alignSelf:'center',textAlign:'center', color:'white'}
    }
}