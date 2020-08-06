import React, {useContext, useState, useCallback, useEffect } from 'react';
import {RefreshControl, Alert, Text, FlatList } from 'react-native';
import { Button, Icon, Container, Content, List, ListItem, Separator } from 'native-base';
import messaging from '@react-native-firebase/messaging'
import moment from 'moment'
import { DrawerActions } from '@react-navigation/drawer'

import { useNavigation } from '@react-navigation/native'

import HomeHeader from '../../View-Components/HomeHeader'
import { Context } from '../../Store/appContext'
import SwapTracker from './Components/SwapTracker';

export default SwapDashboard = (props) => {
  const { store, actions } = useContext(Context)

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('FCM Message Data:', remoteMessage);

      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        [
          { text: 'Open', onPress: () => goToThing(remoteMessage.data) },
          { text: 'Close', onPress: () => console.log("Cancel Pressed"), }
        ]
      )
    });
    return () => {
      unsubscribe
    }
  }, [null])

  const goToThing = async(data) => {
    console.log('name', data)
    if(data.type == 'event'){
      var cc = await actions.navigate.toEvent(data, navigation)
    }else if(data.type == 'swap'){
      var cc = await actions.navigate.toSwap(data, navigation)
    }else{
      null
    }
  }
  // EMPTY CURRENT TRACKER COMPONENT
  let noTracker = (status) => {
    return(
      <ListItem noIndent style={styles.noTracker.listItem}>
        <Text style={styles.noTracker.text}> 
          You have no {status} tournaments at the moment. 
        </Text>
      </ListItem>
    )
  }
  // OCCUPIED CURRENT TRACKER COMPONENT
  let a_tracker = (trackers) => trackers.map((tracker, index) => {
    return(
      <SwapTracker key={index}  event={tracker}
        my_buyin= {tracker.my_buyin} buyins = {tracker.buyins}
        tournament={tracker.tournament} action={tracker.action}/>
    )
  })

  // var aTracker = ({item, index}) => {
  //   return(
  //     <SwapTracker key={index}  event={item}
        // my_buyin= {item.my_buyin} buyins = {item.buyins}
        // tournament={item.tournament} action={item.action}/>
  //   )
  // }

  // var flatlist = 
  //   <FlatList
  //   contentContainerStyle={{ alignSelf: 'stretch' }}
  //     data={store.myPastTrackers}
  //     renderItem={aTracker}
  //     keyExtractor={(content, index) => index.toString()}
  //     ListHeaderComponent={
  //       <Separator noIndent bordered style={{
  //         height:48, backgroundColor:'rgb(56,68,165)'}}>
  //         <Text style={{
  //           fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
  //           HISTORY 
  //         </Text>                
  //       </Separator>  
  //     }
  //     ListFooterComponent={
  //       <Button iconLeft style={{borderRadius:100}} onPress={() => onRefresh()}>
  //         <Icon type='FontAwesome' name='refresh'/>
  //         <Text>Refresh</Text>
  //       </Button>
  //     }
  //     ListFooterComponentStyle={{alignSelf:'center', marginTop:20}}
  //     stickyHeaderIndices={[0]}
  //           refreshControl={
  //       <RefreshControl
  //         refreshing={refreshing}
  //         onRefresh={onRefresh} />}
  //         />

  
  let liveTracker, upcomingTracker
  
  if( Object.keys(store.myTrackers)[0] !== "message" && store.myTrackers !== []){
    // CURRENT TRACKER LIST
    var currentList = store.myTrackers.filter(tracker => 
      moment().isAfter(moment(tracker.tournament.start_at)))
    currentList.length !== 0 ? 
      liveTracker = a_tracker(currentList) : liveTracker = noTracker('live')
    // UPCOMING TRACKER LIST
    var upcomingList = store.myTrackers.filter((tracker) => 
      moment().isBefore(tracker.tournament.start_at))
    upcomingList.length !== 0 ? 
      upcomingTracker = a_tracker(upcomingList) : upcomingTracker = noTracker('upcoming')
  } 
  // NO TOURNAMENTS AND/OR NEW USER VIEW
  else{
    liveTracker = noTracker('live')
    upcomingTracker = noTracker('upcoming')
  }       
  
  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const [ refreshing, setRefreshing ] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    actions.tracker.getCurrent()
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);



  return(
    <Container contentContainerStyle={{marginTop:100}}>
      <HomeHeader title={'Active Swaps'} />
        {/* REFRESH SWAP CURRENT TRACKERS */}
       <Content>
        
        {/* CURRENT SWAPTRACKERS */}
        <List>
          {/* LIVE SWAPTRACKER HEAD */}
          <Separator bordered style={styles.separator.live}>
            <Text style={styles.separator.text}> 
              LIVE 
            </Text>                
          </Separator>
          {/* LIVE SWAPTRACKER BODY */}
          {liveTracker}
          {/* UPCOMING SWAPTRACKER HEADER */}
          <Separator bordered style={styles.separator.upcoming}>
            <Text style={styles.separator.text}> 
              UPCOMING 
            </Text>
          </Separator>
          {/* UPCOMING SWAPTRACKER BODY */}
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
      justifyContent:'center', textAlign:'center', fontSize:22, width:'90%', marginVertical: 5}
  }
}