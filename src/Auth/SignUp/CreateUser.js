import React, {useContext, useState} from 'react';
import { TextInput } from 'react-native'
import { Button, Container, Card, CardItem, Item, Input, Icon, Text } from 'native-base';
import { Context } from '../../Store/appContext';
import DeviceInfo from 'react-native-device-info'

import { getUniqueId, getManufacturer } from 'react-native-device-info'

export default CreateUser = (props) => {

	var deviceID = DeviceInfo.getUniqueId();

	const { store, actions } = useContext(Context)

	const [ loading, setLoading] = useState(false)
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ submitted, setSubmitted ] = useState(false)

	let content;

	if(submitted){
		content = 	
			<Card transparent style={{justifyContent:'center'}}>
				<CardItem>
					<Text>A validation link has been sent to your email at {email}.</Text>
					<Text>{deviceID}</Text>
				</CardItem>
			</Card>
	} else {
		content =  
			<Card transparent style={{justifyContent:'center'}}>
				<CardItem style={{flexDirection:"column", paddingLeft: 30, width:350, justifyContent:"center"}}>
					<Text style={{textAlign:"center", width:300, fontSize:20}}>
						Please create your Username for when you login and 
						your personal Password and your Email Address.{deviceID}
					</Text>
					<Item>
						<Icon active name='mail' />
						<TextInput 
							placeholder="Enter Email"
							keyboardType="email-address"
							blurOnSubmit={false}
							returnKeyType="next"
							autoCapitalize='none'
							autoCorrect={false} 
							onSubmitEditing={() => { txtPassword.focus(); }}
							value={email}    
							onChangeText={email => setEmail( email )}
							/>
					</Item>
					<Item>
						<Icon active name='key' />
						<TextInput 
							placeholder="Enter Password"
							secureTextEntry
							autoCapitalize='none'
							returnKeyType="go"
							autoCorrect={false} 
							ref={(input) => { txtPassword = input; }} 
							value={password}
							onChangeText={password => setPassword( password )}
						/>
					</Item>
				</CardItem>
				
				<CardItem footer style={{justifyContent:"center"}}>
					<Button large onPress={() => {
						actions.user.add(email, password, deviceID);
						setSubmitted(true)
					}}>
						<Text> SUBMIT </Text>
					</Button>
								
				</CardItem>
			</Card>		
		}
		
		return(
			<Container>
				{content}
			</Container>
		)
	}
