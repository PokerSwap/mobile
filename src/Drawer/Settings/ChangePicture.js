import React, {useContext, useState} from 'react';
import { Container, Content, Icon, Button, Text, Card, Alert } from 'native-base';

import ImagePicker from 'react-native-image-picker'

import {openSettings, requestMultiple, PERMISSIONS} from 'react-native-permissions';

import {Image, Platform} from 'react-native'
import {Context } from '../../Store/appContext'

import '../../Images/placeholder.jpg';

export default ChangePicture = (props) => {

  const { store, actions } = useContext(Context)

  const [image, setImage ]= useState(require('../../Images/placeholder.jpg'));
  // const [imageURI, setImageURI ]= useState(require('../Images/placeholder.jpg'));
 
  const openSets = () => {
    openSettings().catch(() => console.warn('cannot open settings'));
  }

  const showAlert = () =>{
    Alert.alert(
      "Permissions Needed",
      'In order to proceed you must have Camera and Photo Library permissions',
      [
        { text: 'Go To Settings', onPress: () => openSets() },
        { text: 'Cancel', onPress: () => console.log("Cancel Pressed"), }
      ]
    )
  }

  const askPersmission = async () => {
    var cameraStatus, libraryStatus;
    Platform.OS == 'ios' ? 
      cameraStatus = PERMISSIONS.IOS.CAMERA 
      : cameraStatus = PERMISSIONS.ANDROID.CAMERA
    Platform.OS == 'ios' ? 
      libraryStatus = PERMISSIONS.IOS.PHOTO_LIBRARY 
      : libraryStatus = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    
    requestMultiple([cameraStatus, libraryStatus]).then(
      (statuses) => {
        console.log('Camera', statuses[cameraStatus]);
        console.log('Library', statuses[libraryStatus]);
        statuses[cameraStatus] == 'granted' && statuses[libraryStatus] == 'granted' ? 
          choosePhoto() : showAlert()
      }
    )
  };

  const choosePhoto = async() => {

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
        name: name,
      };

      setImage(selectedImage)
      // setImageURI(selectedImage.uri );
      }
    });
  };

  const changePicture = async() => {
    var answer = await actions.profile.uploadPhoto(image)
  }

  return(
    <Container>
      <Content contentContainerStyle={{
        justifyContent:'center', alignItems:'center'}}>
      <Card transparent style={{
          justifyContent:'center', alignItems:'center', 
          flex:1, flexDirection:'column', marginTop:160}}>
        <Image source={{uri: image.uri}} style={{width:300, height:300}} />
        <Button style={{width:300, justifyContent:'center'}} 
          onPress={()=> askPersmission()}>
          <Icon type='FontAwesome5' name='plus' style={{color:'white'}}/>
        </Button>
        <Button  large style={{marginTop:40}} onPress={() => changePicture()}>
          <Text style={{fontSize:30, fontWeight:'600'}}> SUBMIT </Text>
        </Button>
      </Card>
      </Content>  
    </Container>
  )
}