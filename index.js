/**
 * @format
 */
import { Platform } from 'react-native';
import firebase from '@react-native-firebase/app';

import messaging from '@react-native-firebase/messaging'

import AsyncStorage from '@react-native-community/async-storage'
import stripe from 'tipsi-stripe'

stripe.setOptions({
  publishableKey: '<PUBLISHABLE_KEY>',
  merchantId: '<MERCHANT_ID>',
  androidPayMode: 'test',
})

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
 
const SwapProfitApp = firebase
  .initializeApp(
    // use platform-specific firebase config
    Platform.OS === 'ios' ? iosConfig : androidConfig,
    // name of this app
    'SwapProfitApp',
  )
  .then(app => console.log('initialized apps ->', firebase.apps));


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
  console.log('FCM Message Data:', remoteMessage);
 
  var messageArray
  var currentMessages = await AsyncStorage.getItem('messages');
  currentMessages != null ? messageArray = JSON.parse(currentMessages) : messageArray =[]
   messageArray.push(remoteMessage);
   var answer3 = await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
   var check3 = await AsyncStorage.getItem('messages')
   console.log('now', check3)
});   
 


messaging().onSendError(event => {
  console.log(event.messageId);
  console.log(event.error);
});

getToken = async()=> {
  var fcmToken = await firebase.messaging().getToken();
  console.log('fmtoken',fcmToken) 
}

getToken()

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
