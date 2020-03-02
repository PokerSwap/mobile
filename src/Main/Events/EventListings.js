import React, {useContext, useState} from 'react';
import { Text,  Segment, Spinner, ListItem } from 'native-base';
import {  RefreshControl, FlatList, View} from 'react-native'
 
import HomeHeader from "../../View-Components/HomeHeader";
import EventBody from './Components/EventBody';
import EventSearchBar from './Components/EventSearchBar';
import { Context } from '../../Store/appContext';
 
export default EventListings = (props) => {

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
    var answer = await actions.tournament.getInitial()
    console.log('page',page)
    console.log(store.tournaments)
    wait(2000).then(() => setRefreshing(false));
  }
  // FUNCTION TO GET MORE TOURNAMENTS
  const getMore = async( currentPage ) => {
    // console.log('page before', currentPage)
    currentPage += 8
    setPage(currentPage)
    // console.log('page after', currentPage)
    var answer2 = await actions.tournament.getMore(currentPage)
  }
  // COMPONENT FOR TOURNAMENT BODY
  var EventRow = ({item, index}) => {
    return(
      <EventBody 
        key={index} navigation={props.navigation} 
        mode={mode} myCoords={myCoords}
        tournament = {item.tournament}
        buyins={item.buyins}
        my_buyin={item.my_buyin}
        />
    )
  }

  return(
    <View style={{flex:1}}>
      
      <HomeHeader title={'Event Listings'} 
        drawer={() => props.navigation.toggleDrawer()}
        tutorial={() => props.navigation.push('Tutorial')} />
      <Segment style={{backgroundColor:('rgb(248,248,248'), marginVertical:5}}>
        <EventSearchBar setMyCoords={setMyCoords} 
          setMode={setMode} setPage={setPage} />
      </Segment>
      
      {/* MAIN COMPONENT */}
      {store.tournaments != null ?
        store.tournaments.length != 0 ?
        // TOURNAMENT LIST GENERATOR 
        <FlatList
          data={store.tournaments}
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
            </ListItem>}
        />
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
      <Spinner />
      }
  </View>
  )
}
