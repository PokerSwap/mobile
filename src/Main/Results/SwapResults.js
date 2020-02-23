import React, {useContext} from 'react';
import { Container, Content, List, Separator, Text, ListItem } from 'native-base';
import HomeHeader from '../../View-Components/HomeHeader'
import { Context } from '../../Store/appContext'
import ResultsTracker from './Components/ResultsTracker'

import moment from 'moment'

export default SwapResults = (props) => {

  const {store, actions} = useContext(Context)

  var recentTracker, historyTracker;

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
      <ResultsTracker 
        key={index} navigation={props.navigation}
        tournament={content.tournament} 
        final_profit={content.final_profit}
        my_buyin={content.my_buyin} buyins={content.buyins}/>
    )
  })

  if( store.myPastTrackers.length !== 0 && store.myPastTrackers.length !== undefined){
    
    var recentSwaps = store.myPastTrackers.filter(
      tracker => moment().isBefore(moment(tracker.tournament.start_at).add(30, 'days')))    
    recentSwaps.length !== 0  ? 
      recentTracker = aTracker(recentSwaps) : recentTracker = noTracker('recent')

    var historySwaps = store.myPastTrackers.filter(
      tracker => moment().isAfter(moment(tracker.tournament.start_at).add(1, 'months')))
    historySwaps.length !== 0 ? 
      historyTracker = aTracker(historySwaps) : historyTracker = noTracker('history')

  } else {
    recentTracker = noTracker('recent')
    historyTracker = noTracker('history')
  } 

  return(
    <Container>
      <HomeHeader title={'Swap Results'} 
        drawer={() => props.navigation.toggleDrawer()}
        tutorial={() => props.navigation.push('Tutorial')}/>
      
      <Content>
        <List>
          {/* RECENT WINNINGS LIST HEADER */}
          <Separator bordered style={{height:48, backgroundColor:'rgb(56,68,165)'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
              RECENT 
            </Text>                
          </Separator>       
          {recentTracker}

          {/* LATER WINNINGS LIST HEADER */}
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
