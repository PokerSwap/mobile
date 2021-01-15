import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation, useRoute } from '@react-navigation/native'

import { AppState, View, RefreshControl,StatusBar, FlatList, ScrollView } from 'react-native'
import { Container, Content, List,ListItem, Spinner, Header, Text } from 'native-base';
import { HeaderBackButton } from '@react-navigation/stack'
import messaging from '@react-native-firebase/messaging'

import EventHeader from './Components/EventHeader'
import FlightSchedule from './Components/FlightSchedule';
import ActionBar from './Components/ActionBar'
import OtherHeader from '../../View-Components/OtherHeader'

import BounceColorWrapper from '../../Functional/BounceColorWrapper'
import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default EventLobby = () => {
  const { store, actions } = useContext(Context)
  const route = useRoute()
  const navigation = useNavigation()

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const { tournament, tournament_id } = route.params;

  const [ anEvent, setAnEvent ] = useState(null)
  const [ aTournament, setATournament ] = useState(null)
  const [ tStart, setTStart ] = useState(tournament.start_at)
  const [ flights, setFlights ] = useState([])
  const [ anAction, setAnAction ] = useState(null)
  const [ refreshing, setRefreshing ] = useState(false)


  const getTournament = async() => {
    try{
      var answer1 = await actions.tournament.getCurrent(tournament_id)
      // console.log('answer1', answer1)
      setATournament(answer1.tournament)
      setAnEvent(answer1)
      var answer2 = await actions.tournament.retrieveAction(tournament_id)
      setAnAction(answer2) 
      var xee = actions.tournament.setCurrentLobby(answer1, answer1.tournament)
    } catch(error){
      console.log('Something went wrong with getting Tournaent',error)
    }
  }

  useEffect(() => {  
    const unsubscribe = navigation.addListener('focus', () => {
      getTournament() 
    });
    return () => {
      unsubscribe
    }
  }, [refreshing])

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTournament()
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  // REFRESH AFTER REOPENING FROM BACKGROUND (START)

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground on Event Lobby!");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    getTournament()
    console.log("AppState", appState.current);
  };

 // REFRESH AFTER REOPENING FROM BACKGROUND (END)

  var FlightRow = ({item, index}) => {

    return(
      <FlightSchedule key={index}  event={aTournament} 
        action={anAction} my_buyin={item.myBuyInFlight}
        buyins={item.swapped_buyins} unbuyins={item.unswapped_buyins}
        flight = {item.flight} tournament={aTournament}/>
    )
  }  

   return(

    <View style={{flex:1, height:'100%',flexDirection:'column', top:0,  backgroundColor:currentStyle.background.color}}>
      
      <View style={{height:40, position:'absolute', top:0, alignSelf:'flex-start',  backgroundColor:currentStyle.header.color}}>
    	<StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
        	backgroundColor={'rgb(38, 171, 75)'}/>
      </View>

      <OtherHeader  title={'Event Lobby'}/>
      
      {/* <BounceColorWrapper style={{flex:1}} mainColor={currentStyle.background.color}> */}

      <View  style={{alignSelf:'flex-start', }}>
      
      <List style={{backgroundColor:currentStyle.background.color}}>
        {/* TOURNAMENT HEADER */}
        <EventHeader tournament={tournament}  />
        <ActionBar style={{alignSelf:'flex-start'}} action={anAction} />

        {/* TOURNEY BUYIN ENTRIES  */}
        {!aTournament ? 
        	<Spinner /> 
          
			: 
			<FlatList
				data={store.currentLobby}
				renderItem={FlightRow}
				keyExtractor={(content, index) => index.toString()}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				ListFooterComponent={<Text style={{textAlign:'center'}}></Text>} />}          
        </List>

        </View> 

        {/* </BounceColorWrapper> */}
      {/* FOOTER CONTAINS NUMBER OF SWAPS AND ACTION  */}
    </View>
  )
}