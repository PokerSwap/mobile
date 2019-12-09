import React from "react";
import { TouchableOpacity, } from 'react-native'
import { Container, Content, Header, Text } from "native-base";
import i18n from "../../i18n/i18n"; 

export default TutorialScreen = (props) => {

	const { navigation } = props;
  let url = navigation.getParam('url', 'NO-ID');

	return(
		<Container>
			<Content>
				<Header style={{justifyContent:'flex-start', backgroundColor:"#2EABFF"}}>
					<TouchableOpacity onPress={()=> props.navigation.goBack()}>
						<Text style={{fontWeight:'600', color:'white', marginLeft:10}}> Go Back</Text>
					</TouchableOpacity>
					<Text>{props.title}</Text>
				</Header>
				
			</Content>
		</Container>
	)
}
