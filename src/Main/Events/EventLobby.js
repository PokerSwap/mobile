import React, {useEffect, useContext} from 'react';
import {Container, Content, List, ListItem } from 'native-base';

import EventHeader from './Components/EventHeader'
import FlightSchedule from './Components/FlightSchedule';
import ActionBar from './Components/ActionBar'

import { Context } from '../../Store/appContext'

export default EventLobby = (props) => {

  const { store, actions } = useContext(Context)

  const { navigation } = props;
  // let action = navigation.getParam('action', 'NO-ID');
  // let tournament = navigation.getParam('tournament', 'NO-ID');
  // let flights = navigation.getParam('flights', 'NO-ID');
  // let buyins = navigation.getParam('buyins', 'NO-ID');
  // let my_buyin = navigation.getParam('my_buyin', 'NO-ID');

  let tournament = store.currentTournament.tournament
  let my_buyin = store.currentTournament.my_buyin
  let buyins = store.currentTournament.buyins
  let flights = store.currentTournament.tournament.flights
  let action = store.action

  var refreshTournament = async() => {
    try{
      tournament = store.currentTournament.tournament
      my_buyin = store.currentTournament.my_buyin
      buyins = store.currentTournament.buyins
      flights = store.currentTournament.tournament.flights
      action = store.action
    }catch(error){
      console.log('Something went wrong with refresh Tournaent',error)
    }
  }


  useEffect(() => {
    refreshTournament()
    return () => {
      // console.log()
    };
  }, [])

  var toFilterOne  = []
  var addToFilter = buyins.forEach((buyin) => 
    toFilterOne.push(buyin.recipient_user.id));
  
  var toFilter2 = [my_buyin.user_id, ...toFilterOne]  


  let tournamentBuyins 
  console.log('tournament.buy_ins.length', tournament.buyins)
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
      <FlightSchedule key={index} 
        navigation={props.navigation}
        my_buyin={myBuyInFlight}
        buyins={swappedBuyins}
        unbuyins={unswappedBuyins}
        flight = {flight} 
        tournament={tournament}/>)
  })

  return(
    <Container>      
      <Content>
        <List>
          
          {/* TOURNAMENT HEADER */}
          <ListItem itemHeader first>
            <EventHeader tournament={tournament}/>
          </ListItem>
 
          {/* TOURNEY BUYIN ENTRIES  */}
          {Flights}
             
        </List>

      </Content>

      {/* FOOTER CONTAINS NUMBER OF SWAPS AND ACTION  */}
      <ActionBar action={action} />
    </Container>
  )
}