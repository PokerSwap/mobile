/**
 * @format
 */
import React, {useContext} from 'react';
import { Platform, Alert } from 'react-native';
import firebase from '@react-native-firebase/app';

import 'react-native-gesture-handler';

import messaging from '@react-native-firebase/messaging'

import AsyncStorage from '@react-native-community/async-storage'

import PushNotification from 'react-native-push-notification'

import PushNotificationIOS from '@react-native-community/push-notification-ios'




import {Context} from './src/Store/appContext'

// pluck values from your `GoogleService-Info.plist` you created on the firebase console
const iosConfig = {
  clientId: '1008390219361-iud7lpml96bnaiihn8uhhusoeuc2d9tj.apps.googleusercontent.com',
  appId: '1:1008390219361:ios:097f14f8ce89b396892c20',
  apiKey: 'AIzaSyA-zmma-TLbiYh0F3jA3yH7n5FRvY35Sp4',
  databaseURL: 'https://swapprofitapp.firebaseio.com',
  storageBucket: 'swapprofitapp.appspot.com',
  messagingSenderId: '1008390219361',
  projectId: 'swapprofitapp',
 
  // enable persistence by adding the below flag
  persistence: true,
};
 
// pluck values from your `google-services.json` file you created on the firebase console
const androidConfig = {
  clientId: '1008390219361-qfto4dakckbg5lt9n127e5jb2km4asl2.apps.googleusercontent.com',
  appId: '1:1008390219361:android:275a612fed54e03b892c20',
  apiKey: 'AIzaSyA-zmma-TLbiYh0F3jA3yH7n5FRvY35Sp4',
  databaseURL: 'https://swapprofitapp.firebaseio.com',
  storageBucket: 'swapprofitapp.appspot.com',
  messagingSenderId: '1008390219361',
  projectId: 'swapprofitapp',
 
  // enable persistence by adding the below flag
  persistence: true,
};

if (!firebase.apps.length) {
  try {

    firebase
    .initializeApp(
      // use platform-specific firebase config
      Platform.OS === 'ios' ? iosConfig : androidConfig,
      // name of this app
      'SwapProfit',
    )
    .then(app => console.log('initialized apps ->', firebase.apps));
  } catch (err) {
      console.error('Firebase initialization error raised', err.stack)
  }
} 

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: async function(notificationData) {
    console.log("NOTIFICATION:", notificationData);
    var answer2 = await AsyncStorage.setItem('notification', JSON.stringify(notificationData))
    
    // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
    notificationData.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: '1008390219361',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true
});


messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // Update a users messages list using AsyncStorage
  console.log('remoteMessage',remoteMessage)
  const currentMessages = await AsyncStorage.getItem('messages');
  var messageArray
  currentMessages==null ? messageArray = [] :  messageArray = JSON.parse(currentMessages);
  messageArray.push(remoteMessage.data);
  console.log('messagearrayabco', messageArray)
  await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
});

messaging().onMessage(async (remoteMessage) => {
  getToken()
  console.log('FCM Message Data:', remoteMessage);
 
  Alert.alert(
    "Swap Alert",
    remoteMessage.data.message,
    [
      {
        text: 'Yes',
        onPress: () => console.log('yes')
      },
      {
        text: 'No',
        onPress: () => console.log("Cancel Pressed"),
      }
    ]
  )
});   
 
messaging().onSendError(event => {
  console.log('send error id',event.messageId);
  console.log('send error event',event.error);
});

getToken = async()=> {
  var fcmToken = await firebase.messaging().getToken();
  console.log('fcmtoken',fcmToken) 
}

getToken()

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
