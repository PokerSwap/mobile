import React, {useState, useRef} from 'react';

import { Alert, KeyboardAvoidingView, TouchableOpacity, View } from "react-native";
import { Button, Content, Text, Icon } from 'native-base';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay'



export default HendonSetup = (props) => {
	
	const [ lookHendon, setLookHendon] = useState(false)
	const [ hendon, setHendon ] = useState('https://www.thehendonmob.com/search/')
	const [ webViewKey, setWebViewKey ] = useState(0)
	const [ loading, setLoading ] = useState(null)
	const webViewRef = useRef(null)

	
	const goToNextPage = () => {
		props.onChangeHendon('');
		props.next();
	}

	const goBack = () => {
		setLoading(false)

		webViewRef.current.goBack();
		setLoading(false)
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

	return(
		<KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-300}>
		<View transparent>
			{lookHendon ?
				<View style={{height:'99%'}}>
					<Spinner visible={loading} textContent={''}/>
					<WebView 
					style={{height:'100%'}} 
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
					onLoadStart={() => setLoading(true)} onLoadProgress={() => setLoading(false)} onLoad={() => setLoading(false)}
					javaScriptEnabled = {true}
					domStorageEnabled = {true}
					startInLoadingState={false}/>
					<View>
						<View style={{flexDirection:'row', justifyContent:'space-around', marginVertical:20}}>
							<TouchableOpacity onPress={()=>goBack()}>
								<Text style={{fontSize:20}}>Go Back</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>confirmationAlert()}>
								<Text style={{fontSize:20}}>This is my profile!</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity onPress={()=>setLookHendon(false)}>
							<Text style={{fontSize:20, textAlign:'center'}}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
				:
				<View>
					{/* HENDON INSTRUCTIONS */}
					<View style={{flexDirection:"column", justifyContent:"center", textAlign:'center'}}>
						<Text style={{textAlign:'center'}}>
							Have a Hendon Mob profile? Enter your name in the search engine and find your profile.
						</Text>

						<TouchableOpacity style={{marginTop:20}}
							onPress={() => setLookHendon(true)}>
							<Text>Yes, I do</Text>
						</TouchableOpacity>	

						<TouchableOpacity  style={{marginTop:20}}
						onPress={() => goToNextPage()}>
							<Text>No, I don't want to</Text>
						</TouchableOpacity>	

					</View>
					{/* PREV BUTTON */}
					<View style={{justifyContent:'center'}}>
						<Button info iconLeft large onPress={() => props.prev()}>
							<Icon name='arrow-back'/>
							<Text>Go Back</Text>
						</Button>
					</View>
		
				</View>}
			
		</View>
		</KeyboardAvoidingView>
	)
}
