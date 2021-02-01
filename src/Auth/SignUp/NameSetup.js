import React from 'react';

import {TextInput, View } from 'react-native'
import { Card, CardItem, Text } from 'native-base';

export default NameSetup = (props) => {

    props.e()


    let txtLastName = null
    let txtNickName = null


    
    return(
        <Card transparent>
            {/* NAME INSTRUCTIONS */}
            <CardItem style={{justifyContent:'center'}}>
                <Text style={{fontSize:16,textAlign:'center', width:'90%'}}>
                    Please enter your first and last name in the 
                    fields below as it appears on your competitive event reciepts.
                </Text>
            </CardItem>
            {/* NAME TEXT INPUTS */}
            <CardItem body style={{flexDirection:"column"}}>
                {/* FIRST NAME INPUT */}
                <View style={{width:'80%', borderBottomWidth:0.5, borderBottomColor: 'grey'}}>
                    <TextInput 
                        placeholder='First Name'
                        placeholderTextColor='grey'
                        value={props.first_name}
                        onChangeText={props.onChangeFirstName}
                        autoCorrect={false}
                        
                        style={{height:40, fontSize:20, marginTop: 1, color: "black", 
                            paddingHorizontal: 10, fontWeight:'bold'}}
                        // keyboardType="email-address"
                        blurOnSubmit={false}
                        returnKeyType="next" 
                        onSubmitEditing={() => { txtLastName.focus(); }} />
                </View>
                {/* LAST NAME INPUT */}
                <View style={{width:'80%', borderBottomWidth:0.5, borderBottomColor: 'grey'}}>
                    <TextInput 
                        placeholder='Last Name'
                        placeholderTextColor='grey'
                        style={{height:40, width:'100%', fontSize:20, 
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
            </CardItem>
            {/* NICK NAME BODY */}
            <CardItem body style={{flexDirection:"column"}}>  
                {/* NICK NAME INSTRUCTIONS */}
                <Text style={{alignSelf:'flex-start',textAlign:'center', fontSize:16, 
                    paddingTop:30, paddingBottom:20, width:'90%'}}>
                    (Optional) Enter any other name that may show up on your receipt. 
                </Text>
                {/* NICK NAME INPUT */}
                <View style={{width:'80%', borderBottomWidth:0.5, borderBottomColor: 'grey'}}>
                    <TextInput 
                        placeholder='Enter Buy-In Alias'
                        placeholderTextColor='grey'
                        style={{height:40, fontSize:20, marginTop: 1, color: "black", 
                        paddingHorizontal: 10, fontWeight:'bold'}}
                        value={props.nickname}    
                        onChangeText={props.onChangeNickName} 
                        autoCorrect={false}
                        blurOnSubmit={true}
                        ref={(input) => { txtNickName = input; }} 
                        returnKeyType="done" />
                </View>
            </CardItem>
        </Card>     
    )
}
