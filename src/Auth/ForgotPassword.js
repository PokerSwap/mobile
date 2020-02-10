import React, {useState, useContext} from 'react';
import { TextInput } from 'react-native'
import {Button , Text, Container, Content, Card, CardItem} from 'native-base';

import {Context} from '../Store/appContext'

import { TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, StatusBar} from 'react-native'
import i18n from '../i18n/i18n'

export default ForgotPassword = (props) => {

	const { store, actions } = useContext(Context)
	const [email, setEmail] = useState('')
	
	const forgotStart = async() => {
		var answer = await actions.user.forgotPassword(email)
	}

	return(
		<Container style={{justifyContent:'center'}}>
		<Content contentContainerStyle={{justifyContent:'center', alignSelf:'center'}}>
			<Card transparent 
				style={{alignSelf:'center', justifyContent:'center', marginTop:160}} >
				<CardItem style={{flex:1, flexDirection:'column'}}>
					<Text style={{textAlign:'center'}}>
						Enter Your Email:
					</Text>
					<TextInput 
						style={{fontSize:24, textAlign:'center', width:'100%'}}
						placeholder="Enter Current Email"
						placeholderTextColor='gray'
						keyboardType="email-address"
						blurOnSubmit={true}
						selectionColor={'black'}
						returnKeyType="next"
						autoCapitalize='none'
						autoCorrect={false} 
						onSubmitEditing={() => { txtCurrentPassword2.focus(); }}
						value={email}    
						onChangeText={emailX => setEmail( emailX )}
					/>
				</CardItem>
				
				<CardItem style={{justifyContent:'center'}}>
					<Button large 
					style={{marginTop:40, justifyContent:'center'}}
						onPress={()=> forgotStart()}>
						<Text 
						style={{fontSize:30, fontWeight:'600'}}> 
							SUBMIT 
						</Text>
					</Button>
				</CardItem>

			</Card>
		</Content>  
	</Container>
	)
}

