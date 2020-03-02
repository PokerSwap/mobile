import React from 'react';
import {Container, Content, List, ListItem } from 'native-base';

import EventHeader from './Components/EventHeader'
import FlightSchedule from './Components/FlightSchedule';
import ActionBar from './Components/ActionBar'

export default EventLobby = (props) => {

  const { navigation } = props;
  let action = navigation.getParam('action', 'NO-ID');
  let tournament = navigation.getParam('tournament', 'NO-ID');
  let flights = navigation.getParam('flights', 'NO-ID');
  let buyins = navigation.getParam('buyins', 'NO-ID');
  let my_buyin = navigation.getParam('my_buyin', 'NO-ID');

  var toFilterOne  = []
  var addToFilter = buyins.forEach((buyin) => 
    toFilterOne.push(buyin.recipient_user.id));
  
  var toFilter2 = [my_buyin.user_id, ...toFilterOne]  

  const tournamentBuyins = tournament.buy_ins.filter( buyin => 
      toFilter2.includes(buyin.user_id) != true
  )

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
  
    // console.log('Flight ' + flight.id)
    // console.log('my_buyin', myBuyInFlight)
    // console.log('buyins', swappedBuyins)
    // console.log('unbuyins', unswappedBuyins)


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