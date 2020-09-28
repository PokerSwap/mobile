import React, {useContext, useState, useCallback, useEffect } from 'react';
import { Alert, FlatList, RefreshControl } from 'react-native';
import { Button, Container, Content, Icon, Tabs, Tab, TabHeading, Text } from 'native-base';
import messaging from '@react-native-firebase/messaging'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Context } from '../../Store/appContext'

import HomeHeader from '../../View-Components/HomeHeader'
import SwapTracker from './Components/SwapTracker';

export default SwapDashboard = (props) => {
  const { store, actions } = useContext(Context)
  const navigation = useNavigation()

  const route = useRoute();

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

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification.title, 
        remoteMessage.notification.body,
        [
          { text: 'Open', onPress: () => goToThing(remoteMessage.data) },
          { text: 'Close', onPress: () => console.log("Cancel Pressed"), }
        ]
      );
    });

    return () => {
      unsubscribe()
    }
  }, []);

  const [ refreshing, setRefreshing ] = useState(false);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh1 = useCallback(() => {
    setRefreshing(true);
    actions.tracker.getCurrent()
    wait(2000).then(() => setRefreshing(false));
    console.log('done')
  }, [refreshing]);

  const onRefresh2 = useCallback(() => {
    setRefreshing(true);
    actions.tracker.getUpcoming()
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  // EMPTY CURRENT TRACKER COMPONENT
  let noTracker = (status, a_refresh) => {
    return(
      <FlatList
        
        ListHeaderComponent={
          <Text style={styles.noTracker.text}> 
            You have no {status} tournaments{'\n'} at the moment. 
          </Text>}
        ListHeaderComponentStyle={{alignSelf:'center', marginTop:20}}
        ListFooterComponent={
          <Button iconLeft style={{borderRadius:100}} onPress={() => a_refresh()}>
            <Icon type='FontAwesome' name='refresh'/>
            <Text>Refresh</Text>
          </Button>}
        ListFooterComponentStyle={{alignSelf:'center', marginTop:20, marginBottom:300}}
      />

    )
  }
  // OCCUPIED CURRENT TRACKER COMPONENT
  var aTracker = ({item, index}) => {
    var x
    if(item.countdown.includes('in')){x='Starts'}else{x='Started'}
    return(
      <SwapTracker key={index}  event={item} countdown={item.countdown} timeBy={x}
        my_buyin= {item.my_buyin} buyins = {item.buyins}
        tournament={item.tournament} action={item.action}/>
    )
  }

  var aflatlist = () => {
    return(

       
<FlatList contentContainerStyle={{ alignSelf: 'stretch' }}
        // refreshControl={ 
        //   <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh1()} />}
        data={store.myCurrentTrackers}
        renderItem={aTracker}
        keyExtractor={(content, index) => index.toString()}
        ListFooterComponent={
          <Button iconLeft style={{borderRadius:100}} onPress={() => onRefresh1()}>
            <Icon type='FontAwesome' name='refresh'/>
            <Text>Refresh</Text>
          </Button>}
        ListFooterComponentStyle={{alignSelf:'center', marginVertical:20}}
        stickyHeaderIndices={[0]} />
      
    )
  }

  var bflatlist = () => {
    return(
      <FlatList contentContainerStyle={{ alignSelf: 'stretch' }}
        data={store.myUpcomingTrackers}
        renderItem={aTracker}
        keyExtractor={(content, index) => index.toString()}
        ListFooterComponent={
          <Button iconLeft style={{borderRadius:100}} onPress={() => onRefresh2()}>
            <Icon type='FontAwesome' name='refresh'/>
            <Text>Refresh</Text>
          </Button>}
        ListFooterComponentStyle={{alignSelf:'center', marginVertical:20}}
        stickyHeaderIndices={[0]}
        // refreshControl={ 
        //   <RefreshControl refreshing={refreshing} onRefresh={()=>onRefresh2()} />}
          />

    )
  } 
  let liveTracker, upcomingTracker
  
  // CURRENT TRACKER LIST
  if( Object.keys(store.myCurrentTrackers)[0] !== "message" && store.myCurrentTrackers.length !== 0){
    liveTracker = aflatlist()} 
  // NO LIVE TOURNAMENTS AND/OR NEW USER VIEW
  else{
    liveTracker = noTracker('live', onRefresh1)
  }       

  // UPCOMING TRACKER LIST
  if( Object.keys(store.myUpcomingTrackers)[0] !== "message" && store.myUpcomingTrackers.length !== 0){
    upcomingTracker = bflatlist()} 
  // NO UPCOMING TOURNAMENTS AND/OR NEW USER VIEW
  else{
    upcomingTracker = noTracker('upcoming', onRefresh2)
  }  



  return(
    <Container >
      <HomeHeader title={'Active Swaps'} />
      <Content contentContainerStyle={{flex:1}}>
        {/* <Button onPress={()=> sendLocalNotification}><Text>Preess</Text></Button> */}
        <Tabs  tabBarUnderlineStyle={{backgroundColor:'white'}}
          tabBarTextStyle={{fontWeight:'bold', color:'white'}}
        >
          {/* LIVE SWAPTRACKER BODY */}
          <Tab tabBarUnderlineStyle='white'
          heading={
            <TabHeading tabBarUnderlineStyle='white'
            style={{backgroundColor:'#174502'}}>
              <Text style={{color:'white'}}>LIVE</Text>
            </TabHeading>}>
            <Content 
              refreshControl={
                <RefreshControl onRefresh={onRefresh1} refreshing={refreshing} />}>
            {liveTracker}
            </Content>
          </Tab>
          {/* UPCOMING SWAPTRACKER */}
          <Tab heading={
            <TabHeading style={{backgroundColor:'#000099'}}>
              <Text style={{color:'white'}}>UPCOMING</Text>
            </TabHeading>}>
              <Content refreshControl={
                <RefreshControl onRefresh={onRefresh2} refreshing={refreshing} />}>
                 {upcomingTracker}
              </Content>
          </Tab>
        </Tabs>
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
      justifyContent:'center', textAlign:'center', fontSize:18, width:'90%', marginVertical: 5}
  }
}