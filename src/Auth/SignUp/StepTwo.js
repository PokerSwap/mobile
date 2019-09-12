import React, {Component} from 'react';
import { Button, Card, CardItem, Item, Input,
ProgressBar, Text } from 'native-base';

export default class StepTwo extends Component {
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
                        <Input placeholder='First Name'/>
                    </Item>
                    <Item>
                        <Input placeholder='Last Name'/>
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