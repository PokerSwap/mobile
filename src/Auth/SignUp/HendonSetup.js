import React, {useState} from 'react';
import { Button, Card, CardItem, Text, Icon } from 'native-base';
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

	return(
		<Card transparent>

			{/* HENDON WEBVIEW */}
			<CardItem style={{height:400}}>
					<WebView 
						source={{ uri: hendon }}
						originWhitelist={['*']}
						// ref="webview"
						onNavigationStateChange={(webViewState) => {
							console.log(webViewState)
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
					<View
						style={{borderWidth:1, width:'85%', paddingVertical:12, marginVertical:10}}
					>
					<TextInput
						style={{paddingHorizontal:10}}
						placeholder='Enter Your Hendon User URL'
						placeholderTextColor='gray'
						value={props.hendon}
						onChangeText={props.onChangeHendon}
					/>
					
					</View>
				</CardItem>

			{/* HENDON INSTRUCTIONS */}
			<CardItem style={{flexDirection:"column", justifyContent:"center"}}>
				<Text style={{textAlign:'center'}}>
					Please enter your name as it appears on your Hendon Mob profile.
				</Text>
			</CardItem>
			
			{/* OPTION BUTTONS */}
			<CardItem style={{justifyContent:'space-around'}}>
				<AlertS  next={props.next}/>
				
				<Button large danger style={{}} 
					onPress={() => {
						props.onChangeHendon('');
						props.next();
					}}>
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
	)
}
