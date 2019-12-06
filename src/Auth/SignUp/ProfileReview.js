import React, {useContext} from 'react';
import { Image } from 'react-native';
import { Button, Card, Text, CardItem } from 'native-base';
import { Context } from '../../Store/appContext';

export default  ProfileReview = (props) => {

	const { store, actions } = useContext(Context)

	profileStart = async() => {
		var answer = await actions.profile.add(
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


				<Button success large onPress={()=> profileStart()}>
					<Text>Finalize</Text>
				</Button>

		
				<Button light onPress={() => props.prev()}>
					<Text>Go back</Text>
				</Button>
			</Card>
    )
  }
