import React from "react";
import { TouchableOpacity, } from 'react-native'
import { Container, Content, Header, Text, Icon } from "native-base";
import i18n from "../../i18n/i18n"; 

export default TutorialScreen = (props) => {

	const { navigation } = props;
  let url = navigation.getParam('url', 'NO-ID');

	return(
		<Container>
			<Header style={{justifyContent:'flex-start', alignItems:'center', backgroundColor:'rgb(56,68,165)'}}>
        <TouchableOpacity onPress={()=> props.navigation.goBack()} style={{alignItems:'center', flexDirection:'row'}}>
          <Icon type='FontAwesome5' name='angle-left' style={{color:'white'}}/>
          <Text style={{fontWeight:'600', color:'white', marginLeft:10, fontSize:18}}> Go Back</Text>
        </TouchableOpacity>
      </Header>
			<Content>
		
				
			</Content>
		</Container>
	)
}
