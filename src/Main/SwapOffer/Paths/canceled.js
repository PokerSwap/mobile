import React, { useState, useContext } from 'react'
import { Context } from '../../../Store/appContext'
import moment from 'moment'

import { View } from 'react-native';
import {Text, Spinner} from 'native-base'

import CompareCard from '../Components/CompareCard'

import lightStyle from '../../../Themes/light'
import darkStyle from '../../../Themes/dark'

export default CanceledPath = (props) => {
    const { store, actions } = useContext(Context)
    var {swap, buyin} = props;  
    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    return(
        <View transparent style={{ 
            backgroundColor:currentStyle.background.color,
            width:'100%',justifyContent:'center', flexDirection:'column', flex:1}}>
           
            {/* CANCELED SWAP INFO */}
            {swap.percentage ?
                <View style={{width:'100%', flex:1,}}>
                    <Text style={{textAlign:'center', marginTop:10, color:currentStyle.text.color}}>
                        CANCELED SWAP{'\n'}{moment(swap.updated_at).fromNow()}
                    </Text>
                    <CompareCard 
                        percentage={swap.percentage} 
                        youColor={'#a3a3a3'} themColor={'#c3c3c3'}
                        counter_percentage={swap.counter_percentage}
                        buyin={buyin}/>
                </View>
                : 
                <View style={{justifyContent:'center'}}>
                    <Spinner />
                </View>}
        </View>
    )
}