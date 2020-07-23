import React from "react";
import { TouchableOpacity, } from 'react-native'
import { WebView } from 'react-native-webview';
import { Container, Content, Header, Text } from "native-base";
import { useRoute, useNavigation } from '@react-navigation/native'
import i18n from "../i18n/i18n"; 

export default WebViewScreen = (props) => {
	const navigation = useNavigation()

	const route = useRoute()
	const { url } = route.params

	return(
		<Container>
			<Content>
				<Header style={{justifyContent:'flex-start'}}>
					<TouchableOpacity onPress={()=> navigation.goBack()}>
						<Text style={{fontWeight:'600',  marginLeft:10}}> Go Back</Text>
					</TouchableOpacity>
				</Header>
				<WebView
				source={{uri: url}}
				style={{height:1000}}
			/> 
			</Content>
		</Container>
	)
}
