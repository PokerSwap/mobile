import React, {useState} from 'react';
import { Button, Card, CardItem, Text, Icon } from 'native-base';
import { Alert, TextInput, View } from "react-native";
import { WebView } from 'react-native-webview';

export default HendonSetup = (props) => {
	const [hendon, setHendon] = useState('https://www.thehendonmob.com/search/')

	const confirmationAlert = () =>{
    Alert.alert(
      "Confirmation",
      'Are you sure this is you?',
      [
        { text: 'Yes', onPress: () => props.next() },
        { text: 'No', onPress: () => console.log("Cancel Pressed"), }
      ]
    )
	}
	
	const goToNextPage = () => {
		props.onChangeHendon('');
		props.next();
	}

	return(
		<Card transparent>
			{/* HENDON INSTRUCTIONS */}
			<CardItem style={{flexDirection:"column", justifyContent:"center"}}>
				<Text style={{textAlign:'center'}}>
					If you have a Hendon Mob profile, please enter your name {}
					in the search engine in the live Hendon Mob search below.
				</Text>
			</CardItem>			
			{/* OPTION BUTTONS */}
			<CardItem style={{justifyContent:'space-around'}}>
				<Button large success onPress ={() => confirmationAlert()}>
					<Text>SUBMIT</Text>
				</Button>
				<Button large danger
					onPress={() => goToNextPage}>
					<Text>LATER</Text>
				</Button>
			</CardItem> 
			{/* HENDON WEBVIEW */}
			<CardItem style={{height:400}}>
				<WebView 
					source={{ uri: hendon }}
					originWhitelist={['*']}
					// ref="webview"
					onNavigationStateChange={(webViewState) => {
						setHendon(webViewState.url)
						props.onChangeHendon(webViewState.url)
					}}
					javaScriptEnabled = {true}
					domStorageEnabled = {true}
					startInLoadingState={false}
				/>
			</CardItem>				
			{/* HENDON URL INPUT */}
			<CardItem footer style={{flexDirection:"row", justifyContent:"center"}}> 
				<View style={{borderWidth:1, width:'85%', paddingVertical:12, marginVertical:10}} >
				<TextInput
					style={{paddingHorizontal:10}}
					placeholder='Enter Your Hendon User URL'
					placeholderTextColor='gray'
					value={props.hendon}
					onChangeText={props.onChangeHendon} />
				</View>
			</CardItem>
			{/* PREV BUTTON */}
			<CardItem style={{justifyContent:'center'}}>
				<Button info iconLeft large onPress={() => props.prev()}>
					<Icon name='arrow-back'/>
					<Text>Go Back</Text>
				</Button>
			</CardItem>
		</Card>
	)
}
