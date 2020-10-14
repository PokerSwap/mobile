import React, { useContext } from 'react';
import { Context } from '../Store/appContext'
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Text, List, ListItem } from 'native-base';

import OtherHeader from '../View-Components/OtherHeader'

import darkStyle from '../Themes/dark.js'
import lightStyle from '../Themes/light.js'

export default SettingsScreen = () => {
  const navigation = useNavigation()
  const { store, actions } = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  return(
    <Container>
      <OtherHeader title={'Settings'} />
      <Content style={{backgroundColor:currentStyle.background.color}}>      
        <List>
          {/* CHANGE EMAIL BUTTON */}
          <ListItem noIndent 
            onPress={()=> navigation.navigate('Change Email')}>
            <Text style={{color:currentStyle.text.color}}> Change Email </Text>
          </ListItem>
          {/* CHANGE PASSWORD BUTTON */}
          <ListItem noIndent 
            onPress={()=> navigation.navigate('Change Password')}>
            <Text style={{color:currentStyle.text.color}}> Change Password </Text>
          </ListItem>
          {/* CHANGE PICTURE BUTTON */}
          <ListItem noIndent 
            onPress={()=> navigation.navigate('Change Picture')}>
            <Text style={{color:currentStyle.text.color}}> Change Profile Picture </Text>
          </ListItem>
          {/* CHANGE NICKNAME BUTTON */}
          <ListItem noIndent 
            onPress={()=> navigation.navigate('Change Nickname')}>
            <Text style={{color:currentStyle.text.color}}> Change Nickname </Text>
          </ListItem>
          
        </List>
      </Content>  
    </Container>
  )
}
