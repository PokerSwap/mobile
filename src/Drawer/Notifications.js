import React, {Component} from 'react';
import { Container, Content, Text } from 'native-base';
import OtherHeader from '../View-Components/OtherHeader'

export default NotificationsScreen = (props) => {

  return(
    <Container>
      <OtherHeader title={'Notifications'} 
      goBackToHome={() => props.navigation.goBack(null)}
      />
      <Content>
        <Text>Notifications</Text>
      </Content>
    </Container>
  )
}
