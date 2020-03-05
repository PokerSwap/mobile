import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'

import { Context } from '../../../Store/appContext'

export default SwapList = (props) => {

  const {store, actions} = useContext(Context)
  var buttonColor, path, lastCol;

  var swapRows = props.allSwaps.map((swap, index) => {

    if (swap.status == 'agreed'){
      lastCol = 
        <Text style={{
          fontWeight:'600', color:'white',
          fontSize:16, top:8}}> 
          {swap.percentage}% 
        </Text>;
      buttonColor= 'green';
    } 
    // PENDING SWAP VIEW
    else if(swap.status == 'pending') {
      lastCol =  
        <Text style={{fontWeight:'600', fontSize:16, 
          color:'white', top:8}}> 
          {swap.percentage}% 
        </Text>;
      buttonColor= 'orange';
    } 
    // INCOMING SWAP VIEW
    else if (swap.status == 'incoming'){
      lastCol = 
        <Icon type="FontAwesome5" name="exclamation"
          style={{alignSelf:'center', fontSize:18, 
          color:'white' , top:8}}/>;
      buttonColor= 'green';
    } 
    // COUNTER-INCOMING SWAP VIEW
    else if (swap.status == 'counter_incoming'){
      lastCol = 
        <Icon type="FontAwesome5" name="exclamation"
          style={{alignSelf:'center', fontSize:18, 
          color:'white' , top:8}}/>;
      buttonColor= 'orange';
    } 
    // CANCELED SWAP OFFER VIEW
    else if (swap.status == 'canceled'){
      lastCol = 
      <Icon type="FontAwesome5" name="times"
        style={{alignSelf:'center', fontSize:24, 
        color:'white', top:8}} />;
      buttonColor= 'grey';
    }
    // REJECTED SWAP OFFER VIEW
    else if (swap.status == 'rejected'){
      lastCol = 
      <Icon type="FontAwesome5" name="times" 
        style={{ alignSelf:'center', fontSize:24, 
        color:'white', top:8}} />;
      buttonColor= 'red';
    }
    // SWAP OFFER VIEW
    else {
      lastCol = 
        <Icon type="FontAwesome5" name="handshake"
          style={{alignSelf:'center', fontSize:24}} />;
      buttonColor= 'rgb(56,68,165)';
    } 

    var swapTime = swap.updated_at
    var day_name = swapTime.substring(0,3)
    var startMonth = swapTime.substring(8,11)
    var startDay = swapTime.substring(5,7)
    var startTime = swapTime.substring(16,22)

    var startHour = parseInt(swapTime.substring(16,19))
    var startM 
    if (startHour/12 >= 1){
      startM = ' P.M.', startHour%=12
    }  else{
      startM = ' A.M.'
    }
    
    var startDate =  day_name + '. ' + startMonth + '. ' + startDay
    var startTime = startHour + ':' + swapTime.substring(20,22) + startM
    var labelTime = startDate + ', ' +   startTime
    
    const enterSwapOffer = async() => {
      var answer = await actions.tournament.getAction()
      props.navigation.push('SwapOffer',{
        swap:swap,
        status: swap.status,
        buyin: props.buyin,
        updated_at: labelTime,
        tournament: props.tournament,
      });
    }

    
    return(
      <Row key={index} style={{
        height:60, width:'100%', alignItems:'center', 
        borderTopWidth:1, borderTopColor:'#d3d3d3'}}>
        
        <Col style={{ width:'20%' }}>
          <Text style={{ textTransform:'capitalize' }}>
            {swap.status}
          </Text>
        </Col>

        <Col>
          <Text>{labelTime}</Text>
        </Col>

        <Col style={{ width:'20%' }}>
          <TouchableOpacity onPress={() => enterSwapOffer()}>
            <View style={{backgroundColor:buttonColor, 
              height:40,alignItems:'center'}}>
              {lastCol}  
            </View>
          </TouchableOpacity>
        </Col>

      </Row>
    )
  })

  return(
    <Grid>
      {swapRows}
    </Grid>
  )
}