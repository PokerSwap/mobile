import React from 'react';

import {TextInput, Keyboard } from 'react-native'
import { Button, Card, CardItem, Item, Icon, Input, Text } from 'native-base';

export default NameSetup = (props) => {
  let x;
  (props.first_name == '' || props.last_name == '') ? 
    x = true : x = false

  let txtLastName = null
  let txtNickName = null

    
  return(
    <Card transparent>
      {/* NAME INSTRUCTIONS */}
      <CardItem style={{justifyContent:'center'}}>
        <Text style={{fontSize:16,textAlign:'center', width:'90%'}}>
          Please enter your first and last name in the 
          fields below as it appears on your tournament reciepts.
        </Text>
      </CardItem>
      {/* NAME TEXT INPUTS */}
      <CardItem body style={{flexDirection:"column"}}>
        {/* FIRST NAME INPUT */}
        <Item style={{width:'80%'}}>
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
        </Item>
        {/* LAST NAME INPUT */}
        <Item style={{width:'80%'}}>
          <TextInput 
            placeholder='Last Name'
            placeholderTextColor='grey'
            style={{height:40, fontSize:20, marginTop: 20, color: "black", 
            paddingHorizontal: 10, fontWeight:'bold'}}
            value={props.last_name}    
            onChangeText={props.onChangeLastName} 
            autoCorrect={false}
            blurOnSubmit={false}
            ref={(input) => { txtLastName = input; }} 
            returnKeyType="next" 
            onSubmitEditing={() => { txtNickName.focus(); }} />
        </Item>
      </CardItem>
      {/* NICK NAME BODY */}
      <CardItem body style={{flexDirection:"column"}}>  
        {/* NICK NAME INSTRUCTIONS */}
        <Text style={{alignSelf:'flex-start',textAlign:'center', fontSize:16, paddingTop:30, paddingBottom:20, width:'90%'}}>
          (Optional) Enter any other name that may show up on your receipt. 
        </Text>
        {/* NICK NAME INPUT */}
        <Item style={{width:'80%'}}>
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
        </Item>
      </CardItem>
      {/* SUBMIT BUTTON */}
      <CardItem footer style={{justifyContent:"flex-end", alignContent:'flex-end'}}>
        <Button iconRight large disabled={x} onPress={() => {Keyboard.dismiss(); props.next()}}>
          <Text>NEXT</Text>
          <Icon name='arrow-forward'/>
        </Button>
      </CardItem>
    </Card>     
  )
}
