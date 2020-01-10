import React, {useContext} from 'react'
import { Button, Header, Icon, Input, Item, Text} from 'native-base';


import {Context} from '../../../Store/appContext'
import { TouchableWithoutFeedback, TextInput, Keyboard, ScrollView } from 'react-native';

export default TournamentSearchBar = (props) => {

  const { store, actions } = useContext(Context)
  
  return(
    <Header searchBar rounded>
      <ScrollView style={{flex: 1}}
        keyboardShouldPersistTaps='handled'>
        <Item style={{width:'100%'}}>
          <Icon name="ios-search" />
          <TextInput 
            value={props.search}
            onChangeText={(value)=> props.setSearch(value)}
            placeholder="Search Tournaments" />
        </Item>
      </ScrollView>
      <Button transparent onPress={()=> actions.tournament.getInitial(props.limit, props.order, undefined, undefined, undefined, undefined, props.search)}>
        <Text>Search</Text>
      </Button>
    </Header>
  )
}