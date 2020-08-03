import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, StatusBar } from 'react-native'
import { Text, Icon, List, ListItem } from 'native-base';
import { useNavigation } from '@react-navigation/native'


import { Context } from '../Store/appContext'
import OtherHeader from '../View-Components/OtherHeader';

export default TutorialListScreen = (props) => {
  const { store, actions } = useContext(Context) 
  const [ loading, setLoading ] = useState(false) 

  const navigation = useNavigation()

  
  return(
    <View>
      <OtherHeader title='Help'/>
      <List>
        <ListItem onPress={() => navigation.navigate('How to Swap')}>
          <Text>How to Swap</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate()}>
          <Text>Profile Tutorial</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate()}>
          <Text>Enter a Tournament</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate()}>
          <Text>Check Your Results</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate("Web View", 
          {url: 'https://www.swapprofitonline.com/faqspoker/'})}>
          <Text>Frequently Asked Questions</Text>
        </ListItem>
      </List>
    </View>
  )
}