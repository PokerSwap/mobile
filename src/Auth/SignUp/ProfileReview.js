import React, { useContext, useState } from 'react';
import { Context } from '../../Store/appContext';
import { useNavigation} from '@react-navigation/native'

import { Image, View } from 'react-native';
import { Button, Text, Icon } from 'native-base';
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
		<View style={{justifyContent:'center', alignSelf:'center', flex:1, flexDirection:'column',
            backgroundColor:'white',  textAlign:'center'}}>
			<Spinner visible={loading} />
			
			{/* PROFILE PICTURE FIELD */}
			<Image source={{uri: props.picture.uri}} 
				style={{height:200, alignSelf:'center', width:200, marginTop:25, borderRadius:500}}/>
			
			{/* PROFILE NAME FIELD */}
			<Text style={{textAlign:'center', fontSize:24,fontWeight:'bold',marginVertical:10}}>
				Profile Name
			</Text>
			<Text style={{fontWeight:'600',fontSize:24, textAlign:'center',}}>
				{props.first_name} {props.last_name}
			</Text>
			
			{/* NICKNAME FIELD */}
			<Text style={{textAlign:'center', fontSize:24,fontWeight:'bold',marginVertical:10}}>
				Nick Name
			</Text>
			<Text style={{textAlign:'center', fontSize:24}}>
				{props.nickname ? props.nickname : "No Nickname Entered"}
			</Text>

			<View style={{flexDirection:'row', marginTop:20}}>
                <View style={{width:'50%'}}>
                    {props.page !== 0 ?
                        <Button  large iconLeft transparent 
                            style={{alignSelf:'center'}} onPress={()=> props.prev()}>
                            <Icon name='arrow-back'/>
                            <Text>Prev.</Text>
                        </Button>
                        :
                        null}
                </View>
                
                <View style={{width:'50%'}}>
                    {props.page !== 2 ?
                        <Button disabled={x} large iconRight transparent 
                            style={{alignSelf:'center'}} onPress={() => props.next()}>
                            <Text>Next</Text>
                            <Icon name='arrow-forward'/>
                        </Button>
                        :
                        <Button style={{alignSelf:'center'}} large  transparent 
                            onPress={() => props.createProfile()}>
                            <Text>Finalize</Text>
                        </Button>}
                    </View>
                </View>
                
            <Button large style={{marginBottom:30, marginTop:30, alignSelf:'center'}} 
                onPress={() => navigation.goBack()}>
                <Text>Exit To Login</Text>
            </Button>

		</View>
	)
}
