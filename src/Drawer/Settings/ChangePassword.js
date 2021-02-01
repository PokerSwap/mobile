import React, { useContext, useState } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation } from '@react-navigation/native'

import { Alert, TextInput, View, ScrollView} from 'react-native'
import { Container, Content, Button, Text, Toast } from 'native-base';

import '../../Images/placeholder.jpg';

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default ChangePassword = () => {
    const { store, actions } = useContext(Context)
    const navigation = useNavigation()

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    const [currentEmail, setCurrentEmail] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    let txtCurrentPassword2 = null
    let txtNewPassword = null
    let txtConfirmPassword = null

    var isDisabled 
        
    const regexEmail = new RegExp('^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$');
        
    const showAlert = () =>{
        Alert.alert(
            "Confirmation",
            'For security reasons, you will be logged out once you make these changes.\n\n Do you wish to continue?',
            [
                { text: 'Yes',
                onPress: () => changePassword() },
                { text: 'No',
                onPress: () => console.log("Cancel Pressed"), }
            ]
        )
    }

    const changePassword = async() => {
        if (newPassword == confirmPassword ){
            var answer = await actions.user.changePassword(
                currentEmail, currentPassword, newPassword, navigation)
        } else {
            Toast.show({
                text:'Password Change Failed. Make sure both new password' + 
                    'and confirm password are the same',
                position:'top',
                duration:3000
            })
        }
    }

    return(
        <Container style={{backgroundColor:currentStyle.background.color}}>
            <Content contentContainerStyle={{paddingTop:30, paddingBottom:30,
                justifyContent:'flex-start', alignItems:'center', flex:1, 
                flexDirection:'column', backgroundColor:currentStyle.background.color}}>
                
                {/* EMAIL ADDRESS FIELD */}
                <Text style={{fontSize:20, textAlign:'center', 
                    marginBottom:5, color:currentStyle.text.color}}> 
                    Email Current Email: 
                </Text>
                <View style={{borderColor: currentStyle.text.color, borderWidth:1, 
                    width:'80%', padding:10, marginVeritcal:5}}>
                    <TextInput 
                        style={{fontSize:20, textAlign:'center', 
                            width:'100%', color:currentStyle.text.color}}
                        placeholder="Enter Current Email"
                        selectionColor={currentStyle.text.color}
                        placeholderTextColor='gray'
                        keyboardType="email-address"
                        blurOnSubmit={false}
                        selectionColor={'white'}
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false} 
                        onSubmitEditing={() => { txtCurrentPassword2.focus(); }}
                        value={currentEmail}    
                        onChangeText={email => setCurrentEmail( email )}  />
                </View>

                {/* ENTER CURRENT PASSWORD */}
                <Text style={{fontSize:20, marginTop:20, textAlign:'center',marginBottom:5, 
                    color: currentStyle.text.color}}>
                    Enter Current Password:
                </Text>

                <View style={{borderColor:currentStyle.text.color, borderWidth:1, width:'80%', 
                    padding:10, marginVeritcal:5}}>
                    <TextInput 
                        style={{fontSize:20, textAlign:'center', 
                        width:'100%', color:currentStyle.text.color}}
                        selectionColor={currentStyle.text.color}
                        placeholder="Enter Current Password"
                        placeholderTextColor='gray'
                        blurOnSubmit={false}
                        autoCapitalize='none'
                        secureTextEntry
                        returnKeyType="next"
                        autoCorrect={false} 
                        ref={(input) => { txtCurrentPassword2 = input; }} 
                        onSubmitEditing={() => { txtNewPassword.focus(); }}
                        value={currentPassword}
                        onChangeText={password => setCurrentPassword( password )} />
                </View>

                {/* ENTER NEW PASSWORD */}
                <Text style={{fontSize:16, marginTop:20, width:'80%', 
                    textAlign:'center',marginBottom:5, color:currentStyle.text.color}}>
                    Your new password must be at least 6 characters containing:{'\n'} 
                    one lowercase letter, one uppercase letter, and one number.
                </Text>

                {/* ENTER NEW PASSWORD */}
                <Text style={{fontSize:20, marginTop:20, textAlign:'center',marginBottom:5, 
                    color:currentStyle.text.color}}>
                    Enter New Password:
                </Text>

                <View style={{borderColor:currentStyle.text.color, borderWidth:1, width:'80%', 
                    padding:10, marginVeritcal:5}}>
                    <TextInput 
                        style={{fontSize:20, textAlign:'center', width:'100%', 
                            color:currentStyle.text.color}}
                        placeholder="Enter Password"
                        placeholderTextColor='gray'
                        selectionColor={currentStyle.text.color}
                        secureTextEntry
                        blurOnSubmit={false}
                        autoCapitalize='none'
                        returnKeyType="next"
                        autoCorrect={false} 
                        ref={(input) => { txtNewPassword = input; }} 
                        onSubmitEditing={() => { txtConfirmPassword.focus(); }}
                        value={newPassword}
                        onChangeText={password2 => setNewPassword( password2 )} />
                </View>

                {/* CONFIRM NEW PASSWORD */}
                <Text style={{fontSize:20, marginTop:20, textAlign:'center',marginBottom:5, 
                    color:currentStyle.text.color}}>
                    Confirm New Password:
                </Text>

                <View style={{borderColor:currentStyle.text.color, borderWidth:1, width:'80%', 
                    padding:10, marginVeritcal:5}}>
                    <TextInput 
                        style={{fontSize:20, textAlign:'center', width:'100%', 
                            color:currentStyle.text.color}}
                        selectionColor={currentStyle.text.color}
                        placeholder="Confirm New Password"
                        placeholderTextColor='gray'
                        secureTextEntry          
                        blurOnSubmit={true}
                        ref={(input) => { txtConfirmPassword = input; }} 
                        returnKeyType="go"
                        autoCapitalize='none'
                        autoCorrect={false} 
                        value={confirmPassword}    
                        onChangeText={password3 => setConfirmPassword( password3 )} />
                </View>

                <View style={{justifyContent:'center'}}>
                    {/* SUBMIT BUTTON */}
                    <Button large disabled={isDisabled} style={{marginTop:20, selfAlign:'center', 
                        justifyContent:'center'}}
                        onPress={()=> showAlert()}>
                        <Text style={{fontSize:30, fontWeight:'600'}}> 
                            SUBMIT 
                        </Text>
                    </Button>
                </View>
            
            </Content>
        </Container>  
    )
}
