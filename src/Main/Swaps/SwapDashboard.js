import React, {useContext, useState, useCallback} from 'react';
import {RefreshControl,  Text, StatusBar} from 'react-native';
import { Container, Content, List, ListItem, Separator } from 'native-base';
import moment from 'moment'

import HomeHeader from '../../View-Components/HomeHeader'
import { Context } from '../../Store/appContext'
import SwapTracker from './Components/SwapTracker';
import BuyIn from '../Shared/BuyIn';

export default SwapDashboard = (props) => {

  const { store, actions } = useContext(Context)

  let noTracker = (f) =>  {
    return(
      <ListItem noIndent style={styles.noTracker.listItem}>
        <Text style={styles.noTracker.text}> 
          You have no {f} tournaments at the moment. 
        </Text>
      </ListItem>)}

  let a_tracker = (e) => e.map((content, index) => {
    return(
      <SwapTracker
        key={index} navigation={props.navigation}
        my_buyin= {content.my_buyin} swaps = {content.swaps}
        tournament={content.tournament}/>)})
  
  let liveTracker, upcomingTracker
  let trackers = store.myTrackers
  
  if(Object.keys(trackers)[0] != "message"){

    var now = moment()

    var currentList = trackers.filter((tracker) => now.isAfter(moment(tracker.tournament.start_at).add(1, 'days')))
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    actions.tracker.getAll()
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);


  return(
    <Container>
      <HomeHeader title={'Swap Dashboard'}  
        drawer={() => props.navigation.toggleDrawer()}
        tutorial={() => props.navigation.push('Tutorial')}/>
        
      <Content>	
        <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />
        
        {/* SWAPTRACKERS */}
        <List>

          {/* LIVE SWAPTRACKER */}
          <Separator bordered style={styles.separator.live}>
            <Text style={styles.separator.text}> 
              LIVE 
            </Text>                
          </Separator>
          {liveTracker}
          
          {/* UPCOMING SWAPTRACKER */}
          <Separator bordered style={styles.separator.upcoming}>
            <Text style={styles.separator.text}> 
              UPCOMING 
            </Text>
          </Separator>
          {upcomingTracker}
         
        </List>
      
      </Content>
    </Container>
  )
}

const styles = {
  separator:{
    live:{
      height:48, backgroundColor:'rgb(56,68,165)' },
    upcoming:{
      height:48, backgroundColor:'gray'},
    text:{
      fontSize:20, color:'white', fontWeight:'600', textAlign:'center' }
  },
  noTracker:{
    listItem:{
      justifyContent:'center'},
    text:{
      justifyContent:'center', textAlign:'center', fontSize:24, width:'80%'}
  }
}


// Winnings : {
//   my_buy_in:{BuyIn.json},
//   myplace:14,
// 	tournament:{tournament.json},
// 	final_profit:6,
// 	swaps:{
//     {
//       recipient_user:{profile.json},
//       theirPlace:12,
//       youWon:100,
//       theyWon:200,
//       youOweTotal: 5,
//       theyOweTotal: 8,
//       swap_profit: 3, 
//       agreed_swaps:{
//         {
//         percentage:5,
//         counter_percentage:4,
//         youOwe:5,
//         theyOwe:8
//         },
//       }
//     },
// 		{
//       youWon:100,
//       theirPlace:10,
//       theyWon:100,
//       youOweTotal: 14,
//       theyOweTotal: 17,
//       swap_profit: 3,
//       agreed_swaps:{
//             {
//         percentage:4,
//             counter_percentage:5,
//         youOwe:4,
//         theyOwe:5
//         },
//         {
//         percentage:10,
//             counter_percentage:12,
//         youOwe:10,
//         theyOwe:2
//         },


//       }
// 		}
// 	}

// }