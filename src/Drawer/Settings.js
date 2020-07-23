import React, {useContext} from 'react';
import { Container, View, Content, Text, List, ListItem } from 'native-base';

import OtherHeader from '../View-Components/OtherHeader'
import {Context } from '../Store/appContext'

export default SettingsScreen = (props) => {

  return(
    <Container>
      <OtherHeader title={'Settings'} 
        goBackToHome={() => props.navigation.goBack(null)}/>
      <Content>
        
        <List>
          
          <ListItem noIndent 
            onPress={()=> props.navigation.push('Change Email', {
              navigation: props.navigation
            })}>
            <Text> Change Email </Text>
          </ListItem>

          <ListItem noIndent 
            onPress={()=> props.navigation.push('Change Password', {
              navigation: props.navigation
            })}>
            <Text> Change Password </Text>
          </ListItem>
          
          <ListItem noIndent 
            onPress={()=> props.navigation.navigate('Change Picture')}>
            <Text> Change Profile Picture </Text>
          </ListItem>
          
        </List>
       
      </Content>  
    </Container>
  )
}
