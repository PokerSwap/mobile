import React, {useState, useRef} from 'react';

import { Alert, KeyboardAvoidingView, TouchableOpacity, View } from "react-native";
import { Button, Content, Text, Icon } from 'native-base';


import { useNavigation } from '@react-navigation/native'


export default HendonSetup = (props) => {
	
	const [ hendonURL, setHendonURL ] = useState(props.hendon)
	const [ lookHendon, setLookHendon] = useState(false)
	const navigation = useNavigation()
	
	const goToNextPage = () => {
		props.onChangeHendon('');
		props.next();
	}

	return(
		<KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-300}>
		<View transparent>
			{lookHendon ?
				<View style={{height:'99%'}}>
					<Text>Current Hendon Mob Profile:</Text>
					<Text></Text>
					<Button onPress={() => navigation.push('Hendon Selection', {
						onChangeHendon: props.onChangeHendon,
						setHendonURL: setHendonURL
					})}>
						<Text>Click Here</Text>
					</Button>
					<Text>{hendonURL}</Text>

					<Button onPress={() => goToNextPage()}>
						<Text>Maybe Later</Text>
					</Button>
					{/* <Spinner visible={loading} textContent={''}/>
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
					</View> */}
					{/* PREV BUTTON */}
					<View style={{justifyContent:'center', alignSelf:'center', marginTop:30}}>
						<Button info iconLeft large onPress={() => props.prev()}>
							<Icon name='arrow-back'/>
							<Text>To Picture</Text>
						</Button>
					</View>
				</View>
				:
				<View style={{width:'80%', height:500, flexDirection:'column', justifyContent:'space-around', alignSelf:'center', marginTop:20}}>
					{/* HENDON INSTRUCTIONS */}
					<View style={{flexDirection:"column", justifyContent:"center", textAlign:'center'}}>
						<View>
						<Text style={{textAlign:'center', fontSize:20, marginBottom:5}}>
							Have a Hendon Mob profile? 
						</Text>
						{/* <Text style={{textAlign:'center', fontSize:20}}>
							Enter your name in the search engine and find your profile.
						</Text> */}
						</View>

						<TouchableOpacity style={{marginTop:40, alignSelf:'center'}}
							onPress={() => setLookHendon(true)}>
							<Text style={{fontSize:36,}}>Yes, I do</Text>
						</TouchableOpacity>	

						<TouchableOpacity  style={{marginTop:30, alignSelf:'center'}}
							onPress={() => goToNextPage()}>
							<Text style={{fontSize:36,}}>No, I don't</Text>
						</TouchableOpacity>	

					</View>
					{/* PREV BUTTON */}
					<View style={{justifyContent:'center', alignSelf:'center', marginTop:30}}>
						<Button info iconLeft large onPress={() => props.prev()}>
							<Icon name='arrow-back'/>
							<Text>To Picture</Text>
						</Button>
					</View>
		
				</View>}
			
		</View>
		</KeyboardAvoidingView>
	)
}
