import React, {useContext, useEffect} from 'react';
import { View, StatusBar, Image } from 'react-native';
import { firebase } from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

import {Context} from '../Store/appContext'

export default SplashScreen = (props) => {

	const { store, actions } = useContext(Context)

	const checkData = async() => {
		const currentToken = await AsyncStorage.getItem('userToken')

		if (currentToken){

			var answer0 = await actions.userToken.store(currentToken)
			var answer555 = await actions.profile.get()

			if( Object.keys(store.myProfile)[0] != 'msg'&& Object.keys(store.myProfile)[0] != 'message' && store.myProfile !== undefined){
				console.log('Valid User Token')
				var answer2 = await actions.user.auto_login(props.navigation)
			}else{				
				console.log('Bad User Token')
				actions.userToken.remove()
				// props.navigation.navigate({name:'LogIn', key:'SCREEN_KEY_A'})
				props.navigation.navigate('LogIn')

			}

		} else{
			console.log('Null User Token')
			actions.userToken.remove()
			// props.navigation.navigate({name:'LogIn', key:'SCREEN_KEY_A'})
			props.navigation.navigate('LogIn')

		}
		
	}

	const hasPermission = async() => {
		var answer = await firebase.messaging().hasPermission();
		console.log('hasPermission',answer)
		if (answer){
			var fcmToken = await firebase.messaging().getToken();
			console.log('It has Permission')
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

	useEffect(() => {
		hasPermission();
		setTimeout(() => {
			checkData()
		}, 3000);
		
		return () => {
			// cleanup
		};
	}, []) 

	return(
		<View style={styles.main.container}>
				<StatusBar 
					backgroundColor={'rgb(38, 171, 75)'} StatusBarAnimation={'none'}/>
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