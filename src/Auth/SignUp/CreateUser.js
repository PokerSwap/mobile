import React, {useContext, useState} from 'react';
import { TextInput } from 'react-native'
import { Button, Container, Item, Content,
	Toast, Icon, Text, View } from 'native-base';

import { Context } from '../../Store/appContext';

export default CreateUser = (props) => {

	const { store, actions } = useContext(Context)

	const [ loading, setLoading] = useState(false)
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ c_password, setC_Password] = useState('')
	const [ submitted, setSubmitted ] = useState(false)

	const createUser = async() => {
		email !== ''|| password !== '' ?
			password == c_password ?
				userStart() : errorMessage('Make sure your passwords match')
		: errorMessage('Please enter your desired email and password')
	}

	const userStart = async() => {
		var answer323 = await actions.user.add(email, password)
		setSubmitted(true)
	}
		
	const errorMessage = (x) => {
		Toast.show({text:x, duration:3000, position:'top'})}
		
	let userPassword = null, confirmPassword = null;

	return(
		<Container >
			<Content contentContainerStyle={{
				justifyContent:'center', alignItems:'center', height:'90%'}}>
			{submitted ? 
				<View transparent style={{justifyContent:'center'}}>
					<Text style={{textAlign:'center', fontSize:24}}>
						A validation link has been sent to your email at {email}.
					</Text>
				</View>
				:
				<View transparent style={{justifyContent:'center', 
					alignItems:'center', flexDirection:'column',
					width:'80%', height:'90%'}}>

					<Text style={{textAlign:"center", fontSize:20}}>
						Please enter your personal email address and {}
						create a password for your Swap account.
					</Text>

					<Item style={{marginVertical:30, alignSelf:'center'}}>
						<Icon active name='mail' style={{fontSize:40}}/>
						<TextInput 
							placeholder=" Enter Email"
							keyboardType="email-address"
							blurOnSubmit={false}
							style={{fontSize:24, width:'80%'}}
							returnKeyType="next"
							autoCapitalize='none'
							autoCorrect={false} 
							onSubmitEditing={() => { userPassword.focus(); }}
							value={email}    
							onChangeText={email => setEmail( email )}
							/>
					</Item>

					<Item style={{marginVertical:30, color:'black',alignSelf:'center'}}>
						<Icon active name='key' style={{fontSize:40}} />
						<TextInput 
							placeholder=" Enter Password"
							textContentType={'newPassword'}
  						selectTextOnFocus={true}
  						secureTextEntry={true}
							style={{fontSize:24, width:'80%'}}								
							autoCapitalize='none'
							returnKeyType="next"
							autoCorrect={false} 
							ref={(input) => { userPassword = input; }} 
							onSubmitEditing={() => { confirmPassword.focus(); }}
							value={password}
							onChangeText={password => setPassword( password )}
						/>
					</Item>

					<Item style={{marginVertical:30,alignSelf:'center'}}>
						<Icon active name='key' style={{fontSize:40}} />
						<TextInput 
							placeholder=" Confirm Password"
							secureTextEntry
							style={{fontSize:24, width:'80%', color:'black'}}
							autoCapitalize='none'
							returnKeyType="go"
							onSubmitEditing={() => createUser() }
							autoCorrect={false} 
							ref={(input) => { confirmPassword = input; }} 
							value={c_password}
							onChangeText={password => setC_Password( password )}/>
					</Item>
					
					<Button large onPress={() => createUser()} style={{alignSelf:'center'}}>
						<Text> SUBMIT </Text>
					</Button>	

				</View>			
			}
			</Content>
		</Container>
	)
}
