import React, {useContext, useState, useCallback} from 'react';
import { RefreshControl,  FlatList } from 'react-native'
import { Button, Container, List, Content, Icon, Separator, Text, ListItem } from 'native-base';
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
      <List>
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh} />
        <ListItem noIndent style={{justifyContent:'center'}}>
          <Text style={{
            justifyContent:'center', textAlign:'center', 
            fontSize:24, width:'80%'}}> 
            You have no {f} swaps at the moment. 
          </Text>
        </ListItem>
        <Button iconLeft style={{borderRadius:100, alignSelf:'center', marginTop:20}} onPress={() => onRefresh()}>
          <Icon type='FontAwesome' name='refresh'/>
          <Text>Refresh</Text>
        </Button>
      </List>
    
    )  
}

  var aTracker = ({item, index}) => {
    return(
      <ResultsTracker key={index} event={item}
      my_buyin= {item.my_buyin} buyins = {item.buyins}
      tournament={item.tournament} action={item.action}/>
    )
  }

  var flatlist = 
    <FlatList
    contentContainerStyle={{ alignSelf: 'stretch' }}
      data={store.myPastTrackers}
      renderItem={aTracker}
      keyExtractor={(content, index) => index.toString()}
      ListHeaderComponent={
        <Separator noIndent bordered style={{
          height:48, backgroundColor:'rgb(56,68,165)'}}>
          <Text style={{
            fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
            HISTORY 
          </Text>                
        </Separator>  
      }
      ListFooterComponent={
        <Button iconLeft style={{borderRadius:100}} onPress={() => onRefresh()}>
          <Icon type='FontAwesome' name='refresh'/>
          <Text>Refresh</Text>
        </Button>
      }
      ListFooterComponentStyle={{alignSelf:'center', marginTop:20}}
      stickyHeaderIndices={[0]}
            refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh} />}
          />

  if( store.myPastTrackers !== []){
    
    // var recentSwaps = store.myPastTrackers.filter(
    //   tracker => moment().isBefore(moment(tracker.tournament.start_at).add(30, 'days')))    
    // recentSwaps.length !== 0  ? 
    //   recentTracker = aTracker(recentSwaps) : recentTracker = noTracker('recent')

    // var historySwaps = store.myPastTrackers.filter(
    //   tracker => moment().isAfter(moment(tracker.tournament.start_at).add(30, 'days')))
    // store.myPastTrackers.length !== 0 ? 
    //   historyTracker = aTracker(store.myPastTrackers) : historyTracker = noTracker('history')
      store.myPastTrackers.length !== 0 ? 
        historyTracker = flatlist : historyTracker = noTracker('history')

  } else {
    // recentTracker = noTracker('recent')
    historyTracker = noTracker('history')
  } 

  var x = <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />


  return(
    <Container>
      <HomeHeader title={'Swap Results'} />
      

       <Content>

        {/* <List> */}
          {/* RECENT WINNINGS LIST HEADER */}
          {/* <Separator bordered style={{height:48, backgroundColor:'rgb(56,68,165)'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
              RECENT 
            </Text>                
          </Separator>       
          {recentTracker} */}
          {/* LATER WINNINGS LIST HEADER */}
          {/* <Separator noIndent bordered style={{height:48, backgroundColor:'rgb(56,68,165)'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
              HISTORY 
            </Text>                
          </Separator>   */}
          {historyTracker}     
        {/* </List> */}
        </Content>




    </Container>
  )
}
