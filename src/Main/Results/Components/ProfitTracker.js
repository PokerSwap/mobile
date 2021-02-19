import React, { useContext, useState } from 'react';
import { Context } from '../../../Store/appContext'
import { useNavigation } from '@react-navigation/native'

import { Image, Modal, Alert, View, TouchableOpacity } from 'react-native'
import { ListItem, Text, Button } from 'native-base';
import { Grid, Row, Col} from 'react-native-easy-grid'
import  Spinner  from 'react-native-loading-spinner-overlay'

import PayModal from './PayModal'
import TotalOweRow from './TotalOweRow';
import IndividualOweRow from './IndividualOweRow';

import darkStyle from '../../../Themes/dark.js'
import lightStyle from '../../../Themes/light.js'

export default ProfitTracker = (props) => {
    const { store, actions } = useContext(Context)
    const [ visible, setVisible ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ paid, setPaid ] = useState(props.buyin.agreed_swaps[0].paid)
    const [ confirmed, setConfirmed ] = useState(props.buyin.agreed_swaps[0].confirmed)
    const [ theyPaid, setTheyPaid ] = useState(props.buyin.agreed_swaps[0].they_paid)
    const [ theyConfirmed, setTheyConfirmed ] = useState(props.buyin.agreed_swaps[0].they_confirmed)
    
    const navigation = useNavigation()

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    const payAlert = () => {
        Alert.alert(
            "Pay Confirmation",
            "Are you sure you paid what you owe to this person? ",
            [
                {text: 'Yes', onPress: () => finalPayAlert()},
                {text: 'No', onPress: () => console.log("Cancel Pressed"),}
            ]
        )
    }

    const finalPayAlert = () => {
        Alert.alert(
            "Final Pay Confirmation",
            "If you have not paid your swaps, the other user may file a dispute. Is this understood?",
            [
                {text: 'Yes', onPress: () => paySwap()},
                {text: 'No', onPress: () => console.log("Cancel Pressed"),}
            ]
        )
    }

    const confirmAlert = () => {
        Alert.alert(
        "Swap Paid Confirmation",
        "Are you sure this person paid what you were owed? ",
        [
            {text: 'Yes', onPress: () => finalConfirmAlert()},
            {text: 'No', onPress: () => console.log("Cancel Pressed"),}
        ]
        )
    }

    const finalConfirmAlert = () => {
        Alert.alert(
        "Final Confirmation",
        "If you confirm and the other user has not paid their swaps to you, you cannot file a dispute afterwards.\n\nIs this understood?",
        [
            {text: 'Yes', onPress: () => confirmSwap()},
            {text: 'No', onPress: () => console.log("Cancel Pressed"),}
        ]
        )
    }

    let final_swap_profit
    let swap_profit = props.buyin.they_owe_total - props.buyin.you_owe_total
    swap_profit >= 0 ?
        final_swap_profit = props.buyin.recipient_buyin.user_name +' owes you:' 
        : final_swap_profit = "You owe " + props.buyin.recipient_buyin.user_name + ":"
        
    var message, fn, buttonColor
    if (swap_profit !== 0 && (props.buyin.they_owe_total && props.buyin.you_owe_total)){
        if (paid && confirmed){
            if ( theyPaid && theyConfirmed ){
                message = "Swap Confirmed", fn = () => console.log('Nothing Happend'), 
                buttonColor = 'green'
            } else if ( theyPaid ){
                message = "Confirm Swap Payment", fn = () => confirmAlert(), 
                buttonColor = 'orange'
            } else {
                message = "Waiting on their Payment", fn = () => console.log('Nothing Happend'), 
                buttonColor = 'rgb(241, 191, 86)'
            }
        } else if ( paid ){
            message = "Waiting for their Confirmation", fn = () => console.log('Nothing Happend'), 
            buttonColor = 'rgb(241, 191, 86)'
        } else {
            message = "Paid Your Swaps?", fn = payAlert, buttonColor = 'rgb(241, 191, 86)'
        }

    } else {null}

    const paySwap = async() => {
        setLoading(true)
        var answer = await actions.swap.paid(
            props.buyin.recipient_buyin.tournament_id, 
            props.buyin.recipient_user.id, 
            props.buyin.agreed_swaps[0].id)
        if (answer == true) {
            setPaid(true)
            setVisible(false)
            setLoading(false)
        } else {
            setVisible(false)
            setLoading(false)
        }
    }

    const confirmSwap = async() => {
        setLoading(true)
        var answer = await actions.swap.confirmed(
        props.buyin.recipient_buyin.tournament_id, 
        props.buyin.agreed_swaps[0].recipient_user.id, 
        props.buyin.agreed_swaps[0].counter_swap_id)
        if (answer == true) {
        setTheyConfirmed(true)
        } 
        setVisible(false)
        setLoading(false)
    }
        
    return(
        <ListItem noIndent transparent  style={{justifyContent:'center'}}>
            <Spinner visible={loading}/>
            
            {/* PAY MODAL */}
            <Modal
                animationType='fade'
                visible={visible}
                presentationStyle='overFullScreen'
                transparent={true}>
                <PayModal fn={paySwap} setVisible={setVisible}/>  
            </Modal>

            {/* MAIN BODY */}
            <Grid style={{justifyContent:'center',
                alignItems:'center', marginVertical:40}}>
                
                {/* USERS ROW - START */}
                <Row style={{justifyContent:'center'}}>

                    {/* PLACEHOLDER FOR SPACING */}
                    <Col style={{width:'25%'}}></Col>
                    
                    {/* YOUR PROFILE */}
                    <Col style={{alignSelf:'center'}}>           
                        <Image source={{uri: store.myProfile.profile_pic_url}} 
                            style={{height:100, width:100, 
                                borderRadius:500, alignSelf:'center'}}/>
                        <Text style={{marginTop:10, color:currentStyle.text.color}}>
                            You
                        </Text>
                    </Col>

                    {/* THEIR PROFILE */}
                    <Col style={{alignSelf:'center'}} 
                        onPress={() => navigation.push('Profile',{
                            user_id: props.buyin.recipient_user.id,
                            nickname: props.buyin.recipient_buyin.user_name})}>
                        <Image source={{uri: props.buyin.recipient_user.profile_pic_url}} 
                            style={{height:100, width:100, borderRadius:500, alignSelf:'center'}}/>  
                        <Text style={{marginTop:10, color:currentStyle.text.color}}>
                            {props.buyin.recipient_user.first_name}
                        </Text>
                    </Col>
                </Row>
                {/* USERS ROW - END */}

                {/* PLACE ROW - START */}
                <Row style={{paddingTop:15}}>
                    <Col style={{width:'25%'}}>
                    </Col>

                    {/* MY PLACE */}
                    <Col>
                        {props.myPlace ? 
                            <Text style={{alignSelf:'center', fontSize:20, 
                                fontWeight:'600', color:currentStyle.text.color}}>
                                {props.myPlace}
                            </Text>
                            : 
                            null}
                    </Col> 

                    {/* THEIR PLACE */}
                    <Col>
                        {props.buyin.their_place ? 
                        <Text style={{alignSelf:'center',  fontSize:20, 
                            fontWeight:'600', color:currentStyle.text.color}}>
                            {props.buyin.their_place}
                        </Text>
                        : 
                        null}
                    </Col>
                </Row>
                {/* PLACE ROW - END */}

                {/* WINNINGS ROW - START */}
                <Row style={{paddingBottom:15, paddingTop:5}}>
                    
                    {/* WINNINGS HEADER */}
                    <Col style={{width:'25%'}}>
                        <Text style={{fontSize:18, color:currentStyle.text.color}}>
                            Winnings
                        </Text>
                    </Col>

                    {/* YOUR WINNINGS */}
                    <Col>
                        {props.buyin.you_won ? 
                        <Text style={{alignSelf:'center',  fontSize:20, 
                            color:currentStyle.text.color}}>
                            ${props.buyin.you_won}
                        </Text>
                        : 
                        <Text style={{color:currentStyle.text.color}}> 
                            Pending 
                        </Text>}
                    </Col> 

                    {/* THEIR WINNINGS */}
                    <Col>
                        {props.buyin.they_won ? 
                            <Text style={{alignSelf:'center',  fontSize:20, 
                                color:currentStyle.text.color}}>
                                ${props.buyin.they_won}
                            </Text>
                            : 
                            <Text style={{color:currentStyle.text.color}}> 
                                Pending 
                            </Text>}
                    </Col>
                </Row>
                {/* WINNINGS ROW - END */}

                {/* INDIVIDUAL SWAPS ROW */}
                {props.agreed_swaps.map((swap, index) =>{
                    return(
                        <IndividualOweRow key={swap.id}
                        number={index} swap={swap}
                        you_owe={swap.you_owe} they_owe= {swap.they_owe}/>)
                })}

                {/* TOTAL OWE ROW */}
                <TotalOweRow 
                    you_owe_total = {props.buyin.you_owe_total}
                    they_owe_total = {props.buyin.they_owe_total}/>

                {/* FINAL SWAP PROFIT - BEGIN */}
                <Row style={{flexDirection:'column'}}>
                    <Text style={{ fontSize:36, fontWeight:'600', color:currentStyle.text.color, 
                        textAlign:'center', marginTop:30}}>
                        Swap Profit
                    </Text>
                    {props.buyin.they_owe_total && props.buyin.you_owe_total ?
                        <View>
                            <Text style={{fontSize:24,marginTop:5, 
                                    color:currentStyle.text.color}}>
                                {final_swap_profit}
                            </Text>
                            <Text style={{fontSize:36, fontWeight:'600', 
                                marginTop:5, color:currentStyle.text.color}}>
                                ${Math.abs(swap_profit).toFixed(2)}
                            </Text>
                        </View>
                        : 
                        <Text style={{fontSize:24, marginTop:20, 
                            color:currentStyle.text.color}}>
                            Pending
                        </Text>}
                </Row>
                {/* FINAL SWAP PROFIT - END */}

                {/* PAY/PAID BUTTON */}
                {props.buyin.you_won ?
                    <Row style={{marginTop:30}}>
                        <Button large onPress={() => fn()}
                            style={{height:60, justifyContent:'center', 
                                backgroundColor:buttonColor}} >
                            <Text style={{textAlign:'center', fontWeight:'600'}}>
                                {message}
                            </Text> 
                        </Button>
                    </Row>
                    : 
                    null}

                {/* DISPUTE BUTTON */}
                {props.buyin.you_won && paid && confirmed && theyPaid && !(theyConfirmed) ?
                    <Row style={{marginTop:30}}>
                        <TouchableOpacity  onPress={() => fn()}
                        style={{justifyContent:'center'}} >
                            <Text style={{textAlign:'center', color:'red', fontWeight:'600'}}>
                                DISPUTE
                            </Text> 
                        </TouchableOpacity>
                    </Row>
                    : 
                    null}
                
            </Grid>
        </ListItem>
    )
}