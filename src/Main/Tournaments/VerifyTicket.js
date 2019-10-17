import React, {Component} from 'react';
import {Image, TextInput} from 'react-native';
import {Container, Button, Text, Content, Card, CardItem} from 'native-base';

import ImagePicker from 'react-native-image-picker';
import { Row, Col } from 'react-native-easy-grid';

import { Context } from '../../Store/appContext';
import _Header from "../../View-Components/header";
import '../../Images/placeholder.jpg';

export default class VerifyTicket extends Component {
  constructor(props){
    super(props);
    this.state={
      image: require('../../Images/placeholder.jpg'),
      table: '',
      seat: '',
      chips: ''
    }
  }

  BuyInStart = async(x) => {    
    x.buy_in.add(
      this.props.flight_id,
      this.state.table,
      this.state.seat,
      this.state.chips,
      this.props.navigation
    )
  }

  ChoosePhoto = () => {
    const options = {
      title: 'Submit Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({image: source});
      }
    });
  };

  render(){
    return(
      <Container>
        <Content contentContainerStyle={{ alignItems:'center', justifyContent:'center' }}>
          
          <Card>          
            
            {/* IMAGE UPLOADED  */}
            <CardItem style={{justifyContent:'center'}}>
              <Image 
              source={this.state.image}
              style={{height:200, width:200, marginTop:10}}
              />
            </CardItem>

            {/* INSTRUCTION TEXT  */}
            <CardItem>
              <Text  style={{width:300, fontSize:24, textAlign:'center', marginTop:10}}>
                Upload a photo of your tournament buyin ticket.
              </Text>
            </CardItem>

            {/* UPLOAD BUTTON  */}
            <CardItem style={{justifyContent:'center'}}>
              <Button large style={{marginVertical:10}} onPress={() => this.ChoosePhoto()}>
                <Text style={{fontWeight: '600'}}>UPLOAD</Text>
              </Button>
            </CardItem>

            
            {/* TABLE INPUT */}
            <CardItem style={{justifyContent:'center'}}>
              <Text>Table: </Text>
              <TextInput 
                placeholder="Enter Table Number"
                placeholderTextColor='gray'
                keyboardType="number-pad"
                blurOnSubmit={false}
                returnKeyType="next"
                autoCapitalize='none'
                autoCorrect={false} 
                onSubmitEditing={() => { this.txtSeat.focus(); }}
                value={this.state.table}    
                onChangeText={table => this.setState({ table })}
              />
            </CardItem>
            
            {/* SEAT INPUT */}
            <CardItem style={{justifyContent:'center'}}>
              <Text>Seat: </Text>
              <TextInput 
                placeholder="Enter Seat Number"
                placeholderTextColor='gray'
                keyboardType="number-pad"
                blurOnSubmit={false}
                returnKeyType="next"
                autoCapitalize='none'
                autoCorrect={false} 
                ref={(input) => { this.txtSeat = input; }} 
                onSubmitEditing={() => { this.txtChips.focus(); }}
                value={this.state.seat}    
                onChangeText={seat => this.setState({ seat })}
              />
            </CardItem>
            
            {/* CHIPS INPUT */}
            <CardItem style={{justifyContent:'center'}}>
              <Text>Chips: </Text>
              <TextInput 
                placeholder="Enter Number of Chips"
                placeholderTextColor='gray'
                keyboardType="number-pad"
                returnKeyType="go"
                autoCapitalize='none'
                autoCorrect={false} 
                ref={(input) => { this.txtChips = input; }} 
                onSubmitEditing={() => { this.txtPassword.focus(); }}
                value={this.state.chips}    
                onChangeText={chips => this.setState({ chips })}
              />
            </CardItem>
            
            {/* SUBMIT BUTTON */}
            <CardItem style={{justifyContent:'center'}}>
              <Context.Consumer>
                {({ store, actions }) => {
                  return(
                    <Button onPress={() => this.BuyInStart(actions)}>
                      <Text style={{fontWeight:'600'}}> SUBMIT </Text>
                    </Button>
                  )
                }}
              </Context.Consumer>
            </CardItem>
          
          </Card>

        </Content>
      </Container>
    )
  }
}