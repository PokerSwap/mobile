import React, { useContext } from 'react'
import { Context } from '../../../Store/appContext'
import moment from 'moment';

import { View } from 'react-native'
import { Text, Spinner } from 'native-base'

import CompareCard from '../Components/CompareCard'

import lightStyle from '../../../Themes/light'
import darkStyle from '../../../Themes/dark'

export default RejectedPath = (props) => {
    const { store, actions } = useContext(Context)
    var {swap, buyin} = props;

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    return(
        <View transparent style={{
            backgroundColor:currentStyle.background.color,width:'95%',
            justifyContent:'center', flexDirection:'column', flex:1}}>

            {swap.percentage ?
                <View style={{width:'100%', flex:1}}>
                    <Text style={{textAlign:'center', marginTop:10, color:currentStyle.text.color}}>
                        REJECTED SWAP{'\n'}{moment(swap.updated_at).fromNow()}
                    </Text>
                    <CompareCard 
                        percentage={swap.percentage} 
                        youColor={'red'} themColor={'red'}
                        counter_percentage={swap.counter_percentage}
                        buyin={buyin}/>
                </View>
                : 
                <Spinner/>}
            
        </View>
    )
}