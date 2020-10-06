import React, {useState, useEffect} from 'react';
import { Root } from 'native-base';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { AppearanceProvider } from 'react-native-appearance';

import AppContainer from './AppContainer.js'
import messaging from '@react-native-firebase/messaging'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

// var x = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   try{
//     console.log('Background remote message coming in', remoteMessage)
//     var wwx = await AsyncStorage.setItem('notificationData', JSON.stringify(remoteMessage))
//   }catch(err){
//     console.log('back erro', err)
//   }

// })
// console.log("is registerd for remote?", messaging().isDeviceRegisteredForRemoteMessages)
 
// // FROM QUIT TO OPEN STATE
// messaging().getInitialNotification(async (remoteMessage) => {
//   try{
//     console.log('Getting from quit state', remoteMessage)
//     var wwx = await AsyncStorage.setItem('notificationData', JSON.stringify(remoteMessage))
//   }catch(err){
//     console.log('back err', err)
//   }

// })

// messaging().onSendError(event => {
//   console.log('send error id',event.messageId);
//   console.log('send error event',event.error);
// });
export default App = () => {

  // const [permissions, setPermissions] = useState({});

  // useEffect(() => {
  //   PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  // });

  // const onRemoteNotification = (notification) => {
  //   const isClicked = notification.getData().userInteraction === 1

  //   if (isClicked) {
  //      console.log('Gabe it worked', notification)
  //   } else {
  //      // Do something else with push notification
  //   }
  // };
  return(
    <Root> 
      <AppearanceProvider>

        <AppContainer />
      </AppearanceProvider>

    </Root>
  )
}


