import React, { useContext } from 'react';
import { Context } from '../Store/appContext';
import { useNavigation } from '@react-navigation/native'

import { Text, Icon, List, ListItem, Content, Container } from 'native-base';

import OtherHeader from '../View-Components/OtherHeader';

import darkStyle from '../Themes/dark.js'
import lightStyle from '../Themes/light.js'

export default TutorialListScreen = () => {
  const { store, actions } = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const navigation = useNavigation()

  return(
    <Container style={{backgroundColor:currentStyle.background.color}}>
      <OtherHeader title='Help'/>
      <Content contentContainerStyle={{backgroundColor:currentStyle.background.color}}>
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
          <Icon type="FontAwesome5" name="question-circle" style={{paddingRight:10, color: currentStyle.text.color}}/>
          <Text style={{color:currentStyle.text.color}}>Frequently Asked Questions</Text>
        </ListItem>
      </List>
      </Content>
      </Container>
  )
}