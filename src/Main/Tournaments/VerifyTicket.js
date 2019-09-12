import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container, Button, H2, Text, Content} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import _Header from "../../View-Components/header";
import '../../Images/placeholder.jpg'

export default class VerifyTicket extends Component {
  constructor(props){
    super(props);
    this.state={
      image: require('../../Images/placeholder.jpg')
    }
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
        <Content contentContainerStyle={{
            alignItems:'center', justifyContent:'center' }}>
          
          {/* IMAGE HOLDER */}
          <Image 
            source={this.state.image}
            style={{height:300, width:300, marginTop:50}}/>
          
          {/* INSTRUCTION TEXT */}
          <Text 
          style={{width:250, fontSize:24, textAlign:'center', marginTop:50}}>
            Upload a photo of your tournament ticket.
          </Text>

          {/* UPLOAD BUTTON */}
          <Button large
            style={{marginVertical:20}} onPress={() => this.ChoosePhoto()}>
            <Text style={{fontWeight: 600}}>UPLOAD</Text>
          </Button>
          
        </Content>
      </Container>
    )
  }
}