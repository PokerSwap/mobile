import React from 'react';
import { Container, Content, Text, List, ListItem } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import OtherHeader from '../View-Components/OtherHeader'

export default SettingsScreen = () => {
  const navigation = useNavigation()
  return(
    <Container>
      <OtherHeader title={'Settings'} />
      <Content>      
        <List>
          {/* CHANGE EMAIL BUTTON */}
          <ListItem noIndent 
            onPress={()=> navigation.navigate('Change Email')}>
            <Text> Change Email </Text>
          </ListItem>
          {/* CHANGE PASSWORD BUTTON */}
          <ListItem noIndent 
            onPress={()=> navigation.navigate('Change Password')}>
            <Text> Change Password </Text>
          </ListItem>
          {/* CHANGE PICTURE BUTTON */}
          <ListItem noIndent 
            onPress={()=> navigation.navigate('Change Picture')}>
            <Text> Change Profile Picture </Text>
          </ListItem>
          {/* CHANGE NICKNAME BUTTON */}
          <ListItem noIndent 
            onPress={()=> navigation.navigate('Change Nickname')}>
            <Text> Change Nickname </Text>
          </ListItem>
        </List>
      </Content>  
    </Container>
  )
}
