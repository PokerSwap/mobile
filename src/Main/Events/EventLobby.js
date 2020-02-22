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

  var Flights = flights.map((flight, index) => { 
    
    var flightBuyins = buyins.filter(buyin => 
      buyin.recipient_buyin.flight_id == flight.id)
    return(
      <FlightSchedule key={index} 
        navigation={props.navigation}
        buyins={flightBuyins} flight = {flight} 
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