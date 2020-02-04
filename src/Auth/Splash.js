import React, {useContext, useEffect} from 'react';
import { View, StatusBar } from 'react-native';
import { Text,Icon} from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';


import { firebase } from '@react-native-firebase/messaging';

import {Context} from '../Store/appContext'

import AsyncStorage from '@react-native-community/async-storage';

export default SplashScreen = (props) => {

	const { store, actions } = useContext(Context)

	checkData = async() => {
		const currentToken = await AsyncStorage.getItem('loginToken')
		// console.log('currentToken', currentToken)
		if (currentToken){

			var data = {jwt: currentToken}

			var answer0 = await actions.userToken.store(data)
			var answer = await actions.profile.get()

			if( Object.keys(store.myProfile)[0] != 'msg'){
				var answer2 = await actions.user.auto_login()

				var prenotificationData = await AsyncStorage.getItem('notification')
				var notificationData = JSON.parse(prenotificationData)
				console.log('notificationData', notificationData, typeof(notificationData))

				if(notificationData !== null){

					var aiubie = await AsyncStorage.removeItem('notification')

					var id = notificationData.id
					var type = notificationData.type
					var initialPath = notificationData.initialPath
					var finalPath = notificationData.finalPath

					var andwer
					if (type == 'tournament') {
						andwer = await actions.tournament.getOne(id)
						console.log('tour', andwer)
					} else if(type == 'swap'){
						andwer = await actions.swap.getOne(id)
						console.log('swap', andwer)
					} else{
						console.log('so what now?')
					}

					var requestedEntity = store.notificationData;
					console.log('requestedEntity', requestedEntity, typeof(requestedEntity))

					var answer1 = await actions.tournament.getAction(id);
    			var answer4 = console.log('answer', answer1)
					
					const navigateAction = NavigationActions.navigate({
						routeName: initialPath,
						params: {},				
						action: StackActions.push({ 
							routeName: finalPath,
							params:{
								action: store.action,
								tournament_id: tournament.id,
								name: tournament.name,
								address: tournament.address,
								city: tournament.city,
								state: tournament.state,
								longitude: tournament.longitude,
								latitude: tournament.latitude,
								start_at: tournament.start_at,
								buy_ins: tournament.buy_ins,
								swaps: tournament.swaps,
								flights: tournament.flights
							}
						 }),
					});
					
					props.navigation.dispatch(navigateAction);

					

				

					
				}else{
					props.navigation.navigate('Swaps')
					AsyncStorage.removeItem('notification')

				}
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
		console.log('hasPermission',answer)
		if (answer){
			var fcmToken = await firebase.messaging().getToken();
			// console.log('fmtoken',fcmToken) 
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