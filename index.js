import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Platform, Alert } from 'react-native';
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

// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function(token) {
//     console.log("TOKEN:", token);
//   },

//   // (required) Called when a remote or local notification is opened or received
//   onNotification: async function(notificationData) {
//     console.log('huh',notificationData,z)

//     var x = await AsyncStorage.removeItem('notificationData')
//     var y = await AsyncStorage.setItem('notificationData', JSON.stringify(notificationData.data))
//     var z = await AsyncStorage.getItem('notificationData')
//     console.log('when recieved',notificationData,z)

//     // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
//     notificationData.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
//   senderID: '1008390219361',

//   // IOS ONLY (optional): default: all - Permissions to register.
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true
//   },

//   // Should the initial notification be popped automatically
//   // default: true
//   popInitialNotification: true,

//   /**
//    * (optional) default: true
//    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//    */
//   requestPermissions: true
// });

// const checkAuth = () => {
//   firebase.auth().onAuthStateChanged( user => {
//     if (!user) {
//       firebase.auth().signInAnonymously();
//     }
//   })
// }

// const send = messages => {
//   messages.forEach(item => {
//     const message = {
//       text: item.text,
//       timestamp: firebase.database.ServerValue.TIMESTAMP,
//       user: item.user
//     }
//     db.push(message)
//   })
// }

// const parse = message => {
//   const { user, text, timestamp } = message.val();
//   const {key: _id} = message
//   const createdAt = new Date(timestamp)

//   return{
//     _id, createdAt, text, user
//   }
// }

// const get = callback => {
//   db.on('child_added', snapshot => callback(parse(snapshot)))
// }

// const off = () => {
//   db.off()
// }

// get db() {
//   return firebase.database().ref("messages")
// }

// get uid(){
//   return(firebase.auth().currentUser || {}).uid
// }

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Background remote message coming in', remoteMessage)

})


// WHEN MESSAGE COMES WHILE APP IS IN BACKGROUND
// messaging().onNotificationOpenedApp(async (remoteMessage) => {
//   console.log('onNotificationOpenedApp:', remoteMessage)
//   var x = await AsyncStorage.removeItem('notificationData')
//   var y = await AsyncStorage.setItem('notificationData', JSON.stringify(remoteMessage.data))
//   var z = await AsyncStorage.getItem('notificationData')
//   console.log('when recieved',remoteMessage,z)
// });


 
messaging().onSendError(event => {
  console.log('send error id',event.messageId);
  console.log('send error event',event.error);
});

getToken = async()=> {
  var requestingMessagingPermission = await messaging().requestPermission();
  var fcmToken = await messaging().getToken();
  console.log('FCM Token Recieved: ',fcmToken) 
}

getToken()


AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
