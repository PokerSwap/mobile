import React, {useContext, useState} from 'react';
import { TextInput } from 'react-native'
import { Button, Container, Card, CardItem, Item, Toast, Icon, Text } from 'native-base';
import { Context } from '../../Store/appContext';
import DeviceInfo from 'react-native-device-info'

import { getUniqueId, getManufacturer } from 'react-native-device-info'

export default CreateUser = (props) => {

	var deviceID = DeviceInfo.getUniqueId();

	const { store, actions } = useContext(Context)

	const [ loading, setLoading] = useState(false)
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ c_password, setC_Password] = useState('')
	const [ submitted, setSubmitted ] = useState(false)

	const createUser = async() => {

		if(email !== ''|| password !== ''){
			if(password==c_password){}else{
				var answer1 = actions.user.add(email, password, deviceID);
				setSubmitted(true)
			}
		} else {
			wrong('Make sure your passwords match')
		}
		wrong('Please type in a usable email and password')
	}

	const wrong = (x) => {
		if(store.userToken==null){
			Toast.show({
				text:x,
			duration:3000})
		}
	}
		
	return(
		<Container>
			{submitted ? 
				<Card transparent style={{justifyContent:'center'}}>
					<CardItem>
						<Text>A validation link has been sent to your email at {email}.</Text>
						<Text>{deviceID}</Text>
					</CardItem>
				</Card>
				:
				<Card transparent style={{justifyContent:'center'}}>
					<CardItem style={{flexDirection:"column", paddingLeft: 30, width:350, justifyContent:"center"}}>
						<Text style={{textAlign:"center", width:300, fontSize:20}}>
							Please create your Username for when you login and 
							your personal Password and your Email Address.
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
							<TextInput 
								placeholder="Enter Password"
								secureTextEntry
								autoCapitalize='none'
								returnKeyType="next"
								autoCorrect={false} 
								ref={(input) => { txtPassword = input; }} 
								onSubmitEditing={() => { cfnPassword.focus(); }}
								value={password}
								onChangeText={password => setPassword( password )}
							/>
						</Item>
						<Item>
							<TextInput 
									placeholder="Confirm Password"
									secureTextEntry
									autoCapitalize='none'
									returnKeyType="go"
									autoCorrect={false} 
									ref={(input) => { cfnPassword = input; }} 
									value={c_password}
									onChangeText={password => setC_Password( password )}
								/>
						</Item>
					</CardItem>
					
					<CardItem footer style={{justifyContent:"center"}}>
						<Button large onPress={() => createUser()}>
							<Text> SUBMIT </Text>
						</Button>	
					</CardItem>
				</Card>		
		
			}
		</Container>
	)
}
