import React, {useContext, useEffect} from 'react';
import {Context} from '../../Store/appContext'

import {Container, Content, Button, Footer, List, ListItem, Text} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'

import ActionBar from './Components/ActionBar'
import TourneyHeader from './Components/TourneyHeader'
import FlightSchedule from './Components/FlightSchedule';

export default TourneyLobby = (props) => {
  
  const { store, actions } = useContext(Context)

  const { navigation } = props;
  let tournament_id = navigation.getParam('tournament_id', 'NO-ID');
  let name = navigation.getParam('name', 'default value');
  let address = navigation.getParam('address', 'default value');
  let longitude = navigation.getParam('longitude', 'NO-ID');
  let latitude = navigation.getParam('latitude', 'NO-ID');
  let start_at = navigation.getParam('start_at', 'NO-ID');
  let end_at = navigation.getParam('end_at', 'NO-ID');
  let flights = navigation.getParam('flights', 'NO-ID');
  let action = navigation.getParam('action', 'NO-ID');

  var Flights = flights.map((flight) =>  
  <FlightSchedule 
    id = {flight.id}
    navigation={props.navigation}
    tournament_id={tournament_id}
    day = {flight.day}
    start_at = {flight.start_at}
    end_at = {flight.end_at}
    buy_ins={flight.buy_ins}
  />)

  return(
    <Container>
      <Content>
        <List>
          {/* TOURNAMENT HEADER */}
          <ListItem itemHeader first>
            <TourneyHeader 
              id={tournament_id}
              name={name}
              address={address}
              start_at={start_at}
              end_at={end_at}
            />
          </ListItem>

          {/* TOURNEY BUYIN ENTRIES  */}
          {Flights}
             
        </List>

      </Content>

      {/* FOOTER CONTAINS NUMBER OF SWAPS AND ACTION  */}
      <ActionBar action={props.action} />
    </Container>
  )
}