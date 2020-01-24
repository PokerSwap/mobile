import React, {useContext} from 'react';
import {Alert,TouchableOpacity} from 'react-native';
import { Container, View, Content, Text, List, ListItem } from 'native-base';
import _Header from '../View-Components/header'

import {Context } from '../Store/appContext'




export default SettingsScreen = (props) => {

  const { store, actions } = useContext(Context)

  return(
    <Container>
      <_Header title={'Settings'} 
        drawer={() => props.navigation.toggleDrawer()}
        tutorial={() => props.navigation.push('Tutorial')}
      />
      <Content>
        <List>
          
          <ListItem noIndent 
            onPress={()=> props.navigation.push('SettingsChanger', {
              setting:'changeEmail'
            })}>
            <Text> Change Email </Text>
          </ListItem>
          
          <ListItem noIndent 
            onPress={()=> props.navigation.push('SettingsChanger', {
              setting:'changePicture'
            })}>
            <Text> Change Profile Picture </Text>
          </ListItem>
          
          <ListItem noIndent 
            onPress={()=> props.navigation.push('SettingsChanger', {
              setting:'changePassword'
            })}>
            <Text> Change Password </Text>
          </ListItem>
          
          {/* <ListItem noIndent 
            onPress={()=> props.navigation.push('SettingsChanger', {
              setting:'leaveFeedback'
            })}>
            <Text> Leave Feedback </Text>
          </ListItem> */}
          
        </List>
       
      </Content>  
    </Container>
  )
}
