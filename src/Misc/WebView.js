import React, {useState} from "react";
import { WebView } from 'react-native-webview';
import { Container, Content } from "native-base";
import { useRoute, useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'

export default WebViewScreen = () => {
	const navigation = useNavigation()
	const route = useRoute()
	const { url } = route.params
	const [ loading, setLoading ] = useState(null)

	return(
		<Container>
			<Content>
				<Spinner visible={loading} textContent={''}/>
				<WebView source={{uri: url}} style={{height:1000}} 
				
					onLoadStart={() => setLoading(true)} onLoad={() => setLoading(false)}
				/> 
			</Content>
		</Container>
	)
}
