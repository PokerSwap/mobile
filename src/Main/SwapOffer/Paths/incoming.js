import React, { useState, useContext } from 'react'
import { Context } from '../../../Store/appContext'
import moment from 'moment'

import { View } from 'react-native';
import { Card, CardItem, Text, Spinner } from 'native-base'

import CompareCard from '../Components/CompareCard'
import IntroOffer from '../Components/introOffer'
import CounterOffer from '../Components/counterOffer'

import lightStyle from '../../../Themes/light'
import darkStyle from '../../../Themes/dark'

export default IncomingPath = (props) => {
    const { store, actions } = useContext(Context)

    const [ counter, setCounter ] = useState(false)
    var {swap, buyin} = props;

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    return(
        <View  style={{ alignSelf:'center', flex:1, backgroundColor:currentStyle.background.color, justifyContent:'flex-start',
            width:'95%', flexDirection:'column'}}>
            
            {/* INCOMING SWAP INFO */}
           
                {swap.percentage ?
                    !counter ?
                        <View style={{width:'100%',  alignSelf:'center', marginBottom:20}}>
                            <Text style={{textAlign:'center',marginBottom:20, marginTop:10, 
                                color:currentStyle.text.color}}>
                                INCOMING SWAP{'\n'}{moment(swap.updated_at).fromNow()}
                            </Text>
                            <CompareCard 
                                percentage={swap.percentage} 
                                youColor={'blue'} themColor={'green'}
                                counter_percentage={swap.counter_percentage}
                                buyin={buyin}/>
                        </View>
                        : null
                    : 
                    <Spinner />} 

            {/* INCOMING SWAP INTERACTION UI */}
            {swap.percentage ?
                !counter ?
                    <IntroOffer 
                        swap_id={swap.id} buyin_id={buyin.id}
                        currentStatus={swap.status}
                        percentage={swap.percentage}
                        counter_percentage={swap.counter_percentage}
                        tournament_id={props.tournament_id} 
                        onRefresh={props.onRefresh}
                        setLoading={props.setLoading}
                        counter={counter} setCounter={setCounter}/>
                    :
                    <CounterOffer  
                        swap_id={swap.id} buyin_id={buyin.id}
                        currentStatus={swap.status}
                        percentage={swap.percentage} 
                        counter_percentage={swap.counter_percentage}
                        tournament_id={props.tournament_id} 
                        onRefresh={props.onRefresh}
                        setLoading={props.setLoading}
                        counter={counter} setCounter={setCounter} />
                : 
                null} 
        </View>
    )
}