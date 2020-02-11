import React, {useContext} from 'react';
import { Container, View, Content, Text, List, ListItem } from 'native-base';

import OtherHeader from '../View-Components/OtherHeader'
import {Context } from '../Store/appContext'

export default SettingsScreen = (props) => {

  const { store, actions } = useContext(Context)

  return(
    <Container>
      <OtherHeader title={'Settings'} 
        goBackToHome={() => props.navigation.goBack(null)}/>
      <Content>
        
        <List>
          
          <ListItem noIndent 
            onPress={()=> props.navigation.navigate('ChangeEmail')}>
            <Text> Change Email </Text>
          </ListItem>

          <ListItem noIndent 
            onPress={()=> props.navigation.push('ChangePassword', {
              navigation: props.navigation
            }
            )}>
            <Text> Change Password </Text>
          </ListItem>
          
          <ListItem noIndent 
            onPress={()=> props.navigation.navigate('ChangePicture')}>
            <Text> Change Profile Picture </Text>
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
