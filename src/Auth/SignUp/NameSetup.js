import React, {} from 'react';
import {View} from 'react-native'
import { Button, Card, CardItem, Item, Icon, Input, Text } from 'native-base';

export default NameSetup = (props) => {

    let x;
    (props.first_name == '' || props.last_name == '') ? x=true : x=false
    
    return(

      <Card transparent>

        {/* NAME INSTRUCTIONS */}
        <CardItem>
          <Text style={{fontSize:20}}>
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

          <Text style={{alignSelf:'flex-start',textAlign:'left', fontSize:20, paddingTop:20}}>
            (Optional) Enter any other name that may show up on your receipt. </Text>
          {/* NICK NAME INPUT */}
          <Item>
            <Input 
              placeholder='Enter Buyin Alias'
              value={props.username}    
              onChangeText={props.onChangeUserName} 
              autoCorrect={false} 
            />
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
