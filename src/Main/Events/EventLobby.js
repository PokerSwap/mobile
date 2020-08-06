import React, { useState, useContext, useEffect } from 'react';
import { Container, Content, List, Spinner } from 'native-base';
import { useNavigation, useRef, useRoute } from '@react-navigation/native'

import { Context } from '../../Store/appContext'

import EventHeader from './Components/EventHeader'
import FlightSchedule from './Components/FlightSchedule';
import ActionBar from './Components/ActionBar'

export default EventLobby = () => {
  const { store, actions } = useContext(Context)

  const route = useRoute()
  const navigation = useNavigation()
  const { event } = route.params;
  const { tournament_id } = route.params;  
  const { tournament_start } = route.params;
  const { tournament_name } = route.params;
  const { flight_id } = route.params;

  var startAction, startTournament, startTime, startName, startEvent;
  if(event){
    startEvent= event, startName=event.tournament.name, startAction = event.action, startTournament = event.tournament, startTime = event.tournament.start_at;
  }else{
    startEvent= null, startName=tournament_name, startAction = null, startTournament = null, startTime = tournament_start;
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
      var answer2 = await actions.tournament.retrieveAction(tournament_id)
      setAnAction(answer2)
      
      setAnEvent(store.currentTournament)     
      var answer3 = await actions.time.convertLong(startTime)     
      setTStart(answer3)
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
    <Container>      
      <Content>
        <List>
          {/* TOURNAMENT HEADER */}
          <EventHeader 
            tournament_name={startName}
            tournamentTime={tStart} />
          {/* TOURNEY BUYIN ENTRIES  */}
          {!aTournament ? <Spinner /> : Flights }          
        </List>
      </Content>
      {/* FOOTER CONTAINS NUMBER OF SWAPS AND ACTION  */}
      <ActionBar action={anAction} />
    </Container>
  )
}