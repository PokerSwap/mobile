import React, { useEffect} from 'react';
import { View, StatusBar } from 'react-native';
import {Container, Content, Text} from 'native-base';

export default SplashScreen = (props) => {

	useEffect(() => {
		console.log('In 3 seconds, another message will appear'); 
		setTimeout(()=>{
			console.log('3 seconds have passed');
			props.navigation.navigate('LogIn')
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