import React, {useContext, useState, useCallback} from 'react';
import { RefreshControl } from 'react-native'
import { Container, Content, List, Separator, Text, ListItem } from 'native-base';
import { useNavigation } from '@react-navigation/native'

import { Context } from '../../Store/appContext'

import HomeHeader from '../../View-Components/HomeHeader'
import ResultsTracker from './Components/ResultsTracker'

export default SwapResults = (props) => {
  const {store, actions} = useContext(Context)

  const [ refreshing, setRefreshing ] = useState(false);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    })
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    actions.tracker.getPast()
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

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
      <ResultsTracker key={index} 
        tournament={content.tournament} 
        final_profit={content.final_profit}
        my_buyin={content.my_buyin} buyins={content.buyins}/>
    )
  })

  if( store.myPastTrackers !== []){
    
    // var recentSwaps = store.myPastTrackers.filter(
    //   tracker => moment().isBefore(moment(tracker.tournament.start_at).add(30, 'days')))    
    // recentSwaps.length !== 0  ? 
    //   recentTracker = aTracker(recentSwaps) : recentTracker = noTracker('recent')

    // var historySwaps = store.myPastTrackers.filter(
    //   tracker => moment().isAfter(moment(tracker.tournament.start_at).add(30, 'days')))
    store.myPastTrackers.length !== 0 ? 
      historyTracker = aTracker(store.myPastTrackers) : historyTracker = noTracker('history')

  } else {
    // recentTracker = noTracker('recent')
    historyTracker = noTracker('history')
  } 

  return(
    <Container>
      <HomeHeader title={'Swap Results'} />
      
      <Content>
        <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />

        <List>
          {/* RECENT WINNINGS LIST HEADER */}
          {/* <Separator bordered style={{height:48, backgroundColor:'rgb(56,68,165)'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
              RECENT 
            </Text>                
          </Separator>       
          {recentTracker} */}
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
