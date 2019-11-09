import React, {useState} from 'react';
import { Button, Card, CardItem, 
Item, Input, Text } from 'native-base';
import { Alert, TextInput, View } from "react-native";
import { WebView } from 'react-native-webview';

const AlertS = (props) => {
	const showAlert = () =>{
    Alert.alert(
      "Confirmation",
      'Are you sure this is you?',
      [
        {
          text: 'Yes',
          onPress: () => props.next()
        },
        {
          text: 'No',
          onPress: () => console.log("Cancel Pressed"),
        }
      ]
    )
  }
	return (
		 <Button large success onPress = {showAlert}>
				<Text>SUBMIT</Text>
		 </Button>
	)
}

export default HendonSetup = (props) => {

	const [hendon, setHendon] = useState('https://www.thehendonmob.com/search/')
	const [uri, setURI] = useState('')

	_onNavigationStateChange = (webViewState) =>{
		console.log(webViewState)
		setHendon(webViewState.url)
		props.hendon = webViewState.url
	}

	const injectedJs = `
		document.URL = 'red';
		setTimeout(function() { window.alert('hi') }, 2000);
		true; // note: this is required, or you'll sometimes get silent failures
	`	
	return(
			<Card transparent>

				{/* HENDON INSTRUCTIONS */}
				<CardItem style={{flexDirection:"column", justifyContent:"center"}}>
					<Text style={{textAlign:'center', marginVertical:20}}>
						Please enter your name as it appears on your Hendon Mob profile.
					</Text>
					<Text>
						If you don't have a Hendon, that's okay. :)
					</Text>
				</CardItem>

				{/* HENDON WEBVIEW */}
				<CardItem style={{height:250}}>
					<WebView 
						useWebKit={true}
						ref="webview"
						source={{uri:uri}}
						injectedJavaScript={injectedJs}
						javaScriptEnabled = {true}
						domStorageEnabled = {true}
						onNavigationStateChange={this._onNavigationStateChange.bind(this)}						
						injectedJavaScript = {this.state.cookie}
						startInLoadingState={false}
						scalesPageToFit
				
						style={{ flex: 1 }}
					/>
				</CardItem>
				<CardItem>
			
					<Text>{hendon}</Text>
					<Text>{props.hendon}</Text>
				</CardItem>
				{/* OPTIONS FOR HENDON */}
				<CardItem footer style={{flexDirection:"column", justifyContent:"center"}}> 
					<View
					style={{borderWidth:1, width:'85%', paddingVertical:12, marginVertical:30}}
					>
					<TextInput
						style={{paddingHorizontal:10}}
						placeholder='Enter Your Hendon User URL'
						placeholderTextColor='gray'
						value={props.hendon}
						onChange={props.onChangeHendon}
						
					/>
					</View>
					<AlertS  next={props.next}/>
					
					<Button danger style={{marginVertical:20}} 
						onPress={() => props.next()}>
						<Text>I'll do it later</Text>
					</Button>

				</CardItem>  

				{/* PREV BUTTON */}
				<CardItem>
					<Button info large onPress={() => props.prev()}>
						<Text>Prev</Text>
					</Button>
				</CardItem>

			</Card>
		)
  }
