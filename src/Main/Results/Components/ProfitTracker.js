import React, { useContext, useState } from 'react';
import { Context } from '../../../Store/appContext'
import { useNavigation } from '@react-navigation/native'

import { Image, Modal, Alert, View } from 'react-native'
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

  const navigation = useNavigation()

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const payAlert = () => {
    Alert.alert(
      "Pay Confirmation",
      "Are you sure you paid what you owe to this person? ",
      [
        {text: 'Yes', onPress: () => noLyingAlert()},
        {text: 'No', onPress: () => console.log("Cancel Pressed"),}
      ]
    )
  }

  const noLyingAlert = () => {
    Alert.alert(
      "Final Confirmation",
      "If we recieve a complaint that you haven't paid this user, you will be put on the Naughty List and be prevented from making Swaps until all other parties are paid. Is this understood?",
      [
        {text: 'Yes', onPress: () => paySwap()},
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
    if(swap_profit > 0){
      if(paid){
        message = "You Were Paid", fn = () => console.log('Nothing Happend'), buttonColor = 'green'
      }else{
        message = "Waiting on them", fn = () => console.log('Nothing Happend'), buttonColor = 'rgb(241, 191, 86)'
      }
    }else{
      if(paid){
        message = "You Paid This Swap", fn = () => console.log('Nothing Happend'), buttonColor = 'green'
      }else{
        message = "Did You Pay This Swap?", fn = payAlert, buttonColor = 'rgb(241, 191, 86)'
      }
    }
  }else{null}

  const paySwap = async() => {
    setLoading(true)
    var answer = actions.swap.paid(
      props.buyin.recipient_buyin.tournament_id, props.buyin.recipient_user.id, props.buyin.agreed_swaps[0].id)
    setPaid(true)
    setVisible(false)
    setLoading(false)
  }
    
  return(
    <ListItem noIndent transparent 
      style={{justifyContent:'center'}}>
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
        {/* USERS ROW */}
        <Row style={{justifyContent:'center'}}>
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
              nickname: props.buyin.recipient_buyin.user_name
            })}>
            <Image source={{uri: props.buyin.recipient_user.profile_pic_url}} 
              style={{height:100, width:100,
              borderRadius:500, alignSelf:'center'}}/>  
            <Text style={{marginTop:10, color:currentStyle.text.color}}>
              {props.buyin.recipient_user.first_name}
            </Text>
          </Col>
        </Row>
        {/* PLACE ROW */}
        <Row style={{paddingTop:15}}>
          <Col style={{width:'25%'}}>
            
          </Col>
          <Col>
            {props.myPlace ? 
              <Text style={{alignSelf:'center', fontSize:20, fontWeight:'600', color:currentStyle.text.color}}>
                {props.myPlace}
              </Text>
              : null}
          </Col> 
          <Col>
            {props.buyin.their_place ? 
              <Text style={{alignSelf:'center',  fontSize:20, fontWeight:'600', color:currentStyle.text.color}}>
                {props.buyin.their_place}
              </Text>
              : null}
          </Col>
        </Row>
        {/* WINNINGS ROW */}
        <Row style={{paddingBottom:15, paddingTop:5}}>
          <Col style={{width:'25%'}}>
            <Text style={{fontSize:18, color:currentStyle.text.color}}>
              Winnings
            </Text>
          </Col>
          <Col>
            {props.buyin.you_won ? 
              <Text style={{alignSelf:'center',  fontSize:20, color:currentStyle.text.color}}>
                ${props.buyin.you_won}
              </Text>
              : <Text> Pending </Text>}
          </Col> 
          <Col>
            {props.buyin.they_won ? 
              <Text style={{alignSelf:'center',  fontSize:20, color:currentStyle.text.color}}>
                ${props.buyin.they_won}
              </Text>
              : <Text> Pending </Text>}
          </Col>
        </Row>
        {/* INDIVIDUAL SWAPS ROW */}
        {props.agreed_swaps.map((swap, index) =>{
          return(
            <IndividualOweRow 
              number={index} swap={swap}
              you_owe={swap.you_owe} they_owe= {swap.they_owe}/>)
        })}
        {/* TOTAL OWE ROW */}
        <TotalOweRow 
          you_owe_total = {props.buyin.you_owe_total}
          they_owe_total = {props.buyin.they_owe_total}/>
        {/* SWAP PROFIT OWE */}
        <Row style={{flexDirection:'column'}}>
          <Text style={{ fontSize:36, fontWeight:'600', textAlign:'center', marginTop:30}}>
            Swap Profit
            
          </Text>
          {props.buyin.they_owe_total && props.buyin.you_owe_total ?
              <View>
                <Text style={{fontSize:24,marginTop:5, color:currentStyle.text.color}}>
                  {final_swap_profit}
                </Text>
                <Text style={{fontSize:36, fontWeight:'600', marginTop:5, color:currentStyle.text.color}}>
                  ${Math.abs(swap_profit).toFixed(2)}
                </Text>
              </View>
              : 
            <Text>
              Pending
            </Text>}
          
        </Row>
        {/* PAY/PAID BUTTON */}
        {props.buyin.you_won ?
          <Row style={{marginTop:30}}>
            <Button large onPress={() => fn()}
              style={{height:60, justifyContent:'center', backgroundColor:buttonColor}} >
              <Text style={{textAlign:'center', fontWeight:'600'}}>
                {message}
              </Text> 
            </Button>
          </Row>
        : null}
        
      </Grid>
    </ListItem>
  )
}