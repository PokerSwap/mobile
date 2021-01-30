import React, { useState, useContext, useRef } from 'react';
import { Context } from '../Store/appContext'
import { WebView } from 'react-native-webview'


import { View, StatusBar, TouchableOpacity, Text } from 'react-native'
import { Container, Content } from "native-base";
import { useRoute, useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import OtherHeader from "../View-Components/OtherHeader";

import darkStyle from '../Themes/dark.js'
import lightStyle from '../Themes/light.js'

export default HendonSelection = () => {
	const navigation = useNavigation()
	const route = useRoute()
	const { onChangeHendon, setHendonURL } = route.params

	const { store, actions } = useContext(Context)

		const [ hendon, setHendon ] = useState('https://www.thehendonmob.com/search/')
		const [ webViewKey, setWebViewKey ] = useState(0)
		const [ loading, setLoading ] = useState(null)
		const webViewRef = useRef(null)

		const goBack = () => {
			setLoading(false)
			webViewRef.current.goBack();
			setLoading(false)
		  };
	
		const goActualBack = () =>{
			console.log('hendon', hendon)
			actions.profile.hendonUrlCurrent(hendon)
			setHendonURL(hendon)

			navigation.goBack()
		}

	var currentStyle
	store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

	return(
		<Container>
			<View style={{height:20, position:'absolute', top:0, alignSelf:'flex-start',  backgroundColor:currentStyle.header.color}}>
				<StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
				backgroundColor={'rgb(38, 171, 75)'}/>
			</View>
			<OtherHeader title={'Update Hendon'}/>
			<Content contentContainerStyle={{flex:1, height:'70%'}}>

 					{/* <Spinner visible={loading} textContent={''}/> */}
					<WebView 
					style={{maxHeight:'100%', height:400}} 
					key={webViewKey}
					ref={webViewRef}
					onContentProcessDidTerminate={() => setWebViewKey(webViewKey + 1)}
					source={{ uri: hendon }}
					originWhitelist={['*']}
					// ref="webview"
					onNavigationStateChange={(webViewState) => {
						setHendon(webViewState.url)
						onChangeHendon(webViewState.url)
					}}
					onLoadStart={() => setLoading(true)} onLoadProgress={() => setLoading(false)} onLoad={() => setLoading(false)}
					javaScriptEnabled = {true}
					domStorageEnabled = {true}
					startInLoadingState={false}/>
					<View>
						<View style={{flexDirection:'row', justifyContent:'space-around', marginVertical:20}}>
							<TouchableOpacity onPress={()=>goBack()}>
								<Text style={{fontSize:20}}>Back One Page</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>goActualBack()}>
								<Text style={{fontSize:20}}>This is my profile!</Text>
							</TouchableOpacity>
						</View>
						{/* <TouchableOpacity onPress={()=>setLookHendon(false)}>
							<Text style={{fontSize:20, textAlign:'center'}}>Cancel</Text>
						</TouchableOpacity> */}
					</View>
				
			</Content>
		</Container>
	)
}
