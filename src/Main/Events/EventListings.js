import React, {useContext, useState, useEffect} from 'react';
import { Text,  Segment, Spinner, ListItem } from 'native-base';
import {  RefreshControl, FlatList, View} from 'react-native'
 
import HomeHeader from "../../View-Components/HomeHeader";
import EventBody from './Components/EventBody';
import EventSearchBar from './Components/EventSearchBar';

import { Context } from '../../Store/appContext';
 
export default EventListings = (props, navigation) => {
  const { store, actions } = useContext(Context)

  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1)
  // 3 modes orderByDistance, byZip, ByLocation
  const [mode, setMode] = useState('byDate')
  const [myCoords, setMyCoords] = useState({})

  // REFRESH TIMER FOR NEW TOURNAMENTS
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  // REFRESH FUNCTION FOR NEW TOURNAMENTS
  const onRefresh = async() => {
    setRefreshing(true);
    setPage(1)
    setMode('byDate')
    var answer = await actions.tournament.getInitial()
    wait(2000).then(() => setRefreshing(false));
  }
  // FUNCTION TO GET MORE TOURNAMENTS
  const getMore = async( currentPage ) => {
    currentPage += 12
    setPage(currentPage)
    if (mode == 'byLocation'){
      var answer1 = await actions.tournament.getMore(
        currentPage, 'lon', myCoords.longitude, 'lat', myCoords.latitude)
    }else {
      var answer2 = await actions.tournament.getMore(currentPage)
    }
  }
  // COMPONENT FOR TOURNAMENT BODY
  var EventRow = ({item, index}) => {
    return(
      <EventBody 
        key={index} navigation={props.navigation} 
        mode={mode} myCoords={myCoords}
        event={item} />
    )
  }

  const testData = {
      address: "1 Seminole Way",
      buy_in: false,
      casino: "SEMINOLE Hard Rock",
      city: "Hollywood",
      created_at: "Thu, 02 Jul 2020 15:28:37 GMT",
      day: "1B",
      id: 968,
      name:"2020 $150 Escalator IV S100,000 GTD",
      action:{actions:0,swaps:0},
      start_at: "Sat, 22 Feb 2020 10:00:00 GMT",
      state: "Florida",
      tournament: "2020 $150 Escalator IV S100,000 GTD",
      tournament_id: 882,
      updated_at: "Thu, 02 Jul 2020 15:28:37 GMT",
      zip_code: "33073"
    
  }

  return(
    <View style={{flex:1}}>
      {/* HEADER */}
      <HomeHeader title={'Event Listings'} 
        drawer={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        tutorial={() => props.navigation.push('Tutorial')} />
      {/* SEARCH BAR COMPONENT */}
      <Segment style={{backgroundColor:('rgb(248,248,248'), marginVertical:5}}>
        <EventSearchBar setMyCoords={setMyCoords} 
          setMode={setMode} setPage={setPage} />
      </Segment>
      {/* MAIN TOURNAMENT COMPONENT */}
      <EventBody  navigation={props.navigation} 
        mode={mode} myCoords={myCoords}
        event={testData} /> 
      {store.tournamentList != null ?
        store.tournamentList.length != 0 ?
          // TOURNAMENT LIST GENERATOR 
          <FlatList
            data={store.tournamentList}
            renderItem={EventRow}
            keyExtractor={(content, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh} />}
            onEndReachedThreshold={0.99}
            onEndReached ={()=>getMore(page) }
            ListFooterComponent={
              <ListItem style={{  
                height:50, justifyContent: 'center' }}>
                <Text style={{textAlign:'center'}}>
                  
                </Text>
              </ListItem> } />
          :
          // CONDITION IF NO TOURNAMENTS ARE FOUND UNDER FIELDS
          <Segment style={{
            width:'80%', marginTop:10, alignSelf:'center'}}>
            <Text style={{textAlign:'center', 
              fontSize:18, justifyContent:'center'}}> 
              There are no tournamnents under that name in our database
            </Text>
          </Segment>
        :  
        // CONDITION USED WHILE LOADING THE TOURNAMENTS
        <Spinner /> }
  </View>
  )
}