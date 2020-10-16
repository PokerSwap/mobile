import React, {useContext, useState, useRef, useCallback, useEffect } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation } from '@react-navigation/native'

import { Alert, FlatList, Platform, RefreshControl, StatusBar, View } from 'react-native';
import { Button, Container, Content, Icon, Tabs, Tab, TabHeading, Text, Toast } from 'native-base';
import messaging from '@react-native-firebase/messaging'

import BounceColorWrapper from '../../Functional/BounceColorWrapper'
import HomeHeader from '../../View-Components/HomeHeader'
import SwapTracker from './Components/SwapTracker';

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default SwapDashboard = (props) => {
  const { store, actions } = useContext(Context) 
  const navigation = useNavigation()
  const { navigate, dangerouslyGetState } = useNavigation()


  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  
  const goToThing = async(data) => {
    console.log('name', data)
    const { index, routes } = dangerouslyGetState()
    const screenName = routes[index].name
    console.log('screenname', screenName)
    console.log('data ID', remoteMessage.data.id, store.currentSwap.id)
    const customMessage = (x) => {
      Toast.show({text:x, duration:3000, position:'top'})}

    
    if (screenName =="Swap Offer" && remoteMessage.data.id==store.currentSwap.id){
      var s = actions.refresh.toggle()
      var e = await actions.swap.getCurrent(remoteMessage.data.id)
      var tour = store.currentSwap.tournament_id
      var eee = store.currentSwap.recipient_user.id
      var x = await actions.tournament.getCurrent(tour)
      var ree = x.buyins.filter(buyin => buyin.recipient_user.id == eee)
      var dwer = await actions.buyin.getCurrent(ree[0].recipient_buyin.id)

      var sw = actions.refresh.toggle()
      return customMessage(remoteMessage.data.alert)
    }else{
      null
    }
 

    if(data.type == 'event'){
      var cc = await actions.navigate.toEvent(data, navigation)
    }else if(data.type == 'swap'){
      var cc = await actions.navigate.toSwap(data, navigation)
    }else{
      null
    }
  }
    
  useEffect(() => {
    //Background IOS
    if(Platform.OS == 'ios'){
      messaging().onNotificationOpenedApp(async remoteMessage => {
        try {
          console.log('messageType', remoteMessage.messageType)
          console.log('messageCategory', remoteMessage.category)
          console.log('Getting from Background IOS',remoteMessage); 
            var e = await actions.navigate.toSwap(remoteMessage.data, navigation)
        } catch (error) {
          console.log('error', error)
        }})
    }else{
      //Background Android
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        try{
          console.log('Getting from Background Android', remoteMessage)
          var s = await goToThing(remoteMessage.data)
        }catch(err){
          console.log('back err', err)
        }
      })
    }
    
      return () => {
        // cleanup
      }
  }, [])

  if (Platform.OS == 'ios'){
    messaging().getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        goToThing(remoteMessage.data)
        console.log('messageType', remoteMessage.messageType)
        console.log('messageCategory', remoteMessage.category)
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
      }
    });
  }else{null}

  // FOREGROUND BOTH
  useEffect(() => {
    console.log('retrieving')
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('messageType', remoteMessage)
      console.log('messageCategory', remoteMessage.category)
    const { index, routes } = dangerouslyGetState()
    const screenName = routes[index].name
    console.log('screenname', screenName)
    console.log('data ID', remoteMessage.data.id, store.currentSwap.id)
    const customMessage = (x) => {
      Toast.show({text:x, duration:3000, position:'top'})}

    var xee = await actions.tracker.getCurrent()
    var xee = await actions.tracker.getUpcoming()

    if (screenName =="Swap Offer" && remoteMessage.data.id==store.currentSwap.id){
      var s = actions.refresh.toggle()
      var e = await actions.swap.getCurrent(remoteMessage.data.id)
      var sw = actions.refresh.toggle()
      return customMessage(remoteMessage.data.alert)
    }else{
      null
    }
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
        style={{ backgroundColor: currentStyle.background.color}}
        ListHeaderComponent={
          <Text style={[styles.noTracker.text, {color:currentStyle.text.color}]}> 
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
            <Text style={{color:currentStyle.text.color}}>Refresh</Text>
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
          tabBarTextStyle={{fontWeight:'bold', color:'white'}}>
          {/* LIVE SWAPTRACKER BODY */}
          <Tab tabBarUnderlineStyle='white' 
          heading={
            <TabHeading tabBarUnderlineStyle='white' style={{backgroundColor:'#174502'}}>
              <Text style={{color:'white'}}>LIVE</Text>
            </TabHeading>}>
            <BounceColorWrapper style={{flex: 1}}
              mainColor={currentStyle.background.color}>
              <Content contentContainerStyle={{backgroundColor:currentStyle.background.color}}
                refreshControl={
                  <RefreshControl onRefresh={onRefresh1} refreshing={refreshing} />}>
              {liveTracker}
              </Content>
            </BounceColorWrapper>
          </Tab>
          {/* UPCOMING SWAPTRACKER */}
          <Tab heading={
            <TabHeading style={{backgroundColor:'#000099'}}>
              <Text style={{color:'white'}}>UPCOMING</Text>
            </TabHeading>}>
            <BounceColorWrapper style={{flex: 1}}
              mainColor={currentStyle.background.color}>
              <Content refreshControl={
                <RefreshControl onRefresh={onRefresh2} refreshing={refreshing} />}>
                 {upcomingTracker}
              </Content>
            </BounceColorWrapper>
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
      fontSize:20, fontWeight:'600', textAlign:'center' }
  },
  noTracker:{
    listItem:{
      justifyContent:'center'},
    text:{
      justifyContent:'center', textAlign:'center', fontSize:18, width:'90%', marginVertical: 5}
  }
}