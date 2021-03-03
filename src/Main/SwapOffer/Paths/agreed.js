import React, { useState, useContext } from 'react'
import { Context } from '../../../Store/appContext'
import moment from 'moment'

import { View } from 'react-native'
import {Text, Button, Card, CardItem, Spinner} from 'native-base'

import lightStyle from '../../../Themes/light'
import darkStyle from '../../../Themes/dark'

export default AgreedPath = (props) => {
    const { store, actions } = useContext(Context)

    var {swap ,buyin} = props;

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    return(
        <View transparent style={{ 
            backgroundColor:currentStyle.background.color,
            width:'95%',justifyContent:'center', flexDirection:'column', flex:1}}>
            {swap.percentage ?
                <View style={{width:'100%', flex:1,}}>
                    <Text style={{textAlign:'center', marginTop:10, color:currentStyle.text.color}}>
                        AGREED SWAP{'\n'}{moment(swap.updated_at).fromNow()}
                    </Text>
                    <CompareCard 
                        youColor={'green'} themColor={'green'}
                        percentage={swap.percentage} 
                        counter_percentage={swap.counter_percentage}
                        buyin={buyin}/>
                </View>
                :
                <Spinner/>}
        </View>
    )
}