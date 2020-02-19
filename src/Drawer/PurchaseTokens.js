import React, { useContext } from 'react';
import { Alert,  ScrollView} from 'react-native';
import { Body, Container, Content, Card, CardItem, Button,  H3, Left, Right, Text } from 'native-base';
import OtherHeader from '../View-Components/OtherHeader'

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
              'You now have ' + (store.myProfile.coins + props.coins) + ' coins.',
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
      <OtherHeader title={'Purchase Tokens'} 
        goBackToHome={() => props.navigation.goBack(null)}/>
      <Content contentContainerStyle={{
        flex:1, justifyContent:'center', alignItems:'center'}}>
      <ScrollView style={{ alignSelf: 'stretch' }}>           
        <Card transparent>
          <PriceOption dollars={4.99} coins={5}/>
          <PriceOption dollars={9.99} coins={10}/>
          <PriceOption dollars={19.99} coins={25}/>
          <PriceOption dollars={34.99} coins={50}/>
          <PriceOption dollars={59.99} coins={100}/>
          <PriceOption dollars={99.99} coins={200}/>
        </Card>
        
        </ScrollView>
      </Content>
    </Container>
  )
}