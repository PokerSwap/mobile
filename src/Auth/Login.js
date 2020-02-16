import React, { useState, useContext, useCallback } from 'react';
import {Platform, Image} from 'react-native'
import {Button, Text, Toast, Icon } from 'native-base';
import { Context } from '../Store/appContext';
import { debounce } from "lodash";

import Spinner from 'react-native-loading-spinner-overlay';
import { Keyboard, TouchableWithoutFeedback, TextInput, 
  KeyboardAvoidingView, View, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info'

export default LoginScreen = (props) => {

  const [email, setEmail] = useState('lou@gmail.com')
  const [password, setPassword] = useState('loustadler')
  const [loading, setLoading] = useState(false)

  const { store, actions } = useContext(Context)

	var deviceID = DeviceInfo.getUniqueId();


  var a_behavior, offBy, marginee

  if (Platform.OS == 'ios'){
    a_behavior='position' 
     offBy= -100
    marginee=20
  }else{
    a_behavior='padding'
    offBy = -600
    marginee = 50}
  

  const loginStart = async() => {
    setLoading(true)
    var answer = await actions.user.login(
      email, password, deviceID, props.navigation );
    var eee = setLoading(false)
  }


  let txtPassword = null
  return(
    <View style={styles.container.main}>
    <StatusBar 
      backgroundColor={'rgb(12,85,32)'} StatusBarAnimation={'none'}/>
    <Spinner visible={loading} style={styles.spinner}/>
      <KeyboardAvoidingView  behavior={a_behavior} keyboardVerticalOffset={offBy}>
        <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
        <View>
          
        {/* TITLE */}

          <View header style={{flexDirection:'column', 
            alignItems:'center', marginBottom:marginee}}>

            
            <Image style={{height:300, width:300}}
			 source={require("../Images/transparent-logo.png")}/>
            {/* <Text style={styles.text.title}>
              SWAP PROFIT
            </Text> */}
            
          </View>  
            
          <View transparent style={{ }}>
          
            {/* EMAIL INPUT */}
            <View style={styles.input.container}>
              <TextInput 
                style={styles.input.input}
                placeholder="Enter Email"
                placeholderTextColor='white'
                keyboardType="email-address"
                blurOnSubmit={false}
                selectionColor={'#D3D3D3'}
                returnKeyType="next"
                autoCapitalize='none'
                autoCorrect={false} 
                onSubmitEditing={() => { txtPassword.focus(); }}
                value={email}    
                onChangeText={email => setEmail( email )}
              />
            </View>
            
            {/* PASSWORD INPUT */}
            <View style={styles.input.container}>
              <TextInput 
                style={styles.input.input}
                placeholder="Enter Password"
                placeholderTextColor='white'
                secureTextEntry
                onSubmitEditing={() => {
                    Keyboard.dismiss();
                    loginStart()
                  }}
                autoCapitalize='none'
                returnKeyType="go"
                autoCorrect={false} 
                selectionColor={'#D3D3D3'}
                ref={(input) => { txtPassword = input; }} 
                value={password}
                onChangeText={password => setPassword( password )}/>
            </View>

            {/* BUTTONS */}
            <View style={styles.container.buttons}>

              {/* LOGIN BUTTON */}         
              <Button  block  style={styles.login.button}
                onPress={
                  async() => {
                    Keyboard.dismiss();
                    loginStart()
                  }
                }>
                <Text style={styles.login.text}> 
                  Login 
                </Text>
              </Button>
                  
              {/* SIGN UP BUTTON */}
              <Button  block  style={styles.signup.button} 
                onPress={
                  ()=> props.navigation.navigate("TermsAndConditions")}>
                <Text style={styles.signup.text}> 
                  Sign Up 
                </Text>
              </Button>
                  
              {/* FORGOT PASSWORD BUTTON */}
              <Button transparent style={styles.forgotPassword.button} 
                onPress={() => props.navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgotPassword.text}>
                  Forgot password?
                </Text>
              </Button>
                  
            </View>
          
          </View>

        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}


const styles ={

  container:{
    buttons:{ 
      backgroundColor:'rgb(38, 171, 75)', flexDirection:'column', 
      justifyContent:'center', marginBottom:'12%'},
    main:{ 
      flex:1, flexDirection:'column', justifyContent:'flex-end', 
      backgroundColor:'rgb(38, 171, 75)' }
  },

  forgotPassword:{
    button: {
      justifyContent:'center', marginVertical:12 },
    text:{ 
      color:'white' }
  },

  input:{
    container:{
      width:'75%', alignSelf:'center', marginVertical:5, 
      backgroundColor: 'rgba(255,255,255,0.2)'},
    input:{
      height:40, marginTop: 1, color: "#FFF", 
      paddingHorizontal: 10, fontWeight:'bold' }
  },

  login:{
    button:{ 
      alignSelf:'center', width:'75%', paddingVertical: 15, 
      marginTop: 10},
    text:{
      fontWeight:'600', justifyContent:'center', fontSize:20}
  },

  signup:{
    button:{
      alignSelf:'center', backgroundColor:'#FF6600', 
      paddingVertical: 15, marginTop: 10, width:'75%'
    },
    text:{
      color:'white', justifyContent:'center', fontWeight:'600', fontSize:20}
  },

  spinner:{ 
    color: '#FFF' },

  title:{
    alignSelf:'center', justifyContent:'center', 
    backgroundColor:'rgb(21, 176, 64)'}
}