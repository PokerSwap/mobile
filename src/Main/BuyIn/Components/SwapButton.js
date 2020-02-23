
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
    : 
    props.buyin.user_id == store.myProfile.id ?
      allStatuses = ['edit'] : allStatuses = ['inactive']

console.log('allStatuses', allStatuses)
  // YOUR SWAP VIEW
  if (allStatuses.includes('edit')){
    lastCol = 
      <Icon type="FontAwesome5" name='edit'
        style={{alignSelf:'center', fontSize:24}}/>;
    buttonColor= 'grey';
    path = 'edit'
  } 
  // INCOMING SWAP VIEW
  else if(allStatuses.includes('incoming')){
    lastCol = 
      <Icon type="FontAwesome5" name='exclamation'
        style={{alignSelf:'center', fontSize:24}}/>;
    buttonColor= 'green';
    path = 'incoming'
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
    path = "pending";
    buttonColor= 'orange';
  } 
  // INCOMING SWAP VIEW
  else if (allStatuses.includes('agreed')){
    var totalAgreed = 0
    var addingAgreedTotal = props.agreed_swaps.forEach(swap => totalAgreed += swap.percentage)
    lastCol = 
      <Text style={{fontWeight:'600', fontSize:18,}}>
        {totalAgreed}%
      </Text>;
    path = 'agreed';
    buttonColor= 'green';
  
  } 
  // CANCELED SWAP OFFER VIEW
  else if (allStatuses.includes('canceled')){
    lastCol = 
      <Icon 
        style={{alignSelf:'center', fontSize:36}}
        type="FontAwesome5" name="times" />;
    path = 'canceled';
    buttonColor= 'grey';
  }
  // REJECTED SWAP OFFER VIEW
  else if (allStatuses.includes('rejected')){
    lastCol = 
    <Icon 
      style={{alignSelf:'center', fontSize:36}}
      type="FontAwesome5" name="times" />;
    path = 'rejected';
    buttonColor= 'red';
  }
  // SWAP OFFER VIEW
  else {
    lastCol = 
      <Icon type="FontAwesome5" name="handshake" 
        style={{alignSelf:'center', fontSize:24}} />;
    path = "inactive";
    buttonColor= 'rgb(56,68,165)';
  } 

  const enterSwapOffer = async() => {
    // var answer = await actions.tournament.getAction()
    props.navigation.push('SwapOffer',{
      status: path,
      swap_id: swap.id,
      flight_id: props.buyin.flight_id,
      user_id: props.buyin.user_id,
      user_name: props.buyin.user_name,
      updated_at:swap.updated_at,

      tournament_id: swap.tournament_id,

      buyin_id: props.buyin.buyin_id,
      table: props.buyin.table,
      seat: props.buyin.seat,
      chips: props.buyin.chips,
      counter_percentage: swap.counter_percentage,
      percentage: swap.percentage,
      // action: store.action

    });
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