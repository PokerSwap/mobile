import React, {Component} from 'react';
import { Image } from 'react-native'
import { Button, Card, CardItem, Text } from 'native-base';

export default class StepThree extends Component {
    constructor(props){
        super(props);
        this.state={
            pic:"https://yak-ridge.com/wp-content/uploads/2019/04/image-placeholder-350x350.png"
        }
    }
    render(){
        return(
            <Card transparent>
                <CardItem header>
                    <Image source={{uri: this.state.pic }} style={{height: 200,  flex: 1}}/>
                </CardItem>
                <CardItem body>

                    <Text>Choose a profile picture of yourself to upload.</Text>
                </CardItem>
                <CardItem footer style={{justifyContent:"center"}}>
                    <Button large onPress={() => this.props.next()}>
                        <Text>
                            UPLOAD
                        </Text>
                    </Button>
                </CardItem>
                <CardItem footer style={{justifyContent:"center"}}>
                    <Button large onPress={() => this.props.prev()}>
                        <Text>
                            Go Back
                        </Text>
                    </Button>
                </CardItem>
            </Card>
        )
    }
}