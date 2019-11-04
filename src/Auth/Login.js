import React, {Component, useState } from 'react';
import {Button, Text, Toast, Card, CardItem, Container, Content} from 'native-base';
import { Context } from '../Store/appContext'

import Spinner from 'react-native-loading-spinner-overlay';
import { Keyboard, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, View, StatusBar } from 'react-native';

export default  LoginScreen = (props) => {

  const [email, setEmail] = useState('gherndon5@gmail.com')
  const [password, setPassword] = useState('Tryagain5!')
  const [loading, setLoading] = useState(false)

  loadingSwitch = () => {
    setLoading(!loading)
  }

  loginStart = async (x) => {
    console.log(email, password)
    loadingSwitch();
    var answer = await x.user.login(
      email, 
      password, 
      props.navigation);
    loadingSwitch();

  }

    var {navigate} = props.navigation
    return(
        <View style={{flex:1, justifyContent:"center", backgroundColor:'rgb(12,85,32)'}}>
        <StatusBar barStyle='light-content'/>
        <Spinner visible={loading} style={{color: '#FFF'}}/>
          <KeyboardAvoidingView>
            <TouchableWithoutFeedback>
              <Card transparent style={{color:'rgb(12,85,32)'}}>
              
              {/* TITLE */}
              <CardItem header style={{justifyContent:'center',backgroundColor:'rgb(12,85,32)'}}>
                <Text style={{color:'white', fontWeight:'600', fontSize:36, justifyContent:'center'}}>Swap Profit</Text>
              </CardItem>

              {/* EMAIL INPUT */}
              <CardItem style={{width:'75%', alignSelf:'center', marginVertical:5}}>
                  <TextInput 
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
              </CardItem>
              
              {/* PASSWORD INPUT */}
              <CardItem style={{width:'75%',  alignSelf:'center'}}>
                  <TextInput 
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
              </CardItem>


              {/* BUTTONS  */}
              <CardItem style={{
                backgroundColor:'rgb(12,85,32)', 
                justifyContent:'center', 
                flexDirection:'column'}}>

                {/* LOGIN BUTTON */}
                <Context.Consumer>
                  {({store, actions}) => {
                    wrong = () => {
                      if(true){
                        Toast.show({
                          text:'Sorry you entered the wrong email or password',
                        duration:3000})
                      }
                    }
                    return(
                        <Button 
                          style={{width:'50%', justifyContent:'center', marginBottom:5}}
                          onPress={
                            async() => {
                              Keyboard.dismiss();
                              var x = await loginStart(actions)
                              wrong()}
                            }
                        >
                          <Text style={{fontWeight:'600', justifyContent:'center'}}> Login </Text>
                        </Button>
                    )
                  }}
                </Context.Consumer>

                {/* SIGN UP BUTTON */}
                <Context.Consumer>
                  {({store, actions}) => {
                    return(
                        <Button transparent 
                          style={{
                            backgroundColor:'rgb(211,152,35)', 
                            width:'50%', justifyContent:'center'}} 
                            onPress={()=>navigate("TermsAndConditions")}>
                          <Text style={{
                            color:'black', 
                            justifyContent:'center', 
                            fontWeight:'600'}}> 
                            Sign Up 
                          </Text>
                        </Button>
                    )
                  }}
                </Context.Consumer>
                      
                {/* FORGOT PASSWORD BUTTON */}
                <Context.Consumer>
                  {({store, actions}) => {
                    return(
                      <Button transparent style={{justifyContent:'center'}} onPress={() => actions.user.forgotPassword(props.navigation)}>
                        <Text style={{color:'white'}}>Forgot password?</Text>
                      </Button>
                    )
                }}  
                </Context.Consumer>
              </CardItem>
            
            </Card>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
    )
  }
