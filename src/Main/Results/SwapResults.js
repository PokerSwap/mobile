import React, {useContext, useState, useCallback} from 'react';
import { RefreshControl,  FlatList } from 'react-native'
import { Button, Container, Content, Icon, Text, Tabs, Tab, TabHeading} from 'native-base';

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



      // EMPTY CURRENT TRACKER COMPONENT
  let noTracker = (status) => {
    return(
      <FlatList

        ListHeaderComponent={
          <Text style={{
            justifyContent:'center', textAlign:'center', 
            fontSize:20, width:'80%'}}> 
            You have no past events that{'\n'}{status} results. 
          </Text>}
        ListHeaderComponentStyle={{alignSelf:'center', marginTop:20}}
        ListFooterComponent={
          <Button iconLeft style={{borderRadius:100}} onPress={() => onRefresh()}>
            <Icon type='FontAwesome' name='refresh'/>
            <Text>Refresh</Text>
          </Button>}
        ListFooterComponentStyle={{alignSelf:'center', marginTop:20, marginBottom:300}}
      />

    )
  }

  var aTracker = ({item, index}) => {
    return(
      <ResultsTracker key={index} event={item} tournament_end={item.tournament_end}
        my_buyin= {item.my_buyin} buyins = {item.buyins} final_profit={item.final_profit}
        tournament={item.tournament} action={item.action}/>
    )
  }

  var flatlist = (a_data) => {
    return(
      <FlatList contentContainerStyle={{ alignSelf: 'stretch' }}
        data={a_data}
        renderItem={aTracker}
        keyExtractor={(content, index) => index.toString()}
        ListFooterComponent={
          <Button iconLeft style={{borderRadius:100}} onPress={() => onRefresh()}>
            <Icon type='FontAwesome' name='refresh'/>
            <Text>Refresh</Text>
          </Button>}
        ListFooterComponentStyle={{alignSelf:'center', marginVertical:20, marginBottom:400}}
        stickyHeaderIndices={[0]}
/>
    )
  }
    
  var pendingResultsTracker, confirmedResultsTracker;

  if( store.myPendingResultsTrackers !== [] && store.myPendingResultsTrackers.length !== 0){
    pendingResultsTracker = flatlist(store.myPendingResultsTrackers)}  
  else {
    pendingResultsTracker = noTracker('are pending')
  } 

  if( store.myConfirmedResultsTrackers !== [] && store.myConfirmedResultsTrackers.length !== 0){
    confirmedResultsTracker = flatlist(store.myConfirmedResultsTrackers)}  
  else {
    confirmedResultsTracker = noTracker('have confirmed')
  } 

  return(
    <Container>
      <HomeHeader title={'Swap Results'} />
       <Content contentContainerStyle={{flex:1}}>
         <Tabs tabBarUnderlineStyle={{backgroundColor:'white'}}
         tabBarTextStyle={{fontWeight:'bold', color:'white'}}>
           <Tab  heading={
            <TabHeading style={{backgroundColor:'orange'}} >
              <Text  style={{color:'white'}}>PENDING</Text>
            </TabHeading>}>
            <Content  refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
              {pendingResultsTracker}
            </Content>
           </Tab>
           <Tab  heading={
            <TabHeading style={{backgroundColor:'rgb(38, 171, 75)'}}>
              <Text style={{color:'white'}}>CONFIRMED</Text>
            </TabHeading>}>
              <Content  refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                {confirmedResultsTracker}
              </Content>
            
           </Tab>
         </Tabs>
        </Content>
    </Container>
  )
}
