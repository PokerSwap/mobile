import React, {useContext, useState} from 'react';
import { Container, Content, Icon, Button, Text, Card } from 'native-base';

import ImagePicker from 'react-native-image-picker'

import {request, check, PERMISSIONS} from 'react-native-permissions';

import {TextInput, View, Image} from 'react-native'
import {Context } from '../Store/appContext'

import '../Images/placeholder.jpg';

export default SettingsChanger = (props) => {

  const { store, actions } = useContext(Context)
  const { navigation } = props;
  let setting = navigation.getParam('setting', 'NO-ID');

  const [image, setImage ]= useState(require('../Images/placeholder.jpg'));
  const [currentEmail, setCurrentEmail] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  let txtCurrentPassword1 = null;
  let txtNewEmail = null;

  let txtCurrentPassword2 = null
  let txtNewPassword = null
  let txtConfirmPassword = null

  const requestAll = async() => {
    const cameraStatus = await request(PERMISSIONS.IOS.CAMERA);
    const photosStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    return {cameraStatus, photosStatus};
  }

  const choosePhoto = async() => {

    // var answer = await requestAll().then(statuses => console.log(statuses));;

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

  var settingComponent
  var isDisabled 

  if (setting == 'changeEmail'){
    if (currentEmail == '' || currentPassword == '' || newEmail == '' ){
      isDisabled = true
    }else{
      isDisabled = false
    }
    settingComponent =
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text>Current Email:</Text>
        <TextInput 
          style={{fontSize:24, textAlign:'center'}}
          placeholder="Enter Current Email"
          placeholderTextColor='gray'
          keyboardType="email-address"
          blurOnSubmit={false}
          selectionColor={'black'}
          returnKeyType="next"
          autoCapitalize='none'
          autoCorrect={false} 
          onSubmitEditing={() => { txtCurrentPassword1.focus(); }}
          value={currentEmail}    
          onChangeText={email => setCurrentEmail( email )}
        />
        <Text style={{marginTop:20}}>Password:</Text>
        <TextInput 
          style={{fontSize:24, textAlign:'center'}}
          placeholder="Enter Password"
          placeholderTextColor='gray'
          secureTextEntry
          blurOnSubmit={false}
          autoCapitalize='none'
          returnKeyType="next"
          autoCorrect={false} 
          selectionColor={'black'}
          ref={(input) => { txtPassword1 = input; }} 
          onSubmitEditing={() => { txtNewEmail.focus(); }}
          value={currentPassword}
          onChangeText={currentPassword => setCurrentPassword( currentPassword )}
        />
        <Text style={{marginTop:20}}>New Email:</Text>
        <TextInput 
          style={{fontSize:24, textAlign:'center'}}
          placeholder="Enter New Email Address"
          placeholderTextColor='gray'
          keyboardType="email-address"
          blurOnSubmit={true}
          ref={(input) => { txtNewEmail = input; }} 
          selectionColor={'#D3D3D3'}
          returnKeyType="go"
          autoCapitalize='none'
          autoCorrect={false} 
          value={newEmail}    
          onChangeText={email => setNewEmail( email )}
        />
        <Button disabled={isDisabled} large style={{marginTop:40}} onPress={{}}>
          <Text style={{fontSize:30, fontWeight:'600'}}> SUBMIT </Text>
        </Button>
      </View>
    
  }else if(setting == 'changePassword'){
    settingComponent =
      <View>
        <Text style={{textAlign:'center'}}>Email:</Text>
        <TextInput 
          style={{fontSize:24, textAlign:'center'}}
          placeholder="Enter Current Email"
          placeholderTextColor='gray'
          keyboardType="email-address"
          blurOnSubmit={false}
          selectionColor={'black'}
          returnKeyType="next"
          autoCapitalize='none'
          autoCorrect={false} 
          onSubmitEditing={() => { txtCurrentPassword2.focus(); }}
          value={currentEmail}    
          onChangeText={email => setCurrentEmail( email )}
        />
        <Text style={{marginTop:20, textAlign:'center'}}>Enter Current Password:</Text>
        <TextInput 
          style={{fontSize:24, textAlign:'center'}}
          placeholder="Enter Current Password"
          placeholderTextColor='gray'
          blurOnSubmit={false}
          autoCapitalize='none'
          returnKeyType="next"
          autoCorrect={false} 
          selectionColor={'black'}
          ref={(input) => { txtCurrentPassword2 = input; }} 
          onSubmitEditing={() => { txtNewPassword.focus(); }}
          value={currentPassword}
          onChangeText={password => setCurrentPassword( password )}
        />
        <Text style={{marginTop:20, textAlign:'center'}}>Enter New Password:</Text>
        <TextInput 
          style={{fontSize:24, textAlign:'center'}}
          placeholder="Enter Password"
          placeholderTextColor='gray'
          secureTextEntry
          blurOnSubmit={false}
          autoCapitalize='none'
          returnKeyType="next"
          autoCorrect={false} 
          selectionColor={'black'}
          ref={(input) => { txtNewPassword = input; }} 
          onSubmitEditing={() => { txtConfirmPassword.focus(); }}
          value={newPassword}
          onChangeText={password2 => setNewPassword( password2 )}
        />
        <Text style={{marginTop:20, textAlign:'center'}}>Confirm New Password:</Text>
        <TextInput 
          style={{fontSize:24, textAlign:'center'}}
          placeholder="Confirm New Password"
          placeholderTextColor='gray'
          secureTextEntry          
          blurOnSubmit={true}
          ref={(input) => { txtConfirmPassword = input; }} 
          selectionColor={'#D3D3D3'}
          returnKeyType="go"
          autoCapitalize='none'
          autoCorrect={false} 
          value={confirmPassword}    
          onChangeText={password3 => setConfirmPassword( password3 )}
        />
        <Button disabled={isDisabled} large style={{marginTop:40, justifyContent:'center'}}
          onPress={{}}>
          <Text style={{fontSize:30, fontWeight:'600'}}> SUBMIT </Text>
        </Button>
      </View>
    if (currentEmail == '' || currentPassword == '' || newPassword == '' || confirmPassword == ''){
      isDisabled = true
    }else{
      isDisabled = false
    }
  }else if(setting == 'changePicture'){
    settingComponent =
      <Card transparent style={{
          justifyContent:'center', alignItems:'center',
          flex:1, flexDirection:'column', marginTop:40}}>
        <Image source={image} style={{width:300, height:300}} />
        <Button style={{width:300, justifyContent:'center'}} 
          onPress={()=> choosePhoto()}>
          <Icon type='FontAwesome5' name='plus' style={{color:'white'}}/>
        </Button>
        <Button  large style={{marginTop:40}} onPress={{}}>
          <Text style={{fontSize:30, fontWeight:'600'}}> SUBMIT </Text>
        </Button>
      </Card>

  }else{
    settingComponent =
      <View>
        <Text>No</Text>
      </View>
  }

  const changeEmail = async() => {
    if (newEmail == confirmEmail ){
      actions.profile.changeEmail()
    }
  }

  const changePassword = async() => {
    if (newPasword == confirmPassword ){
      actions.profile.changePassword()
    }
  }

  const changePicture = async() => {

  }



  return(
    <Container>
      <Content contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
        {settingComponent}
      </Content>  
    </Container>
  )
}