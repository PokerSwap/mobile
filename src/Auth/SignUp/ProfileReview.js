import React, {Component} from 'react';
import { Image } from 'react-native';
import { Button, Card, Text, CardItem } from 'native-base';
import { Context } from '../../Store/appContext';

export default class ProfileReview extends Component {
	constructor(props){
		super(props);
		this.state={}


	} 

	profileStart = async(x) => {
		var answer = await x.profile.add(
			this.props.username,
			this.props.first_name,
			this.props.last_name,
			this.props.hendon,
			this.props.picture,
			this.props.navigation
		)
	}

	render(){
		return(
      <Card>
				<Text>Profile Review</Text>

				<CardItem>
						<Text>Image</Text>
						<Image src={{}}/>
				</CardItem>
				<CardItem>
						<Text>Name</Text>
						<Text> {this.props.first_name} "{this.props.username}" {this.props.last_name}</Text>
				</CardItem>
				<CardItem>		
						<Text>Hendon</Text>
						<Text>{this.props.hendon}</Text>
				</CardItem>

				<Context.Consumer>
					{({ store, actions }) => {
						return(
							<Button success large onPress={()=> this.profileStart(actions)}>
								<Text>Finalize</Text>
							</Button>
						)
					}}
				</Context.Consumer>
		
				<Button light onPress={() => this.props.prev()}>
					<Text>Go back</Text>
				</Button>
			</Card>
    )
  }
}