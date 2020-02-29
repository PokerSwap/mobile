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

  var Flights = flights.map((flight, index) => { 
    
    var swappedBuyins =[]
    
    var myBuyInFlight
    my_buyin.flight_id == flight.id ? 
      myBuyInFlight = my_buyin : myBuyInFlight = null
    
    var ddd = buyins.forEach(buyin => {
      if (buyin.recipient_buyin.flight_id == flight.id){
        swappedBuyins.push(buyin)
      }

    });
      
    return(
      <FlightSchedule key={index} 
        navigation={props.navigation}
        my_buyin={myBuyInFlight}
        buyins={swappedBuyins}
        ubuyins={tournament.buy_ins}
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