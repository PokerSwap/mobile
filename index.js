import App from './App';
import { name as appName } from './app.json';

import { AppRegistry, Platform } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging'

const iosConfig = {
  clientId: '1008390219361-a5ve7cvrf95qcg31ttijkovrosfsgrgq.apps.googleusercontent.com',
  appId: '1:1008390219361:ios:bc948e772c2b965d892c20',
  apiKey: 'AIzaSyA-zmma-TLbiYh0F3jA3yH7n5FRvY35Sp4',
  databaseURL: 'https://swapprofitapp.firebaseio.com',
  storageBucket: 'swapprofitapp.appspot.com',
  messagingSenderId: '1008390219361',
  projectId: 'swapprofitapp',
  persistence: true,
};
 
const androidConfig = {
  clientId: '1008390219361-qfto4dakckbg5lt9n127e5jb2km4asl2.apps.googleusercontent.com',
  appId: '1:1008390219361:android:275a612fed54e03b892c20',
  apiKey: 'AIzaSyA-zmma-TLbiYh0F3jA3yH7n5FRvY35Sp4',
  databaseURL: 'https://swapprofitapp.firebaseio.com',
  storageBucket: 'swapprofitapp.appspot.com',
  messagingSenderId: '1008390219361',
  projectId: 'swapprofitapp',
  persistence: true,
};

if (!firebase.apps.length) {
  try {
    firebase
      .initializeApp(
        Platform.OS === 'ios' ? iosConfig : androidConfig,
        'SwapProfit',
      )
      .then(app => console.log('initialized apps ->', firebase.apps));
  } catch (err) {
    console.error('Firebase initialization error raised', err.stack)
  }
} 

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Background remote message coming in', remoteMessage)
})

messaging().onSendError(event => {
  console.log('send error id',event.messageId);
  console.log('send error event',event.error);
});

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
