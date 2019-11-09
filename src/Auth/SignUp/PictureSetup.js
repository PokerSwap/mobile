import React, {useState} from 'react';
import { Image } from 'react-native';
import { Button, Card, CardItem, Text } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import '../../Images/placeholder.jpg';

export default  PictureSetup = (props) => {

  const [ image, setImage ] = useState(props.picture)
  
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
        setImage(source);
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


    let x;

    if(props.picture){
      x=true
    }else{
      x=false
    }

    return(
      <Card transparent>

        {/* IMAGE PREVIEW */}
        <CardItem header>
          <Image 
            source={{uri:props.picture}}
            style={{height:300, width:300, marginTop:50}}
          />
        </CardItem>

        {/* PICTURE INSTRUCTIONS */}
        <CardItem body>
          <Text>Choose a profile picture of yourself to upload.</Text>
        </CardItem>
         
        {/* UPLOAD BUTTON */}
        <CardItem footer style={{justifyContent:"center"}}>
          <Button large onPress={() => choosePhoto()}>
            <Text> UPLOAD </Text>
          </Button>
        </CardItem>

        {/* NAVIGATION BUTTONS */}
        <CardItem footer style={{justifyContent:"center"}}>

          {/* PREVUIOS BUTTON */}
          <Button large onPress={() => props.prev()}>
            <Text> Previous </Text>
          </Button>

          {/* NEXT BUTTON */}
          <Button large  onPress={() => props.next()}>
            <Text> Next </Text>
          </Button>

        </CardItem>

      </Card>
    )
  }
