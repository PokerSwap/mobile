import React, {useState, useRef} from 'react';
import { Button, Card, CardItem, Text, Icon } from 'native-base';
import { Alert, KeyboardAvoidingView } from "react-native";
import { WebView } from 'react-native-webview';

export default HendonSetup = (props) => {
	const [hendon, setHendon] = useState('https://www.thehendonmob.com/search/')
	const [webViewKey, setWebViewKey] = useState(0)
	const webViewRef = useRef(null)
  
  const goback = () => {
    webViewRef.current.goBack();
  };
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
		<KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-300}>
		<Card transparent>
			{/* HENDON INSTRUCTIONS */}
			<CardItem style={{flexDirection:"column", justifyContent:"center"}}>
				<Text style={{textAlign:'center'}}>
					If you have a Hendon Mob profile, please enter your name {}
					in the search engine in the live Hendon Mob search below.
				</Text>
			</CardItem>		
			<Button onPress={()=> goBack()}>
				<Text>Go Back in Webview</Text>
			</Button>	
			{/* HENDON WEBVIEW */}
			<CardItem style={{height:300}}>
				<WebView 
					key={webViewKey}
					ref={webViewRef}
        	onContentProcessDidTerminate={() => setWebViewKey(webViewKey + 1)}
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
			{/* OPTION BUTTONS */}
			<CardItem style={{justifyContent:'space-around'}}>
				<Button large success onPress ={() => confirmationAlert()}>
					<Text>SUBMIT</Text>
				</Button>
				<Button large danger
					onPress={() => goToNextPage()}>
					<Text>LATER</Text>
				</Button>
			</CardItem> 			
			{/* PREV BUTTON */}
			<CardItem style={{justifyContent:'center'}}>
				<Button info iconLeft large onPress={() => props.prev()}>
					<Icon name='arrow-back'/>
					<Text>Go Back</Text>
				</Button>
			</CardItem>
		</Card>
		</KeyboardAvoidingView>
	)
}
