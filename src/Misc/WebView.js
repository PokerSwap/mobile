import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { Context } from '../Store/appContext'
import { WebView } from 'react-native-webview'

import { View, StatusBar } from 'react-native'
import { Container, Content } from "native-base";
import { useRoute, useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import OtherHeader from "../View-Components/OtherHeader";

import darkStyle from '../Themes/dark.js'
import lightStyle from '../Themes/light.js'

export default WebViewScreen = () => {
	const navigation = useNavigation()
	const route = useRoute()
	const { url } = route.params
	const [ loading, setLoading ] = useState(null)

	const { store, actions } = useContext(Context)


	var currentStyle
	store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

	return(
		<Container>
			<View style={{height:20, position:'absolute', top:0, alignSelf:'flex-start',  backgroundColor:currentStyle.header.color}}>
				<StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
				backgroundColor={'rgb(38, 171, 75)'}/>
			</View>
			<OtherHeader title={'Web View'}/>
			<Content>
				<Spinner visible={loading} textContent={''}/>
				<WebView source={{uri: url}} style={{height:1000}} 
				
					onLoadStart={() => setLoading(true)} onLoad={() => setLoading(false)}
				/> 
			</Content>
		</Container>
	)
}
