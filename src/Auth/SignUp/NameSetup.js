import React, {Component} from 'react';
import { Button, Card, CardItem, Item, Input, Text } from 'native-base';

export default class NameSetup extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <Card transparent>
                <CardItem>
                    <Text>
                        Please enter your First and Last Name in the 
                        fields below AS IT APPEARS ON YOUR TOURNAMENT RECEIPTS.
                    </Text>
                </CardItem>
                <CardItem body style={{flexDirection:"column"}}>
                  <Item>
                    <Input 
                      placeholder='First Name'
                      value={this.props.first_name}    
                      onChangeText={first_name => this.setState({ first_name })}
                    />
                  </Item>
                  <Item>
                    <Input 
                      placeholder='Last Name'
                      value={this.props.last_name}    
                      onChangeText={last_name => this.setState({ last_name })}
                    />
                  </Item>
                  <Item>
                    <Input 
                      placeholder='Nick Name'
                      value={this.props.username}    
                      onChangeText={email => this.setState({ username })}
                    />
                  </Item>
                </CardItem>
                <CardItem footer style={{justifyContent:"center"}}>
                    <Button large onPress={() => this.props.next()}>
                        <Text>SUBMIT</Text>
                    </Button>
                </CardItem>
                <CardItem footer style={{justifyContent:"center"}}>
                    <Button large info onPress={() => this.props.prev()}>
                        <Text> Go Back </Text>
                    </Button>
                </CardItem>
            </Card>
        )
    }
}