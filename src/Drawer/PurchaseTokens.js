import React, { useContext, useState } from 'react';
import { Alert,  ScrollView, Image} from 'react-native';
import { Container, Content,  Button, Text, View } from 'native-base';
import { Grid, Col, Row} from 'react-native-easy-grid'
import stripe from 'tipsi-stripe';

stripe.setOptions({
  publishableKey: 'pk_live_No3ckprr7lPnxOP2MGPqRDO500aYv6i73M',
  merchantId:'merchant.com.swapprofitllc.swapprofitapp'
});

import OtherHeader from '../View-Components/OtherHeader'
import {Context} from '../Store/appContext'

PriceOption = (props) => {

  const { store, actions } = useContext(Context)
  const [ complete, setComplete ] = useState(true)

  const startBuying = async (description, amount) => {

    const options = {
      requiredBillingAddressFields: ['all'],
      requiredShippingAddressFields: ['phone', 'postal_address'],
    }
    const items = [{ label: description, amount: amount }]
    const token = await stripe.paymentRequestWithApplePay(items, options)
      
    if(complete){        
      await stripe.completeApplePayRequest()
      console.log('ITT SHOULD WORKKKKK')
      var answer2 = await actions.coins.buy(props.coins)
    } else{
      await stripe.completeApplePayRequest()
      console.log('CUT MY LIFE int PIECCES')
    }
  }

  return(
    <Col style={{ 
      justifyContent:'center', alignItems:'center',
       borderColor:'#d3d3d3', borderRightWidth:1, 
      borderTopWidth:1}}>
      <View style={{overflow:'hidden', height:props.hx}}>
        <Image source={props.image} style={{
          width:props.w, height:props.h, alignSelf:'center'}}/>
      </View>
      <Text style={{textAlign:'center', fontWeight:'500', 
        fontSize:24, marginBottom:10}}> 
        {props.coins} coins
      </Text>

      <Button full style={{ alignSelf:'center', justifyContent:'center', width:'100%'}} 
       onPress={()=> startBuying('for ' + props.coins.toString() + ' Swap Tokens', props.dollars.toString())}>
        <Text style={{textAlign:'center'}}>
          ${props.dollars}
        </Text>
      </Button>
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
  };[{
    label: '10 Tokens',
    amount: '1.99',
  }]


  return(
    <Container>
      <OtherHeader title={'Purchase Tokens'} 
        goBackToHome={() => props.navigation.goBack(null)}/>

      <Content contentContainerStyle={{
        flex:1, justifyContent:'center', alignItems:'center'}}>
      <ScrollView style={{ alignSelf: 'stretch' }}>           

        <Grid transparent>

          <Row style={{alignItems:'center'}}>
            <PriceOption image={require('../Images/5Real.png')}
              dollars={4.99} coins={5} w={100} h={100} hx={100} />
            <PriceOption image={require('../Images/10Real.png')}
              dollars={9.99} coins={10} w={100} h={100} hx={100} />
          </Row>

          <Row style={{alignItems:'center'}}>
            <PriceOption image={require('../Images/25Real.png')}
              dollars={19.99} coins={25} w={100} h={100} hx={100}/>
            <PriceOption image={require('../Images/50Real.png')}
              dollars={34.99} coins={50}  w={100} h={100} hx={100}/>
          </Row>
          
          <Row>
            <PriceOption image={require('../Images/100Real.png')}
              dollars={69.99} coins={100} w={100} h={100} />
            <PriceOption image={require('../Images/150Real.png')}
              dollars={99.99} coins={150} w={100} h={100} />
          </Row>
        </Grid>
        
        </ScrollView>
      </Content>
    </Container>
  )
}