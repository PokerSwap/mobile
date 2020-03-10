
import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native'
import { Text, Button, Icon } from 'native-base';
import { Col } from 'react-native-easy-grid'

import moment from 'moment'

import { Context } from '../../../Store/appContext'

export default SwapButton = (props) => {

  const { store, actions } = useContext(Context)

  var x = moment(props.updated_at).fromNow()
  var y, since
  if (x.includes('a ') || x.includes('an ')) { 
    y = '1'
  } else{
    y = parseInt(x.replace(/[^0-9\.]/g, ''), 10);
  }
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

  var lastCol, buttonColor, path, swapID;
 
  // YOUR SWAP VIEW
  if (props.buyin.user_id == store.myProfile.id){
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
    swapID = allStatuses[allStatuses.indexOf('incoming')-1]
  } 
  // COUNTER-INCOMING SWAP VIEW
  else if(allStatuses.includes('counter_incoming')){
    lastCol = 
      <Icon type="FontAwesome5" name='exclamation'
        style={{alignSelf:'center', fontSize:24}}/>;
    buttonColor= 'orange';
    path = 'counter_incoming'
    swapID = allStatuses[allStatuses.indexOf('counter_incoming')-1]
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
    buttonColor = 'orange';
    swapID = allStatuses[allStatuses.indexOf('pending')-1]
  } 
  // INCOMING SWAP VIEW
  else if (allStatuses.includes('agreed')){
    var totalAgreed = 0
    var addingAgreedTotal = props.agreed_swaps.forEach(swap => totalAgreed += swap.percentage)
    lastCol = 
      <View style={{flexDirection:'column'}}>
        <View style={{width:70, height:50, alignContent:'center', borderTopLeftRadius:10, borderTopRightRadius:10, 
          backgroundColor:'green', paddingTop:13}}>
          <Text style={{width:'100%',textAlign:'center', textAlignVertical:'center', fontSize:20, fontWeight:'600'}}>
            {totalAgreed}%
          </Text>
        </View>
        <View style={{width:70, height:20, backgroundColor:'rgb(38, 171, 75)',
          borderBottomLeftRadius:10, borderBottomRightRadius:10,}}>
          <Icon type='FontAwesome5' name='plus' 
            style={{fontSize:12,paddingTop:3,color:'white', textAlign:'center'}} />
        </View>
      </View>
    path = "inactive";
    buttonColor = null;
    swapID = allStatuses[allStatuses.indexOf('incoming')-1] 
  
  } 
  // INACTIVE SWAP OFFER VIEW
  else {
    lastCol = 
      <Icon type="FontAwesome5" name="handshake" 
        style={{alignSelf:'center', fontSize:24}} />;
    path = "inactive";
    buttonColor = 'rgb(56,68,165)';
  } 

  const enterSwapOffer = async() => {

    var swapTime
    if (path !== 'edit'){
      var answer = await actions.swap.getCurrent(swapID)
      var swapTime = store.currentSwap.updated_at

    } else{
      swapTime = props.updated_at
    }
    var day_name = swapTime.substring(0,3)
    var startMonth = swapTime.substring(8,11)
    var startDay = swapTime.substring(5,7)
    var startTime = swapTime.substring(16,22)

    var startHour = parseInt(swapTime.substring(16,19))
    var startM 
    if (startHour % 12!==0){
      if(startHour/12 >= 1){
        startM = ' P.M.', startHour%=12
      }else{
        startM = ' A.M.'
      }
    } else{
      if(startHour == 0){
        startM = ' A.M.', startHour=12
      }else{
        startM = ' P.M.'
      }
    }
    
    var startDate =  day_name + '. ' + startMonth + '. ' + startDay
    var startTime = startHour + ':' + swapTime.substring(20,22) + startM
    var labelTime = startDate + ', ' +   startTime
    props.navigation.push('SwapOffer',{
        status: path,
        swap: store.currentSwap,
        buyin: props.buyin,
        updated_at: labelTime,
        tournament: props.tournament,
      })  
  }

  return(
    <Col style={styles.container}>
      <Button style={{backgroundColor:buttonColor, width:70, height:70, 
    justifyContent:'center', alignSelf:'center'}}
        onPress={()=> enterSwapOffer()}>
        {lastCol}
      </Button>
      <Text style={{marginTop:10, color:props.txt, 
    textAlign:'center', alignSelf:'center'}}>
        {since}
      </Text>
    </Col>
  )
}

const styles = {

  container:{
    justifyContent:'center', marginLeft:20, 
    textAlign:'center' },

  
}