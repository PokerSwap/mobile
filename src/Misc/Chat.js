import React from "react";
import { TouchableOpacity, } from 'react-native'
import { WebView } from 'react-native-webview';
import { Container, Content, Header, Text } from "native-base";
import i18n from "../i18n/i18n"; 
import {useNavigation} from '@react-navigation/native'


export default ChatScreen = (props) => {
	const navigation = useNavigation()

	return(
		<Container>
			<Content>
				<Header style={{justifyContent:'flex-start'}}>
					<TouchableOpacity onPress={()=> navigation.goBack()}>
						<Text style={{fontWeight:'600',  marginLeft:10}}> Go Back</Text>
					</TouchableOpacity>
				</Header>
				
			</Content>
		</Container>
	)
}
