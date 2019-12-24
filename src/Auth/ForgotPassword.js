import React, {useContext, useState} from 'react';
import {Button , Text, Container, Content, Item, Input} from 'native-base';

import {Context} from '../Store/appContext'

import { TouchableWithoutFeedback,KeyboardAvoidingView, Keyboard, StatusBar} from 'react-native'
import i18n from '../i18n/i18n'



export default ForgotPassword = (props) => {



	const [email, setEmail] = useState('')
	// var passwordStart = async() => {

		
	// 		// var answer = await actions.user.forgotPassword()
	// 		if(true){
	// 			Toast.show({
	// 				text:'rightEmail',
	// 				duration:3000})
	// 		} else{
	// 			Toast.show({
	// 				text:'wrongEmail',
	// 				duration:3000})}

	// }

	return(
		<Container>
			<StatusBar barStyle="light-content" />
				<Content contentContainerStyle={{justifyContent:'center'}}>
	
					<Text>Enter the email address associated with your account:</Text>
					
					<Item>
              <Input 
                placeholder='Email'
                value={email}
                onChangeText={a_email => setEmail(a_email)}
                autoCorrect={false}         
              />
            </Item>
					<Button large > 
						<Text> Send </Text> 
					</Button>

				</Content>
		</Container>
	)
}

