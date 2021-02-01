import React, { useContext, useState } from 'react'
import { Context } from '../../../Store/appContext'
import {useNavigation} from '@react-navigation/native'

import { View, Alert } from 'react-native'
import { Text, Button, Card, CardItem } from 'native-base'

import SpecialOffer from '../Components/specialOffer'
import StandardOffer from '../Components/standardOffer'

import lightStyle from '../../../Themes/light'
import darkStyle from '../../../Themes/dark'

export default InactivePath = (props) => {

    const { store, actions } = useContext(Context)
    const [ percentage, setPercentage ] = useState(1)
    const [ counterPercentage, setCounterPercentage ] = useState(1)
    const [ visible, setVisible ] = useState(false)

    const navigation = useNavigation()

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    // OFFER TYPE SWITCH
    var counterSwitch = () => {
        setVisible(!visible)
        setCounterPercentage(percentage)
    }

    var ere = percentage
    var erx = counterPercentage
    
    // MY PERCENTAGE - ADD  
    const pAdd = () => {
        if (ere < 50){ 
            setPercentage(prev => prev + 1)
            ere++
        } else {
            setPercentage(50)
        }
    }

    // MY PERCENTAGE - SUBTRACT
    const pSubtract = () => {
        if (ere > 1){ 
            setPercentage(prev => prev - 1)
            ere--
        } else {
            setPercentage(1)
        }
    }

    // THEIR COUNTER PERCENTAGE - ADD
    const cAdd = () => {
        if (erx < 50){ 
            setCounterPercentage(prev => prev + 1)
            erx++
        } else {
            setCounterPercentage(50)
        }
    }

    // THEIR COUNTER PERCENTAGE - SUBTRACT
    const cSubtract = () => {
            if (erx > 1){ 
            setCounterPercentage(prev => prev - 1)
            erx--
        } else {
            setCounterPercentage(1)
        }
    }

    // BOTH PERCENTAGE - ADD
    const tAdd = () => {
        if (ere < 50){
            setPercentage(prev => prev + 1) 
            setCounterPercentage(prev => prev + 1) 
            ere++
        } else {
            setPercentage(50), setCounterPercentage(50)
            console.log('added enough')
        }     
    }

    // BOTH PERCENTAGE - SUBTRACT
    const tSubtract = () => {
        if (ere > 1){
            setPercentage(prev => prev - 1) 
            setCounterPercentage(prev => prev - 1) 
            ere--
        } else {
            setPercentage(1), setCounterPercentage(1)
        }     
    }

    // SWAP CONFIRMATION ALERT
    const confirmationAlert = (action) => {
        Alert.alert(
            "Confirmation",
            'Are you want to ' + action + ' this swap?',
            [
                { text: 'Yes', onPress: () => swapStart()},
                { text: 'No', onPress: () => console.log("Cancel Pressed")}
            ]
        )
    }

    // CREATE A SWAP
    const swapStart = async() => {
        props.setLoading(true)
        if (percentage == counterPercentage){
            var answer1 = await actions.swap.add(
                props.tournament.id, props.buyin.user_id, props.buyin.id, percentage);
        } else {
            var answer1 = await actions.swap.add(
                props.tournament.id, props.buyin.user_id, props.buyin.id, 
                percentage, counterPercentage);
        }
        props.setCurrentSwap(store.currentSwap)
        props.setAStatus('pending')
        props.setRefreshing(true)
        props.setLoading(false)
        props.setRefreshing(false)
    }

  return(
    <Card transparent style={{backgroundColor:currentStyle.background.color}}>
        
        {/* IF YOU HAVE COINS */}
        {store.myProfile.coins > 0 ? 
            // HAGGLE TOGGLE
            !visible ?
                // SAME PERCEBTAGE SWAP VIEW
                <StandardOffer 
                    confirmationAlert={confirmationAlert}
                    counterSwitch={counterSwitch}
                    percentage={percentage} 
                    tAdd={tAdd} tSubtract={tSubtract}  />
                :
                //DIFFERENT PERCENTAGE SWAP VIEW
                <SpecialOffer confirmationAlert={confirmationAlert}
                    otherUser={props.buyin.user_name} 
                    counterSwitch={counterSwitch}
                    percentage={percentage}
                    counterPercentage={counterPercentage}
                    pAdd={pAdd} pSubtract={pSubtract}
                    cAdd={cAdd} cSubtract={cSubtract} />
            : 
            // YOU HAVE NO COINS, PURCHASE SOME
            <View style={{backgroundColor:currentStyle.background.color}}>
                <CardItem style={{backgroundColor:currentStyle.background.color, 
                    justifyContent:'center'}}>
                    <Text style={{color:currentStyle.text.color, textAlign:'center'}}> 
                        You need to purchase tokens{'\n'}
                        to swap with this person.
                    </Text>
                </CardItem>

                <CardItem style={{backgroundColor:currentStyle.background.color, 
                    justifyContent:'center'}}>
                    <Button large success 
                        onPress={()=> navigation.navigate('Purchase Tokens')}>
                        <Text>Purchase Tokens</Text>
                    </Button>
                </CardItem>
            </View>}
        </Card>
    )
}