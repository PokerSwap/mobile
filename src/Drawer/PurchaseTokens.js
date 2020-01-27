import React, { useContext } from 'react';
import {Platform, Alert, StyleSheet, ScrollView, View} from 'react-native';

import { Body, Container, Content, Card, CardItem, Button,  H3, Left, Right, Text, ActionSheet } from 'native-base';
import BuyButton from './ConfirmPurchase';
import _Header from '../View-Components/header'

import {Context} from '../Store/appContext'

const AlertS = (props) => {

  const { store, actions } = useContext(Context)

	const showAlert = () =>{
    Alert.alert(
      "Confirmation",
      'Are you sure you want to buy '+ props.coins + ' coins?',
      [
        {
          text: 'Yes',
          onPress: () => {actions.coin.buy(props.dollars, props.coins);
                          Alert.alert(
                            "Confirmation", 
                            'You now have ' + store.myProfile.coins + ' coins.',
                            [{
                              text: 'OK',
                              onPress: () => console.log('OK')
                            }]  
                          )}
        },
        {
          text: 'No',
          onPress: () => console.log("Cancel Pressed"),
        }
      ]
    )
  }
	return (
    <Button onPress={()=> showAlert()}>
      <Text>Buy</Text>
    </Button>
	)
}

PriceOption = (props) => {
  const { store, actions } = useContext(Context)
  return(
    <CardItem>
      <Left>
        <H3> {props.coins} coins</H3>
      </Left>

      <Body>
        <H3> ${props.dollars} </H3>
      </Body>

      <Right>
        <AlertS coins={props.coins} dollars={props.dollars}/>
      </Right>
    </CardItem>
  )
}

export default PurchaseTokens = (props) => {

  const { store, actions } = useContext(Context)

  

  return(
    <Container>
      <_Header title={'Add Tokens'} 
      drawer={() => props.navigation.toggleDrawer()}
      tutorial={() => props.navigation.push('Tutorial')}/>
      <Content contentContainerStyle={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ScrollView style={{ alignSelf: 'stretch' }}>           
        <Card transparent>
          <PriceOption dollars={4.99} coins={10}/>
          <PriceOption dollars={9.99} coins={25}/>
          <PriceOption dollars={19.99} coins={60}/>
        </Card>
        
        </ScrollView>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.select({
      ios: 0,
      android: 24,
    }),
    paddingTop: Platform.select({
      ios: 0,
      android: 24,
    }),
    backgroundColor: 'white',
  },
  header: {
    flex: 20,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: 26,
    color: 'green',
  },
  content: {
    flex: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  btn: {
    height: 48,
    width: 240,
    alignSelf: 'center',
    backgroundColor: '#00c40f',
    borderRadius: 0,
    borderWidth: 0,
  },
  txt: {
    fontSize: 16,
    color: 'white',
  },
});