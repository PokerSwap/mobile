import React, {useState} from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import {Container, Button, Text, Content, Card, CardItem } from 'native-base';
import { Row, Col } from 'react-native-easy-grid'

import TourneyHeader from '../Tournaments/Components/TourneyHeader'
import { Context } from '../../Store/appContext';

export default SwapOffer = (props) => {

  const [percentage, setPercentage] =  useState(1);
  const [table, setTable] = useState(props.navigation.getParam('table', 'default value'));
  const [seat, setSeat] = useState(props.navigation.getParam('seat', 'default value'));
  const [chips, setChips] = useState(props.navigation.getParam('chips', 'default value'));

  buyinEdit = async(v) => {
    var answerV = await v.buy_in.edit(
      table,
      seat,
      chips,
      flightID
    )
  }

  swapAdd = async(w) => {
    var answer1 = await w.swap.add(
      tournament_id, 
      user_id, 
      percentage,
      props.navigation
    )
  }

  swapUpdate = async(x) => {
    var answer2 = await w.swap.update(
      tournament_id, 
      user_id, 
      percentage,
      props.navigation
    )
  }

  // ADDING PERCENT TO SWAP - NO MORE THAN 50%
  add = () => {
    if (percentage < 50){
    setPercentage(percentage + 1)
  }else{
    setPercentage(50)
    }
  }

  // SUBTRACTING PERCENT FROM SWAP - NO MORE THAN 50%
  subtract = () => {
    if (percentage > 1){
      setPercentage(percentage - 1)
    }else{
      setPercentage(1)
    }
  }


    const { navigation } = props;
    let mode = navigation.getParam('mode', 'NO-ID');
    let first_name = navigation.getParam('first_name', 'default value');
    let last_name = navigation.getParam('last_name', 'default value');
    let user_id = navigation.getParam('user_id', 'default value');
    let tournament_name = navigation.getParam('tournament_name', 'default value');
    let tournament_id = navigation.getParam('tournament_id', 'default value');
    let address = navigation.getParam('tournament_id', 'default value');
    let start_at = navigation.getParam('start_at', 'default value');
    let end_at = navigation.getParam('end_at', 'default value');

    // Each view contains five parts
    let partOne, partTwo, partThree, partFour, partFive;

    // YOUR SWAP VIEW
    if (mode=='edit'){ 
      partOne = 
        <Row style={{justifyContent:'center'}}>
          
        </Row>

      partTwo = 
        <Row style={{justifyContent:'center'}}>
          <CardItem style={{justifyContent:'center'}}>
            <Text style={{fontSize:24}}>Table: </Text>
            <TextInput 
              placeholder={table}
              style={{fontSize:24}}

              placeholderTextColor='gray'
              keyboardType="number-pad"
              blurOnSubmit={false}
              returnKeyType="next"
              autoCapitalize='none'
              autoCorrect={false} 
              onSubmitEditing={() => { txtSeat.focus(); }}
              defaultValue={table}    
              onChangeText={table => setTable( table )}
            />
          </CardItem>
        </Row>

      partThree = 
        <Row style={{justifyContent:'center'}}>
          <Text style={{fontSize:24}}>Seat: </Text>
          <TextInput 
            placeholder={seat}
            style={{fontSize:24}}

            placeholderTextColor='gray'
            keyboardType="number-pad"
            blurOnSubmit={false}
            returnKeyType="next"
            autoCapitalize='none'
            autoCorrect={false} 
            ref={(input) => { txtSeat = input; }} 
            onSubmitEditing={() => { txtChips.focus(); }}
            value={seat}    
            onChangeText={seat => setSeat(seat)}
          />
        </Row>

      partFour = 
        <Row style={{justifyContent:'center'}}>
            <Text style={{fontSize:24}}>Chips: </Text>
            <TextInput 
              placeholder={this.state.chips}
              style={{fontSize:24}}
              placeholderTextColor='gray'
              keyboardType="number-pad"
              returnKeyType="go"
              autoCapitalize='none'
              autoCorrect={false} 
              ref={(input) => { txtChips = input; }} 
              onSubmitEditing={() => { txtPassword.focus(); }}
              value={this.state.chips}    
              onChangeText={chips => setChips(chips)}
            />
        </Row>

      partFive = 
        <Context.Consumer>
          {({ store, actions }) => {
            return(
              <Button onPress={()=> buyinEdit(actions)}>
                <Text> Update </Text>
              </Button>
            )
          }}
        </Context.Consumer>
        
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
          <Row style={{justifyContent:'center'}}><Text> {percent}% </Text></Row>
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
        <Text style={{marginLeft:5,fontSize:24,}}> {first_name} {last_name} </Text>

      partThree = 
        <Text style={{marginRight:5,fontSize:24}}>Swap Offer:</Text>

      // PERCENTAGE AND BUTTONS
      partFour = 
        <Row style={{justifyContent:'center', marginBottom:20, alignItems:'center'}}>
          
          {/* SUBTRACT BUTTON */}
          <TouchableOpacity onPress={()=> this.subtract()}>
            <View style={{width:50, height:50, borderRadius: 5, backgroundColor:'blue'}} onPress={()=>this.subtract()}>
              <Text style={{fontSize:36, color:'white', textAlign:'center'}}>-</Text>
            </View>
          </TouchableOpacity>
          
          {/* SWAP PERCENTAGE */}
          <Text style={{fontSize:36, marginHorizontal:10}}> {this.state.percentage}% </Text>
          
          {/* ADD BUTTON */}
          <TouchableOpacity onPress={()=> this.add()}>
            <View style={{width:50, height:50, borderRadius: 5, backgroundColor:'blue'}} onPress={()=>this.add()}>
              <Text style={{fontSize:36, color:'white', textAlign:'center'}}>+</Text>
            </View>
          </TouchableOpacity>
        </Row>

      // OFFER SWAP BUTTON
      partFive = 
        <Context.Consumer>
          {({ store, actions }) => {
            return(
              <Button large 
                onPress={async() => {
                  actions.swap.add(tournament_id, user_id, this.state.percentage),
                  actions.profile.get()
                }}>
                <Text> Offer Swap </Text>
              </Button>
            )
          }}   
        </Context.Consumer>
    }

  return(
    <Container>
      <Content>
        
        {/* HEADER */}
        <Card transparent style={{justifyContent:'center'}}>
          <TourneyHeader 
            id={tournament_id}
            name={tournament_name}
            address={address}
            start_at={start_at}
            end_at={end_at}

          />
          <Text style={{fontSize:24, justifyContent:'center', textAlign:'center'}}>{first_name} {last_name}</Text>
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
