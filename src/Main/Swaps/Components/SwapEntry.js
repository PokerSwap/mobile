import React, {Component} from 'react';
import {  Text, ListItem, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'

class SwapAttribute extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    return(
      <Col>
        <Row style={{justifyContent:'center'}}>
          <Text style={{textAlign:'center'}}> 
            {this.props.top} 
          </Text>
        </Row>
        <Row style={{justifyContent:'center'}}>
          <Text style={{textAlign:'center'}}> 
            {this.props.bottom} 
          </Text>
        </Row>
      </Col> 
    )
  }
}


export default class SwapEntry extends Component {
    constructor(props){
      super(props);
      this.state={  
        offer: props.offer
      }
    }

    render(){

      let path, lastCol, buttonColor;
      
      // COMPLETED SWAP VIEW
      if (this.props.offer == 'agreed'){
        lastCol = 
          <Text style={{fontWeight:'600', color:'white'}}>
            {this.props.apercent}%
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
      else if (this.props.name == 'You'){
        lastCol = <Text>Edit</Text>;
        path = "edit";
        buttonColor= 'grey';
      } 
      // SWAP OFFER VIEW
      else if (this.props.offer == 'inactive'){
        lastCol = 
          <Icon  
            style={{alignSelf:'center', fontSize:24}} 
            type="FontAwesome5" name="handshake" />;
        path = "inactive";
        buttonColor= 'blue';
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

              {/* PERSON */}
              <Row style={{justifyContent:'center'}}>
                <Text style={{fontSize:24}}> {this.props.name} </Text>
              </Row>

              {/* DETAILS */}
              <Row style={{marginTop:10}}>
                <SwapAttribute top=' Still In? ' bottom={this.props.stillIn}/>
                <SwapAttribute top=' Table ' bottom={this.props.table}/>
                <SwapAttribute top=' Seat ' bottom={this.props.seat}/>
                <SwapAttribute top=' Chips ' bottom={this.props.chips}/>
              </Row>
            </Col>

            {/* BUTTON WITH VARIABLE PATHS */}
            <Col style={{justifyContent:'center', marginLeft:20}}>
              <Button 
                onPress={()=> this.props.navigation.navigate('SwapOffer', {mode:path})}
                style={{backgroundColor:buttonColor, width:70, height:70, justifyContent:'center'}}>
                {lastCol}
              </Button>
            </Col>
          </Grid>
        </ListItem>
      )
    }
}