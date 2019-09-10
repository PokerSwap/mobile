import React, {Component} from 'react';
import { Body, Card, CardItem, Container, Content, 
  H1, H3, Left, Right } from 'native-base';
import BuyButton from './ConfirmPurchase';
import _Header from '../View-Components/header'

class PriceOption extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
  render(){
    return(
      <CardItem>
        <Left><H3> {this.props.quantity} </H3></Left>
        <Body><H3> ${this.props.price} </H3></Body>
        <Right><BuyButton/></Right>
      </CardItem>
    )
  }
}

export default class AddCoinsScreen extends Component {
    constructor(){
      super();
      this.state={}
    }
    render(){
      return(
        <Container>
          <_Header drawer={() => this.props.navigation.toggleDrawer()}/>
          <Content contentContainerStyle={{flex:1, justifyContent:'center'}}>
            <Card>

              {/* TITLE */}
              <CardItem header style={{paddingBottom:20}}>
                <Left/><H1> Purchase Tokens </H1><Right/>
              </CardItem>

              {/* DIFFERENT PRICE OPTIONS */}
              <PriceOption quantity="10" price="4.99"/>
              <PriceOption quantity="25" price="9.99"/>
              <PriceOption quantity="60" price="19.99"/>
              
            </Card>
          </Content>
        </Container>
      )
    }
}