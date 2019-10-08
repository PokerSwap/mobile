import React, {Component} from 'react';
import {Button, Text, H3, Item, Toast, Body, Left, Right,
Card, CardItem, Container, Content} from 'native-base';
import { Context } from '../Store/appContext'

import Spinner from 'react-native-loading-spinner-overlay';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { View, Image, StatusBar, SafeAreaView, Keyboard, 
  TouchableWithoutFeedback, TextInput, KeyboardAvoidingView } from 'react-native';

export default class LoginScreen extends Component {
    constructor(){
      super();
      this.state={
        email:'',
        password:'',
        loading:false
      }
    }

    loading = () => {
      this.setState({loading: !this.state.loading})
    }
  
    loginStart = async (x) => {
      this.loading();
      var answer = await x.user.login(
        this.state.username, 
        this.state.password, 
        this.props.navigation);
      console.log('response', answer)
      this.loading();	
    }

    render(){
      var {navigate} = this.props.navigation
      return(
        <Container>
          <Content contentContainerStyle={{flex:1, justifyContent:"center"}}>
            
            <Spinner visible={this.state.loading} style={{color: '#FFF'}}/>
            
            <Card transparent>
              
              {/* TITLE */}
              <CardItem >
                <H3>Swap Poker</H3>
              </CardItem>

              {/* EMAIL INPUT */}
              <CardItem>
                <Item>
                  <TextInput 
                    placeholder="Enter Email"
                    keyboardType="email-address"
                    blurOnSubmit={false}
                    returnKeyType="next"
                    autoCapitalize='none'
                    autoCorrect={false} 
                    onSubmitEditing={() => { this.txtPassword.focus(); }}
                    value={this.state.email}    
                    onChangeText={email => this.setState({ email })}
                  />
                </Item>
              </CardItem>
              
              {/* PASSWORD INPUT */}
              <CardItem>
                <Item>
                  <TextInput 
                    placeholder="Enter Password"
                    secureTextEntry
                    autoCapitalize='none'
                    returnKeyType="go"
                    autoCorrect={false} 
                    ref={(input) => { this.txtPassword = input; }} 
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                  />
                </Item>
              </CardItem>
              
              {/* LOG IN BUTTON */}
              <CardItem>
                  <Left/>
                  <Body>
                    <Button onPress={()=>navigate("Swaps")}>
                      <Text>Log In</Text>
                    </Button>
                  </Body>
                  <Right/>
                </CardItem>
              
              {/* LOGIN BUTTON */}
              <Context.Consumer>
                {({store, actions}) => {
                  wrong = () => {
                    if(store.userToken==null){
                      Toast.show({
                        text:'Sorry you entered the wrong email or password',
                      duration:3000})
                    }
                  }
                  return(
                    <View>
                      <Button block
                        onPress={
                          async() => {
                            Keyboard.dismiss();
                            var x = await this.loginStart(actions)
                            wrong()}
                          }
                      >
                        <Text> Login </Text>
                      </Button>
                    </View>
                  )
                }}
              </Context.Consumer>

              {/* BOTTOM BUTTONS */}
              <CardItem>
                <Left>
                  <Body>
                    {/* FORGOT PASSWORD BUTTON */}
                    <Button transparent>
                      <Text>Forgot password?</Text>
                    </Button>
                  </Body>
                </Left>
                <Right>
                <Body>
                  {/* SIGN UP BUTTON */}
                  <Button transparent onPress={()=>navigate("TermsAndConditions")}>
                    <Text>First Time?</Text>
                  </Button>
                </Body>

                </Right>
              </CardItem>
            </Card>
          </Content>
        </Container>
        )
    }
}