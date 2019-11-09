import React, {Component} from 'react';
import { Body, Card, CardItem, Container, Content, 
  H1, H3, Left, Right } from 'native-base';
import BuyButton from './ConfirmPurchase';
import _Header from '../View-Components/header'

PriceOption = (props) => {
  return(
    <CardItem>
      <Left><H3> {props.quantity} </H3></Left>
      <Body><H3> ${props.price} </H3></Body>
      <Right><BuyButton/></Right>
    </CardItem>
  )
}


export default AddCoinsScreen = (props) => {

  return(
    <Container>
      <_Header title={'Add Coins'} drawer={() => props.navigation.toggleDrawer()}/>
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
