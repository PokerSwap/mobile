import React, { useContext, useState } from 'react';
import { ListItem, Text, Button } from 'native-base';
import { Image, Modal, Alert } from 'react-native'
import { Grid, Row, Col} from 'react-native-easy-grid'
import  Spinner  from 'react-native-loading-spinner-overlay'

import { Context } from '../../../Store/appContext'
import PayModal from './PayModal'
import TotalOweRow from './TotalOweRow';
import IndividualOweRow from './IndividualOweRow';

export default ProfitTracker = (props) => {
  const { store, actions } = useContext(Context)
  const [ visible, setVisible ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ paid, setPaid ] = useState(props.buyin.agreed_swaps[0].paid)

  const payAlert = () => {
    Alert.alert(
      "Pay Confirmation",
      "Are you sure you paid what you owe to this person?",
      [
        {text: 'Yes', onPress: () => setVisible(true)},
        {text: 'No', onPress: () => console.log("Cancel Pressed"),}
      ]
    )
  }

  let final_swap_profit
  let swap_profit = props.buyin.they_owe_total - props.buyin.you_owe_total
  swap_profit >= 0 ?
    final_swap_profit = '$' + Math.abs(swap_profit).toFixed(2)
    : final_swap_profit = "-$" + Math.abs(swap_profit).toFixed(2)
    
  var message, fn, buttonColor
  if (swap_profit !== 0 && (props.buyin.they_owe_total && props.buyin.you_owe_total)){
    if(swap_profit > 0){
      if(paid){
        message = "You were Paid", fn = () => console.log('Nothing Happend'), buttonColor = 'green'
      }else{
        message = "Waiting for Payment", fn = () => console.log('Nothing Happend'), buttonColor = 'rgb(241, 191, 86)'
      }
    }else{
      if(paid){
        message = "You Paid", fn = () => console.log('Nothing Happend'), buttonColor = 'green'
      }else{
        message = "Paid Swap?", fn = payAlert, buttonColor = 'rgb(241, 191, 86)'
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
        <PayModal fn={paySwap} />  
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
            <Text style={{marginTop:10}}>
              You
            </Text>
          </Col>
          {/* THEIR PROFILE */}
          <Col style={{alignSelf:'center'}}>
            <Image source={{uri: props.buyin.recipient_user.profile_pic_url}} 
              style={{height:100, width:100,
              borderRadius:500, alignSelf:'center'}}/>  
            <Text style={{marginTop:10}}>
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
              <Text style={{alignSelf:'center',  fontSize:20, fontWeight:'600'}}>
                {props.myPlace}
              </Text>
              : <Text> Pending </Text>}
          </Col> 
          <Col>
            {props.buyin.their_place ? 
              <Text style={{alignSelf:'center',  fontSize:20, fontWeight:'600'}}>
                {props.buyin.their_place}
              </Text>
              : <Text> Pending </Text>}
          </Col>
        </Row>
        {/* WINNINGS ROW */}
        <Row style={{paddingBottom:15, paddingTop:5}}>
          <Col style={{width:'25%'}}>
            <Text style={{fontSize:18}}>
              Winnings
            </Text>
          </Col>
          <Col>
            {props.buyin.you_won ? 
              <Text style={{alignSelf:'center',  fontSize:20}}>
                ${props.buyin.you_won}
              </Text>
              : <Text> Pending </Text>}
          </Col> 
          <Col>
            {props.buyin.they_won ? 
              <Text style={{alignSelf:'center',  fontSize:20}}>
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
        <Row>
          <Text style={{ fontSize:36, fontWeight:'600', textAlign:'center', marginTop:30}}>
            Swap Profit {"\n"}
            {props.buyin.they_owe_total && props.buyin.you_owe_total ?
              final_swap_profit : "Pending"}
          </Text>
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