import React, {useContext, useEffect} from 'react';
import { View, StatusBar } from 'react-native';
import {Container, Content, Text} from 'native-base';

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




	useEffect(() => {
		setTimeout(() => {
			checkData()
		}, 3000);
		

		
		return () => {
			// cleanup
		};
	}, []) 

	return(
		<View style={styles.container}>
							<StatusBar barStyle='light-content'/>

				<Text style={styles.text}>Swap Profit</Text> 
		</View>
	)
}

const styles = {
    container:{
        flex:1, 
        justifyContent: "center",
        alignItems:'center',
        backgroundColor: 'rgb(12,85,32)'
    },
    text:{
        fontSize:48,
        fontWeight:"bold",
        color: 'white'
    }
}