import React from "react";
import { TouchableOpacity, ScrollView } from 'react-native'
import { Container, Content, Header, Text, Icon } from "native-base";
import i18n from "../i18n/i18n"; 
import { useNavigation } from '@react-navigation/native'


import { WebView } from 'react-native-webview';


export default TutorialScreen = (props) => {

	const navigation = useNavigation()
	let url = 'https://www.swapprofitonline.com/faqspoker/'

	return(
		<Container>
			<Header style={{justifyContent:'flex-start', 
				alignItems:'center', backgroundColor:'rgb(56,68,165)'}}>
				
				<TouchableOpacity onPress={()=> navigation.goBack()} 
					style={{alignItems:'center', flexDirection:'row'}}>
					<Icon type='FontAwesome5'	name='angle-left' 
						style={{color:'white'}}/>
					<Text style={{fontWeight:'600', color:'white', 
						marginLeft:10, fontSize:18}}> 
						Go Back
					</Text>
        </TouchableOpacity>

      </Header>
			<Content>
				<ScrollView>
			<WebView
				source={{uri: url}}
				style={{height:610}}
			/> 
				</ScrollView>
				</Content>
		</Container>
	)
}
