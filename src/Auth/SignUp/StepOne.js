import React, {Component} from 'react';
import { Button, Card, CardItem, Item, Input, Icon, Text } from 'native-base';

export default class StepOne extends Component {
	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
		return(
			<Card transparent>
				<CardItem style={{justifyContent:"center"}}>
					<Text style={{textAlign:"center", width:300, fontSize:20}}>
						Please create your Username for when you login and 
						your personal Password and your Email Address.
					</Text>
				</CardItem>
				<CardItem style={{flexDirection:"column", paddingLeft: 30, width:350, justifyContent:"center"}}>
					<Item>
						<Icon active name='contact' />
						<Input placeholder='Enter Username'/>
					</Item>
					<Item>
						<Icon active name='key' />
						<Input placeholder='Enter Password'/>
					</Item>
					<Item style={{marginVertical:20}}>
						<Icon active name='mail' />
						<Input placeholder="Enter Email" />
					</Item>
				</CardItem>
				<CardItem footer style={{justifyContent:"center"}}>
					<Button large onPress={() => this.props.next()}>
						<Text>
							SUBMIT
						</Text>
					</Button>
				</CardItem>
				
			</Card>
		)
	}
}