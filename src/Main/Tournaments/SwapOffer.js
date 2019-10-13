import React, {Component} from 'react';
import {Container, Button, Text, Content, Card, CardItem, Item, Input} from 'native-base';
import TourneyHeader from './Components/TourneyHeader'
import { Row, Col } from 'react-native-easy-grid'

export default class SwapOffer extends Component {
    constructor(props){
      super(props);
      this.state={}
    }
    
    // INACTIVE/INCOMING FUNCTION
    // ADDING PERCENT TO SWAP - NO MORE THAN 50%
    add = () => {
      if (this.state.percent < 50)
      this.setState({percent: this.state.percent + 1})
    }

    // INACTIVE/INCOMING FUNCTION
    // SUBTRACTING PERCENT FROM SWAP - NO MORE THAN 50%
    subtract = () => {
      if (this.state.percent > 1)
      this.setState({percent: this.state.percent - 1})
    }
   
    render(){
      const { navigation } = this.props;
      let mode = navigation.getParam('mode', 'NO-ID');
      
      // Each view contains five parts
      let partOne, partTwo, partThree, partFour, partFive;

      // YOUR SWAP VIEW
      if (mode=='edit'){ 
        partOne = 
          <Row style={{justifyContent:'center'}}>
            <Text> Still In? </Text>
            <Item style={{width:100}} rounded><Input placeholder='Yes'/></Item>
          </Row>

        partTwo = 
          <Row style={{justifyContent:'center'}}>
            <Text> Table </Text>
            <Item style={{width:100}} rounded><Input placeholder='7'/></Item>
          </Row>

        partThree = 
          <Row style={{justifyContent:'center'}}>
            <Text> Seat: </Text>
            <Item style={{width:100}} rounded><Input  placeholder='5'/></Item>
          </Row>

        partFour = 
          <Row style={{justifyContent:'center'}}>
            <Text> Chips: </Text>
            <Item style={{width:100}} rounded><Input placeholder='10,000'/></Item>
          </Row>

        partFive = <Button light><Text> Update </Text></Button>
      }    

      // INCOMING SWAP VIEW
      else if (mode=='recieved'){

        partOne = 
          <Col>
            <Row style={{justifyContent:'center'}}><Text > Swap With: </Text></Row>
            <Row style={{justifyContent:'center'}}><Text> Peter Shiao </Text></Row>
          </Col>

        partTwo = 
          <Col>
            <Row style={{justifyContent:'center'}}><Text> Swap Offer: </Text></Row>
            <Row style={{justifyContent:'center'}}><Text> {this.state.percent}% </Text></Row>
          </Col>
        partThree = <Button success><Text> Accept Offer </Text></Button>

        partFour = <Button warning><Text> Counter Offer </Text></Button>

        partFive = <Button danger><Text> No Thanks </Text></Button>

      } 

      // PENDING SWAP VIEW
      else if (mode=='pending'){

        partOne = <Text> Still In?</Text>

        partTwo = <Text> Still In?</Text>

        partThree = <Text> Still In?</Text>

        partFour = <Text> Still In?</Text>

        partFive = <Text> Still In?</Text>


      } 

      // AGREED SWAP VIEW
      else if (mode=='agreed'){

        partOne = <Text> Still In?</Text>

        partTwo = <Text> Still In?</Text>

        partThree = <Text> Still In?</Text>

        partFour = <Text> Still In?</Text>

        partFive = <Text> Still In?</Text>

      } 

      // INACTIVE SWAP VIEW
      else if (mode=='inactive') {

        partOne = 
          <Text style={{marginRight:5,fontSize:24}}>Swap With:</Text>    

        partTwo = 
          <Text style={{marginLeft:5,fontSize:24}}>Some Guy</Text>

        partThree = 
          <Text style={{marginRight:5,fontSize:24}}>Swap Offer:</Text>

        partFour = 
          <Row style={{justifyContent:'center', marginBottom:20}}>
            <Button onPress={()=>this.subtract()}><Text style={{fontSize:24}}> - </Text></Button>
            <Text style={{fontSize:24, marginHorizontal:10}}> {this.state.percent}% </Text>
            <Button onPress={()=>this.add()}><Text style={{fontSize:24}}> + </Text></Button>
          </Row>

        partFive = 
          <Button large>
            <Text> Offer Swap </Text>
          </Button>

      }
  
      return(
        <Container>
          <Content>
            
            {/* HEADER */}
            <Card transparent>
            <TourneyHeader 
                title='#SHRPO' daytime='Thu 11:00AM' 
                date='Sep 1, 2019' 
                address='Seminole Hard Rock  Hollywood, FL'
              />
            </Card>

            {/* BODY */}
            <Card style={{ justifyContent:'center'}}>
              <CardItem style={{justifyContent:'center'}}>{partOne}</CardItem>
              <CardItem style={{justifyContent:'center'}}>{partTwo}</CardItem>
              <CardItem style={{justifyContent:'center'}}>{partThree}</CardItem>
              <CardItem style={{justifyContent:'center'}}>{partFour}</CardItem>
              <CardItem style={{justifyContent:'center'}}>{partFive}</CardItem>
            </Card>    

          </Content>
        </Container>
      )
    }
}