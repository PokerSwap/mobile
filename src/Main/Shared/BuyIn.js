import React, {Component} from 'react';
import {  Text, ListItem, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import BuyInAttribute from './BuyInAttribute'

import getStore from '../../Store/store'

export default class BuyIn extends Component {
    constructor(props){
      super(props);
      this.state={  
        
      }
    }

    render(){

      const { navigation } = this.props;

      const enterSwap = () => {
        navigation.push(this.props.navigation.push('SwapOffer',{
          mode: path,
          user_id: this.props.user_id,
          first_name: this.props.first_name,
          last_name: this.props.last_name,
          tournament_id:this.props.tournament_id
        }));
      }

      let path, lastCol, buttonColor;
      
      // COMPLETED SWAP VIEW
      if (this.props.offer == 'agreed'){
        lastCol = 
          <Text style={{fontWeight:'600', color:'white'}}>
            {this.props.percentage}%
          </Text>;
        buttonColor= 'green';
        path = "agreed"
      } 
      // PENDING SWAP VIEW
      else if(this.props.offer == 'pending') {
        lastCol =  
          <Icon  
            style={{alignSelf:'center', fontSize:30}} 
            type="Ionicons" name="md-time" />;
        path = "pending";
        buttonColor= 'orange';
      } 
      // YOUR SWAP VIEW
      else if (this.props.first_name == 'Gabriel'){
        lastCol = <Text>Edit</Text>;
        path = "edit";
        buttonColor= 'grey';
      } 
      // SWAP OFFER VIEW
      else if (this.props.first_name != 'Gabriel'){
        lastCol = 
          <Icon  
            style={{alignSelf:'center', fontSize:24}} 
            type="FontAwesome5" name="handshake" />;
        path = "inactive";
        buttonColor= 'rgb(56,68,165)';
      } 
      // INCOMING SWAP VIEW
      else if (this.props.offer == 'recieved'){
        lastCol =
          <Icon  
            style={{alignSelf:'center', fontSize:24}} 
            type="FontAwesome5" name="exclamation" />;
        path = 'recieved';
        buttonColor= 'red';
      }



      return(
        <ListItem noIndent>
          <Grid style={{marginVertical:10}}>
            <Col style={{width:'70%'}}>

              {/* PROFILE NAME */}
              <Row style={{justifyContent:'center'}}>
                <Text style={{fontSize:24}}> {this.props.first_name} {this.props.last_name} </Text>
              </Row>

              {/* DETAILS */}
              <Row style={{marginTop:10}}>
                {/* <BuyInAttribute top=' Still In? ' bottom={this.props.stillIn}/> */}
                <BuyInAttribute top=' Table ' bottom={this.props.table}/>
                <BuyInAttribute top=' Seat ' bottom={this.props.seat}/>
                <BuyInAttribute top=' Chips ' bottom={this.props.chips}/>
              </Row>
            </Col>


            {/* BUTTON WITH VARIABLE PATHS */}
            <Col style={{justifyContent:'center', marginLeft:20}}>
              <Button 
                onPress={()=> enterSwap()}
                style={{backgroundColor:buttonColor, width:70, height:70, justifyContent:'center'}}>
                {lastCol}
              </Button>
            </Col>

          </Grid>
        </ListItem>
      )
    }
}