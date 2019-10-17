import React, {Component} from 'react';
import { View } from 'react-native';
import {  Text, ListItem, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import BuyInAttribute from './BuyInAttribute'

export default class SwapCard extends Component {
    constructor(props){
      super(props);
      this.state={  
        
      }
    }

    render(){

      let path, lastCol, buttonColor;
      
      // COMPLETED SWAP VIEW
      // if (this.props.offer == 'agreed'){
      //   lastCol = 
      //     <Text style={{fontWeight:'600', color:'white'}}>
      //       {this.props.apercent}%
      //     </Text>;
      //   buttonColor= 'green';
      //   path = "agreed"
      // } 
      // // PENDING SWAP VIEW
      // else if(this.props.offer == 'pending') {
      //   lastCol =  
      //     <Icon  
      //       style={{alignSelf:'center', fontSize:30}} 
      //       type="Ionicons" name="md-time" />;
      //   path = "pending";
      //   buttonColor= 'orange';
      // } 
      // // YOUR SWAP VIEW
      // else if (this.props.name == 'You'){
      //   lastCol = <Text>Edit</Text>;
      //   path = "edit";
      //   buttonColor= 'grey';
      // } 
      // // SWAP OFFER VIEW
      // else if (this.props.offer == 'inactive'){
      //   lastCol = 
      //     <Icon  
      //       style={{alignSelf:'center', fontSize:24}} 
      //       type="FontAwesome5" name="handshake" />;
      //   path = "inactive";
      //   buttonColor= 'blue';
      // } 
      // // INCOMING SWAP VIEW
      // else if (this.props.offer == 'recieved'){
      //   lastCol =
      //     <Icon  
      //       style={{alignSelf:'center', fontSize:24}} 
      //       type="FontAwesome5" name="exclamation" />;
      //   path = 'recieved';
      //   buttonColor= 'red';
      // }

      return(
        <ListItem noIndent>
          <Grid style={{marginVertical:10}}>
            <Col style={{width:'70%'}}>

              {/* PROFILE NAME */}
              <Row style={{justifyContent:'center'}}>
                <Text style={{fontSize:24}}> {this.props.first_name} {this.props.last_name} </Text>
                {/* <Text> {this.props.flight} </Text> */}
              </Row>

              {/* DETAILS */}
              <Row style={{marginTop:10}}>
                <Text>{this.props.tournament}</Text>
                {/* <BuyInAttribute top=' Still In? ' bottom={this.props.stillIn}/> */}
                {/* <BuyInAttribute top=' Table ' bottom={this.props.table}/>
                <BuyInAttribute top=' Seat ' bottom={this.props.seat}/>
                <BuyInAttribute top=' Chips ' bottom={this.props.chips}/> */}
              </Row>
            </Col>

            {/* BUTTON WITH VARIABLE PATHS */}
            <Col style={{justifyContent:'center', marginLeft:20}}>
              <View 
                onPress={()=> this.props.navigation.navigate('SwapOffer', { mode: path })}
                style={{backgroundColor:'limegreen', borderRadius:5, width:70, height:70, justifyContent:'center'}}
              >
                <Text style={{color:'white', fontSize:20}}> {this.props.percentage}% </Text>
              </View>
            </Col>

          </Grid>
        </ListItem>
      )
    }
}