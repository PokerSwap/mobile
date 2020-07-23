import React, {useContext, useEffect} from 'react';
import { View, StatusBar, Image } from 'react-native';
import { firebase } from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { useNavigation } from '@react-navigation/native'


import { Context } from '../Store/appContext'

export default SplashScreen = (props) => {
	const { store, actions } = useContext(Context)

const navigation = useNavigation()

	const checkData = async() => {
		const savedUserToken = await AsyncStorage.getItem('userToken')
		const savedLoginInfo = await AsyncStorage.getItem('loginInfo')

		// IF A TOKEN IS STORED ON DEVICE
		if (savedUserToken){
			// CHECKING USER TOKEN
			var checkUserToken = await actions.userToken.check(savedUserToken)
			// IF TOKEN IS VALID, MOVE TO AUTO-LOGIN PROCESS
			if(checkUserToken && savedLoginInfo){
				var x = JSON.parse(savedLoginInfo)
				console.log('x',x, typeof(x))
				var autoLoggingIn = await actions.user.login(x, navigation)
				var annn = await aaaa()
			}else{
				console.log('Current User Token is bad or expired.  Now moving to Login Screen.')
				var wwx = await AsyncStorage.removeItem('userToken')
				var wett = await AsyncStorage.removeItem('loginInfo')
				navigation.navigate('Login')
			}			
		} 
		// IF NO TOKEN IS STORED ON DEVICE
		else{
			console.log('Null User Token')
			navigation.navigate('Login')
		}
	}

// WHEN MESSAGE COMES WHILE APP IS IN BACKGROUND
// var x = firebase.messaging().onNotificationOpenedApp(async (remoteMessage) => {
//   console.log('onNotificationOpenedApp:', remoteMessage)
  // var y = await AsyncStorage.setItem('notificationData', JSON.stringify(remoteMessage.data))
  // var z = await AsyncStorage.getItem('notificationData')
  // console.log('when recieved',remoteMessage,z)
// });


PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: async (notificationData) => {
		console.log('onNotification' ,notificationData )
		var x = await actions.notification.store(notificationData)

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

// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('Background remote message coming in', remoteMessage)

// })

	const hasPermission = async() => {
		var answer = await firebase.messaging().hasPermission();
		// console.log('hasPermission',answer)
		if (answer){
			var fcmToken = await firebase.messaging().getToken();
			// console.log('It has Permission')
		}else{
			console.log('Requesting Permission')
			getPermission()
		}
	}

	const registerNotifications = async() => {
		if (!firebase.messaging().isRegisteredForRemoteNotifications) {
			var answer33 = await firebase.messaging().registerForRemoteNotifications();
			console.log('registered for notifications')
		}else{
			console.log('was already refistered')
		}
	}

	const getPermission = async() => {
		var answer1 = await firebase.messaging().requestPermission();
		var answer2 = await registerNotifications()
		(answer1) ? console.log('access granted') : console.log('access denied')
	}

	const aaaa = async() => {
		    // Check whether an initial notification is available
				firebase.messaging()
				.getInitialNotification()
				.then(remoteMessage => {
					if (remoteMessage) {
						console.log(
							'Notification caused app to open from quit state:',
							remoteMessage,
						);
						actions.notification.store(remoteMessage.data) 
						console.log('On Background Check', store.notificationData.type)
					}
				})
	
	}

	useEffect(() => {
		hasPermission();
		// x()
		setTimeout(() => {
			checkData()

		}, 3000);
		
		return () => {
			// cleanup
		};
	}, []) 

	return(
		<View style={styles.main.container}>
			<StatusBar StatusBarAnimation={'none'}
				backgroundColor={'rgb(38, 171, 75)'}/>
			<View style={styles.image.container}>
				<Image source={require("../Images/transparent-logo.png")}
					style={styles.image.image}/>
			</View>
		</View>
	)
}

const styles = {
    main:{
			container:{
				flex:1, backgroundColor: 'rgb(38, 171, 75)'}      
		},
		image:{
			container:{
				flex:1, flexDirection:'column', alignItems:'center', 
				justifyContent:'center'},
			image:{
				height:300, width:300}
		},
}