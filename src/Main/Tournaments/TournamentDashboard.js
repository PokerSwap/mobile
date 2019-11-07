import React, {useContext, useState, useEffect} from 'react';

import { Container, List, Content, Segment, Button, Text, Header,Item, Icon, Input } from 'native-base';

import _Header from "../../View-Components/header";
import TournamentBody from './Components/TournamentBody';
import { Context } from '../../Store/appContext'

TournamentSort = (props) => {

  // const [active1, setActive1] = useState('active'.raw())
  // const [active2, setActive2] = useState(''.raw())


  return(
    <Segment >
      <Button first active onPress={()=> 
        props.setSort('Zip Code')

        }>
        <Text>Zip Code</Text>
      </Button>
      <Button last onPress={()=> {
        props.setSort('Current Location')
        }}>
        <Text>Current Location</Text>
      </Button>
    </Segment>
  )
}

export default TournamentDashboard = (props) => {

  const [search, setSearch] = useState('')

  const { store, actions} = useContext(Context)

  const [sort, setSort] = useState('Current Location')

  useEffect(() => {
    actions.tournament.getAll()

    return () => {
      // cleanup
    };
  }, [])

  var TournamentsList;
  if (false){
    TournamentsList = 
    <ListItem>
      <Text>Sorry, there are no tournaments under that name</Text>
    </ListItem> 
  } else {
  TournamentsList = store.tournaments.map((tournament) => 
    <TournamentBody 
      navigation={props.navigation}
      id = {tournament.id}
      action = {actions.tournament.getAction(tournament.id)}
      name={tournament.name} 
      created_at={tournament.created_at} 
      updated_at={tournament.updated_at}
      address={tournament.address}
      latitude={tournament.latitude}
      longitude={tournament.longitude}
      flights={tournament.flights}
      start_at={tournament.start_at}
      end_at={tournament.end_at}
    />
  
)
}
  return(
    <Container>
      <_Header title={'Tournament Dashboard'} drawer={() => props.navigation.toggleDrawer()}/>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input 
            value={search}
            onChangeText={(value)=> setSearch(value)}
            placeholder="Search Tournaments" />
        </Item>
        <Button transparent onPress={()=> actions.tournament.getSpecific(search)}>
          <Text>Search</Text>
        </Button>
      </Header>
      <TournamentSort sort={sort} setSort={setSort}/>
       
      <Content>
        <List>
          
          {/* TOURNAMENT LIST GENERATOR */}
          {TournamentsList}
        </List>
      </Content>
    </Container>

  )
}
