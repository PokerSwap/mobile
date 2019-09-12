import React, {Component} from 'react';
import { Button, Card, CardItem, 
Item, Input, Text } from 'native-base';
import { Alert } from "react-native";

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

export default class StepFour extends Component {
	constructor(props){
		super(props);
		this.state={
		}
	}
		
	render(){
		return(
			<Card transparent>
				<CardItem style={{flexDirection:"column", justifyContent:"center"}}>
					<Text style={{textAlign:'center'}}>
						Please enter your name as it appears on 
						your Hendon Mob profile.
					</Text>
					<Text>
						If you don't have a Hendon, that's okay. :)
					</Text>
				</CardItem>
				<CardItem body style={{flexDirection:"column", justifyContent:"center"}}>
					<Item >
						<Input placeholder="First Name" />
					</Item>
					<Item>
						<Input placeholder="Last Name"/>
					</Item>
				</CardItem>   
				<CardItem footer style={{flexDirection:"column", justifyContent:"center"}}>
					<AlertS  next={this.props.next}/>
					<Button danger style={{marginVertical:20}} 
						onPress={() => this.props.next()}>
						<Text>I don't have a Hendon account</Text>
					</Button>
				</CardItem>          
				<CardItem>
					<Button info large onPress={() => this.props.prev()}>
						<Text></Text>
					</Button>
				</CardItem>
			</Card>
		)
  }
}