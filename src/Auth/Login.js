import React, { useState, useContext, useRef, useCallback } from 'react';
import {Platform, Image} from 'react-native'
import {Button, Text, Toast } from 'native-base';
import { Context } from '../Store/appContext';
import { debounce } from "lodash";

import Spinner from 'react-native-loading-spinner-overlay';
import { Keyboard, TouchableWithoutFeedback, TextInput, 
  KeyboardAvoidingView, View, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info'

var a_behavior, offBy, marginee

if (Platform.OS == 'ios'){
  a_behavior='position' 
   offBy= -100
  marginee=20
}else{
  a_behavior='padding'
  offBy = -600
  marginee = 30}


export default LoginScreen = (props) => {

  const [email, setEmail] = useState('lou@gmail.com')
  const [password, setPassword] = useState('loustadler')
  const [loading, setLoading] = useState(false)

  const { store, actions } = useContext(Context)

	var deviceID = DeviceInfo.getUniqueId();

  const [loginColor, setLoginColor] = useState('#000099')
  const [signupColor, setSignupColor] = useState('#FF6600')

  const loginStart = async() => {
    Keyboard.dismiss();
    setLoading(true)
    var answer = await actions.user.login(
      email, password, deviceID, props.navigation );
    var eee = setLoading(false)
  }

  let txtPassword = null


  const [refreshing, setRefreshing] = useState(false);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  } 

  const onRefresh = useCallback(() => {
    Keyboard.dismiss();
    setLoading(true)
    actions.user.login(
      email, password, deviceID, props.navigation )
    wait(3000).then(() => setLoading(false));
  }, [loading]);
  
  return(
    <View style={styles.mainContainer}>
    <StatusBar 
      backgroundColor={'rgb(38, 171, 75)'} StatusBarAnimation={'none'}/>
    <Spinner visible={loading} style={styles.spinner}/>
      <KeyboardAvoidingView  behavior={a_behavior} keyboardVerticalOffset={offBy}>
        <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
        <View>
          
        {/* LOGO TITLE */}

          <View header style={styles.logo.container}>
            <Image style={styles.logo.image}
			        source={require("../Images/transparent-logo.png")}/>
          </View>  
            
          <View transparent>
          
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
                onSubmitEditing={() => loginStart()}
                autoCapitalize='none'
                returnKeyType="go"
                autoCorrect={false} 
                selectionColor={'#D3D3D3'}
                ref={(input) => { txtPassword = input; }} 
                value={password}
                onChangeText={password => setPassword( password )}/>
            </View>

            {/* BUTTONS */}
            <View style={styles.buttons.container}>

              {/* LOGIN BUTTON */}         
              <Button block onPress={() => onRefresh()}
                onPressIn={() => setLoginColor('#6699FF')}
                onPressOut={() => setLoginColor('#000099')}
                style={[styles.buttons.button, {backgroundColor:loginColor}]}>
                <Text style={styles.buttons.text}> 
                  Login 
                </Text>
              </Button>
                  
              {/* SIGN UP BUTTON */}
              <Button block 
                onPressIn={()=> setSignupColor('#FF8533')}
                onPressOut={()=> setSignupColor('#FF6600')}
                style={[styles.buttons.button,{backgroundColor:signupColor}]} 
                onPress={()=> props.navigation.navigate("TermsAndConditions")}>
                <Text style={styles.buttons.text}> 
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

  buttons:{
    container:{
      backgroundColor:'rgb(38, 171, 75)', flexDirection:'column', 
      justifyContent:'center', marginBottom:'12%'},
    text:{
      color:'white', justifyContent:'center', 
      fontWeight:'600', fontSize:20},
    button:{ 
      alignSelf:'center',  width:'75%', 
      paddingVertical: 15, marginTop: 10,},
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

  logo:{
    image:{
      height:300, width:300 },
    container:{
      flexDirection:'column', 
      alignItems:'center', marginBottom: marginee
    }
  },

  mainContainer:{ 
    flex:1, flexDirection:'column', justifyContent:'flex-end', 
    backgroundColor:'rgb(38, 171, 75)' },

  spinner:{ 
    color: '#FFF' },
}