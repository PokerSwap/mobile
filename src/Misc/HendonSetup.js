import React, {useState, useEffect, useContext} from 'react';

import { Alert, KeyboardAvoidingView, TouchableOpacity, View } from "react-native";
import { Button, Content, Text, Icon } from 'native-base';

import {Context} from '../Store/appContext'
import { useNavigation } from '@react-navigation/native'


export default HendonSetup = (props) => {
	
	const { store, actions } = useContext(Context)

	const [ hendonURL, setHendonURL ] = useState('None Selected')
	const [ lookHendon, setLookHendon] = useState(false)
	const [ available, setAvailable] = useState(false)
	const [ disabled, setDisabled ] = useState(true)

	const navigation = useNavigation()

	const showAlert = () =>{
        Alert.alert(
            "Confirmation",
            " Please be advised that if you claim a Hendon Mob profile that is not your own, you may be banned from Swapping?",
            [
                { text: 'Yes', onPress: () => {actions.profile.changeHendon(hendonURL, navigation, true);actions.profile.hendonUrlCurrent(''); } },
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
			setDisabled(true)
		}
	}

	var goToHendon = () => {
		navigation.push('Hendon Selection', {
			onChangeHendon: setHendonURL,
			setHendonURL: setHendonURL,
			setAvailable: setAvailable
		})
	}
	
	useEffect(() => {  
        const unsubscribe = navigation.addListener('focus', () => {
            if (store.currentHendonURL.includes('https://pokerdb.thehendonmob.com/player.php?a=r&n=')){
				checkBaby()
			} else {
				setDisabled(true)
				setAvailable(false)
            }
            console.log(store.currentHendonURL, 'newhendon')
        });
    }, [])

	return(
		<KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-300}>
		<View transparent style={{display:'flex', justifyContent:'center'}}>
			{lookHendon ?
				<View style={{height:'99%', alignText:'center', 
					display:'flex', justifyContent:'center'}}>

					<Text style={{fontSize:16, width:'95%', alignSelf:'center',  
						marginTop:20, textAlign:'center', marginBottom:20,}}>
                        Enter your name in the search engine on the following page. 
						Once you have found your actual profile page, confirm it.{'\n'}{'\n'} 
						Please be advised that if you claim
						a Hendon Mob profile that is not your own, you may be banned from Swapping.
                    </Text>

					<Button large style={{marginBottom:40, alignSelf:'center'}} 
						onPress={() => goToHendon()}>
						<Text>Click Here to Search</Text>
					</Button>
					<Text style={{textAlign:"center", marginBottom:10, fontSize:18}}>
						Current Hendon Mob Profile:
					</Text>
					{ store.currentHendonURL == '' && hendonURL == 'None Selected' ?
						<Text style={{fontSize:18,alignSelf:'center', textAlign:'center'}}>
							None Selected
						</Text>
						:
						store.currentHendonURL.includes(
							'https://pokerdb.thehendonmob.com/player.php?a=r&n=') 
							|| hendonURL.includes(
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
						onPress={() => navigation.navigate('Drawer', {screen:'Home'})}>
						<Text>Maybe Later</Text>
					</Button>
					
					<View style={{justifyContent:'center'}}>
						<Button large disabled={disabled} onPress={()=> showAlert()}
							style={{marginTop:40, alignSelf:'center', 
								justifyContent:'center'}} >
							<Text style={{fontSize:24, fontWeight:'600'}}> 
								Confirm Update 
							</Text>
						</Button>
					</View>
					
				</View>
				:
				<View style={{width:'80%', height:500, flexDirection:'column', 
					justifyContent:'space-around', alignSelf:'center', marginTop:20}}>
					{/* HENDON INSTRUCTIONS */}
					<View style={{flexDirection:"column", 
						justifyContent:"center", textAlign:'center'}}>
						<View>
							<Text style={{textAlign:'center', fontSize:20, marginBottom:5}}>
								Have a Hendon Mob profile? 
							</Text>
						</View>

						<TouchableOpacity style={{marginTop:40, alignSelf:'center'}}
							onPress={() => setLookHendon(true)}>
							<Text style={{fontSize:36,}}>Yes, I do</Text>
						</TouchableOpacity>	

						<TouchableOpacity  style={{marginTop:40, alignSelf:'center'}}
							onPress={() => navigation.navigate('Drawer', {screen:'Home'})}>
							<Text style={{fontSize:36,}}>No, I don't</Text>
						</TouchableOpacity>	
					</View>
				</View>}
			
		</View>
		</KeyboardAvoidingView>
	)
}

const styles = {

}