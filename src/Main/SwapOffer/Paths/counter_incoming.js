import React, { useState, useContext } from 'react'
import { Context } from '../../../Store/appContext'
import moment from 'moment'

import { View } from 'react-native'
import { Card, CardItem, Text, Spinner } from 'native-base'

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
        <Card transparent style={{ alignSelf:'center', width:'95%', 
            justifyContent:'center', backgroundColor:currentStyle.background.color}}>
            {/* COUNTER SWAP INFO */}
            <CardItem style={{ 
                alignSelf:'center', backgroundColor:currentStyle.background.color}}>
                {swap.percentage ?
                    <View style={{
                        width:'100%', backgroundColor:currentStyle.background.color}}>
                        <Text style={{
                            fontSize:20, textAlign:'center', color:currentStyle.text.color}}>
                            COUNTER SWAP{'\n'}{moment(swap.updated_at).fromNow()}
                        </Text>
                        <CompareCard 
                            buyin={buyin}
                            percentage={swap.percentage} 
                            counter_percentage={swap.counter_percentage}
                            youColor={'blue'} themColor={'green'} />
                    </View>
                : <Spinner />}
            </CardItem>
            {/* COUNTER SWAP INTERACTION UI */}
            {swap ? 
                counter == false ?
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
        </Card>
    )
}