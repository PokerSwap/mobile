import React, { useState, useContext, useEffect } from 'react';
import {Button, Text, Toast} from 'native-base';
import { Context } from '../Store/appContext';


import Spinner from 'react-native-loading-spinner-overlay';
import { Keyboard, TouchableWithoutFeedback, TextInput, 
  KeyboardAvoidingView, View, StatusBar } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'

import DeviceInfo from 'react-native-device-info'

import { getUniqueId, getManufacturer } from 'react-native-device-info'



export default LoginScreen = (props) => {

  const [email, setEmail] = useState('lou@gmail.com')
  const [password, setPassword] = useState('loustadler')
  const [loading, setLoading] = useState(false)

  const { store, actions } = useContext(Context)

  var {navigate} = props.navigation

	var deviceID = DeviceInfo.getUniqueId();


  loadingSwitch = () => {
    setLoading(!loading)
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('loginToken', store.userToken.jwt)
    } catch (error) {
      console.log('could not store dat', error)
      // saving error
    }
  }

  wrong = () => {
		if(store.userToken==null){
			Toast.show({
				text:'wrongPassword',
			duration:3000})
		}
	}

  loginStart = async() => {
    loadingSwitch();
    var answer = await actions.user.login(
      email, 
      password, 
      deviceID,
      props.navigation
    );
    storeData();
    loadingSwitch();
  }

  return(
    <View style={{flex:1, justifyContent:"center", backgroundColor:'rgb(12,85,32)'}}>
    <StatusBar barStyle='light-content'/>
    <Spinner visible={loading} style={{color: '#FFF'}}/>
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback>
        {/* TITLE */}
        
        <View transparent 
          style={{color:'rgb(12,85,32)', position:'absolute', top:0, left:0, right:0 }}>
          
        <View header style={{justifyContent:'center',backgroundColor:'rgb(12,85,32)'}}>
          <Text style={{color:'white', textAlign:'center', fontWeight:'600', fontSize:36, justifyContent:'center'}}>Swap Profit</Text>
        </View>  
          
     
        <View >
          {/* EMAIL INPUT */}
          <View style={{width:'75%', alignSelf:'center', marginVertical:5}}>
            <TextInput 
              style={{
                height:40,
                marginTop: 1,
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: "#FFF",
                paddingHorizontal: 10
              }}
              placeholder="Enter Email"
              placeholderTextColor='gray'
              keyboardType="email-address"
              blurOnSubmit={false}
              returnKeyType="next"
              autoCapitalize='none'
              autoCorrect={false} 
              onSubmitEditing={() => { txtPassword.focus(); }}
              value={email}    
              onChangeText={email => setEmail( email )}
            />
          </View>
          
          {/* PASSWORD INPUT */}
          <View style={{width:'75%', alignSelf:'center',}}>
            <TextInput 
              style={{height:40,
                marginTop: 1,
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: "#FFF",
                paddingHorizontal: 10
                }}
              placeholder="Enter Password"
              placeholderTextColor='gray'
              secureTextEntry
              autoCapitalize='none'
              returnKeyType="go"
              autoCorrect={false} 
              ref={(input) => { txtPassword = input; }} 
              value={password}
              onChangeText={password => setPassword( password )}
            />
          </View>

          {/* BUTTONS  */}
          <View style={{
            backgroundColor:'rgb(12,85,32)', 
            justifyContent:'center', 
            flexDirection:'column'}}>

            {/* LOGIN BUTTON */}
            
            <Button block large
              style={{width:'75%', alignSelf:'center',
              paddingVertical: 15, marginTop: 10}}
              onPress={
                async() => {
                  Keyboard.dismiss();
                  var x = await loginStart();
                  wrong()}
                }
            >
              <Text style={{fontWeight:'600', justifyContent:'center'}}> Login </Text>
            </Button>
                

            {/* SIGN UP BUTTON */}
            <Button  block large
              style={{
                backgroundColor:'rgb(211,152,35)',
                width:'75%', paddingVertical: 15,
                marginTop: 10, alignSelf:'center'}} 
                onPress={()=>navigate("TermsAndConditions")}>
              <Text style={{
                color:'black', 
                justifyContent:'center', 
                fontWeight:'600'}}> 
                Sign Up 
              </Text>
            </Button>
                
            {/* FORGOT PASSWORD BUTTON */}
            <Button transparent style={{justifyContent:'center'}} onPress={() => props.navigation.navigate("ForgotPassword")}>
              <Text style={{color:'white'}}>Forgot password?</Text>
            </Button>
                
          </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}
