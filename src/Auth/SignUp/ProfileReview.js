import React, { useContext, useState } from 'react';
import { Context } from '../../Store/appContext';
import { useNavigation} from '@react-navigation/native'

import { Image } from 'react-native';
import { Button, Card, Text, CardItem } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay'

export default  ProfileReview = (props) => {
	const { store, actions } = useContext(Context)
	const [ loading, setLoading ] = useState(false) 
	
	const navigation = useNavigation()

	let lol = new RegExp('^https:\/\/pokerdb.thehendonmob.com')
	var xxx
	// props.hendon.includes('https://pokerdb.thehendonmob.com/player.php?a=r&n=') ? xxx = props.hendon : xxx = null

	const createProfile = async() => {
		setLoading(true)
		var creatingProfile = await actions.profile.add(
			props.nickname, props.first_name, props.last_name, 
			null, 
			props.picture, navigation
		) 
		setLoading(false)
	}

	return(
		<Card transparent style={{flexDirection:'column'}}>
			<Spinner visible={loading} />
			
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
			<CardItem transparent style={{flexDirection:'column',marginVertical:10}}>
				<Text style={{textAlign:'center', fontSize:20,fontWeight:'bold'}}>
					Nick Name
				</Text>
				<Text style={{textAlign:'center', fontSize:20}}>
					{props.nickname ? props.nickname : "No Nickname Entered"}
				</Text>
			</CardItem>
		</Card>
	)
}
