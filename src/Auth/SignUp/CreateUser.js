import React, {Component} from 'react';
import { TextInput } from 'react-native'
import { Button, Container, Card, CardItem, Item, Input, Icon, Text } from 'native-base';
import { Context } from '../../Store/appContext';

export default class CreateUser extends Component {
	constructor(props){
		super(props);
		this.state={
			loading:false,
			email:'',
			password:'',
			submitted: false
		}
	}

	render(){

		let x;

		if(this.state.submitted){
			x = 	<Card transparent style={{justifyContent:'center'}}>
							<CardItem>
								<Text>A validation link has been sent to your email at {this.state.email}.</Text>
							</CardItem>
						</Card>
		} else {
			x =  <Card transparent style={{justifyContent:'center'}}>
				<CardItem style={{flexDirection:"column", paddingLeft: 30, width:350, justifyContent:"center"}}>
					<Text style={{textAlign:"center", width:300, fontSize:20}}>
						Please create your Username for when you login and 
						your personal Password and your Email Address.
					</Text>
					<Item>
						<Icon active name='mail' />
            <TextInput 
							placeholder="Enter Email"
							keyboardType="email-address"
							blurOnSubmit={false}
							returnKeyType="next"
							autoCapitalize='none'
							autoCorrect={false} 
							onSubmitEditing={() => { this.txtPassword.focus(); }}
							value={this.state.email}    
							onChangeText={email => this.setState({ email })}
							/>
					</Item>
					<Item>
						<Icon active name='key' />
						<TextInput 
							placeholder="Enter Password"
							secureTextEntry
							autoCapitalize='none'
							returnKeyType="go"
							autoCorrect={false} 
							ref={(input) => { this.txtPassword = input; }} 
							value={this.state.password}
							onChangeText={password => this.setState({ password })}
						/>
					</Item>
				</CardItem>
				
				<CardItem footer style={{justifyContent:"center"}}>
					<Context.Consumer>
					{({store, actions }) => {
						return(
								<Button large onPress={() => {
									actions.user.add(this.state.email, this.state.password);
									this.setState({ submitted: true})
								}}>
									<Text> SUBMIT </Text>
								</Button>
								)
							}}
						</Context.Consumer>
				</CardItem>
			</Card>		
		}
		
		return(
			<Container>
			{x}
			</Container>
		)
	}
}