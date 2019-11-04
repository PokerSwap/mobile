import React, {Component} from 'react';
import {  Text, ListItem, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import BuyInAttribute from './BuyInAttribute'

export default BuyIn = (props) => {

  let path, lastCol, buttonColor;
  
  // COMPLETED SWAP VIEW
  if (props.offer == 'agreed'){
    lastCol = 
      <Text style={{fontWeight:'600', color:'white'}}>
        {props.percentage}%
      </Text>;
    buttonColor= 'green';
    path = "agreed"
  } 
  // PENDING SWAP VIEW
  else if(props.offer == 'pending') {
    lastCol =  
      <Icon  
        style={{alignSelf:'center', fontSize:30}} 
        type="Ionicons" name="md-time" />;
    path = "pending";
    buttonColor= 'orange';
  } 
  // YOUR SWAP VIEW
  else if (props.first_name == 'Gabriel'){
    lastCol = <Text>Edit</Text>;
    path = "edit";
    buttonColor= 'grey';
  } 
  // SWAP OFFER VIEW
  else if (props.first_name != 'Gabriel'){
    lastCol = 
      <Icon  
        style={{alignSelf:'center', fontSize:24}} 
        type="FontAwesome5" name="handshake" />;
    path = "inactive";
    buttonColor= 'rgb(56,68,165)';
  } 
  // INCOMING SWAP VIEW
  else if (props.offer == 'recieved'){
    lastCol =
      <Icon  
        style={{alignSelf:'center', fontSize:24}} 
        type="FontAwesome5" name="exclamation" />;
    path = 'recieved';
    buttonColor= 'red';
  }
  

  const { navigation } = props;

  const enterSwapOffer = () => {
    navigation.push(props.navigation.push('SwapOffer',{
      mode: path,
      user_id: props.user_id,
      first_name: props.first_name,
      last_name: props.last_name,
      tournament_id:props.tournament_id,
      tournament_name: props.tournament_name,
      table: props.table,
      seat: props.seat,
      chips: props.chips
    }));
  }

  return(
    <ListItem noIndent>
      <Grid style={{marginVertical:10}}>
        <Col style={{width:'70%'}}>

          {/* PROFILE NAME */}
          <Row style={{justifyContent:'center'}}>
            <Text style={{fontSize:24}}> {props.first_name} {props.last_name} </Text>
          </Row>

          {/* DETAILS */}
          <Row style={{marginTop:10}}>
            {/* <BuyInAttribute top=' Still In? ' bottom={props.stillIn}/> */}
            <BuyInAttribute top=' Table ' bottom={props.table}/>
            <BuyInAttribute top=' Seat ' bottom={props.seat}/>
            <BuyInAttribute top=' Chips ' bottom={props.chips}/>
          </Row>
        </Col>


        {/* BUTTON WITH VARIABLE PATHS */}
        <Col style={{justifyContent:'center', marginLeft:20}}>
          <Button 
            onPress={()=> enterSwapOffer()}
            style={{backgroundColor:buttonColor, width:70, height:70, justifyContent:'center'}}>
            {lastCol}
          </Button>
        </Col>

      </Grid>
    </ListItem>
  )
}
