import React, { useState, useContext } from 'react'
import { Context } from '../../../Store/appContext'
import moment from 'moment'

import { View } from 'react-native'
import { Text, Spinner } from 'native-base'

import CompareCard from '../Components/CompareCard'
import CounterOffer from '../Components/counterOffer'
import IntroOffer from '../Components/introOffer'

import lightStyle from '../../../Themes/light'
import darkStyle from '../../../Themes/dark'

export default CounterIncomingPath = (props) => {

    const { store, actions } = useContext(Context)
    const [counter, setCounter] = useState(false)
    var { swap, buyin } = props;

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
    return(
        <View transparent style={{ alignSelf:'center', width:'95%', flex:1, flexDirection:'column',
            justifyContent:'flex-start', backgroundColor:currentStyle.background.color}}>
            
            {/* COUNTER SWAP INFO */}
            
            {swap.percentage ?
            !counter ?
                <View style={{
                    width:'100%', backgroundColor:currentStyle.background.color}}>
                    <Text style={{ textAlign:'center', color:currentStyle.text.color}}>
                        COUNTER SWAP{'\n'}{moment(swap.updated_at).fromNow()}
                    </Text>
                    <CompareCard 
                        buyin={buyin}
                        percentage={swap.percentage} 
                        counter_percentage={swap.counter_percentage}
                        youColor={'blue'} themColor={'green'} />
                </View>
                : null
            : <Spinner />}

            {/* COUNTER SWAP INTERACTION UI */}
            {swap ? 
                !counter ?
                    <IntroOffer buyin_id={buyin.id}
                        setLoading={props.setLoading} onRefresh={props.onRefresh}
                        percentage={swap.percentage} 
                        counter_percentage={swap.counter_percentage}
                        swap_id={swap.id} tournament_id={props.tournament_id}
                        counter={counter} setCounter={setCounter} />
                    :
                    <CounterOffer  swap_id={swap.id} tournament_id={props.tournament_id}
                        buyin_id={buyin.id} percentage={swap.percentage} 
                        counter_percentage={swap.counter_percentage}
                        setLoading={props.setLoading} onRefresh={props.onRefresh}
                        counter={counter} setCounter={setCounter} />
                : 
                null}
        </View>
    )
}