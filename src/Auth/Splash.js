import React, {useContext, useEffect, useState} from 'react';
import { View, StatusBar, Image, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { useNavigation, CommonActions } from '@react-navigation/native'

import NetInfo from "@react-native-community/netinfo";

import { Context } from '../Store/appContext'

export default SplashScreen = (props) => {
	const { store, actions } = useContext(Context)
	const navigation = useNavigation()

	const [loading, setLoading] = useState(false)

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
				// console.log('Saved Logged Info',x, typeof(x))
				var autoLoggingIn = await actions.user.login(x, navigation)
				// var annn = await getInitialNotification()
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

	const hasPermission = async() => {
		var answer = await messaging().hasPermission();
		if (answer){
			var fcmToken = await messaging().getToken();
		}else{
			console.log('Requesting Permission')
			getPermission()
		}
	}

	const getPermission = async() => {
		var answer1 = await messaging.requestPermission();
		var answer2 = await registerNotifications()
		(answer1) ? console.log('access granted') : console.log('access denied')
	}

	const registerNotifications = async() => {
		if (!messaging().isRegisteredForRemoteNotifications) {
			var answer33 = await messaging().registerForRemoteNotifications();
			console.log('registered for notifications')
		}else{
			console.log('was already refistered')
		}
	}

	useEffect(() => {
		setLoading(true)
		hasPermission();
		setTimeout(() => {
			checkData()
		}, 2000);
		setLoading(false)
		return () => {
			// cleanup
		};
	}, [loading]) 

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