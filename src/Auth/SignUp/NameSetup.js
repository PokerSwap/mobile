import React from 'react';
import { Button, Card, CardItem, Item, Icon, Input, Text } from 'native-base';

export default NameSetup = (props) => {
  let x;
  (props.first_name == '' || props.last_name == '') ? 
    x = true : x = false
    
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
        <Item>
          <Input 
            placeholder='First Name'
            value={props.first_name}
            onChangeText={props.onChangeFirstName}
            autoCorrect={false}/>
        </Item>
        {/* LAST NAME INPUT */}
        <Item>
          <Input 
            placeholder='Last Name'
            value={props.last_name}    
            onChangeText={props.onChangeLastName} 
            autoCorrect={false} />
        </Item>
      </CardItem>
      {/* NICK NAME BODY */}
      <CardItem body style={{flexDirection:"column"}}>  
        {/* NICK NAME INSTRUCTIONS */}
        <Text style={{alignSelf:'flex-start',textAlign:'center', fontSize:16, paddingTop:30, paddingBottom:20, width:'90%'}}>
          (Optional) Enter any other name that may show up on your receipt. 
        </Text>
        {/* NICK NAME INPUT */}
        <Item>
          <Input 
            placeholder='Enter Buy-In Alias'
            value={props.nickname}    
            onChangeText={props.onChangeNickName} 
            autoCorrect={false}/>
        </Item>
      </CardItem>
      {/* SUBMIT BUTTON */}
      <CardItem footer style={{justifyContent:"flex-end", alignContent:'flex-end'}}>
        <Button iconRight large disabled={x} onPress={() => props.next()}>
          <Text>NEXT</Text>
          <Icon name='arrow-forward'/>
        </Button>
      </CardItem>
    </Card>     
  )
}
