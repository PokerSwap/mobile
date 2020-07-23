import React, {useContext} from 'react';
import { Container, View, Content, Text, List, ListItem } from 'native-base';

import OtherHeader from '../View-Components/OtherHeader'
import { useNavigation } from '@react-navigation/native';

export default SettingsScreen = (props) => {
  const navigation = useNavigation()
  return(
    <Container>
      <OtherHeader title={'Settings'} 
        goBackToHome={() => navigation.goBack(null)}/>
      <Content>
        
        <List>
          
          <ListItem noIndent 
            onPress={()=> navigation.navigate('Change Email')}>
            <Text> Change Email </Text>
          </ListItem>

          <ListItem noIndent 
            onPress={()=> navigation.navigate('Change Password')}>
            <Text> Change Password </Text>
          </ListItem>
          
          <ListItem noIndent 
            onPress={()=> navigation.navigate('Change Picture')}>
            <Text> Change Profile Picture </Text>
          </ListItem>
        </List>
      </Content>  
    </Container>
  )
}
