import React, {useState, useContext} from 'react';
import { TextInput } from 'react-native'
import {Button , Text, Container, Content, Item} from 'native-base';

import {Context} from '../Store/appContext'


export default ForgotPassword = (props, {navigation}) => {

	const { store, actions } = useContext(Context)
	const [email, setEmail] = useState('')
	
	const forgotStart = async() => {
		var answer = await actions.user.forgotPassword(email)
	}

	return(
		<Container style={{justifyContent:'center'}}>
		<Content contentContainerStyle={{flexDirection:'column',
			justifyContent:'center', height:'100%', alignSelf:'center'}}>
			
					<Text style={{textAlign:'center', fontSize:20, marginBottom:10}}>
						Enter Your Email:
					</Text>
					<Item style={{width:'90%'}}>
					<TextInput 
						style={{fontSize:24, 
							textAlign:'left', width:'90%', 
							borderWidth:1, borderColor:'gray',
							padding:20}}
						placeholder="Enter Email"
						placeholderTextColor='gray'
						keyboardType="email-address"
						blurOnSubmit={true}
						selectionColor={'black'}
						returnKeyType="next"
						autoCapitalize='none'
						autoCorrect={false} 
						onSubmitEditing={() => { forgotStart(); }}
						value={email}    
						onChangeText={emailX => setEmail( emailX )}
					/>
					</Item>
				
					<Button large 
					style={{alignSelf:'center',marginTop:40, maxWidth:150, justifyContent:'center'}}
						onPress={()=> forgotStart()}>
						<Text 
						style={{fontSize:30, fontWeight:'600'}}> 
							SUBMIT 
						</Text>
					</Button>

		</Content>  
	</Container>
	)
}

