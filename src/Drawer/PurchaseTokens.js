import React, { useContext } from 'react';
import { Alert,  ScrollView, Image} from 'react-native';
import { Container, Content,  Button, Text, View } from 'native-base';
import {Grid, Col, Row} from 'react-native-easy-grid'
import stripe from 'tipsi-stripe';

stripe.setOptions({
  publishableKey: 'pk_live_No3ckprr7lPnxOP2MGPqRDO500aYv6i73M',
  merchantId:'merchant.com.swapprofitllc.swapprofitapp'
});

import OtherHeader from '../View-Components/OtherHeader'

import {Context} from '../Store/appContext'

import '../Images/5Real.png'
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
              [{text: 'OK', onPress: () => console.log('OK')}]  
            )}
        },
        {text: 'No',onPress: () => console.log("Cancel Pressed"), }
      ]
    )
  }
	return (
    <Button large style={{width:'50%', alignSelf:'center', 
      marginBottom:10, justifyContent:'center'}} 
      onPress={()=> showAlert()}>
      <Text style={{textAlign:'center'}}>
        ${props.dollars}
      </Text>
    </Button>
	)
}

PriceOption = (props) => {

  const { store, actions } = useContext(Context)

  return(
    <Col style={{
      justifyContent:'center', alignItems:'center',
       borderColor:'#d3d3d3', borderRightWidth:1, 
      borderTopWidth:1, paddingVertical:10}}>
      <View style={{overflow:'hidden', height:props.hx}}>
        <Image source={props.image} style={{
          width:props.w, height:props.h, alignSelf:'center'}}/>
      </View>
      <Text style={{textAlign:'center', fontWeight:'500', 
        fontSize:24, marginBottom:10}}> 
        {props.coins} coins
      </Text>

      <AlertS coins={props.coins} dollars={props.dollars}/>
    </Col>
  )
}

export default PurchaseTokens = (props) => {

  const { store, actions } = useContext(Context)

  requestPayment = () => {
    return stripe
      .paymentRequestWithCardForm()
      .then(stripeTokenInfo => {
        console.warn('Token created', { stripeTokenInfo });
      })
      .catch(error => {
        console.warn('Payment failed', { error });
      });
  };

  const check = () => {
    stripe.canMakeNativePayPayments() ? console.log('yes') : console.log('no')
  }

  const items = [{
    label: '10 Tokens',
    amount: '1.99',
  }]

  const options = {
    requiredBillingAddressFields: ['all'],
    requiredShippingAddressFields: ['phone', 'postal_address'],
  }

  const token = async() => await stripe.paymentRequestWithApplePay(items, options)
  // .then( stripe.completeApplePayRequest())
  .then(console.log('hey'))
  .catch((error)=>{console.log('error:', error)})
  return(
    <Container>
      <OtherHeader title={'Purchase Tokens'} 
        goBackToHome={() => props.navigation.goBack(null)}/>

      <Content contentContainerStyle={{
        flex:1, justifyContent:'center', alignItems:'center'}}>
      <ScrollView style={{ alignSelf: 'stretch' }}>           
        
        <Button onPress={()=>  {check();token();} }>
          <Text>Test</Text>
        </Button>
        <Grid transparent>

          <Row style={{alignItems:'center'}}>
            <PriceOption dollars={4.99} coins={5} 
              w={100} h={100} hx={100}
              image={require('../Images/5Real.png')}/>
            <PriceOption dollars={9.99} coins={10} 
              w={100} h={100} hx={100}
              image={require('../Images/10Real.png')}/>
          </Row>

          <Row style={{alignItems:'center'}}>
            <PriceOption dollars={19.99} coins={25} 
              w={200} h={200} hx={175}
              image={require('../Images/25Real.png')}/>
            <PriceOption dollars={34.99} coins={50} 
              w={200} h={200} hx={175}
              image={require('../Images/50Real.png')}/>
          </Row>
          
          <Row>
            <PriceOption dollars={69.99} coins={100} w={200} h={200}
              image={require('../Images/100Real.png')}/>
            <PriceOption dollars={99.99} coins={150} w={200} h={200}
              image={require('../Images/150Real.png')}/>
          </Row>
        </Grid>
        
        </ScrollView>
      </Content>
    </Container>
  )
}