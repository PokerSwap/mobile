import React, { useState, useContext, useEffect } from 'react';
import { Container, Content, List, Spinner } from 'native-base';

import { Context } from '../../Store/appContext'

import EventHeader from './Components/EventHeader'
import FlightSchedule from './Components/FlightSchedule';
import ActionBar from './Components/ActionBar'

export default EventLobby = (props, {navigation}) => {
  const { store, actions } = useContext(Context)
  const [ action, setAction ] = useState(null)
  const [ aTournament, setATournament ] = useState(null)
  const [ tStart, setTstart ] = useState(null)

  let tournament_name = props.navigation.getParam('tournament_name', 'NO-ID');
  let tournament_id = props.navigation.getParam('tournament_id', 'NO-ID');
  let tournament_start = props.navigation.getParam('tournament_start', 'NO-ID');

  useEffect(() => {
    const subsctt = props.navigation.addListener('didFocus', () => {
      getTournament()
  });
    

    return () => {
      // cleanup
    }
  }, [navigation])

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('didBlur', () => {
  //     bx()
  // });
  //   return () => {
  //   // unsubscribe()
  //   }
  // }, [navigation])

  var bx = async() => {
    var eee = await actions.swap.removeCurrent()
    console.log('currentSwap',store.currentSwap)
  }


 
  const getTournament = async() => {
    try{
      var answer1 = await actions.tournament.getCurrent(tournament_id)
      var answer2 = await actions.tournament.getAction(tournament_id)
      setAction(store.currentAction)
      setATournament(store.currentTournament)
      console.log('aTournament', aTournament)
      console.log('action', action)
    } catch(error){
      console.log('Something went wrong with getting Tournaent',error)
    }
  }
  

  
  if(aTournament){
    let currentTournament = aTournament.tournament
    let my_buyin = aTournament.my_buyin
    let buyins = aTournament.buyins
    let flights = aTournament.tournament.flights

    var toFilterOne  = []
    var addToFilter = buyins.forEach((buyin) => 
      toFilterOne.push(buyin.recipient_user.id));
    var toFilter2 = [my_buyin.user_id, ...toFilterOne]  

    let tournamentBuyins 
    if (currentTournament.buy_ins.length !== 0){
      tournamentBuyins = currentTournament.buy_ins.filter( buyin => 
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
        action={action}
        my_buyin={myBuyInFlight}
        buyins={swappedBuyins} unbuyins={unswappedBuyins}
        flight = {flight} tournament={currentTournament}/>)
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
            tournament_name={tournament_name}
            tournament_start={tournament_start}
          />
          {/* TOURNEY BUYIN ENTRIES  */}
          {!aTournament ? <Spinner /> : Flights }          
        </List>
      </Content>
      {/* FOOTER CONTAINS NUMBER OF SWAPS AND ACTION  */}
      <ActionBar action={action} />
    </Container>
  )
}