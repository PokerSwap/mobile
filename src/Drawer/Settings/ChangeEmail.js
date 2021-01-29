import React, { useContext, useState } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation } from '@react-navigation/native';

import { TextInput, View } from 'react-native'
import { Container, Content, Button, Text, Toast } from 'native-base';

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default ChangeEmail = () => {
    const { store, actions } = useContext(Context)
    const navigation = useNavigation()

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    const [currentEmail, setCurrentEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')

    let txtCurrentPassword1 = null;
    let txtNewEmail = null;
    let txtConfirmEmail = null;

    const regexEmail = new RegExp('^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$');
    var isDisabled 

    // regexEmail.test(currentEmail) && regexEmail.test(newEmail) && currentPassword !== ''?
    //   newEmail == confirmEmail ?
    //     isDisabled = false : isDisabled = true
    //   :
    //   isDisabled = true 

    const changeEmail = async() => {
        newEmail == confirmEmail ?
            newEmail !== store.myProfile.email ?
                actions.user.changeEmail(currentEmail, currentPassword, newEmail, navigation)
                :
                Toast.show({
                text:'This is already your email address',
                duration:3000,
                position:'top'
                })
            
            :
            Toast.show({
                text:'Make sure both emails are the same',
                duration:3000,
                position:'top'
            })
    }

  return(
    <Container >
        <Content contentContainerStyle={{paddingTop:50,
            justifyContent:'flex-start', alignItems:'center', flex:1, flexDirection:'column', backgroundColor:currentStyle.background.color}}>
            {/* ENTER CURRENT EMAIL FIELD */}
            <Text style={{fontSize:20, textAlign:'center', marginBottom:5, color:currentStyle.text.color}}>
            Enter Current Email:
            </Text>
            <View style={{borderColor:currentStyle.text.color, borderWidth:1, width:'80%', padding:10, marginVeritcal:5}}>
                <TextInput 
                    style={{fontSize:20, textAlign:'center', color:currentStyle.text.color}}
                    placeholder="Enter Current Email"
                    placeholderTextColor='gray'
                    keyboardType="email-address"
                    blurOnSubmit={false}
                    selectionColor={currentStyle.text.color}
                    returnKeyType="next"
                    autoCapitalize='none'
                    autoCorrect={false} 
                    onSubmitEditing={() => { txtCurrentPassword1.focus(); }}
                    value={currentEmail}    
                    onChangeText={email2 => setCurrentEmail( email2 )} />
            </View>
            
            {/* INSTRUCTION - CHANGE EMAIL */}
            <Text style={{fontSize:20, textAlign:'center', marginTop:15, marginBottom:5, 
                color:currentStyle.text.color}}>
                Enter Current Password:
            </Text>
            <View style={{borderColor:currentStyle.text.color, borderWidth:1, width:'80%',
                 padding:10, marginVeritcal:5}}>
            <TextInput 
                style={{fontSize:20, textAlign:'center', paddingHorizontal:10, width:'100%', 
                    color:currentStyle.text.color}}
                placeholder="Enter Current Password"
                placeholderTextColor='gray'
                secureTextEntry
                blurOnSubmit={false}
                autoCapitalize='none'
                returnKeyType="next"
                autoCorrect={false} 
                selectionColor={currentStyle.text.color}
                ref={(input) => { txtCurrentPassword1 = input; }} 
                onSubmitEditing={() => { txtNewEmail.focus(); }}
                value={currentPassword}
                onChangeText={currentPassword => setCurrentPassword( currentPassword )} />
            </View>
            {/* ENTER NEW EMAIL FIELD */}
            <Text style={{fontSize:20, textAlign:'center', marginTop:15, marginBottom:5, 
                color:currentStyle.text.color}}>
                Enter New Email:
            </Text>
            <View style={{borderColor:currentStyle.text.color, borderWidth:1, width:'80%', 
                padding:10, marginVeritcal:5}}>
                <TextInput 
                    style={{fontSize:20, textAlign:'center', color:currentStyle.text.color}}
                    placeholder="Enter New Email Address"
                    placeholderTextColor='gray'
                    keyboardType="email-address"
                    blurOnSubmit={true}
                    ref={(input) => { txtNewEmail = input; }} 
                    onSubmitEditing={() => { txtConfirmEmail.focus(); }}
                    selectionColor={currentStyle.text.color}
                    returnKeyType="go"
                    autoCapitalize='none'
                    autoCorrect={false} 
                    value={newEmail}    
                    onChangeText={email => setNewEmail( email )} />
            </View>
            {/* CONFIRM NEW EMAIL FIELD */}
            <Text style={{fontSize:20, textAlign:'center', marginTop:15, marginBottom:5, 
                color:currentStyle.text.color}}>
            Confirm New Email:
            </Text>
            <View style={{borderColor:currentStyle.text.color, borderWidth:1, width:'80%', 
                padding:10, marginVeritcal:5}}>
                <TextInput 
                    style={{fontSize:20, textAlign:'center', color:currentStyle.text.color}}
                    placeholder="Confirm New Email Address"
                    placeholderTextColor='gray'
                    keyboardType="email-address"
                    blurOnSubmit={true}
                    ref={(input) => { txtConfirmEmail = input; }} 
                    selectionColor={currentStyle.text.color}
                    returnKeyType="go"
                    autoCapitalize='none'
                    autoCorrect={false} 
                    value={confirmEmail}    
                    onChangeText={email => setConfirmEmail( email )}/>
            </View>
            
            {/* SUBMIT BUTTON - CHANGE EMAIL */}
            <Button large  style={{marginTop:40, alignSelf:'center'}} 
            onPress={() => changeEmail()}>
                <Text style={{fontSize:30, fontWeight:'600'}}> 
                    SUBMIT 
                </Text>
            </Button>
        </Content>  
    </Container>
    )
}