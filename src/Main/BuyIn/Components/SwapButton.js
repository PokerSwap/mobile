
import React, { useContext } from 'react';
import { Text, Button, Icon } from 'native-base';
import { Col } from 'react-native-easy-grid'

import moment from 'moment'

import { Context } from '../../../Store/appContext'

export default SwapButton = (props) => {

  const { store, actions } = useContext(Context)

  var x = moment(props.updated_at).fromNow()
  var y, since
  x.includes('a ')? y = '1' : y = parseInt(x.replace(/[^0-9\.]/g, ''), 10);
  if (x.includes('second')) { since = 'Just Now' } 
  else if(x.includes('minute')){ since = y + 'm' } 
  else if(x.includes('hour')){ since = y + 'h' } 
  else if(x.includes('day')){ since = y + 'd' } 
  else if(x.includes('week')){ since = y + 'w' }
  else if(x.includes('month')){ since = y + 'M' }
  else if(x.includes('year')){ since = y + 'Y' }
  else{ null }

  var allStatuses =[]
  props.allSwaps !== null && props.allSwaps !== 0 && props.allSwaps !== undefined ?
    props.allSwaps.forEach(swap => 
      allStatuses.push(swap.id,swap.status))
    :allStatuses = ['inactive']

  var lastCol, buttonColor, path;
 

  // YOUR SWAP VIEW
  if (props.buyin.user_id == store.myProfile.id){
    lastCol = 
      <Icon type="FontAwesome5" name='edit'
        style={{alignSelf:'center', fontSize:24}}/>;
    buttonColor= 'grey';
    path = 'edit'
  } 
  else if(allStatuses.includes('counter-incoming')){
    lastCol = 
      <Icon type="FontAwesome5" name='exclamation'
        style={{alignSelf:'center', fontSize:24}}/>;
    buttonColor= 'green';
    path = 'counter-incoming'
  } 
  // INCOMING SWAP VIEW
  else if(allStatuses.includes('incoming')){
    lastCol = 
      <Icon type="FontAwesome5" name='exclamation'
        style={{alignSelf:'center', fontSize:24}}/>;
    buttonColor= 'green';
    path = 'incoming'
  } 
  // COUNTER-INCOMING SWAP VIEW
  else if(allStatuses.includes('counter_incoming')){
    lastCol = 
      <Icon type="FontAwesome5" name='exclamation'
        style={{alignSelf:'center', fontSize:24}}/>;
    buttonColor= 'orange';
    path = 'counter_incoming'
  } 
  // PENDING SWAP VIEW
  else if(allStatuses.includes('pending')) {
    var pendingPercentage = 0
    var gettingpendingagreed = props.allSwaps.filter(swap => swap.status == 'agreed' || swap.status == 'pending')
    var addingPercentage = gettingpendingagreed.forEach(swap => pendingPercentage+= swap.percentage)
    lastCol =  
      <Text style={{fontWeight:'600', fontSize:18,
        color:'white', textAlignVertical:'center'}}> 
        {pendingPercentage}% 
      </Text>;
    // path = "pending";
    buttonColor = 'orange';
  } 
  // INCOMING SWAP VIEW
  else if (allStatuses.includes('agreed')){
    var totalAgreed = 0
    var addingAgreedTotal = props.agreed_swaps.forEach(swap => totalAgreed += swap.percentage)
    lastCol = 
      <Text style={{fontWeight:'600', fontSize:18,}}>
        {totalAgreed}%
      </Text>;
    // path = 'agreed';
    buttonColor = 'green';
  
  } 
  // CANCELED SWAP OFFER VIEW
  else if (allStatuses.includes('canceled')){
    lastCol = 
      <Icon 
        style={{alignSelf:'center', fontSize:36}}
        type="FontAwesome5" name="times" />;
    // path = 'canceled';
    buttonColor = 'grey';
  }
  // REJECTED SWAP OFFER VIEW
  else if (allStatuses.includes('rejected')){
    lastCol = 
    <Icon 
      style={{alignSelf:'center', fontSize:36}}
      type="FontAwesome5" name="times" />;
    // path = 'rejected';
    buttonColor = 'red';
  }
  // SWAP OFFER VIEW
  else {
    lastCol = 
      <Icon type="FontAwesome5" name="handshake" 
        style={{alignSelf:'center', fontSize:24}} />;
    path = "inactive";
    buttonColor = 'rgb(56,68,165)';
  } 

  const enterSwapOffer = async() => {
    // var answer = await actions.tournament.getAction()
    if (props.buyin.user_id == store.myProfile.id) {

      // console.log('buyyyyyin', props.buyin)
      props.navigation.push('SwapOffer',{
        status: path,
        // swap: s,
        buyin: props.buyin,
        updated_at: since,
        tournament: props.tournament,
  
      });
    }
    
  }

  return(
    <Col style={{justifyContent:'center', 
      marginLeft:20, textAlign:'center'}}>
      <Button 
        onPress={()=> enterSwapOffer()}
        style={{
          backgroundColor:buttonColor, width:70, height:70, 
          justifyContent:'center', alignSelf:'center'}}>
        {lastCol}
      </Button>
      <Text style={{ marginTop:10, color:props.txt, 
        textAlign:'center', alignSelf:'center'}}>
        {since}
      </Text>
    </Col>

  )
}