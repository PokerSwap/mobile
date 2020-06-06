import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'
import moment from 'moment';

import { Context } from '../../../Store/appContext'

export default SwapList = (props) => {

  const {store, actions} = useContext(Context)
  var buttonColor, path, lastCol;


  var swapRows = props.allSwaps.map((swap, index) => {

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

    var swapTime = swap.updated_at
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

    var x = moment(props.buyin.updated_at).fromNow()
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
    
    const enterSwapOffer = async() => {
      props.navigation.push('SwapOffer',{

        status: swap.status,
        buyin: props.buyin,
        tournament: props.tournament,
        swapID: swap.id,
        buyinSince: since,
        swapSince: labelTime
      });
    }

    
    return(
      <Row key={index} style={styles.rowContainer}>
        
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
            <View style={{backgroundColor:buttonColor, height:40,alignItems:'center'} }>
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

const styles = {
  
  rowContainer:{
    height:60, width:'100%', alignItems:'center', 
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