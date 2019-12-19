import React, {useState} from 'react';
import { Image } from 'react-native';
import { Button, Card, CardItem, Text, Icon } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import '../../Images/placeholder.jpg';

export default  PictureSetup = (props) => {

  const [ image, setImage ] = useState(props.picture)
  
  var choosePhoto = () => {
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
        // props.onChangePicture(response.uri)
        // setImage( response.uri);
        // console.log('image',image)

        if (!response.uri) return;

      let type = response.type;

      if (type === undefined && response.fileName === undefined) {
        const pos = response.uri.lastIndexOf('.');
        type = response.uri.substring(pos + 1);
        if (type) type = `image/${type}`;
      }
      if (type === undefined) {
        const splitted = response.fileName.split('.');
        type = splitted[splitted.length - 1];
        if (type) type = `image/${type}`;
      }

      let name = response.fileName;
      if (name === undefined && response.fileName === undefined) {
        const pos = response.uri.lastIndexOf('/');
        name = response.uri.substring(pos + 1);
      }

      const selectedImage = {
        uri: response.uri,
        type: type.toLowerCase(),
        name,
      };
      props.onChangePicture(selectedImage)
      setImage(selectedImage.uri );
      }
    });
  };

  let x;
  (props.picture == 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png') ? 
    x = true : x = false;

  return(
    <Card transparent>

      {/* IMAGE PREVIEW */}
      <CardItem header style={{justifyContent:'center'}}>
        <Image 
          source={{uri:image}}
          style={{height:300, width:300, marginTop:25, borderRadius:500}}
        >
          </Image>
      </CardItem>

      {/* PICTURE INSTRUCTIONS */}
      <CardItem body style={{justifyContent:'center'}}>
        <Text style={{fontSize:24}}>Choose a profile picture of yourself to upload.</Text>
      </CardItem>
        
      {/* UPLOAD BUTTON */}
      <CardItem footer style={{justifyContent:"center"}}>
        <Button large onPress={() => choosePhoto()}>
          <Text> UPLOAD </Text>
        </Button>
      </CardItem>

      {/* NAVIGATION BUTTONS */}
      <CardItem footer style={{justifyContent:"space-around"}}>

        {/* PREVUIOS BUTTON */}
        <Button large iconLeft onPress={() => props.prev()}>
          <Icon name='arrow-back'/>
          <Text>Go Back</Text>
        </Button>

        {/* NEXT BUTTON */}
        <Button large disabled={x} iconRight onPress={() => props.next()}>
          <Text>Next</Text>
          <Icon name='arrow-forward'/>
        </Button>

      </CardItem>

    </Card>
  )
}