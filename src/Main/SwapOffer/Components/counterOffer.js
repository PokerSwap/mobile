import React, {useContext, useState} from 'react'
import { Context } from '../../../Store/appContext'

import { Alert, View } from 'react-native'
import { Text, Button } from 'native-base'

import StandardOffer from './standardOffer'
import SpecialOffer from './specialOffer'

import lightStyle from '../../../Themes/light'
import darkStyle from '../../../Themes/dark'

export default CounterOffer = (props) => {
  
const { store, actions } = useContext(Context)

    const [ percentage, setPercentage ] = useState( props.percentage )
    const [ cPercentage, setCPercentage ] = useState( props.percentage )
    const [ offerPath, setOfferPath ] = useState(true)
    const [ visible, setVisible ] = useState(false)

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    // OFFER TYPE SWITCH
    var counterSwitch = () => {
        setOfferPath(!offerPath)
        setVisible(!visible)
        setCPercentage(percentage)
    }

    // CONFIRMATION ALERT
    const confirmationAlert = () => {
        Alert.alert(
            "Confirmation",
            'Are you want to counter this swap?',
            [
                { text: 'Yes', onPress: () => swapCounter()},
                { text: 'No', onPress: () => console.log("Cancel Pressed")}
            ]
        )
    }

    // MAKE A COUNTER SWAP
    const swapCounter = async() => {
        props.setLoading(true)
        if(percentage == cPercentage){
        var answer = await actions.swap.statusChange(
            props.tournament_id, props.swap_id, props.buyin_id, 
            props.currentStatus, 'pending', percentage )
        } else {
        var answer2 = await actions.swap.statusChange(
            props.tournament_id, props.swap_id, props.buyin_id, 
            props.currentStatus, 'pending', percentage, cPercentage )
        }
        props.onRefresh()
        props.setLoading(false)
    }


    var ere = percentage
    var erx = cPercentage
    
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
            setCPercentage(prev => prev + 1)
            erx++
        } else {
            setCPercentage(50)
        }
    }
   
    // THEIR COUNTER PERCENTAGE - SUBTRACT
    const cSubtract = () => {
        if (erx > 1){ 
            setCPercentage(prev => prev - 1)
            erx--
        } else {
            setCPercentage(1)
        }
    }
    
    // BOTH PERCENTAGE - ADD
    const tAdd = () => {
        if (ere < 50){
            setPercentage(prev => prev + 1) 
            setCPercentage(prev => prev + 1) 
            ere++
        } else {
            setPercentage(50), setCPercentage(50)
            console.log('added enough')
        }     
    }

    // BOTH PERCENTAGE - SUBTRACT
    const tSubtract = () => {
        if (ere > 1){
            setPercentage(prev => prev - 1) 
            setCPercentage(prev => prev - 1) 
            ere--
        } else {
            setPercentage(1), setCPercentage(1)
        }     
    }

    return(
        <View transparent style={{backgroundColor:currentStyle.background.color, flex:1, flexDirection:'row',
           width:'100%', justifyContent:'center', alignItems:'flex-start'}}>
            
            {/* OFFER PATHS - CONDITIONAL RENDERING */}
            {offerPath ?
                <StandardOffer confirmationAlert={confirmationAlert}
                    counterSwitch={counterSwitch}
                    percentage={percentage}
                    tAdd={tAdd} tSubtract={tSubtract} 
                    counter={props.counter}
                    setCounter={props.setCounter}/>
                :
                <SpecialOffer confirmationAlert={confirmationAlert}
                    counterSwitch={counterSwitch}
                    percentage={percentage} counterPercentage={cPercentage}
                    pAdd={pAdd} pSubtract={pSubtract}
                    cAdd={cAdd} cSubtract={cSubtract} 
                    counter={props.counter}
                    setCounter={props.setCounter}/> }
            
           

        </View>
    )
}