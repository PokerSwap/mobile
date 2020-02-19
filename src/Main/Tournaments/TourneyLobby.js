import React, { useContext} from 'react';
import {Container, Content, List, ListItem, Header } from 'native-base';
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";


import ActionBar from './Components/ActionBar'
import TourneyHeader from './Components/TourneyHeader'
import FlightSchedule from './Components/FlightSchedule';

import {Context} from '../../Store/appContext'

export default TourneyLobby = (props) => {
  
  const { navigation } = props;
  let action = navigation.getParam('action', 'NO-ID');
  let tournament_id = navigation.getParam('tournament_id', 'NO-ID');
  let name = navigation.getParam('name', 'default value');
  let address = navigation.getParam('address', 'default value');
  let city = navigation.getParam('city', 'default value');
  let state = navigation.getParam('state', 'default value');
  let longitude = navigation.getParam('longitude', 'NO-ID');
  let latitude = navigation.getParam('latitude', 'NO-ID');
  let start_at = navigation.getParam('start_at', 'NO-ID');
  let flights = navigation.getParam('flights', 'NO-ID');
  let buy_ins = navigation.getParam('buy_ins', 'NO-ID');
  let swaps = navigation.getParam('swaps', 'NO-ID');


  const {store,actions} = useContext(Context)

  var answer = async() => {
    await actions.tournament.getAction(tournament_id)
  }
  var mySwapsinTournament
  var aa = store.myTrackers.filter(tracker => tracker.tournament.id == tournament_id)
  console.log('aa', aa)
  if (aa.length !== 0){
    mySwapsinTournament = aa[0].swaps.map(swapBody => swapBody.swap)
    console.log('this should not work it we just went in')
  } else {
    mySwapsinTournament = []
  }

  var Flights = flights.map((flight, index) => { 
    var their_buy_ins = buy_ins.filter(buy_in => buy_in.flight_id == flight.id)
    
    return(
      <FlightSchedule 
        key={index}
        id = {flight.id}
        navigation={props.navigation}
        tournament_id={tournament_id}
        name={flight.tournament}
        day = {flight.day}
        start_at = {flight.start_at}
        buy_ins={their_buy_ins}
        allSwapsinTournament={swaps}
        mySwapsinTournament={mySwapsinTournament}
        action={action}
      />)
  })

  return(
    <Container>      
      <Content>
        <List>
          {/* TOURNAMENT HEADER */}
          <ListItem itemHeader first>
            <TourneyHeader 
              id={tournament_id} name={name} start_at={start_at}
              address={address} city={city} state={state}/>
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