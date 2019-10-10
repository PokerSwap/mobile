import React, {Component} from 'react';
import { Button, Card, Text } from 'native-base';

export default class ProfileReview extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <Card>
                <Text>Profile Review</Text>
                <Button success large onPress={()=>this.props.navigation.navigate('Swaps')}>
                    <Text>Finalize</Text>
                </Button>
                
                <Button light onPress={() => this.props.prev()}>
                    <Text>Go back</Text>
                </Button>
            </Card>
        )
    }
}