import React, {Component} from 'react';
import { Container, Content, Text } from 'native-base';
import _Header from '../View-Components/header'

export default SettingsScreen = (props) => {

  return(
    <Container>
      <_Header title={'Settings'} drawer={() => props.navigation.toggleDrawer()}/>
      <Content>
        <Text>Settings</Text>
      </Content>  
    </Container>
  )
}
