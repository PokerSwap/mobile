import React, { useContext, useState } from 'react';
import { Alert, TextInput} from 'react-native'
import { Container, Content, Button, Text, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native'

import { Context } from '../../Store/appContext'
import '../../Images/placeholder.jpg';

export default ChangePassword = () => {
  const { store, actions } = useContext(Context)
  const navigation = useNavigation()

  const [currentEmail, setCurrentEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  let txtCurrentPassword2 = null
  let txtNewPassword = null
  let txtConfirmPassword = null

  var isDisabled 
    
  const regexEmail = new RegExp('^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$');
    
  const showAlert = () =>{
    Alert.alert(
      "Confirmation",
      'For security reasons, you will be logged out once you make these changes.\n\n Do you wish to continue?',
      [
        { text: 'Yes',
          onPress: () => changePassword() },
        { text: 'No',
          onPress: () => console.log("Cancel Pressed"), }
      ]
    )
  }

  const changePassword = async() => {
    if (newPassword == confirmPassword ){
      var answer = await actions.user.changePassword(currentEmail, currentPassword, newPassword, navigation)
    } else {
      Toast.show({
        text:'Password Change Failed. Make sure both new password and confirm password are the same',
        position:'top',
        duration:3000
      })
    }
  }

  return(
    <Container style={{justifyContent:'center'}}>
      <Content contentContainerStyle={{paddingTop:50,
        justifyContent:'flex-start', alignItems:'center', flex:1, flexDirection:'column'}}>
        {/* EMAIL ADDRESS FIELD */}
        <Text style={{textAlign:'center'}}> 
          Email Current Email: 
        </Text>
        <TextInput 
          style={{fontSize:24, textAlign:'center', width:'100%'}}
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
          onChangeText={email => setCurrentEmail( email )}  />
        {/* ENTER CURRENT PASSWORD */}
        <Text style={{marginTop:20, textAlign:'center'}}>
          Enter Current Password:
        </Text>
        <TextInput 
          style={{fontSize:24, textAlign:'center', width:'100%'}}
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
          onChangeText={password => setCurrentPassword( password )} />
        {/* ENTER NEW PASSWORD */}
        <Text style={{marginTop:20, textAlign:'center'}}>
          Enter New Password:
        </Text>
        <TextInput 
          style={{fontSize:24, textAlign:'center', width:'100%'}}
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
          onChangeText={password2 => setNewPassword( password2 )} />
        {/* CONFIRM NEW PASSWORD */}
        <Text style={{marginTop:20, textAlign:'center'}}>
          Confirm New Password:
        </Text>
        <TextInput 
          style={{fontSize:24, textAlign:'center', width:'100%'}}
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
          onChangeText={password3 => setConfirmPassword( password3 )} />
        {/* SUBMIT BUTTON */}
        <Button large disabled={isDisabled} style={{marginTop:40, selfAlign:'center', justifyContent:'center'}}
          onPress={()=> showAlert()}>
          <Text style={{fontSize:30, fontWeight:'600'}}> 
            SUBMIT 
          </Text>
        </Button>
      </Content>  
    </Container>
  )
}
