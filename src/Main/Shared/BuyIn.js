import React, {useContext} from 'react';
import {  Text, ListItem, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import moment from 'moment'

import { Context } from '../../Store/appContext'

BuyInAttribute = (props) => {

  return(
    <Col>

      <Row style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center', color:props.txt}}> 
          {props.top} 
        </Text>
      </Row>

      <Row style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center', color:props.txt}}> 
          {props.bottom} 
        </Text>
      </Row>

    </Col> 
  )
}

export default BuyIn = (props) => {

  const { store, actions } = useContext(Context)
  const { navigation } = props;
  let path, lastCol, buttonColor;

  // YOUR SWAP VIEW
  if (props.user_id == store.myProfile.id){
    lastCol = 
      <Icon 
        style={{alignSelf:'center', fontSize:36}}
        type="Entypo" name="edit" />;
    path = "edit";
    buttonColor= 'grey';
  } 
  // AGREED SWAP VIEW
  else if (props.status == 'agreed'){
    lastCol = 
      <Text 
        style={{fontWeight:'600', color:'white'}}> 
        {props.percentage}% 
      </Text>;
    buttonColor= 'green';
    path = 'agreed'
  } 
  // PENDING SWAP VIEW
  else if(props.status == 'pending') {
    lastCol =  
      <Icon 
        style={{alignSelf:'center', fontSize:36}} 
        type="Ionicons" name="md-time" />;
    path = "pending";
    buttonColor= 'orange';
  } 
  // INCOMING SWAP VIEW
  else if (props.status == 'incoming'){
    lastCol = 
      <Icon 
        style={{alignSelf:'center', fontSize:24}}
        type="FontAwesome5" name="exclamation" />;
    path = 'incoming';
    buttonColor= 'green';
  } 
  // CANCELED SWAP OFFER VIEW
  else if (props.status == 'canceled'){
    lastCol = 
    <Icon 
      style={{alignSelf:'center', fontSize:36}}
      type="FontAwesome5" name="times" />;
    path = 'canceled';
    buttonColor= 'grey';
  }
  // REJECTED SWAP OFFER VIEW
  else if (props.status == 'rejected'){
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
      <Icon style={{alignSelf:'center', fontSize:24}} type="FontAwesome5" name="handshake" />;
    path = "inactive";
    buttonColor= 'rgb(56,68,165)';
  } 

  const enterSwapOffer = async() => {
    var answer = await actions.tournament.getAction()
    navigation.push('SwapOffer',{
      status: path,
      swap_id: props.swap_id,
      flight_id: props.flight_id,
      user_id: props.user_id,
      user_name: props.user_name,
      updated_at:props.updated_at,

      tournament_id: props.tournament_id,
      tournament_name: props.tournament_name,
      address: props.address,
      city: props.city,
      state: props.state,
      start_at: props.start_at,
      swap_updated_at:props.swap_updated_at,

      buyin_id: props.buyin_id,
      table: props.table,
      seat: props.seat,
      chips: props.chips,
      counter_percentage: props.counter_percentage,
      percentage: props.percentage,
      start_at: props.start_at,
      action: store.action

    });
  }

  const enterProfile = async() => {
    var answer = await actions.profile.view(props.user_id);
    var profile = store.profileView
    console.log('profile:',profile)
    navigation.push('Profile',{
      id: profile.id,
      first_name: profile.first_name,
      nickname: profile.nickname,
      last_name: profile.last_name,
      roi_rating: profile.roi_rating,
      swap_rating: profile.swap_rating,
      total_swaps: profile.total_swaps,
      profile_pic_url: profile.profile_pic_url,
      hendon_url: profile.hendon_url
    });
  }

  var x = moment(props.updated_at).fromNow()
  var y, since
  x.includes('a ')? y = '1' : y = parseInt(x.replace(/[^0-9\.]/g, ''), 10);
  if (x.includes('second')) {
    since = 'Just Now' 
  } else if(x.includes('minute')){
    since = y + 'm' 
  } else if(x.includes('hour')){
    since = y + 'h' 
  } else if(x.includes('day')){
    since = y + 'd' 
  } else if(x.includes('week')){
    since = y + 'w' 
  }else if(x.includes('month')){
    since = y + 'M' 
  }else if(x.includes('year')){
    since = y + 'Y' 
  }
  else{
null
  }
  var bg, txt;
  props.chips != 0 ?
    bg='white' || (txt='black') : bg='red' || (txt='white')
  
  return(
    <ListItem noIndent style={{backgroundColor:bg}}>
      <Grid style={{marginVertical:10}}>
        <Col style={{width:'70%'}}>

          {/* PROFILE NAME */}
          <Row style={{justifyContent:'center'}}>
            <Button transparent onPress={()=> enterProfile()}>
              <Text style={{fontSize:24, textTransform:'capitalize', color:txt}}> {props.user_name} </Text>
            </Button>
          </Row>

          {/* DETAILS */}
          <Row style={{marginTop:10}}>
            <BuyInAttribute top=' Table ' 
              bottom={props.table} txt={txt}/>
            <BuyInAttribute top=' Seat ' 
              bottom={props.seat} txt={txt}/>
            <BuyInAttribute top=' Chips ' 
              bottom={props.chips} txt={txt}/>
          </Row>

        </Col>


        {/* BUTTON WITH VARIABLE PATHS */}
        <Col style={{justifyContent:'center', 
          marginLeft:20, textAlign:'center'}}>
          <Button 
            onPress={()=> enterSwapOffer()}
            style={{
              backgroundColor:buttonColor, width:70, height:70, 
              justifyContent:'center', alignSelf:'center'}}>
            {lastCol}
          </Button>
          <Text style={{
            marginTop:10, color:txt, textAlign:'center', alignSelf:'center'}}>
            {since}
          </Text>
        </Col>

      </Grid>
    </ListItem>
  )
}

const styles ={
  button:{
    button:{},
    container:{},
    text:{}
  }
}
