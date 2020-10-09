
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Store/appContext'
import { useNavigation } from '@react-navigation/native';
import { throttle } from 'lodash'

import { View } from 'react-native'
import { Text, Button, Icon, Toast } from 'native-base';
import { Col } from 'react-native-easy-grid'

export default SwapButton = (props) => {
  const { store, actions } = useContext(Context)
  const [ busted, setBusted ] = useState(false)

  const navigation = useNavigation();

  useEffect(() => {
    props.buyin.chips == 0 ? setBusted(true) : setBusted(false)
    return () => {
      // cleanup
    }
  }, [busted])

  const {allSwaps} = props

  var allStatuses =[]
  allSwaps ?
    allSwaps.forEach(swap => allStatuses.push(swap.status))
    : allStatuses = ['inactive']

  var lastCol, buttonColor, path, swap;
 
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
    swap = allSwaps[allStatuses.indexOf('incoming')]
  } 
  // COUNTER-INCOMING SWAP VIEW
  else if(allStatuses.includes('counter_incoming')){
    lastCol = 
      <Icon type="FontAwesome5" name='exclamation'
        style={{alignSelf:'center', fontSize:24}}/>;
    buttonColor= 'orange';
    path = 'counter_incoming'
    swap = allSwaps[allStatuses.indexOf('counter_incoming')]
  } 
  // PENDING SWAP VIEW
  else if(allStatuses.includes('pending')) {
    var pendingPercentage = 0
    var gettingpendingagreed = props.allSwaps.filter(swap => swap.status == 'agreed' || swap.status == 'pending')
    var addingPercentage = gettingpendingagreed.forEach(swap => pendingPercentage+= swap.percentage)
    lastCol =  
      <Text style={{fontWeight:'600', fontSize:16,
        color:'white', textAlignVertical:'center'}}> 
        {pendingPercentage}% 
      </Text>;
    path = "pending";
    buttonColor = 'orange';
    swap = allSwaps[allStatuses.indexOf('pending')]
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
    swap = allSwaps[allStatuses.indexOf('incoming')-1] 
    // console.log('Swap that comes out of Statues', swap)
  } 
  // ACTION IS FULL
  else if (props.action == 50){
    lastCol = 
      <Text style={{alignSelf:'center', fontSize:16, fontWeight:'bold'}}>
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
    swap=undefined
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
        navigation.push('Verify Ticket',{
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
    // CHECKING IF ITS MY BUYIN
    if( props.buyin.user_id !== store.myProfile){
      // SWAPPING WITH ACTION LEFT
      if( props.action.actions !== 50 ){
        console.log('doesnt equal 50?', props.action)
        console.log('Path going in', path)
        // console.log('Swap going in', swap.status, swap.percentage)

        if (path !== 'inactive') {
          navigation.push('Swap Offer',{
            status: path,
            buyin: props.buyin,
            tournament: props.tournament,
            buyinSince: props.buyinSince,
            swap: swap
          })
        } else {
          console.log('this inactive')
          navigation.push('Swap Offer',{
            status: 'inactive',
            buyin: props.buyin,
            tournament: props.tournament,
            buyinSince: props.buyinSince,
            swap: swap
          })
        }
        
      }
      // SWAPPING WITH NO ACTION LEFT
      else{
        if( path == 'pending' || path == 'counter_incoming' ){
          navigation.push('Swap Offer',{
            status: path,
            buyin: props.buyin,
            tournament: props.tournament,
            buyinSince: props.buyinSince,
            swap: swap
          })
        }else{
          console.log('You do not have sufficient action to swap')
          Toast.show(
            {text:'Insufficient action in this event to create swap', 
            duration:3000, position:'bottom'})
        }
      }
    }
    // CHANGING BUYIN IF ITS MINE
    else {
      navigation.push('Swap Offer',{
        status: path,
        buyin: props.buyin,
        tournament: props.tournament,
        buyinSince: props.buyinSince,
        swap: swap
      })
    }
  }
      
  const handler = throttle(preliminary, 2000, { leading: true, trailing: false });

  return(
    <Col style={{ justifyContent:'center', marginLeft:10, textAlign:'center'}}>
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