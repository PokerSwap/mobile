import React, {useContext} from 'react'
import { Button, Header, Icon, Input, Item, Text} from 'native-base';

import {Context} from '../../../Store/appContext'

export default TournamentSearchBar = (props) => {

  const { store, actions } = useContext(Context)
  return(
    <Header searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input 
          value={props.search}
          onChangeText={(value)=> props.setSearch(value)}
          placeholder="Search Tournaments" />
      </Item>
      <Button transparent onPress={()=> actions.tournament.getInitial(props.limit, props.order, undefined, undefined, undefined, undefined, props.search)}>
        <Text>Search</Text>
      </Button>
    </Header>
  )

}