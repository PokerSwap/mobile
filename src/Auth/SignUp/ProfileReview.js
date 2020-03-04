import React, {useContext} from 'react';
import { Image } from 'react-native';
import { Button, Card, Text, CardItem, Item } from 'native-base';
import { Context } from '../../Store/appContext';

export default  ProfileReview = (props) => {

	const { store, actions } = useContext(Context)

	let lol = new RegExp('^https:\/\/pokerdb.thehendonmob.com')
	

	let username
	props.username !== '' ?
	username = ' ' + props.username + ' '
	: username = ' '

	console.log('testing',props.hendon, typeof(props.hendon), lol.test(props.hendon))
	let createProfile = async() => {
		var answer = await actions.profile.add(
			props.username, props.first_name, props.last_name, 
			props.hendon, props.picture
		) 
		.then(() => actions.profile.get())
		.then(() => actions.tracker.getAll())
		.then(() => actions.tracker.getPast())
		.then(() => actions.tournament.getInitial())
		.then(()=> props.navigation.navigate('Swaps'))
	}

	return(
		<Card style={{flexDirection:'column'}}>
			
			<CardItem transparent style={{justifyContent:'center'}}>
				<Image source={{uri: props.picture.uri}} 
					style={{height:100, width:100, marginTop:25, borderRadius:500}}/>
			</CardItem>

			<CardItem transparent style={{flexDirection:'column',marginVertical:10}}>
				<Text style={{fontSize:20,fontWeight:'600'}}>
					Name {'\n'}{props.first_name}{username}{props.last_name}
				</Text>
			</CardItem>

			<CardItem transparent 
				style={{flexDirection:'column',marginVertical:10}}>		
				{props.hendon !== '' ?
					props.hendon !== 'https://www.thehendonmob.com/search/' ?
						<Text style={{fontSize:20,fontWeight:'600'}}>
							Hendon URL: {'\n'} {props.hendon}
						</Text>
					:<Text>You did not submit a valid hendon profile</Text>
				: <Text>You did not submit a hendon profile</Text>
				}
			</CardItem>

			<CardItem transparent style={{justifyContent:'space-around'}}>		
						
				<Button light onPress={() => props.prev()}>
					<Text>Go Back</Text>
				</Button>
					
				<Button success large onPress={()=> createProfile()}>
					<Text>Finalize</Text>
				</Button>
						
			</CardItem>

		</Card>
	)
}
