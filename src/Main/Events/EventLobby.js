import React from 'react';
import {Container, Content, List, ListItem } from 'native-base';

import EventHeader from './Components/EventHeader'
import FlightSchedule from './Components/FlightSchedule';
import ActionBar from './Components/ActionBar'

export default EventLobby = (props) => {

  const { navigation } = props;
  let action = navigation.getParam('action', 'NO-ID');
  let tournament_id = navigation.getParam('tournament_id', 'NO-ID');
  let name = navigation.getParam('name', 'default value');
  let address = navigation.getParam('address', 'default value');
  let city = navigation.getParam('city', 'default value');
  let state = navigation.getParam('state', 'default value');
  let start_at = navigation.getParam('start_at', 'NO-ID');
  let flights = navigation.getParam('flights', 'NO-ID');
  let buy_ins = navigation.getParam('buy_ins', 'NO-ID');

  var Flights = flights.map((flight, index) => { 
      buy_ins.filter(buy_in => buy_in.flight_id == flight.id)
    console.log('Flights', Flights)
    return(
      <FlightSchedule 
        key={index} navigation={props.navigation}
        flight = {flight} tournament_id={tournament_id}/>)
  })

  return(
    <Container>      
      <Content>
        <List>
          
          {/* TOURNAMENT HEADER */}
          <ListItem itemHeader first>
            <EventHeader id={tournament_id} name={name} 
              start_at={start_at} address={address} 
              city={city} state={state}/>
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