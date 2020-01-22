import React, { useState, useContext, useEffect } from 'react';
import {Button, Text, Toast, Icon } from 'native-base';
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
    <View style={styles.container.main}>
    <StatusBar barStyle='light-content'/>
    <Spinner visible={loading} style={styles.spinner}/>
      <KeyboardAvoidingView  behavior='padding' keyboardVerticalOffset={-100}>
        <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
        <View>
          
        {/* TITLE */}

          <View header style={{flexDirection:'column', alignItems:'center', marginBottom:100}}>
          <Icon type="FontAwesome5" name="handshake" style={{fontSize:80,color:'white'}} />
            <Text style={styles.text.title}>Swap Profit</Text>
            
          </View>  
            
          <View transparent style={{ }}>
          
            {/* EMAIL INPUT */}
            <View style={styles.container.input}>
              <TextInput 
                style={styles.input}
                placeholder="Enter Email"
                placeholderTextColor='white'
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
            <View style={styles.container.input}>
              <TextInput 
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor='white'
                secureTextEntry
                autoCapitalize='none'
                returnKeyType="go"
                autoCorrect={false} 
                ref={(input) => { txtPassword = input; }} 
                value={password}
                onChangeText={password => setPassword( password )}
              />
            </View>

            {/* BUTTONS */}
            <View style={styles.container.button}>

              {/* LOGIN BUTTON */}         
              <Button block large style={styles.button.login}
                onPress={
                  async() => {
                    Keyboard.dismiss();
                    var x = await loginStart();
                    wrong()}
                  }
              >
                <Text style={styles.text.login}> Login </Text>
              </Button>
                  
              {/* SIGN UP BUTTON */}
              <Button  block large style={styles.button.signup} 
                onPress={()=>navigate("TermsAndConditions")}>
                <Text style={styles.text.signup}> 
                  Sign Up 
                </Text>
              </Button>
                  
              {/* FORGOT PASSWORD BUTTON */}
              <Button transparent style={styles.button.forgotPassword} 
                onPress={() => props.navigation.navigate("ForgotPassword")}>
                <Text style={styles.text.forgotPassword}>Forgot password?</Text>
              </Button>
                  
            </View>
          
          </View>

        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = {
  container:{
    main:{
       flex:1,flexDirection:'column', justifyContent:'flex-end', backgroundColor:'rgb(12,85,32)'},
    button:{
      backgroundColor:'rgb(12,85,32)',  justifyContent:'center', 
      flexDirection:'column', marginBottom:'12%'
    },
    input:{
      width:'75%', alignSelf:'center', marginVertical:5, backgroundColor: 'rgba(255,255,255,0.2)'},
    title:{
      alignSelf:'center', justifyContent:'center', backgroundColor:'rgb(12,85,32)'
    }
  },
  button:{
    login:{
      width:'75%', alignSelf:'center', paddingVertical: 15, marginTop: 10
    },
    signup:{  
      backgroundColor:'rgb(211,152,35)', width:'75%', 
      paddingVertical: 15, marginTop: 10, alignSelf:'center'
    },
    forgotPassword:{
      justifyContent:'center', marginVertical:12}
  },
  input:{
    height:40, marginTop: 1, 
    color: "#FFF", paddingHorizontal: 10
  },
  text:{
    title:{
      color:'white', textAlign:'center', 
      fontWeight:'600', fontSize:36, justifyContent:'center'},
    login:{
      fontWeight:'600', justifyContent:'center'},
    signup:{
      color:'black', justifyContent:'center', fontWeight:'600'},
    forgotPassword:{
      color:'white'}
  },
  spinner:{
    color: '#FFF'}
}