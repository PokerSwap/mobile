import React, {useContext, useState} from 'react';
import { Container, List, ListItem, Content, Text } from 'native-base';
import { RefreshControl } from 'react-native'

import _Header from "../../View-Components/header";
import TournamentBody from './Components/TournamentBody';
import TournamentSearchBar from './Components/TournamentSearchBar';
import TournamentSort from './Components/TournamentSort';

import { Context } from '../../Store/appContext';

export default TournamentDashboard = (props) => {

  const { store, actions} = useContext(Context)

  const [sort, setSort] = useState('Current Location')
  const [search, setSearch] = useState('')

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const [refreshing, setRefreshing] = useState(false);
  const [refreshing2, setRefreshing2] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    actions.tournament.getInitial()
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const onRefresh2 = React.useCallback(() => {
    setRefreshing2(true);
    console.log('POP')
    wait(2000).then(() => setRefreshing2(false));
  }, [refreshing2]);

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
        key = {tournament.id}
        id = {tournament.id}
        name={tournament.name} 
        created_at={tournament.created_at} 
        updated_at={tournament.updated_at}
        address={tournament.address}
        latitude={tournament.latitude}
        longitude={tournament.longitude}
        flights={tournament.flights}
        buy_ins={tournament.buy_ins}
        swaps={tournament.swaps}
        start_at={tournament.start_at}
      />
)}
  return(
    <Container>
      <_Header title={'Tournament Dashboard'} 
      drawer={() => props.navigation.toggleDrawer()}
      tutorial={() => props.navigation.push('Tutorial')}/>
      <TournamentSearchBar search={search} setSearch={setSearch}/>
      <TournamentSort sort={sort} setSort={setSort} />
      
      <Content>
        
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      
        <List>
          {/* TOURNAMENT LIST GENERATOR */}
          {TournamentsList}
        </List>

      </Content>
    </Container>

  )
}
