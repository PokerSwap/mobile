import React, {useContext} from 'react';
import {Alert,TouchableOpacity} from 'react-native';
import { Container, Button, Content, Text, List, ListItem } from 'native-base';
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
          <Button onPress={()=> props.navigation.navigate('SettingsChanger')}>
              <Text> Change Email </Text>
          </Button>
          <TouchableOpacity onPress={()=> props.navigation.navigate('SettingsChanger')}>
              <Text> Change Profile Picture </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> props.navigation.navigate('SettingsChanger')}>
            <ListItem>
              <Text> Change Password </Text>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> props.navigation.navigate('SettingsChanger')}>
            <ListItem>
              <Text> Leave Feedback </Text>
            </ListItem>
          </TouchableOpacity>
          
        </List>
       
      </Content>  
    </Container>
  )
}
