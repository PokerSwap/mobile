import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../../Store/appContext'

import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'native-base';
import { Col } from 'react-native-easy-grid';
import { useNavigation } from '@react-navigation/native'


export default SwapRow = (props) => {
  const { store, actions } = useContext(Context)
  const [swapTime, setSwapTime] = useState(null)
  const [refreshing, setRefreshing] = useState(true)

  const navigation = useNavigation()

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  var buttonColor, path, lastCol
  var swap = props.swap
  
  const longedTime = async() => {
    var c = await actions.time.convertLong(swap.updated_at) 
    setSwapTime(c)
    setRefreshing(false)
  }

  useEffect(() => {
    longedTime()
    return () => {
      // cleanup
    }
  }, [refreshing])

  if (swap.status == 'agreed'){
    lastCol = 
      <Text style={styles.agreed}> 
        {swap.percentage}% 
      </Text>;
    buttonColor= 'green';
  } 
  // PENDING SWAP VIEW
  else if(swap.status == 'pending') {
    lastCol =  
      <Text style={styles.pending}> 
        {swap.percentage}% 
      </Text>;
    buttonColor= 'orange';
  } 
  // INCOMING SWAP VIEW
  else if (swap.status == 'incoming'){
    lastCol = 
      <Icon type="FontAwesome5" name="exclamation"
        style={styles.incoming}/>;
    buttonColor= 'green';
  } 
  // COUNTER-INCOMING SWAP VIEW
  else if (swap.status == 'counter_incoming'){
    lastCol = 
      <Icon type="FontAwesome5" name="exclamation"
        style={styles.counter_incoming}/>;
    buttonColor= 'orange';
  } 
  // CANCELED SWAP OFFER VIEW
  else if (swap.status == 'canceled'){
    lastCol = 
    <Icon type="FontAwesome5" name="times"
      style={styles.canceled} />;
    buttonColor= 'grey';
  }
  // REJECTED SWAP OFFER VIEW
  else if (swap.status == 'rejected'){
    lastCol = 
    <Icon type="FontAwesome5" name="times" 
      style={styles.rejected} />;
    buttonColor= 'red';
  }
  // SWAP OFFER VIEW
  else {
    lastCol = 
      <Icon type="FontAwesome5" name="handshake"
        style={{alignSelf:'center', fontSize:24}} />;
    buttonColor= 'rgb(56,68,165)';
  } 

  const enterSwapOffer = async() => {
    navigation.push('Swap Offer',{
      status: swap.status,
      buyin: props.buyin,
      tournament: props.tournament,
      swap: swap,
      buyinSince: props.buyinSince,
      swapSince: swapTime
    });
  }

  return(
    <View style={styles.rowContainer}>
      {/* SWAP STATUS */}
      <Col style={{ width:'30%' }}>
        <Text style={{ textTransform:'capitalize', textAlign:'center' }}>
          {props.swap.status !== 'counter_incoming' ?
            props.swap.status : ' Counter\nIncoming'}
        </Text>
      </Col>
      {/* SWAP TIME */}
      <Col style={{marginLeft:-25}}>
        {swapTime ?
          <Text style={{fontSize:14}}>
            {swapTime.substring(0,12) + '  ' + swapTime.substring(19,30)}
          </Text>
          : null}
      </Col>
      {/* SWAP BUTTON */}
      <Col style={{ width:'20%' }}>
        <TouchableOpacity onPress={() => enterSwapOffer()}>
          <View style={{backgroundColor:buttonColor, height:40,alignItems:'center'} }>
            {lastCol}  
          </View>
        </TouchableOpacity>
      </Col>
    </View>
  )
}

const styles = {
  
  rowContainer:{
    height:60, width:'100%', alignItems:'center', flexDirection:'row',
    borderTopWidth:1, borderTopColor:'#d3d3d3'},
    
  agreed:{
    fontWeight:'600',  fontSize:16, color:'white', top:8},
  pending:{
    fontWeight:'600', fontSize:16, color:'white', top:8},
  counter_incoming:{
    alignSelf:'center', fontSize:18, color:'white' , top:8},
  incoming:{
    alignSelf:'center', fontSize:18, color:'white' , top:8},
  rejected:{ 
    alignSelf:'center', fontSize:24, color:'white', top:8},
  canceled:{
    alignSelf:'center', fontSize:24, color:'white', top:8},
}