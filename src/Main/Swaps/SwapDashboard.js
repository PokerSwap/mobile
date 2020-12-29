import React, {useContext, useState, 
  useCallback, useEffect } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation } from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging'

import { Alert, FlatList, Platform, RefreshControl, View, StatusBar } from 'react-native';
import { Button, Container, Content, Icon, Tabs, Tab, 
TabHeading, Text, Toast } from 'native-base';

import BounceColorWrapper from '../../Functional/BounceColorWrapper'
import HomeHeader from '../../View-Components/HomeHeader'
import SwapTracker from './Components/SwapTracker';

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

const customMessage = (x) => {
  Toast.show({text:x, duration:3000, position:'top'})}
  
export default SwapDashboard = (props) => {
  const { store, actions } = useContext(Context) 
  const navigation = useNavigation()

  
  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  
  const goToThing = async(remoteMessage) => {
    if (remoteMessage.data.type == 'swap' && store.currentPage =="Swap Offer"){
      // var s = actions.refresh.toggle()
      var e = await actions.swap.getCurrent(remoteMessage.data.id)
      var tour = store.currentSwap.tournament_id
      var eee = store.currentSwap.recipient_user.id
      var x = await actions.tournament.getCurrent(tour)
      var ree = x.buyins.filter(buyin => buyin.recipient_user.id == eee)
      var dwer = await actions.buy_in.getCurrent(ree[0].recipient_buyin.id)
      
      var data= {
        
          status: store.currentSwap.status,
          buyin: store.currentBuyin,
          tournament: store.currentTournament,
          buyinSince: store.currentBuyin.updated_at,
          swap: store.currentSwap
        
      }
      console.log('data', data)
      navigation.push("Swap Offer",{
        status: store.currentSwap.status,
        buyin: store.currentBuyin,
        tournament: store.currentTournament,
        buyinSince: store.currentBuyin.updated_at,
        swap: store.currentSwap
      })

      
      // var sw = actions.refresh.toggle()
      return customMessage(remoteMessage.data.alert)
    }else if(remoteMessage.data.type == 'swap'){
      var cc = await actions.navigate.toSwap(remoteMessage.data, navigation)
    }else{null}
 
    if(remoteMessage.data.type == 'event'){
      var cc = await actions.navigate.toEvent(remoteMessage.data, navigation)
    }else if(remoteMessage.data.type == 'chat'){
      var cc = await actions.navigate.toChat(remoteMessage.data, navigation)
    }else if(remoteMessage.data.type == 'buyin'){
      var cc = await actions.navigate.toBuyin(remoteMessage.data, navigation)
    }else{
      null
    }

    if(remoteMessage.data.type == 'result' && store.currentPage =="Swap Results"){

    }else if (remoteMessage.data.type == 'result'){
      var cc = await actions.navigate.toResult(remoteMessage.data, navigation)
    }else{
      null
    }

  }
  //BACKGROUND
  useEffect(() => {
    //Background IOS
    if(Platform.OS == 'ios'){
      messaging().onNotificationOpenedApp(async remoteMessage => {
        try {
          console.log('Getting from Background IOS',remoteMessage); 

          if(remoteMessage.data.type=='swap'){
            var e = await actions.navigate.toSwap(remoteMessage.data, navigation)
          }else if(remoteMessage.data.type=='chat'){
            var e = await actions.navigate.toChat(remoteMessage.data, navigation)
          }else if(remoteMessage.data.type=='event'){
            var e = await actions.navigate.toEvent(remoteMessage.data, navigation)
          }else if(remoteMessage.data.type=='result'){
            var e = await actions.navigate.toResult(remoteMessage.data, navigation)
          }else if(remoteMessage.data.type=='coin'){
            var e = await actions.navigate.toCoin(remoteMessage.data, navigation)
          }else if(remoteMessage.data.type=='buyin'){
            var e = await actions.navigate.toBuyin(remoteMessage.data, navigation)
          }else{null}  
      
        } catch (error) {
          console.log('error', error)
        }})
    }else{
      //Background Android
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        try{
          console.log('Getting from Background Android', remoteMessage)
          // var s = await goToThing(remoteMessage.data)
          if(remoteMessage.data.type=='swap'){
            var e = await actions.navigate.toSwap(remoteMessage.data, navigation)
          }else if(remoteMessage.data.type=='chat'){
            var e = await actions.navigate.toChat(remoteMessage.data, navigation)
          }else if(remoteMessage.data.type=='event'){
            var e = await actions.navigate.toChat(remoteMessage.data, navigation)
          }else if(remoteMessage.data.type=='buyin'){
            var e = await actions.navigate.toBuyin(remoteMessage.data, navigation)
          }else if(remoteMessage.data.type=='result'){
            var e = await actions.navigate.toResult(remoteMessage.data, navigation)
          }else if(remoteMessage.data.type=='coin'){
            var e = await actions.navigate.toCoin(remoteMessage.data, navigation)
          }else{null}

        }catch(err){
          console.log('back err', err)
        }
      })
    }
    
      return () => {
        // cleanup
      }
  }, [false])

  if (Platform.OS == 'ios'){
    messaging().getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage && store.notificationData) {
        goToThing(remoteMessage)
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
      }
    });
  }else{null}

  // FOREGROUND BOTH
  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('Recieved in Foreground', remoteMessage)
      if(remoteMessage.data.type == 'swap'){
        var xee = await actions.tracker.getCurrent()
        var xeee = await actions.tracker.getUpcoming()
        var e = await actions.swap.returnCurrent(remoteMessage.data.id)
        var x = await actions.tournament.getCurrent(e.tournament_id)
        if (store.currentPage =="Swap Offer" && remoteMessage.data.id==store.currentSwap.id){
          var s = actions.refresh.toggle()
          var e = await actions.swap.getCurrent(remoteMessage.data.id)
          var sw = actions.refresh.toggle()
          return customMessage(remoteMessage.data.alert)
        }else{
          null
        }
        if(store.currentPage =="Event Lobby"){
          console.log('in event lobby')

          var e = await actions.swap.returnCurrent(remoteMessage.data.id)
          var x = await actions.tournament.getCurrent(e.tournament_id)
          var xr = await actions.tournament.setCurrentLobby(x, x.tournament)
          return customMessage(remoteMessage.data.alert)
        }
      }
      var checkPress = (reason) => {
        console.log(reason)

        if (reason =='user'){
          goToThing(remoteMessage)
        }else{null}
      }
      if(remoteMessage.data.type == 'buyin'){

      }
      if(store.currentPage == "Chat"  && remoteMessage.data.type == 'chat'){
        return actions.chat.refresh(true)
      }else if(store.currentPage == "Contacts"  && remoteMessage.data.type == 'chat'){
        return actions.chat.getMine()
      }else if(remoteMessage.data.type == 'chat'){
        actions.chat.refresh(true)
        return Toast.show({
          style: {
           backgroundColor: "rgb(10,132,255)"},
           duration:3000,
           buttonText: "Go To",
          buttonTextStyle: { color: "#008000" },
          buttonStyle: { backgroundColor: "#5cb85c" },
           onClose: (reason)=> checkPress(reason),
          text:remoteMessage.notification.title+ ':  '+ remoteMessage.data.alert, 
           position:'top'})
      }else{null}

      Alert.alert(
        remoteMessage.notification.title, 
        remoteMessage.notification.body,
        [
          { text: 'Open', onPress: () => goToThing(remoteMessage) },
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
    item.countdown.includes('ago') ? x = 'Started' : x = 'Starts'
    return(
      <SwapTracker key={index}  event={item} 
      countdown={item.countdown} timeBy={x}
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
  if( Object.keys(store.myCurrentTrackers)[0] !== "message" && store.myCurrentTrackers.length !== 0 && !store.myProfile.naughty){
    liveTracker = aflatlist()} 
  // NO LIVE TOURNAMENTS AND/OR NEW USER VIEW
  else if (store.myProfile.naughty){
    liveTracker = <Text style={{color:currentStyle.text.color, width:'80%', alignSelf:'center', marginTop:20, textAlign:'center', fontSize:18}}>
                    You've been put on the naughty list.{'\n'}{'\n'}
                    To start swapping again,{'\n'}
                    please pay your overdue swaps and have the other users confirm payment.
                  </Text>
  } else{
    liveTracker = noTracker('live', onRefresh1)
  }

  // UPCOMING TRACKER LIST
  if( Object.keys(store.myUpcomingTrackers)[0] !== "message" && store.myUpcomingTrackers.length !== 0 && !store.myProfile.naughty){
    upcomingTracker = bflatlist()
  }else if(store.myProfile.naughty){
    upcomingTracker = <Text style={{color:currentStyle.text.color, width:'80%', alignSelf:'center', marginTop:20, textAlign:'center', fontSize:18}}>
                        You've been put on the naughty list.{'\n'}{'\n'}
                        To start swapping again,{'\n'}
                        please pay your overdue swaps and have the other users confirm payment.
                      </Text>
  } else{
    upcomingTracker = noTracker('upcoming', onRefresh2)
  }  

  return(
    <Container >
      <View style={{height:20,  backgroundColor:currentStyle.header.color}}>
      <StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
				backgroundColor={'rgb(38, 171, 75)'}/>
      </View>
      
      <Content contentContainerStyle={{flex:1}}>
      <HomeHeader title={'Active Swaps'} />
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