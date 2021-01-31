// import \
import { useState, useContext, useRef, useCallback } from 'react';
import * as React from 'react';
import NetInfo from "@react-native-community/netinfo";


import { Platform, Image } from 'react-native'
import { Button, Text } from 'native-base';
import { Context } from '../Store/appContext';
import { throttle } from "lodash";

import Spinner from 'react-native-loading-spinner-overlay';
import { Keyboard, TouchableWithoutFeedback, TextInput, 
  KeyboardAvoidingView, View, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info'

import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging'


// KEYBOARD AVOIDING VIEW SETTINGS
var a_behavior, offBy, marginee
if (Platform.OS == 'ios'){
  a_behavior='position', offBy= -100, marginee=20
} else {
  a_behavior='padding', offBy = -600, marginee = 30}

export default LoginScreen = ({navigation}) => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState('gherndon5@gmail.com')
    const [password, setPassword] = useState('Tryagain5!')
    const [loading, setLoading] = useState(false)
    const [loginColor, setLoginColor] = useState('#000099')
    const [signupColor, setSignupColor] = useState('#FF6600')

    let txtPassword = null

    function wait(timeout) {
        return new Promise(resolve => {
        setTimeout(resolve, timeout);
        });
    } 

    var deviceID

    const isSimulator = async() => {
        return DeviceInfo.isEmulator()
    }
    var getToken = () => { return firebase.messaging().getToken() }

    const loginStart = async() => {
        var connect
        var w = await NetInfo.fetch().then(state => {
            connect = state.isConnected;
            console.log('connect', connect)
        });

        if (!connect){
            return alert("You are not connected to the internet")
        } else {
            null
        }

        Keyboard.dismiss();
        setLoading(true)
        var x = await isSimulator()

        var bb = await getToken()
        deviceID = bb

        var data = {
            email: email,
            password: password,
            device_token: deviceID,
            exp: 1728000000
        };
        var xw = await actions.user.login(data, navigation)
        wait(2000).then(() => 
            setLoading(false)
        );
    }
    
    return(
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={'rgb(38, 171, 75)'} StatusBarAnimation={'none'}/>
            <Spinner visible={loading} style={styles.spinner}/>
            <KeyboardAvoidingView  behavior={a_behavior} keyboardVerticalOffset={offBy}>
            <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
            <View>
                {/* LOGO TITLE */}
                <View header style={styles.logo.container}>
                    <Image style={styles.logo.image}
                        source={require("../Images/transparent-logo.png")}/>
                </View>  
                {/* MAIN BODY */}
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
                            onChangeText={emailX => setEmail( emailX )} />
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
                            onChangeText={passwordX => setPassword( passwordX )}/>
                    </View>
                    {/* BUTTONS */}
                    <View style={styles.buttons.container}>
                        {/* LOGIN BUTTON */}         
                        <Button block onPress={() => loginStart()}
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
                            onPress={()=> navigation.navigate("Terms and Conditions")}>
                            <Text style={styles.buttons.text}> 
                                Sign Up 
                            </Text>
                        </Button>                  
                        {/* FORGOT PASSWORD BUTTON */}
                        <Button transparent style={styles.forgotPassword.button} 
                            onPress={() => navigation.navigate("Forgot Password")}>
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
            justifyContent:'center', marginVertical:12, alignSelf:'center' },
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
        flexDirection:'column', alignItems:'center', marginBottom: marginee }
    },
    mainContainer:{ 
        flex:1, flexDirection:'column', justifyContent:'flex-end', 
        backgroundColor:'rgb(38, 171, 75)' },
    spinner:{ 
        color: '#FFF' },
}