import React, { useState, useEffect, useContext } from 'react';

import { Alert, KeyboardAvoidingView, TouchableOpacity, View } from "react-native";
import { Button, Text, Icon } from 'native-base';

import { Context } from '../../Store/appContext'
import { useNavigation } from '@react-navigation/native'


export default HendonSetup = (props) => {
	const [disabled, setDisabled] = useState(true)

	const { store, actions } = useContext(Context)

	const [ hendonURL, setHendonURL ] = useState(props.hendon)
	const [ lookHendon, setLookHendon] = useState(false)
	const [ available, setAvailable] = useState(false)
	const navigation = useNavigation()
	
	const goToNextPage = () => {
		props.onChangeHendon('');
		actions.profile.hendonUrlCurrent('')
		props.next();
	}

	const showAlert = () =>{
        Alert.alert(
				"Confirmation",
				"Please be advised that if you claim a hendon mob profile" +
				" that is not your own, you may be banned from Swapping?",
				[
					{ text: 'Yes', onPress: () => {
							props.onChangeHendon(hendonURL);props.next()} },
					{ text: 'No',  onPress: () => console.log("Cancel Pressed"), }
				]
        )
	}
	
	var checkBaby = async() => {
		var x = await actions.user.checkHendonAvailability(store.currentHendonURL)
		if (x == true){
			setAvailable(true)
			setDisabled(false)
		} else {
			setAvailable(false)
				setDisabled(true)}
	}
	

	useEffect(() => {  
        const unsubscribe = navigation.addListener('focus', () => {
            if (store.currentHendonURL.includes(
				'https://pokerdb.thehendonmob.com/player.php?a=r&n=')){
				checkBaby()
			}  else {setDisabled(true)
				setAvailable(false)
				actions.profile.hendonUrlCurrent('')}
            console.log(store.currentHendonURL, 'newhendon')
        });
        return () => {
          actions.profile.hendonUrlCurrent('')
        }
      }, [])

	return(
		<KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-300}>
		<View transparent style={{display:'flex', justifyContent:'center'}}>
			{lookHendon ?
				// CLICKED ON "YES, I DO"
				<View style={{height:'99%', alignText:'center', 
					display:'flex', justifyContent:'center'}}>

					<Button large style={{marginBottom:40, alignSelf:'center'}} 
						onPress={() => navigation.push('Hendon Selection', {
									onChangeHendon: props.onChangeHendon,
									setHendonURL: setHendonURL
								})}>
						<Text>Click Here to Search</Text>
					</Button>
					<Text style={{textAlign:"center", marginBottom:10, fontSize:18}}>
						Current Hendon Mob Profile:
					</Text>
					{ store.currentHendonURL == '' ?
						<Text style={{fontSize:18,alignSelf:'center', textAlign:'center'}}>
							None Selected
						</Text>
						:
						store.currentHendonURL.includes(
							'https://pokerdb.thehendonmob.com/player.php?a=r&n=') ?
							available ?
								<Text style={{fontSize:16, textAlign:'center',
									alignSelf:'center', width:'80%'}}>
									{hendonURL}
								</Text>
								:
								<Text style={{fontSize:16, textAlign:'center',
									alignSelf:'center', width:'80%'}}>
									This Hendon Mob Profile is already taken
								</Text>
							:
							<Text style={{fontSize:18, alignSelf:'center', 
								width:'70%', textAlign:'center'}}>
								You did not submit a valid Hendon Mob profile
							</Text> }    
								
					

					<Button style={{alignSelf:'center', marginTop:20}} 
						onPress={() => goToNextPage()}>
						<Text>Maybe Later</Text>
					</Button>

					{/* PREV BUTTON */}
					<View style={{justifyContent:'center'}}>
						<Button large disabled={disabled} style={{marginTop:40, 
							alignSelf:'center', justifyContent:'center'}}
							onPress={()=> showAlert()}>
							<Text style={{fontSize:24, fontWeight:'600'}}> 
								Confirm Update 
							</Text>
						</Button>
					</View>
					<View style={{justifyContent:'center', alignSelf:'center', marginTop:30}}>
						<Button info iconLeft large onPress={() => props.prev()}>
							<Icon name='arrow-back'/>
							<Text>Next</Text>
						</Button>
					</View>
				</View>
				:
				// INTRODUCTION SCREEN
				<View style={{width:'80%', height:500, flexDirection:'column', 
					justifyContent:'space-around', alignSelf:'center', marginTop:20}}>
					
					<View style={{flexDirection:"column", 
						justifyContent:"center", textAlign:'center'}}>
						<View>
							<Text style={{textAlign:'center', fontSize:20, marginBottom:5}}>
								Have a Hendon Mob profile? 
							</Text>
						</View>

						<TouchableOpacity style={{marginTop:40, alignSelf:'center'}}
							onPress={() => setLookHendon(true)}>
							<Text style={{fontSize:36,}}>
								Yes, I do
							</Text>
						</TouchableOpacity>	

						<TouchableOpacity  style={{marginTop:30, alignSelf:'center'}}
							onPress={() => goToNextPage()}>
							<Text style={{fontSize:36,}}>
								No, I don't
							</Text>
						</TouchableOpacity>	

					</View>
					{/* PREV BUTTON */}
					<View style={{justifyContent:'center', alignSelf:'center', marginTop:30}}>
						<Button info iconLeft large onPress={() => props.prev()}>
							<Icon name='arrow-back'/>
							<Text>Back</Text>
						</Button>
						
					</View>
		
				</View>}
			
		</View>
		</KeyboardAvoidingView>
	)
}
