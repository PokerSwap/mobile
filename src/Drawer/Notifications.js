import React, {Component} from 'react';
import { Container, Content, Text } from 'native-base';
import _Header from '../View-Components/header'

export default NotificationsScreen = (props) => {

  return(
    <Container>
      <_Header title={'Notifications'} 
      drawer={() => props.navigation.toggleDrawer()}
      tutorial={() => props.navigation.push('Tutorial')}/>
      <Content>
        <Text>Notifications</Text>
      </Content>
    </Container>
  )
}
