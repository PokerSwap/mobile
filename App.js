import React, {useState, useEffect} from 'react';
import { Alert } from 'react-native'
import { Root } from 'native-base';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';

import AppContainer from './AppContainer.js'



export default  App = () => {

  // const navigation = useNavigation();
  // const [loading, setLoading] = useState(true);
  // const [initialRoute, setInitialRoute] = useState('Root');

  // useEffect(() => {

    
  //   const goToThing = async(data) => {
  //     setXXX(true)
  //     console.log('name', data)
  //     if(data.type == 'event'){
  //       var cc = await actions.navigate.toEvent(data, navigation)
  //     }else if(data.type == 'swap'){
  //       var cc = await actions.navigate.toSwap(data, navigation)
  //     }else{
  //       null
  //     }
  //     setXXX(false)
  //   }

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     Alert.alert(
  //       remoteMessage.notification.title,
  //       remoteMessage.notification.body,
  //       [
  //         { text: 'Go to...', onPress: () => goToThing(remoteMessage.data) },
  //         { text: 'Close', onPress: () => console.log("Cancel Pressed"), }
  //       ]
  //     )
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         goToThing(remoteMessage.data)
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
          
  //       }
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return null;
  // }

  return(
    <Root>
      <AppContainer />
    </Root>
  )
}

