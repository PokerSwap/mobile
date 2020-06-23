import React , {useEffect, useState} from 'react';
import { Root } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'
import messaging  from '@react-native-firebase/messaging';

import AppContainer from './AppContainer.js'

export default  App = () => {
  // WHEN MESSAGE COMES WHILE APP IS IN BACKGROUND
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('SwapDashboard');


  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.title,
  //     );
  //     navigation.navigate(remoteMessage.data.finalPath);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage,
  //         );
  //         setInitialRoute(remoteMessage.data.finalPath); // e.g. "Settings"
  //       }
  //       setLoading(false);
  //     });
  // }, []);




  return(
    <Root>
      <AppContainer />
    </Root>
  )
}

