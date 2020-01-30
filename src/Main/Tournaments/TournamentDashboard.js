import React, {useContext, useState} from 'react';
import { Container, Content, Text, Header, Icon, Segment, Spinner } from 'native-base';
import { RefreshControl, FlatList, View} from 'react-native'

import _Header from "../../View-Components/header";
import TournamentBody from './Components/TournamentBody';
import TournamentSearchBar from './Components/TournamentSearchBar';

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
  const [mode, setMode] = useState('byDate')

  const onRefresh = async(currentPage) => {
    setRefreshing(true);
    currentPage =1
    setPage(currentPage)
    var answer = await actions.tournament.getInitial()
    wait(2000).then(() => setRefreshing(false));
  }

  const getMore = async( currentPage ) => {
    console.log('page before', currentPage)
    currentPage += 8
    setPage(currentPage)
    console.log('page after', currentPage)
    var answer2 = await actions.tournament.getMore(currentPage, mode)
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
      city={item.city}
      state={item.state}
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

     
      <Header hasSegment style={{justifyContent:'space-between',alignItems:'center', backgroundColor:'rgb(248,248,248'}}>
        {/* MENU ICON */}
        <Icon name="menu" style={{marginLeft:10}}
          onPress={() => props.navigation.toggleDrawer()}/>
        
        {/* TITLE */}
        <Text style={{fontWeight:'bold'}}>Tournament Dashboard</Text>
         
        {/* TUTORIAL ICON */}
        <Icon style={{marginRight:10}} type="SimpleLineIcons" 
          name="question" onPress={()=> props.navigation.push('Tutorial')}
        />
      </Header>
      <Segment style={{backgroundColor:('rgb(248,248,248')}}>
        <TournamentSearchBar search={search} setSearch={setSearch}/>
      </Segment>
      <Content contentContainerStyle={{justifyContent:'center'}}>
      {/* TOURNAMENT LIST GENERATOR */}
      {store.tournaments != null ?
        store.tournaments.length != 0 ?
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
          :
          <Segment style={{width:'80%', marginTop:10, alignSelf:'center'}}>
            <Text style={{textAlign:'center', fontSize:18, justifyContent:'center'}}> There are no tournamnents under that name in our database</Text>
          </Segment>
        :  
        <Spinner />

          }
      </Content>
    </Container>
  )
}
