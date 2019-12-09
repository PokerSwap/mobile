import React, {useContext} from 'react';
import { Container, Content, Text, List, ListItem } from 'native-base';
import _Header from '../View-Components/header'
import { TouchableOpacity } from 'react-native-gesture-handler';

import {Context } from '../Store/appContext'

export default SettingsScreen = (props) => {

  const { store, actions } = useContext(Context)
  
  return(
    <Container>
      <_Header title={'Settings'} 
        drawer={() => props.navigation.toggleDrawer()}
        
      />
      <Content>
        <List>
          <TouchableOpacity>
            <ListItem>
              <Text> Change Email </Text>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> props.navigation.push()}>
            <ListItem>
              <Text> Change Password </Text>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity>
            <ListItem>
              <Text> Change Payout Method </Text>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity>
            <ListItem>
              <Text> Leave Feedback </Text>
            </ListItem>
          </TouchableOpacity>
          
        </List>
       
      </Content>  
    </Container>
  )
}
