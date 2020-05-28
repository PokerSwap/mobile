import React, { useEffect, useContext } from 'react';
import { Container, Content, List, Spinner } from 'native-base';

import { Context } from '../../Store/appContext'

import EventHeader from './Components/EventHeader'
import FlightSchedule from './Components/FlightSchedule';
import ActionBar from './Components/ActionBar'

export default EventLobby = (props) => {
  const { store, actions } = useContext(Context)
  let tournament = props.navigation.getParam('tournament', 'NO-ID');

  useEffect(() => {
    getTournament()
    return () => {
      // console.log()
    };
  }, [])

  console.log('tournamnet', tournament)
   var Flights = null

   console.log('curretnt', store.currentTournament)

  var getTournament = async() => {
    try{
      var answer1 = await actions.tournament.getCurrent(tournament.id)
      var answer2 = await actions.tournament.getAction(tournament.id)
      console.log('curretnt', store.currentTournament)
    } catch(error){
      console.log('Something went wrong with getting Tournaent',error)
    }
  }
  if(store.currentTournament !=={}){
    let currentTournament = store.currentTournament.tournament
    let my_buyin = store.currentTournament.my_buyin
    let buyins = store.currentTournament.buyins
    let flights = store.currentTournament.tournament.flights
    let action = store.action

    var toFilterOne  = []
  var addToFilter = buyins.forEach((buyin) => 
    toFilterOne.push(buyin.recipient_user.id));
  var toFilter2 = [my_buyin.user_id, ...toFilterOne]  

  let tournamentBuyins 
  if (tournament.buy_ins.length !== 0){
    tournamentBuyins = tournament.buy_ins.filter( buyin => 
      toFilter2.includes(buyin.user_id) != true)
  }else{
    tournamentBuyins = []
  }

  var Flights = flights.map((flight, index) => {       
    var myBuyInFlight
    my_buyin.flight_id == flight.id ? 
      myBuyInFlight = my_buyin : myBuyInFlight = []
    
    var swappedBuyins =[]
    var addingtoSwappedBuyins = buyins.forEach(buyin => {
      buyin.recipient_buyin.flight_id == flight.id ?
        swappedBuyins.push(buyin) : null
    })
    
    var unswappedBuyins = []
    var addingtoSwappedBuyins = tournamentBuyins.forEach(buyin => {
      buyin.flight_id == flight.id ?
        unswappedBuyins.push(buyin) : null
  });

    return(
      <FlightSchedule 
        key={index} navigation={props.navigation}
        my_buyin={myBuyInFlight}
        buyins={swappedBuyins} unbuyins={unswappedBuyins}
        flight = {flight} tournament={tournament}/>)
  })
  }else{

  }

  return(
    <Container>      
      <Content>
        <List>
          {/* TOURNAMENT HEADER */}
          <EventHeader tournament={tournament}/>
          {/* TOURNEY BUYIN ENTRIES  */}
          {store.currentTournament !=={} ?
            Flights :
            <Spinner/>}
        </List>
      </Content>
      {/* FOOTER CONTAINS NUMBER OF SWAPS AND ACTION  */}
      {/* <ActionBar action={action} /> */}
    </Container>
  )
}