import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation } from '@react-navigation/native'

import { Alert, Linking, TouchableOpacity, TextInput, View } from 'react-native'
import { Container, Content, Button, Text, Toast } from 'native-base';

import '../../Images/placeholder.jpg';

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default UpdateHendon = () => {
    const { store, actions } = useContext(Context)

    const navigation = useNavigation()

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    const [newNickname, setNewNickname] = useState('')
    const [disabled, setDisabled] = useState(true)

    const [currentHendon, setCurrentHendon] = useState(store.myProfile.hendon_url)
    const [newHendon, setNewHendon] = useState('None Selected')

    useEffect(() => {  
        const unsubscribe = navigation.addListener('focus', () => {
            store.currentHendonURL.includes('https://pokerdb.thehendonmob.com/player.php?a=r&n=')  ? setDisabled(false): setDisabled(true)
            console.log(store.currentHendonURL, 'newhendon')
        });
        return () => {
          unsubscribe
        }
      }, [])




    
    const showAlert = () =>{
        Alert.alert(
            "Confirmation",
            "Remember if you solely rely on your nickname for your buy-in ticket,you may not be able to verify your buyin ticket on SwapProfit if its different than what is registered.\n\n  Do you wish to continue?",
            [
                { text: 'Yes', onPress: () => actions.profile.changeHendon(newHendon, navigation) },
                { text: 'No',  onPress: () => console.log("Cancel Pressed"), }
            ]
        )
    }


return(
    <Container style={{justifyContent:'center'}}>
        <Content contentContainerStyle={{backgroundColor:currentStyle.background.color,
            justifyContent:'center', alignItems:'center', flex:1, flexDirection:'column'}}>
        
        {/* TEXT FIELD */}
        <Text style={{fontSize:20, width:'70%', marginTop:20, textAlign:'center',marginBottom:5, 
            color:currentStyle.text.color, marginBottom:20,}}>
            Do you want to update your Hendon Mob Profile? 
        </Text>

        <Button style={{alignSelf:'center', marginBottom:40,}} 
        onPress={() => navigation.push('Hendon Selection', {
                        onChangeHendon: setNewHendon,
                        setHendonURL: setNewHendon
					})}>
						<Text>Click Here</Text>
					</Button>
        
        {/* <Text style={{color:currentStyle.text.color, textAlign:'center'}}>Your Current Hendon Profile:{'\n'}{currentHendon}</Text> */}
        <Text style={{color:currentStyle.text.color, fontSize:24, marginBottom:10, textAlign:'center'}}>Selected Hendon Profile:</Text>
        { store.currentHendonURL == '' ?
            <Text style={{color:currentStyle.text.color, fontSize:18, textAlign:'center'}}>
                None Selected
            </Text>
            :
            store.currentHendonURL.includes('https://pokerdb.thehendonmob.com/player.php?a=r&n=') ?
                <Text style={{color:currentStyle.text.color, fontSize:18, textAlign:'center', width:'70%'}}>
                    {newHendon}
                </Text>
                :
                <Text style={{color:currentStyle.text.color, fontSize:18, width:'70%', textAlign:'center'}}>
                    You did not submit a valid Hendon Mob profile
                </Text>
        }    

        {/* SUBMIT BUTTON - CHANGE NICKNAME */}
        <View style={{justifyContent:'center'}}>
            <Button large disabled={disabled} style={{marginTop:40, selfAlign:'center', justifyContent:'center'}}
                onPress={()=> showAlert()}>
                <Text style={{fontSize:24, fontWeight:'600'}}> 
                    Confirm Update 
                </Text>
            </Button>
        </View>
        
    </Content>  
    </Container>
)
}
