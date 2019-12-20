import React, {useContext} from 'react';
import { Container, Content, List, Separator, Text, ListItem } from 'native-base';
import _Header from '../../View-Components/header'
import { Context } from '../../Store/appContext'
import WinningsTracker from './Components/WinningsTracker'

import moment from 'moment'

export default WinningsDashboard = (props) => {

  const {store, actions} = useContext(Context)

  var recentTracker ;
  var historyTracker;

  let noTracker = (f) =>  {
    return(
    <ListItem noIndent style={{justifyContent:'center'}}>
      <Text style={{
        justifyContent:'center', textAlign:'center', 
        fontSize:24, width:'80%'}}> 
        You have no {f} swaps at the moment. 
      </Text>
    </ListItem>
    )  
}

  let aTracker = (e) => e.map((content, index) => {
    return(
      <WinningsTracker 
          tournament={content.tournament}
          my_buyin={content.my_buyin}
          swaps={content.swaps}
          navigation={props.navigation}
        />
    )
  })

  if(store.pastTrackers.length !== 0){
    
    var recentSwaps = store.pastTrackers.filter(
      tracker => moment().isBefore(moment(tracker.tournament.end_at).add(1, 'months')))    
    recentSwaps.length !== 0  ? 
      recentTracker = aTracker(recentSwaps) : recentTracker = noTracker('recent')

    var historySwaps = store.pastTrackers.filter(
      tracker => moment().isAfter(moment(tracker.tournament.end_at).add(1, 'months')))
    historySwaps.length !== 0 ? 
      historyTracker = aTracker(historySwaps) : historyTracker = noTracker('history')

  }else{
    recentTracker = noTracker('recent')
    historyTracker = noTracker('history')
  } 

  return(
    <Container>
      <_Header title={'Winnings Dashboard'} drawer={() => props.navigation.toggleDrawer()}/>
      <Content>
        <List>

          {/* LIVE SWAPS LIST HEADER */}
          <Separator bordered style={{height:48, backgroundColor:'rgb(56,68,165)'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
              RECENT 
            </Text>                
          </Separator>       
          {recentTracker}
          <Separator bordered style={{height:48, backgroundColor:'rgb(56,68,165)'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
              HISTORY 
            </Text>                
          </Separator>  
          {historyTracker}     
        </List>
      </Content>
    </Container>
)
}
