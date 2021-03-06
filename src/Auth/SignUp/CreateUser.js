import React, { useContext, useState } from 'react';
import { Context } from '../../Store/appContext';
import { useNavigation } from '@react-navigation/native'

import { Keyboard, TextInput } from 'react-native'
import { Button, Container, Item, Content, Toast, Icon, Text, View } from 'native-base';
import OtherHeader from '../../View-Components/OtherHeader';

export default CreateUser = () => {
	const { store, actions } = useContext(Context)

	const [ loading, setLoading] = useState(false)
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ c_password, setC_Password] = useState('')
	const [ submitted, setSubmitted ] = useState(false)
	const [ disabled, setDisabled] = useState(false)
	const [ an_auto, set_An_Auto] = useState(false)

	const navigation = useNavigation()

	let ree = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}.*$/
	let xxx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	const createUser = async() => {
		if(email !== '' && xxx.test(email)){
			if(password.length >= 6 && ree.test(password)){
				password == c_password ? 
					userStart(): errorMessage('Make sure your passwords match')
			} else {
				errorMessage('Your password must have at least 6 characters'+
				' containing at least one lowercase letter,'+
				' one uppercase letter, and one number.')
			}
		} else {
			errorMessage('Please enter a valid email address')
		}
	}

	const userStart = async() => {
		var answer323 = await actions.user.add(email, password)
		setSubmitted(answer323)
		if (answer323 ==true){
			set_An_Auto(true);setTimeout(()=>{navigation.pop(2)}, 5000)
		} else {set_An_Auto(false)}
	}

	const handler = () => {
		setDisabled(true)
		createUser();
		setTimeout(()=>{setDisabled(false)}, 4000)
	  }

	const errorMessage = (x) => {
		Toast.show({text:x, duration:3000, position:'top'})}
		
	let userPassword = null, confirmPassword = null;

	return(
		<Container >
			<OtherHeader title={"User Creation"} auto={an_auto}/>
			<Content contentContainerStyle={styles.mainContainer}>
			{submitted ? 
				// Submitted Success
				<View transparent style={{justifyContent:'center', width:'80%'}}>
					<Text style={{textAlign:'center', fontSize:24}}>
						A validation link has been sent to your {} 
						email at {email}.
					</Text>
				</View>
				:
				// Waiting for Valid Email
				<View transparent style={styles.validateContainer}>
					
					{/* USER INSTRUCTIONS */}
					<View style={{width:'90%', alignSelf:'center'}}>
						<Text style={{textAlign:"center", fontSize:16, marginBottom:10}}>
							Please enter your personal email address.
						</Text>
						<Text style={{textAlign:"center", fontSize:16}}>
							Then create a password at least 6 characters long 
							containing at least one lowercase letter, 
							one uppercase letter, and one number.
						</Text>
					</View>
					
					{/* EMAIL ADDRESS FIELD */}
					<Item style={styles.item}>
						<Icon active name='mail' style={{fontSize:40}}/>
						<TextInput 
							placeholder=" Enter Email"
							keyboardType="email-address"
							placeholderTextColor={'grey'}

							blurOnSubmit={false}
							style={styles.textInput}
							returnKeyType="next"
							autoCapitalize='none'
							autoCorrect={false} 
							onSubmitEditing={() => { userPassword.focus(); }}
							value={email}    
							onChangeText={email => setEmail( email )}/>
					</Item>
					
					{/* PASSWORD FIELD */}
					<Item style={styles.item}>
						<Icon active name='key' style={{fontSize:40}}/>
						<TextInput 
							placeholder=" Enter Password"
							placeholderTextColor={'grey'}

							textContentType={'newPassword'}
							selectTextOnFocus={true}
							secureTextEntry
							style={styles.textInput}								
							autoCapitalize='none'
							returnKeyType="next"
							autoCorrect={false} 
							ref={(input) => { userPassword = input; }} 
							onSubmitEditing={() => { confirmPassword.focus(); }}
							value={password}
							onChangeText={password => setPassword( password )}/>
					</Item>

					{/* CONFIRM PASSWORD FIELD */}
					<Item style={styles.item}>
						<Icon active name='key' style={{fontSize:40}} />
						<TextInput 
							placeholder=" Confirm Password"
							placeholderTextColor={'grey'}
							secureTextEntry
							style={styles.textInput}
							autoCapitalize='none'
							returnKeyType="go"
							onSubmitEditing={() => Keyboard.dismiss() }
							autoCorrect={false} 
							ref={(input) => { confirmPassword = input; }} 
							value={c_password}
							onChangeText={password => setC_Password( password )}/>
					</Item>

					{/* SUBMIT BUTTON */}
					<Button large block disabled={disabled}  
						style={{alignSelf:'center', textAlign:'center'}}
						onPress={() => handler()} >
						<Text> SUBMIT </Text>
					</Button>	
				</View>}
			</Content>
		</Container>
	)
}

const styles = {
		mainContainer:{
			justifyContent:'center', alignItems:'center', 
			height:'90%'},
		validateontainer:{
			justifyContent:'center', alignItems:'center', 
			flexDirection:'column', width:'80%', height:'90%' },
		textInput:{
			fontSize:24, width:'80%' },
		item:{
			marginVertical:30, alignSelf:'center' }
}