import React, {Component} from 'react';
import { Button, Card, CardItem, 
Container, Content, Text, H2 } from 'native-base';

export default class TermsAndConditions extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    return(
      <Container>
        <Content contentContainerStyle={{alignContent:"center", flex:1,justifyContent:"center"}}>
          {/* PAGE CONTAINER */}
          <Card transparent style={{justifyContent:"center"}} >
            {/* PAGE TITLE */}
            <CardItem header style={{justifyContent:"center"}}>
              <H2 style={{textAlign:'center'}}>Terms And Conditions</H2>
            </CardItem> 
            {/* PAGE BODY */}
            <CardItem style={{justifyContent:"center"}}>
              <Text style={{textAlign:"center", width:300}}>
                  By using Swapppoker, I hereby certify that I am not 
                  a douchebag and that I will be 1,000,000% liable for 
                  any and every agreed transaction on this app.
              </Text>
            </CardItem>
            <CardItem style={{justifyContent:"center"}}>
              <Text style={{textAlign:"center", width:300}}>
                  I am not a bullshitter and I hold my integrity and my 
                  namesake above all else.  I will pay out what I am supposed 
                  to in due time.
              </Text>
            </CardItem>
            <CardItem style={{justifyContent:"center"}}>
              <Text style={{textAlign:"center", width:300}}>
                  I also understand that if I commit any douchebaggery by 
                  not paying out what I have agreed to, my name is going to be 
                  ruined in PokerLand.
              </Text>
            </CardItem>
            {/* PAGE BUTTON */}
            <CardItem style={{justifyContent:"center"}}>
              <Button large onPress={()=> this.props.navigation.navigate('SignUp')}>
                <Text>I AGREE</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>     
    )
  }
}