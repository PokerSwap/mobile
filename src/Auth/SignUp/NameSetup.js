import React, {Component} from 'react';
import { Button, Card, CardItem, Item, Input, Text } from 'native-base';

export default class NameSetup extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
  
  render(){

    let x;

    if(this.props.first_name == '' || this.props.last_name == ''){
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
              value={this.props.first_name}
              onChangeText={this.props.onChangeFirstName}
              autoCorrect={false}         
            />
          </Item>

          {/* LAST NAME INPUT */}
          <Item>
            <Input 
              placeholder='Last Name'
              value={this.props.last_name}    
              onChangeText={this.props.onChangeLastName} 
              autoCorrect={false} 
            />
          </Item>

          {/* NICK NAME INPUT */}
          <Item>
            <Input 
              placeholder='Nick Name'
              value={this.props.username}    
              onChangeText={this.props.onChangeUserName} 
              autoCorrect={false} 
            />
          </Item>

        </CardItem>

        {/* SUBMIT BUTTON */}
        <CardItem footer style={{justifyContent:"center"}}>
          <Button large disabled={x} onPress={() => this.props.next()}>
            <Text>SUBMIT</Text>
          </Button>
        </CardItem>

      </Card>
      
    )
  }
}