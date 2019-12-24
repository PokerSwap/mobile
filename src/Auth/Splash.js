import React, {useContext, useEffect} from 'react';
import { View, StatusBar } from 'react-native';
import {Container, Content, Text} from 'native-base';

import {Context} from '../Store/appContext'

import AsyncStorage from '@react-native-community/async-storage';

export default SplashScreen = (props) => {

	const { store, actions } = useContext(Context)

	getData = async () => {
		try {
			if(myValue !== null) {
				actions.user.auto_login(myValue, props.navigation )
				// value previously stored
			}
		} catch(error) {
			console.log('error:', error)
		}
	}

	var myValue;

	checkData = async() => {
		const value1 = await AsyncStorage.getItem('token')
		console.log('value1', typeof value1)
		myValue = value1
	}


	useEffect(() => {
		
		// checkData()
		console.log('In 3 seconds, another message will appear'); 
		setTimeout(()=>{
			console.log('3 seconds have passed');
			// if(typeof myValue == 'string'){getData()}else{
				props.navigation.navigate('LogIn')
			// }
			
		}, 3000)
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