import React, {useContext} from 'react';
import { Image } from 'react-native';
import { Button, Card, Text, CardItem, Item } from 'native-base';
import { Context } from '../../Store/appContext';

export default  ProfileReview = (props) => {

	const { store, actions } = useContext(Context)

	let createProfile = async() => {
		var answer = await actions.profile.add(
			props.username,
			props.first_name,
			props.last_name,
			props.hendon,
			props.picture
		)
		.then(() => actions.profile.get())
		.then(() => actions.tracker.getAll())
		.then(() => actions.tracker.getPast())
		.then(() => actions.tournaments.getInital())
		.then(()=> actions.coin.buy(0,5))
		.then(()=> props.navigation.navigate('Swaps'))
	}


	return(
		<Card style={{flexDirection:'column'}}>
			
			<CardItem transparent style={{justifyContent:'center'}}>
				<Image source={{uri: props.picture.uri}} style={{height:100, width:100, marginTop:25, borderRadius:500}}/>
			</CardItem>

			<CardItem transparent style={{flexDirection:'column',marginVertical:10}}>
				<Text style={{fontSize:20,fontWeight:'600'}}>Name</Text>
				<Text> {props.first_name} "{props.username}" {props.last_name}</Text>
			</CardItem>

			<CardItem transparent style={{flexDirection:'column',marginVertical:10}}>		
				<Text style={{fontSize:20,fontWeight:'600'}}>Hendon URL:</Text>
				<Text>{props.hendon}</Text>
			</CardItem>

			<CardItem transparent style={{justifyContent:'space-around'}}>		
						
				<Button light onPress={() => props.prev()}>
					<Text>Go back</Text>
				</Button>
					
				<Button success large onPress={()=> createProfile()}>
					<Text>Finalize</Text>
				</Button>
						
			</CardItem>

		</Card>
	)
}
