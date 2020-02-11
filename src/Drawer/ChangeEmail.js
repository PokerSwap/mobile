import React, {useContext, useState} from 'react';
import {TextInput} from 'react-native'
import { Container, Content, Button, 
  Text, Card, CardItem, Toast } from 'native-base';

import {Context } from '../Store/appContext'

export default ChangeEmail = (props) => {

  const { store, actions } = useContext(Context)

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
        currentEmail, currentPassword, newEmail, props.navigation)
      :
      Toast.show({
        text:'Make sure both passwords are the same',
        duration:3000,
        position:top
      })
  }

  return(
    <Container>
      <Content contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
        <Card transparent style={{justifyContent:'center', alignItems:'center', marginTop:150}}>
          <CardItem style={{flex:1, flexDirection:'column'}}>
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
              onChangeText={email2 => setCurrentEmail( email2 )} />
          </CardItem>
          <CardItem style={{flex:1, flexDirection:'column'}}>
            <Text style={{marginTop:20}}>Enter Password:</Text>
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
              onChangeText={currentPassword => setCurrentPassword( currentPassword )} />
          </CardItem>
          <CardItem style={{flex:1, flexDirection:'column'}}>
            <Text style={{marginTop:20}}>New Email:</Text>
            <TextInput 
              style={{fontSize:24, textAlign:'center'}}
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
          </CardItem>
          <CardItem style={{flex:1, flexDirection:'column'}}>
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
          </CardItem>
          <CardItem>
            <Button large  style={{marginTop:40}} 
              onPress={() => changeEmail()}>
              <Text style={{fontSize:30, fontWeight:'600'}}> 
                SUBMIT 
              </Text>
            </Button>
          </CardItem>
        </Card>
      </Content>  
    </Container>
  )
}