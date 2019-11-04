import React, {Component} from 'react';
import { Image } from 'react-native';
import { Button, Card, Text, CardItem } from 'native-base';
import { Context } from '../../Store/appContext';

export default  ProfileReview = (props) => {

	

	profileStart = async(x) => {
		var answer = await x.profile.add(
			props.username,
			props.first_name,
			props.last_name,
			props.hendon,
			props.picture,
			props.navigation
		)
	}


		return(
      <Card>
				<Text>Profile Review</Text>

				<CardItem>
						<Text>Image</Text>
						<Image src={{}}/>
				</CardItem>
				<CardItem>
						<Text>Name</Text>
						<Text> {props.first_name} "{props.username}" {props.last_name}</Text>
				</CardItem>
				<CardItem>		
						<Text>Hendon</Text>
						<Text>{props.hendon}</Text>
				</CardItem>

				<Context.Consumer>
					{({ store, actions }) => {
						return(
							<Button success large onPress={()=> profileStart(actions)}>
								<Text>Finalize</Text>
							</Button>
						)
					}}
				</Context.Consumer>
		
				<Button light onPress={() => props.prev()}>
					<Text>Go back</Text>
				</Button>
			</Card>
    )
  }
