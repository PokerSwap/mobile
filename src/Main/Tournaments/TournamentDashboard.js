import React, {useContext, useState} from 'react';
import { Text, Header, Icon, Segment, Spinner, ListItem } from 'native-base';
import { ScrollView, RefreshControl, FlatList, View} from 'react-native'
 
import HomeHeader from "../../View-Components/HomeHeader";
import TournamentBody from './Components/TournamentBody';
import TournamentSearchBar from './Components/TournamentSearchBar';
import { Context } from '../../Store/appContext';
 
export default TournamentDashboard = (props) => {

  const { store, actions } = useContext(Context)

  const [refreshing, setRefreshing] = useState(false);
  const [scrollEnd, setScrollEnd] = useState(false)
  const [page, setPage] = useState(1)
  // 3 modes orderByDistance, byZip, ByLocation
  const [mode, setMode] = useState('byDate')
  const [myCoords, setMyCoords] = useState({})

  console.log('mode is now', mode)

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
    wait(2000).then(() => setRefreshing(false));
  }
  // FUNCTION TO GET MORE TOURNAMENTS
  const getMore = async( currentPage ) => {
    console.log('page before', currentPage)
    currentPage += 8
    setPage(currentPage)
    console.log('page after', currentPage)
    var answer2 = await actions.tournament.getMore(currentPage)
  }
  // COMPONENT FOR TOURNAMENT BODY
  var TournamentRow = ({item, index}) => {
    return(
      <TournamentBody 
        key={index} navigation={props.navigation} mode={mode} myCoords={myCoords}
        id = {item.id} name={item.name} start_at={item.start_at}
        created_at={item.created_at} 
        address={item.address} city={item.city} state={item.state}
        latitude={item.latitude} longitude={item.longitude}
        flights={item.flights} buy_ins={item.buy_ins} swaps={item.swaps}/>
    )
  }

  return(
    <View style={{flex:1}}>
      
      <HomeHeader title={'Event Listings'} 
      drawer={() => props.navigation.toggleDrawer()}
      tutorial={() => props.navigation.push('Tutorial')}
      />
      <Segment style={{backgroundColor:('rgb(248,248,248'), marginVertical:5}}>
        <TournamentSearchBar 
          setMode={setMode} setMyCoords={setMyCoords}
          setPage={setPage}
        />
      </Segment>
      
      {/* MAIN COMPONENT */}
      {store.tournaments != null ?
        store.tournaments.length != 0 ?
        // TOURNAMENT LIST GENERATOR 
        <FlatList
          data={store.tournaments}
          renderItem={TournamentRow}
          keyExtractor={(content, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
          onEndReachedThreshold={0.99}
          onEndReached ={()=>getMore(page) }
          ListFooterComponent={
            <ListItem style={{  
              height:50, justifyContent: 'center' }}>
              <Text style={{textAlign:'center'}}>
                End of List
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
