import React, {useContext, useState, useCallback, useEffect } from 'react';
import { Alert, FlatList, RefreshControl, ScrollView } from 'react-native';
import { Button, Container, Content, Icon, ListItem, Tabs, Tab, TabHeading, Text } from 'native-base';
import messaging from '@react-native-firebase/messaging'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import HomeHeader from '../../View-Components/HomeHeader'
import { Context } from '../../Store/appContext'
import SwapTracker from './Components/SwapTracker';

var testPush = () => {
  PushNotificationIOS.presentLocalNotification({
    alertTitle:"GABBBBBBE",
    alertBody:"AAAAAAA",
    applicationIconBadgeNumber: 1,
  });

console.log('done')


}

export default SwapDashboard = (props) => {
  const { store, actions } = useContext(Context)
  const navigation = useNavigation()
  // const [permissions, setPermissions] = useState({});

  // useEffect(() => {
  //   PushNotificationIOS.addEventListener('register', onRegistered);
  //   PushNotificationIOS.addEventListener(
  //     'registrationError',
  //     onRegistrationError,
  //   );
  //   PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  //   PushNotificationIOS.addEventListener(
  //     'localNotification',
  //     onLocalNotification,
  //   );

  //   PushNotificationIOS.requestPermissions().then(
  //     (data) => {
  //       console.log('PushNotificationIOS.requestPermissions', data);
  //     },
  //     (data) => {
  //       console.log('PushNotificationIOS.requestPermissions failed', data);
  //     },
  //   );

  //   return () => {
  //     PushNotificationIOS.removeEventListener('register', onRegistered);
  //     PushNotificationIOS.removeEventListener(
  //       'registrationError',
  //       onRegistrationError,
  //     );
  //     PushNotificationIOS.removeEventListener(
  //       'notification',
  //       onRemoteNotification,
  //     );
  //     PushNotificationIOS.removeEventListener(
  //       'localNotification',
  //       onLocalNotification,
  //     );
  //   };
  // }, []);

  // const sendNotification = () => {
  //   DeviceEventEmitter.emit('remoteNotificationReceived', {
  //     remote: true,
  //     aps: {
  //       alert: 'Sample notification',
  //       badge: '+1',
  //       sound: 'default',
  //       alertTitle: 'title',
  //       category: 'REACT_NATIVE',
  //       'content-available': 1,
  //     },
  //   });
  // };

  // const sendLocalNotification = () => {
  //   PushNotificationIOS.presentLocalNotification({
  //     alertTitle: 'Sample Title',
  //     alertBody: 'Sample local notification',
  //     applicationIconBadgeNumber: 1,
  //   });
  // };

  // const scheduleLocalNotification = () => {
  //   PushNotificationIOS.scheduleLocalNotification({
  //     alertBody: 'Test Local Notification',
  //     fireDate: new Date().toISOString(),
  //   });
  // };

  // const onRegistered = (deviceToken) => {
  //   Alert.alert('Registered For Remote Push', `Device Token: ${deviceToken}`, [
  //     {
  //       text: 'Dismiss',
  //       onPress: null,
  //     },
  //   ]);
  // };

  // const onRegistrationError = (error) => {
  //   Alert.alert(
  //     'Failed To Register For Remote Push',
  //     `Error (${error.code}): ${error.message}`,
  //     [
  //       {
  //         text: 'Dismiss',
  //         onPress: null,
  //       },
  //     ],
  //   );
  // };

  // const onRemoteNotification = (notification) => {
  //   const result = `
  //     Title:  ${notification.getTitle()};\n
  //     Message: ${notification.getMessage()};\n
  //     badge: ${notification.getBadgeCount()};\n
  //     sound: ${notification.getSound()};\n
  //     category: ${notification.getCategory()};\n
  //     content-available: ${notification.getContentAvailable()}.`;

  //   Alert.alert('Push Notification Received', result, [
  //     {
  //       text: 'Dismiss',
  //       onPress: null,
  //     },
  //   ]);
  // };

  // const onLocalNotification = (notification) => {
  //   Alert.alert(
  //     'Local Notification Received',
  //     `Alert title:  ${notification.getTitle()},
  //     'Alert message:  ${notification.getMessage()}`,
  //     [
  //       {
  //         text: 'Dismiss',
  //         onPress: null,
  //       },
  //     ],
  //   );
  // };

  // const showPermissions = () => {
  //   PushNotificationIOS.checkPermissions((permissions) => {
  //     setPermissions({permissions});
  //   });
  // };

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={()=> a_refresh()} />}
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
        ListFooterComponentStyle={{alignSelf:'center', marginTop:20}}
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
        refreshControl={ 
          <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh1()} />}
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
        refreshControl={ 
          <RefreshControl refreshing={refreshing} onRefresh={()=>onRefresh2()} />}/>

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
      <Content>
        {/* <Button onPress={()=> sendLocalNotification}><Text>Preess</Text></Button> */}
        <Tabs  
          tabBarTextStyle={{fontWeight:'bold', color:'white'}}
        tabBarTextStyle={{color:'white'}}>
          {/* LIVE SWAPTRACKER BODY */}
          <Tab 
          style={{color:'white'}}
          activeTextStyle={{fontWeight:'bold', color:'white'}}  heading="LIVE">
            {liveTracker}
          </Tab>
          {/* UPCOMING SWAPTRACKER */}
          <Tab heading="UPCOMING"
                  style={{color:'white'}}

          activeTextStyle={{fontWeight:'bold', color:'white'}}
          >
            {upcomingTracker}
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