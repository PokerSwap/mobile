import React from 'react';
import { View } from 'react-native'
import { Text, Icon, List, ListItem, Content, Container } from 'native-base';
import { useNavigation } from '@react-navigation/native'

import OtherHeader from '../View-Components/OtherHeader';

export default TutorialListScreen = () => {
  const navigation = useNavigation()

  return(
    <Container>
      <OtherHeader title='Help'/>
      <Content>
      <List>
        {/* <ListItem onPress={() => navigation.navigate('How to Swap')}>
          <Icon type="FontAwesome5" name="handshake"/>
          <Text>How to Swap</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate()}>
          <Icon type="FontAwesome5" name="user"/>
          <Text>Profile Tutorial</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate()}>
          <Icon type="MaterialCommunityIcons" name="tournament"/>
          <Text>Enter a Tournament</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate()}>
          <Icon type="FontAwesome5" name="donate"/>
          <Text>Coins</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate()}>
          <Icon type="FontAwesome5" name="envelope-open-text"/>
          <Text>Check Your Results</Text>
        </ListItem> */}
        <ListItem onPress={() => navigation.navigate("Web View", 
          {url: 'https://www.swapprofitonline.com/faqspoker/'})}>
          <Icon type="FontAwesome5" name="question-circle" style={{paddingRight:10}}/>
          <Text>Frequently Asked Questions</Text>
        </ListItem>
      </List>
      </Content>
      </Container>
  )
}