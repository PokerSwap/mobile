import React, { useContext } from 'react';
import { Image } from 'react-native';
import { Button, Card, Text, CardItem } from 'native-base';
import { Context } from '../../Store/appContext';

export default  ProfileReview = (props) => {
	const { store, actions } = useContext(Context)

	let lol = new RegExp('^https:\/\/pokerdb.thehendonmob.com')
	
	const createProfile = async() => {
		var creatingProfile = await actions.profile.add(
			props.username, props.first_name, props.last_name, 
			props.hendon, props.picture
		) 
	}

	return(
		<Card style={{flexDirection:'column'}}>
			{/* PROFILE PICTURE FIELD */}
			<CardItem transparent style={{justifyContent:'center'}}>
				<Image source={{uri: props.picture.uri}} 
					style={{height:100, width:100, marginTop:25, borderRadius:500}}/>
			</CardItem>
			{/* PROFILE NAME FIELD */}
			<CardItem transparent style={{flexDirection:'column',marginVertical:10}}>
				<Text style={{textAlign:'center', fontSize:20,fontWeight:'bold'}}>
					Profile Name
				</Text>
				<Text style={{fontWeight:'600'}}>
					{props.first_name} {props.last_name}
				</Text>
			</CardItem>
			{/* NICK NAME FIELD */}
			{props.user ?
				<CardItem transparent style={{flexDirection:'column',marginVertical:10}}>
					<Text style={{textAlign:'center', fontSize:20,fontWeight:'bold'}}>
						Nick Name
					</Text>
					<Text style={{textAlign:'center', fontSize:20}}>
						{props.username}
					</Text>
				</CardItem>
				: null}
			{/* HENDON URL FIELD */}
			<CardItem transparent 
				style={{flexDirection:'column',marginVertical:10}}>		
				{props.hendon !== '' ?
					props.hendon.includes('https://pokerdb.thehendonmob.com/player.php?a=r&n=') ?
						<Text style={{textAlign:'center',fontSize:20,fontWeight:'600'}}>
							Hendon URL: {'\n'} {props.hendon}
						</Text>
					: <Text> You did not submit a valid hendon profile</Text>
				: <Text> You did not submit a hendon profile </Text> }
			</CardItem>
			{/* NAVIGATION BUTTONS */}
			<CardItem transparent style={{justifyContent:'space-around'}}>		
				{/* GO BACK BUTTON */}
				<Button light onPress={() => props.prev()}>
					<Text>Go Back</Text>
				</Button>
				{/* CREATE PROFILE BUTTON */}
				<Button success large onPress={()=> createProfile()}>
					<Text>Finalize</Text>
				</Button>
			</CardItem>
		</Card>
	)
}
