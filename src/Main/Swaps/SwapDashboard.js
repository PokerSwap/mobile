import React, {useContext, useState, useCallback, useEffect} from 'react';
import {RefreshControl, Alert, Text} from 'react-native';
import { Container, Content, List, ListItem, Separator } from 'native-base';
import moment from 'moment'

import HomeHeader from '../../View-Components/HomeHeader'
import { Context } from '../../Store/appContext'
import SwapTracker from './Components/SwapTracker';

import messaging from '@react-native-firebase/messaging'

import { StackActions, NavigationActions, NavigationContext } from 'react-navigation';



export default SwapDashboard = (props, {navigation}) => {

  const { store, actions } = useContext(Context)
  const [onLoad, setOnLoad] = useState(true)

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
    if(data.type == 'event'){
      var cc = await actions.navigate.toEvent(data, props.navigation)
    }else if(data.type == 'swap'){
      var cc = await actions.navigate.toSwap(data, props.navigation)
    }else{
      null
    }
  }

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
        my_buyin= {content.my_buyin} buyins = {content.buyins}
        tournament={content.tournament} action={content.action}/>)})
  
  let liveTracker, upcomingTracker
  let trackers = store.myTrackers
  
  if( Object.keys(trackers)[0] !== "message" && trackers !== []){

    var now = moment()

    var currentList = trackers.filter(tracker => 
      now.isAfter(moment(tracker.tournament.start_at)))
    // console.log('currentList', currentList)
    currentList.length !== 0 ? 
      liveTracker = a_tracker(currentList) : liveTracker = noTracker('live')
    
    var upcomingList = trackers.filter((tracker) => 
      now.isBefore(tracker.tournament.start_at))
    // console.log('upcomingList', upcomingList)
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

  const [ refreshing, setRefreshing ] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    actions.tracker.getCurrent()
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);


  return(
    <Container>
      <HomeHeader title={'Active Swaps'}  
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
      justifyContent:'center', textAlign:'center', fontSize:24, width:'90%'}
  }
}