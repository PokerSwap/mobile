import React, {useContext, useState} from 'react';
import { Container, List, ListItem, Content, Text } from 'native-base';

import _Header from "../../View-Components/header";
import TournamentBody from './Components/TournamentBody';
import TournamentSearchBar from './Components/TournamentSearchBar';
import TournamentSort from './Components/TournamentSort';

import { Context } from '../../Store/appContext';

export default TournamentDashboard = (props) => {

  const { store, actions} = useContext(Context)

  const [sort, setSort] = useState('Current Location')
  const [search, setSearch] = useState('')

  var TournamentsList;
  if (store.tournaments== null){
    TournamentsList = 
    <ListItem>
      <Text>Sorry, there are no tournaments under that name</Text>
    </ListItem> 
  } else {

    
  TournamentsList = store.tournaments.map((tournament) => 
      <TournamentBody 
        navigation={props.navigation}
        id = {tournament.id}
        action = {tournament.action}
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
)}
  return(
    <Container>
      <_Header title={'Tournament Dashboard'} drawer={() => props.navigation.toggleDrawer()}/>
      
      <TournamentSearchBar search={search} setSearch={setSearch}/>
      
      <TournamentSort sort={sort} setSort={setSort} />
      
      <Content>
        <List>
          {/* TOURNAMENT LIST GENERATOR */}
          {TournamentsList}
        </List>
      </Content>
      
    </Container>

  )
}
