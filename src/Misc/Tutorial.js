import React from "react";
import {  ScrollView } from 'react-native'
import { Container, Content} from "native-base";
import i18n from "../i18n/i18n"; 
import { useNavigation } from '@react-navigation/native'

import { WebView } from 'react-native-webview';

export default TutorialScreen = () => {

	const navigation = useNavigation()
	let url = 'https://www.swapprofitonline.com/faqspoker/'

	return(
		<Container>
			<Content>
				<ScrollView>
					<WebView source={{uri: url}} style={{height:610}} /> 
				</ScrollView>
			</Content>
		</Container>
	)
}
