import React, {Component} from 'react';
import { Container, Content, Text } from 'native-base';
import _Header from '../View-Components/header'

export default class NotificationsScreen extends Component {
    constructor(){
      super();
      this.state={
  
      }
    }
    render(){
      return(
        <Container>
          <_Header title={'Notifications'} drawer={() => this.props.navigation.toggleDrawer()}/>
          <Content>
            <Text>Notifications</Text>
          </Content>
        </Container>
      )
    }
}