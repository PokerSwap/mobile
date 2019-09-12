import React, {Component} from 'react';
import { Container, Content, Text } from 'native-base';
import _Header from '../View-Components/header'

export default class SettingsScreen extends Component {
    constructor(){
      super();
      this.state={
  
      }
    }
    render(){
      return(
        <Container>
          <_Header drawer={() => this.props.navigation.toggleDrawer()}/>
          <Content>
            <Text>Settings</Text>
          </Content>  
        </Container>
      )
    }
}