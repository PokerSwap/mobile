import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation, useRoute } from '@react-navigation/native'

import { View } from 'react-native'
import { Container, Content, List, Spinner, Header, Text } from 'native-base';
import { HeaderBackButton } from '@react-navigation/stack'

import EventHeader from './Components/EventHeader'
import FlightSchedule from './Components/FlightSchedule';
import ActionBar from './Components/ActionBar'

import BounceColorWrapper from '../../Functional/BounceColorWrapper'
import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default EventLobby = () => {
  const { store, actions } = useContext(Context)
  const route = useRoute()
  const navigation = useNavigation()

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const { event,tournament_id, tournament_start, tournament_name, tournament_address } = route.params;

  var startAction, startTournament, startTime, startName, startEvent, startAddress, startLat, startLong;
  if(event){
    startEvent= event, startName=event.tournament.name, startAction = event.action,
    startTournament = event.tournament, startTime = event.tournament.start_at, 
    startLat=event.tournament.latitude, startLong=event.tournament.longitude,
    startAddress = event.tournament.casino + '\n' +event.tournament.address + '\n' + 
      event.tournament.city + ', ' + event.tournament.state + ' ' + event.tournament.zip_code
  }else{
    startEvent= null, startName=tournament_name, startAction = null, 
    startTournament = null, startTime = tournament_start, startAddress = tournament_address,
    startLat= null, startLong= null
  }

  const [ anEvent, setAnEvent ] = useState(startEvent)
  const [ aTournament, setATournament ] = useState(startTournament)
  const [ tStart, setTStart ] = useState(startTime)
  const [ anAction, setAnAction] = useState(startAction)
  const [ refreshing, setRefreshing ] = useState(true)

  useEffect(() => {  
    const unsubscribe = navigation.addListener('focus', () => {
      getTournament() 
    });
    return () => {
      unsubscribe
    }
  }, [])
 
  const getTournament = async() => {
    try{
      console.log('getting tournament from lobby')
      var answer1 = await actions.tournament.getCurrent(tournament_id)

      setATournament(store.currentTournament.tournament)
      setAnEvent(store.currentTournament)
      var answer2 = await actions.tournament.retrieveAction(tournament_id)
      setAnAction(answer2)

      
      // setAnEvent(store.currentTournament)     
      // var answer3 = await actions.time.convertLong(startTime)     
      // setTStart(answer3)
    } catch(error){
      console.log('Something went wrong with getting Tournaent',error)
    }
  }


  
  // FLIGHT SCHEDUELE MAPPER
  if(anEvent && aTournament){
    var toFilterOne  = []
    var addToFilter = anEvent.buyins.forEach((buyin) => 
      toFilterOne.push(buyin.recipient_user.id));
    var toFilter2 = [anEvent.my_buyin.user_id, ...toFilterOne]  

    let tournamentBuyins 
    if (aTournament.buy_ins.length !== 0){
      tournamentBuyins = aTournament.buy_ins.filter( buyin => 
        toFilter2.includes(buyin.user_id) != true)
    }else{
      tournamentBuyins = []
    }

    // FLIGHT SCHEDUELE RENDER METHOD
    var Flights = aTournament.flights.map((flight, index) => {       
      var myBuyInFlight
      anEvent.my_buyin.flight_id == flight.id ? 
        myBuyInFlight = anEvent.my_buyin : myBuyInFlight = []
      
      var swappedBuyins =[]
      var addingtoSwappedBuyins = anEvent.buyins.forEach(buyin => {
        buyin.recipient_buyin.flight_id == flight.id ?
          swappedBuyins.push(buyin) : null
      })
      
      var unswappedBuyins = []
      var addingtoSwappedBuyins = tournamentBuyins.forEach(buyin => {
        buyin.flight_id == flight.id ?
          unswappedBuyins.push(buyin) : null
    });

    return(
      <FlightSchedule key={index} 
        action={anAction} my_buyin={myBuyInFlight}
        setRefreshing={setRefreshing}
        buyins={swappedBuyins} unbuyins={unswappedBuyins}
        flight = {flight} tournament={aTournament}/>)
    })
  }else{
    null
  }

  

  return(
    <Container contentContainerStyle={{backgroundColor:currentStyle.background.color}}>      
      {/* <Header style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', backgroundColor:'rgb(248,248,248)'}}>
        <HeaderBackButton onPress={()=> navigation.popToTop()} style={{width:'20%'}}/>
        <Text style={{textAlign:'center', width:'60%', alignSelf:'center', fontSize:24, fontWeight:'600'}}>Event Lobby</Text>
        <View style={{width:'20%'}}/>
      </Header> */}
      <BounceColorWrapper style={{flex:1}} mainColor={currentStyle.background.color}>

      <Content contentContainerStyle={{backgroundColor:currentStyle.background.color}}>
        <List style={{backgroundColor:currentStyle.background.color}}>
          {/* TOURNAMENT HEADER */}
          <EventHeader 
            tournament_name={startName}
            tournament_address={startAddress} tournamentTime={tStart} 
            lat={startLat} long={startLong} />
          {/* TOURNEY BUYIN ENTRIES  */}
          {!aTournament ? <Spinner /> : Flights }          
        </List>
      </Content>
      </BounceColorWrapper>

      {/* FOOTER CONTAINS NUMBER OF SWAPS AND ACTION  */}
      <ActionBar action={anAction} />
    </Container>
  )
}