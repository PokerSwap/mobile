import React from "react";
import { WebView } from 'react-native-webview';
import { Container, Content } from "native-base";
import { useRoute, useNavigation } from '@react-navigation/native'

export default WebViewScreen = () => {
	const navigation = useNavigation()
	const route = useRoute()
	const { url } = route.params

	return(
		<Container>
			<Content>
				<WebView source={{uri: url}} style={{height:1000}} /> 
			</Content>
		</Container>
	)
}
