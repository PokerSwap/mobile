import React, {useContext} from 'react';
import {Alert} from 'react-native';
import { Container, Content, Text, List, ListItem } from 'native-base';
import _Header from '../View-Components/header'
import { TouchableOpacity } from 'react-native-gesture-handler';

import {Context } from '../Store/appContext'




export default SettingsScreen = (props) => {

  const { store, actions } = useContext(Context)
  
  // const showAlert = (message) =>{
  //   Alert.alert(
  //     "Confirmation",
  //     'Are you sure this is you?',
  //     [
  //       {
  //         text: 'Yes',
  //         onPress: () => props.next()
  //       },
  //       {
  //         text: 'No',
  //         onPress: () => console.log("Cancel Pressed"),
  //       }
  //     ]
  //   )
  // }

  return(
    <Container>
      <_Header title={'Settings'} 
        drawer={() => props.navigation.toggleDrawer()}
        tutorial={() => props.navigation.push('Tutorial')}
      />
      <Content>
        <List>
          <TouchableOpacity onPress={()=> props.navigation.push()}>
            <ListItem>
              <Text> Change Email </Text>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> props.navigation.push()}>
            <ListItem>
              <Text> Change Profile Picture </Text>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> props.navigation.push()}>
            <ListItem>
              <Text> Change Password </Text>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> props.navigation.push()}>
            <ListItem>
              <Text> Change Payout Method </Text>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> props.navigation.push()}>
            <ListItem>
              <Text> Leave Feedback </Text>
            </ListItem>
          </TouchableOpacity>
          
        </List>
       
      </Content>  
    </Container>
  )
}
