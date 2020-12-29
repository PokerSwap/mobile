import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation, useRoute } from '@react-navigation/native'

import { View, RefreshControl,StatusBar, FlatList } from 'react-native'
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

  const { tournament_id, tournament_start, tournament_name, tournament_address,
    tournament_lat, tournament_long, casino } = route.params;

  const [ anEvent, setAnEvent ] = useState(null)
  const [ aTournament, setATournament ] = useState(null)
  const [ tStart, setTStart ] = useState(tournament_start)
  const [flights, setFlights] = useState([])
  const [ anAction, setAnAction] = useState(null)
  const [ refreshing, setRefreshing ] = useState(false)


  const getTournament = async() => {
    try{
      var answer1 = await actions.tournament.getCurrent(tournament_id)
      console.log('answer1', answer1)
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

  var FlightRow = ({item, index}) => {

    return(
      <FlightSchedule key={index}  event={aTournament} 
        action={anAction} my_buyin={item.myBuyInFlight}
        buyins={item.swapped_buyins} unbuyins={item.unswapped_buyins}
        flight = {item.flight} tournament={aTournament}/>
    )
  }  

   return(

    <View style={{flex:1, backgroundColor:currentStyle.background.color}}>

      <View style={{height:20,  backgroundColor:currentStyle.header.color}}>
        <StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
          backgroundColor={'rgb(38, 171, 75)'}/>
      </View>

      <OtherHeader title={'Event Lobby'}/>
      {/* <BounceColorWrapper style={{flex:1}} mainColor={currentStyle.background.color}> */}
      <List style={{backgroundColor:currentStyle.background.color}}>
        {/* TOURNAMENT HEADER */}
        <EventHeader 
          tournament_name={tournament_name} casino={casino}
          tournament_address={tournament_address} tournament_time={tournament_start} 
          lat={tournament_lat} long={tournament_long} />
        {/* TOURNEY BUYIN ENTRIES  */}
        {!aTournament ? 
          <Spinner /> 
          : 
          <FlatList
          data={store.currentLobby}
          renderItem={FlightRow}
          keyExtractor={(content, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} />}
          
          ListFooterComponent={<Text style={{textAlign:'center'}}></Text>} />}          
        </List>
        {/* </BounceColorWrapper> */}
      {/* FOOTER CONTAINS NUMBER OF SWAPS AND ACTION  */}
      <ActionBar action={anAction} />
    </View>
  )
}