import React, {Component} from 'react';
import { Button, Card, CardItem, 
Item, Input, Text } from 'native-base';
import { Alert, TextInput } from "react-native";
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

export default class HendonSetup extends Component {
	constructor(props){
		super(props);
		this.state={
			uri: 'https://www.thehendonmob.com/search/',
			hendonURL:''
		}
	}

	render(){

		return(
			<Card transparent>

				{/* HENDON INSTRUCTIONS */}
				<CardItem style={{flexDirection:"column", justifyContent:"center"}}>
					<Text style={{textAlign:'center'}}>
						Please enter your name as it appears on your Hendon Mob profile.
					</Text>
					<Text>
						If you don't have a Hendon, that's okay. :)
					</Text>
				</CardItem>

				{/* HENDON WEBVIEW */}
				<CardItem style={{height:250}}>
					<WebView 
						ref="webview"
						source={{uri:this.state.uri}}
						// onLoadEnd={() => this.setState({hendonURL: window.location.href})}
						javaScriptEnabled = {true}
						domStorageEnabled = {true}
						injectedJavaScript = {this.state.cookie}
						startInLoadingState={false}
					/>
				</CardItem>

				{/* OPTIONS FOR HENDON */}
				<CardItem footer style={{flexDirection:"column", justifyContent:"center"}}> 
					
					<TextInput 
						value={this.state.hendonURL}
						placeholder='Hendon User URL'
              value={this.props.hendon}
              onChangeText={this.props.onChangeHendon}
					/>
					
					<AlertS  next={this.props.next}/>
					
					<Button danger style={{marginVertical:20}} 
						onPress={() => this.props.next()}>
						<Text>I'll do it later</Text>
					</Button>

				</CardItem>  

				{/* PREV BUTTON */}
				<CardItem>
					<Button info large onPress={() => this.props.prev()}>
						<Text>Prev</Text>
					</Button>
				</CardItem>

			</Card>
		)
  }
}