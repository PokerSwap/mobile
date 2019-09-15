import React, {Component} from 'react';
import {Button, Text, H3, Item, Input, Body, Left, Right,
  Card, CardItem, Container, Content} from 'native-base';

export default class LoginScreen extends Component {
    constructor(){
      super();
      this.state={
  
      }
    }
    render(){
      var {navigate} = this.props.navigation
      return(
        <Container>
          <Content contentContainerStyle={{flex:1, justifyContent:"center"}}>
            <Card transparent>
              {/* Login Title */}
              <CardItem>
                <Left />
                <Body>
                  <H3>Swap Poker</H3>
                </Body>
                <Right />

              </CardItem>
              {/* Username/Email Input */}
              <CardItem>
                  <Item>
                    <Input placeholder="Enter Email"/>
                  </Item>
                </CardItem>
              {/* Password Input */}
              <CardItem>
                  <Item>
                    <Input placeholder="Enter Password"/>
                  </Item>
                  </CardItem>
              {/* Sign In Button */}
              <CardItem>
                  <Left/>
                  <Body>
                    <Button onPress={()=>navigate("Swaps")}>
                      <Text>Sign In</Text>
                    </Button>
                  </Body>
                  <Right/>
                </CardItem>
              {/* Sign Up and Forgot Password Buttons */}
              <CardItem>
                  <Left>
                    <Body>
                    <Button transparent>
                      <Text>Forgot password?</Text>
                    </Button>
                    </Body>
                  </Left>
                  <Right>
                  <Body>

                    <Button transparent onPress={()=>navigate("TermsAndConditions")}>
                      <Text>First Time</Text>
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