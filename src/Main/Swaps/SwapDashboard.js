import React, {useContext, useState} from 'react';
import {RefreshControl} from 'react-native';
import { Container, Content, List, ListItem, Separator, Text, Button } from 'native-base';
import _Header from '../../View-Components/header'
import { Context } from '../../Store/appContext'
import SwapTracker from './Components/SwapTracker';
import moment from 'moment'

export default SwapDashboard = (props) => {

  const { store, actions } = useContext(Context)

  let noTracker = (f) =>  {
    return(
    <ListItem noIndent style={{justifyContent:'center'}}>
      <Text style={{
        justifyContent:'center', textAlign:'center', 
        fontSize:24, width:'80%'}}> 
        You have no {f} tournaments at the moment. 
      </Text>
    </ListItem>)}

  let a_tracker = (e) => e.map((content, index) => {
    return(
      <SwapTracker
        key={index}
        navigation={props.navigation}
        my_buyin= {content.my_buyin}
        swaps = {content.swaps}
        tournament={content.tournament}
      />
    )
  })
  
  let liveTracker;
  let upcomingTracker;
  let trackers = store.myTrackers
  console.log('tracker nows', trackers)
  
  if(Object.keys(trackers)[0] != "message"){

    var now = moment()

    var currentList = trackers.filter((tracker) => now.isBetween(tracker.tournament.start_at, tracker.tournament.end_at))
    currentList.length !== 0 ? 
      liveTracker = a_tracker(currentList) : liveTracker = noTracker('live')
    
    var upcomingList = trackers.filter((tracker) => now.isBefore(tracker.tournament.start_at))
    upcomingList.length !== 0 ? 
      upcomingTracker = a_tracker(upcomingList) : upcomingTracker = noTracker('upcoming')
      
  } else{
    liveTracker = noTracker('live')
    upcomingTracker = noTracker('upcoming')
  }       
  
  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    actions.tracker.getAll()
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);


  return(
    <Container>
      <_Header title={'Swap Dashboard'}  
        drawer={() => props.navigation.toggleDrawer()}
        tutorial={() => props.navigation.push('Tutorial')}
        />
      <Content>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        {/* SWAPTRACKERS */}
        <List>

          {/* LIVE SWAPTRACKER */}
          <Separator bordered 
            style={{height:48, backgroundColor:'rgb(56,68,165)'}}>
            <Text 
              style={{fontSize:20, color:'white', 
                fontWeight:'600', textAlign:'center'}}> 
              LIVE 
            </Text>                
          </Separator>
          {liveTracker}
          
          {/* UPCOMING SWAPTRACKER */}
          <Separator bordered 
            style={{height:48, backgroundColor:'gray'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
              UPCOMING 
            </Text>
          </Separator>
          {upcomingTracker}
         
        </List>
      
      </Content>
    </Container>
)
}
