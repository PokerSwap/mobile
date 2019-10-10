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
		
	_onNavigationStateChange(webViewState){
		this.setState({hendonURL: webViewState.uri})
	}

	render(){

		return(
			<Card transparent>
				<CardItem style={{flexDirection:"column", justifyContent:"center"}}>
					<Text style={{textAlign:'center'}}>
						Please enter your name as it appears on your Hendon Mob profile.
					</Text>
					<Text>
						If you don't have a Hendon, that's okay. :)
					</Text>
				</CardItem>
				<CardItem style={{height:250}}>
					<WebView 
						ref="webview"
						source={{uri:this.state.uri}}
						onNavigationStateChange={this._onNavigationStateChange()}
						javaScriptEnabled = {true}
						domStorageEnabled = {true}
						injectedJavaScript = {this.state.cookie}
						startInLoadingState={false}
						 
					/>
				</CardItem>
				{/* <CardItem body style={{flexDirection:"column", justifyContent:"center"}}>
					<Item >
						<TextInput 
							placeholder="First Name" 
							value={this.state.hendonFirstName}
							onChangeText={hendonFirstName => this.setState({ hendonFirstName })}
						/>
					</Item>
					<Item>
						<TextInput 
							placeholder="Last Name"
							value={this.state.hendonLasName}
							onChangeText={hendonLastName => this.setState({ hendonLastName })}
						/>
					</Item>
				</CardItem>   */}
				<CardItem footer style={{flexDirection:"column", justifyContent:"center"}}> 
					<TextInput 
						value={this.state.hendonURL}
					/>
					<AlertS  next={this.props.next}/>
					<Button danger style={{marginVertical:20}} 
						onPress={() => this.props.next()}>
						<Text>I'll do it later</Text>
					</Button>
				</CardItem>          
				<CardItem>
					<Button info large onPress={() => this.props.prev()}>
						<Text>Prev</Text>
					</Button>
				</CardItem>
			</Card>
		)
  }
}