import React, {useContext, useState} from 'react';
import { Container, List, ListItem, Text } from 'native-base';
import { RefreshControl, FlatList } from 'react-native'

import _Header from "../../View-Components/header";
import TournamentBody from './Components/TournamentBody';
import TournamentSearchBar from './Components/TournamentSearchBar';
import TournamentSort from './Components/TournamentSort';

import { Context } from '../../Store/appContext';
 
export default TournamentDashboard = (props) => {

  const { store, actions } = useContext(Context)

  // REFRESH SETUP FOR NEW TOURNAMENTS
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  const [refreshing, setRefreshing] = useState(false);

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8)
  const [order, setOrder] = useState('asc')

  const onRefresh = async(currentPage) => {
    setRefreshing(true);
    currentPage =1
    setPage(currentPage)
    var answer = await actions.tournament.getInitial(limit, order)
    wait(2000).then(() => setRefreshing(false));
  }

  const getMore = async( currentPage ) => {
    console.log('page before', currentPage)
    currentPage += limit
    setPage(currentPage)
    console.log('page after', currentPage)
    var answer2 = await actions.tournament.getMore(currentPage, limit, order)
  }
  
  const [search, setSearch] = useState('')  

  var TournamentRow = ({item}) => {
    return(
      <TournamentBody 
      navigation={props.navigation}
      id = {item.id}
      name={item.name} 
      created_at={item.created_at} 
      updated_at={item.updated_at}
      address={item.address}
      latitude={item.latitude}
      longitude={item.longitude}
      flights={item.flights}
      buy_ins={item.buy_ins}
      swaps={item.swaps}
      start_at={item.start_at}
    />)
  }

  return(
    <Container>
      <_Header 
        title={'Tournament Dashboard'} 
        drawer={() => props.navigation.toggleDrawer()}
        tutorial={() => props.navigation.push('Tutorial')}
      />
      <TournamentSearchBar search={search} setSearch={setSearch} limit={limit} order={order}/>
      <TournamentSort limit={limit} searchInput={search} order={order} setOrder={setOrder} page={page} setPage={setPage}/>
      
      {/* TOURNAMENT LIST GENERATOR */}
      {store.tournaments == [] ?
        <List>
          <ListItem>
            <Text>Sorry, there are no tournaments under that name</Text>
          </ListItem> 
        </List>
        :  
        <FlatList
          data={store.tournaments}
          renderItem={TournamentRow}
          keyExtractor={(content, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
          onEndReached={()=>getMore(page)}
          onEndReachedThreshold={0}
        />
      }
    </Container>
  )
}
