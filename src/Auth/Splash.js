import React, {useContext, useEffect} from 'react';
import { View, StatusBar } from 'react-native';
import { Text,Icon} from 'native-base';

import { firebase } from '@react-native-firebase/messaging';

import {Context} from '../Store/appContext'

import AsyncStorage from '@react-native-community/async-storage';

export default SplashScreen = (props) => {

	const { store, actions } = useContext(Context)

	checkData = async() => {
		const currentToken = await AsyncStorage.getItem('loginToken')
		console.log('currentToken', currentToken)
		if (currentToken){

			var data = {jwt: currentToken}

			var answer0 = await actions.userToken.store(data)
			var answer = await actions.profile.get()

			console.log('profile befroe check', store.myProfile)

			if( Object.keys(store.myProfile)[0] != 'msg' 
				// store.myProfileObj[0] {msg: "Token has expired"}

				// store.myProfile !== {msg: "Signature verification failed" } 
					// || store.myProfile !== {msg: "Not enough segments"} 
					// || 
					// || store.myProfile !== {msg:  "Bad Authorization header. Expected value 'Bearer <JWT>'"} 
			){
				console.log('we are in')
				var answer2 = await actions.user.auto_login(props.navigation)
			}else{
				console.log('badToken')
				AsyncStorage.removeItem('loginToken')
				props.navigation.navigate('LogIn')

			}

		} else{
			console.log('token is null')
			props.navigation.navigate('LogIn')

		}
		
	}


	hasPermission = async() => {
		var answer = await firebase.messaging().hasPermission();
		console.log(answer)
		if (answer){
			var answer2 = await firebase.messaging().getToken();
			console.log('fmtoken',fcmToken) 
			console.log('It has Permission')

		}else{
			console.log('Requesting Permission')
			getPermission()
		}
	}

	registerNotifications = async() => {
		if (!firebase.messaging().isRegisteredForRemoteNotifications) {
			var answer33 = await firebase.messaging().registerForRemoteNotifications();
			console.log('registered for notifications')
		}else{
			console.log('was already refistered')
		}
	}

	getPermission = async() => {
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
		<View style={styles.container}>
		    <StatusBar backgroundColor={'rgb(12,85,32)'}
				StatusBarAnimation={'none'}
				/>

			<View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
			<Icon type="FontAwesome5" name="handshake" style={{fontSize:80,color:'white'}} />

			<Text style={styles.text}>Swap Profit</Text> 
			</View>
		</View>
	)
}

const styles = {
    container:{
        flex:1, 
        backgroundColor: 'rgb(12,85,32)'
    },
    text:{
        fontSize:48,
        fontWeight:"bold",
        color: 'white'
    }
}