
import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native'
import { Text, Button, Icon } from 'native-base';
import { Col } from 'react-native-easy-grid'
import { throttle } from 'lodash'
import moment from 'moment'

import { Context } from '../../../Store/appContext'

export default SwapButton = (props) => {
  const { store, actions } = useContext(Context)
  const [busted, setBusted] = useState(false)

  useEffect(() => {
    props.buyin.chips == 0 ? setBusted(true) : setBusted(false)
    return () => {
      // cleanup
    }
  }, [busted])

  var allStatuses =[]
  props.allSwaps !== null && props.allSwaps !== 0 && props.allSwaps !== undefined ?
    props.allSwaps.forEach(swap => 
      allStatuses.push(swap.id,swap.status))
    : allStatuses = ['inactive']

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
  // AGREED SWAP VIEW
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
    props.action !== 50 ? path = "inactive" : path = null
    buttonColor = null;
    swapID = allStatuses[allStatuses.indexOf('incoming')-1] 
  
  } 
  // ACTION IS FULL
  else if (props.action == 50){
    lastCol = 
      <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold'}}>
        Full
      </Text>;
    buttonColor= 'red';
    path = null
  }
  // INACTIVE SWAP OFFER VIEW
  else {
    lastCol = 
      <Icon type="FontAwesome5" name="handshake" 
        style={{alignSelf:'center', fontSize:24}} />;
    path = "inactive";
    swapId=undefined
    buttonColor = 'rgb(56,68,165)';
  } 

  const preliminary = async() => {
    console.log('right now', props.my_buyin)
    // CHECKS IF MY USER IS BUSTED
    if(props.my_buyin.chips !== 0){
      // CHECKS IF CURRENT BUYIN IS BUSTED
      if(props.buyin.chips !== 0){
        enterSwapOffer()
      } 
      // BUSTED BUYIN
      else{
        console.log("You can't swap with a busted user")
      }
    }
    // YOU'RE BUSTED
    else{
      // REBUYING BACK INTO THE TOURNAMENT
      if(path == 'edit'){
        props.navigation.push('VerifyTicket',{
          tournament_name: props.tournament.name,
          tournament_id: props.buyin.tournament_id,
          tournament_start: props.tournament.start_at,
          flight_id: props.buyin.flight_id
        }) 
      } 
      // YOU CANNOT SWAP WHILE BUSTED
      else { console.log('You cannot swap while busted')
      }
    }

  }


  const enterSwapOffer = async() => {
    console.log('swapID',swapID)
    // CHECKING IF ITS MY BUYIN
    if( props.buyin.user_id !== store.myProfile){
      // SWAPPING WITH ACTION LEFT
      if( props.action !== 50 ){
        console.log('doesnt equal 50?', props.action)
        if (path !== 'inactive') {
          props.navigation.push('SwapOffer',{
            status: path,
            buyin: props.buyin,
            tournament: props.tournament,
            buyinSince: props.buyinSince,
            swapID: swapID
          })
        } else {
          console.log('this inactive')
          props.navigation.push('SwapOffer',{
            status: 'inactive',
            buyin: props.buyin,
            tournament: props.tournament,
            buyinSince: props.buyinSince,
            swapID: swapID
          })
        }
        
      }
      // SWAPPING WITH NO ACTION LEFT
      else{
        if( path == 'pending' || path == 'counter_incoming' ){
          props.navigation.push('SwapOffer',{
            status: path,
            buyin: props.buyin,
            tournament: props.tournament,
            buyinSince: props.buyinSince,
            swapID: swapID
          })
        }else{
          console.log('You do not have sufficient action to swap')
        }
      }
    }
    // CHANGING BUYIN IF ITS MINE
    else {
      props.navigation.push('SwapOffer',{
        status: path,
        buyin: props.buyin,
        tournament: props.tournament,
        buyinSince: props.buyinSince,
        swapID: swapID
      })
    }
  }
      
  const handler = throttle(preliminary, 1000, { leading: true, trailing: false });

  return(
    <Col style={{ justifyContent:'center', marginLeft:20, textAlign:'center'}}>
      {/* SWAP BUTTON */}
      <Button style={{backgroundColor:buttonColor, width:70, height:70, 
        justifyContent:'center', alignSelf:'center'}}
        onPress={()=> handler()}>
        {lastCol}
      </Button>
      {/* LAST UPDATE DESCRIPTOR */}
      <Text style={{marginTop:10, color:props.txt, 
        textAlign:'center', alignSelf:'center'}}>
        {props.buyinSince}
      </Text>
    </Col>
  )
}