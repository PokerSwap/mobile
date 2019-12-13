import React, {} from 'react';
import { Button, Card, CardItem, Item, Input, Text } from 'native-base';

export default NameSetup = (props) => {

    let x;

    if(props.first_name == '' || props.last_name == ''){
      x=true
    }else{
      x=false
    }

    return(

      <Card transparent>

        {/* NAME INSTRUCTIONS */}
        <CardItem>
          <Text>
            Please enter your First and Last Name in the 
            fields below AS IT APPEARS ON YOUR TOURNAMENT RECEIPTS.
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
              autoCorrect={false}         
              
            />
          </Item>

          {/* LAST NAME INPUT */}
          <Item>
            <Input 
              placeholder='Last Name'
              value={props.last_name}    
              onChangeText={props.onChangeLastName} 
              autoCorrect={false} 
            />
          </Item>

          {/* NICK NAME INPUT */}
          <Item>
            <Input 
              placeholder='Nick Name'
              value={props.username}    
              onChangeText={props.onChangeUserName} 
              autoCorrect={false} 
            />
          </Item>

        </CardItem>

        {/* SUBMIT BUTTON */}
        <CardItem footer style={{justifyContent:"center"}}>
          <Button large disabled={x} onPress={() => props.next()}>
            <Text>SUBMIT</Text>
          </Button>
        </CardItem>

      </Card>
      
    )
  }
