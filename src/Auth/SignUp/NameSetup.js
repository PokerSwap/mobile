import React from 'react';

import {TextInput, View, Platform, KeyboardAvoidingView } from 'react-native'
import { Button, Text, Icon } from 'native-base';

var a_behavior, offBy, marginee
if (Platform.OS == 'ios'){
  a_behavior='position', offBy= -100, marginee=20
} else {
  a_behavior='padding', offBy = -500, marginee = 80}

export default NameSetup = (props) => {

    props.e()


    let txtLastName = null
    let txtNickName = null


    
    return(
        <KeyboardAvoidingView behavior={a_behavior} keyboardVerticalOffset={offBy} style={{flex:1, justifyContent:'center',  marginTop:40}}>

            {/* <View style={{justifyContent:'center', flex:1, flexDirection:'column', backgroundColor:'white', height:'100%', textAlign:'center'}}> */}
                {/* NAME INSTRUCTIONS */}
                <View>
                <Text style={{fontSize:16,textAlign:'center', alignSelf:'center', width:'80%'}}>
                    Please enter your first and last name in the 
                    fields below as it appears on your competitive event reciepts.
                </Text>
                </View>
                
                {/* <KeyboardAvoidingView behavior={a_behavior} keyboardVerticalOffset={offBy} style={{flex:1}}> */}

                {/* NAME TEXT INPUTS */}
                    {/* FIRST NAME INPUT */}
                <View style={{width:'80%', alignSelf:'center', marginTop:10,
                    borderBottomWidth:0.5, borderBottomColor: 'grey'}}>
                    <TextInput 
                        placeholder='First Name'
                        placeholderTextColor='grey'
                        value={props.first_name}
                        onChangeText={props.onChangeFirstName}
                        autoCorrect={false}
                        
                        style={{height:50, fontSize:20, marginTop: 20, color: "black", 
                            paddingHorizontal: 10, fontWeight:'bold'}}
                        // keyboardType="email-address"
                        blurOnSubmit={false}
                        returnKeyType="next" 
                        onSubmitEditing={() => { txtLastName.focus(); }} />
                </View>
                {/* LAST NAME INPUT */}
                <View style={{width:'80%', alignSelf:'center', 
                    borderBottomWidth:0.5, borderBottomColor: 'grey'}}>
                    <TextInput 
                        placeholder='Last Name'
                        placeholderTextColor='grey'
                        style={{height:50, width:'100%', fontSize:20, 
                            marginTop: 20, color: "black", 
                            paddingHorizontal: 10, fontWeight:'bold'}}
                        value={props.last_name}    
                        onChangeText={props.onChangeLastName} 
                        autoCorrect={false}
                        blurOnSubmit={false}
                        ref={(input) => { txtLastName = input; }} 
                        returnKeyType="next" 
                        onSubmitEditing={() => { txtNickName.focus(); }} />
                </View>
            {/* NICK NAME BODY */}
                {/* NICK NAME INSTRUCTIONS */}
                <Text style={{alignSelf:'center',textAlign:'center', fontSize:16, 
                    paddingTop:30, paddingBottom:20, width:'80%'}}>
                    (Optional) Enter any other name that may show up on your receipt. 
                </Text>
                {/* NICK NAME INPUT */}
                <View style={{width:'80%', alignSelf:'center',borderBottomWidth:0.5, borderBottomColor: 'grey'}}>
                    <TextInput 
                        placeholder='Enter Buy-In Alias'
                        placeholderTextColor='grey'
                        style={{height:50, fontSize:20, marginTop: 1, color: "black", 
                        paddingHorizontal: 10, fontWeight:'bold'}}
                        value={props.nickname}    
                        onChangeText={props.onChangeNickName} 
                        autoCorrect={false}
                        blurOnSubmit={true}
                        ref={(input) => { txtNickName = input; }} 
                        returnKeyType="done" />
                </View>


            {/* CREATE PROFILE NAVIGATION */}
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
                {/* </View>      */}

        </KeyboardAvoidingView>
    )
}
