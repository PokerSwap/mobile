import React, { useContext, useState } from 'react';
import { TextInput } from 'react-native'
import { Container, Content, Button, Text, Toast } from 'native-base';

import { Context } from '../../Store/appContext'
import { useNavigation } from '@react-navigation/native';

export default ChangeEmail = () => {
  const { store, actions } = useContext(Context)
  const navigation = useNavigation()

  const [currentEmail, setCurrentEmail] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')

  let txtCurrentPassword1 = null;
  let txtNewEmail = null;
  let txtConfirmEmail = null;

  const regexEmail = new RegExp('^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$');
  var isDisabled 

  // regexEmail.test(currentEmail) && regexEmail.test(newEmail) && currentPassword !== ''?
  //   newEmail == confirmEmail ?
  //     isDisabled = false : isDisabled = true
  //   :
  //   isDisabled = true 

  const changeEmail = async() => {
    newEmail == confirmEmail ?
      actions.user.changeEmail(
        currentEmail, currentPassword, newEmail, navigation)
      :
      Toast.show({
        text:'Make sure both passwords are the same',
        duration:3000,
        position:top
      })
  }

  return(
    <Container>
      <Content contentContainerStyle={{paddingTop:50,
        justifyContent:'flex-start', alignItems:'center', flex:1, flexDirection:'column'}}>
        {/* ENTER CURRENT EMAIL FIELD */}
        <Text>Enter Current Email:</Text>
        <TextInput 
          style={{fontSize:20, textAlign:'center'}}
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
          onChangeText={email2 => setCurrentEmail( email2 )} />
        {/* ENTER NEW EMAIL FIELD */}
        <Text style={{marginTop:20}}>Enter Current Password:</Text>
        <TextInput 
          style={{fontSize:20, textAlign:'center', paddingHorizontal:10, width:'100%'}}
          placeholder="Enter Password"
          placeholderTextColor='gray'
          secureTextEntry
          blurOnSubmit={false}
          autoCapitalize='none'
          returnKeyType="next"
          autoCorrect={false} 
          selectionColor={'black'}
          ref={(input) => { txtCurrentPassword1 = input; }} 
          onSubmitEditing={() => { txtNewEmail.focus(); }}
          value={currentPassword}
          onChangeText={currentPassword => setCurrentPassword( currentPassword )} />
        {/* ENTER NEW EMAIL FIELD */}
        <Text style={{marginTop:20}}>Enter New Email:</Text>
        <TextInput 
          style={{fontSize:20, textAlign:'center'}}
          placeholder="Enter New Email Address"
          placeholderTextColor='gray'
          keyboardType="email-address"
          blurOnSubmit={true}
          ref={(input) => { txtNewEmail = input; }} 
          onSubmitEditing={() => { txtConfirmEmail.focus(); }}
          selectionColor={'#D3D3D3'}
          returnKeyType="go"
          autoCapitalize='none'
          autoCorrect={false} 
          value={newEmail}    
          onChangeText={email => setNewEmail( email )} />
        {/* CONFIRM NEW EMAIL FIELD */}
        <Text style={{marginTop:20}}>Confirm New Email:</Text>
        <TextInput 
          style={{fontSize:24, textAlign:'center'}}
          placeholder="Confirm New Email Address"
          placeholderTextColor='gray'
          keyboardType="email-address"
          blurOnSubmit={true}
          ref={(input) => { txtConfirmEmail = input; }} 
          selectionColor={'#D3D3D3'}
          returnKeyType="go"
          autoCapitalize='none'
          autoCorrect={false} 
          value={confirmEmail}    
          onChangeText={email => setConfirmEmail( email )}/>
        {/* SUBMIT BUTTON */}
        <Button large  style={{marginTop:40, alignSelf:'center'}} 
          onPress={() => changeEmail()}>
          <Text style={{fontSize:30, fontWeight:'600'}}> 
            SUBMIT 
          </Text>
        </Button>
      </Content>  
    </Container>
  )
}