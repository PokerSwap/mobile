import React, { useState, useContext } from 'react'
import { Context } from '../../../Store/appContext'
import moment from 'moment'

import { Alert, View } from 'react-native'
import { Text, Card, Button, CardItem, Spinner } from 'native-base'

import CompareCard from '../Components/CompareCard'

import lightStyle from '../../../Themes/light'
import darkStyle from '../../../Themes/dark'

export default PendingPath = (props) => {
    const { store, actions } = useContext(Context)
    const [ loading, setLoading ] = useState(false)
    const {swap, buyin} = props;
    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
    const showAlert = () =>{
        Alert.alert(
            "Confirmation",
            'Are you want to cancel this swap?',
            [
                { text: 'Yes', onPress: () => cancelSwap()},
                { text: 'No', onPress: () => console.log("Cancel Pressed")}
            ]
        )
    }

    var cancelSwap = async() => {
        props.setLoading(true)
        var answer = await actions.swap.statusChange(
        props.tournament.id, swap.id, buyin.id, "pending", "canceled") 
        props.onRefresh()
        props.setLoading(false)
    }

    return(
        <View transparent style={{alignSelf:'center',
            backgroundColor:currentStyle.background.color,width:'90%',
            alignItems:'center', flexDirection:'column', flex:1}}>
            
            {/* PENDING SWAP INFO - START */}
            <View style={{justifyContent:'center', 
                backgroundColor:currentStyle.background.color}}>
                {swap.percentage ?
                    <View style={{width:'100%', 
                        backgroundColor:currentStyle.background.color}}>
                        <Text style={{textAlign:'center', color:currentStyle.text.color}}>
                            PENDING SWAP{'\n'}{moment(swap.updated_at).fromNow()}
                        </Text>
                        <CompareCard 
                            youColor={'orange'} themColor={'orange'}
                            percentage={swap.percentage} 
                            counter_percentage={swap.counter_percentage}
                            buyin={buyin}/>
                    </View>
                    : 
                    <Spinner />}
            </View>
            {/* PENDING SWAP INFO - END */}
            
            {/* CANCEL SWAP BUTTON */}
            {swap ?
                <View style={{justifyContent:'center', marginTop:20, width:'90%', alignSelf:'center',
                    backgroundColor:currentStyle.background.color}}>  
                    <Button full large style={{width:'100%', textAlign:'center', backgroundColor:'#a3a3a3'}} 
                        onPress={()=> showAlert()}>
                        <Text>Cancel</Text>
                    </Button>
                </View>
                : 
                null}  
        </View>
    )
}