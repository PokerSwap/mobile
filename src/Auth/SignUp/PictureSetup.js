import React, {Component} from 'react';
import { Image } from 'react-native';
import { Button, Card, CardItem, Text } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import '../../Images/placeholder.jpg';

export default class PictureSetup extends Component {
  constructor(props){
    super(props);
    this.state={
      image: require('../../Images/placeholder.jpg')    
    }
  }
  
  choosePhoto = () => {
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

  // launchCamera = () => {
    
  //   let options = {
  //     title: 'Submit Picture',
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };

  //   ImagePicker.launchCamera(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       const source = { uri: response.uri };
  //       this.setState({image: source});
  //     }
  //   });

  // }

  render(){
    return(
      <Card transparent>

        {/* IMAGE PREVIEW AND UPLOADER */}
        <CardItem header>
          <Image 
            source={this.state.image}
            style={{height:300, width:300, marginTop:50}}
          />
        </CardItem>

        {/* PICTURE INSTRUCTIONS */}
        <CardItem body>
          <Text>Choose a profile picture of yourself to upload.</Text>
        </CardItem>
         
        {/* UPLOAD BUTTON */}
        <CardItem footer style={{justifyContent:"center"}}>
          <Button large onPress={() => this.choosePhoto()}>
            <Text> UPLOAD </Text>
          </Button>
        </CardItem>

        {/* GO BACK BUTTON */}
        <CardItem footer style={{justifyContent:"center"}}>
          <Button large onPress={() => this.props.prev()}>
            <Text> Go Back </Text>
          </Button>
          <Button large onPress={() => this.props.next()}>
            <Text> Next </Text>
          </Button>
        </CardItem>

      </Card>
    )
  }
}