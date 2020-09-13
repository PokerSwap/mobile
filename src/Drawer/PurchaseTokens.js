import React, { useContext, useState } from 'react';
import { Alert,  ScrollView, Image, View, Platform } from 'react-native';
import { Container, Content,  Button, Text } from 'native-base';
import { Grid, Col, Row} from 'react-native-easy-grid'
import stripe from 'tipsi-stripe';

// var pid;
// Platform.IOS == 'ios' ? pid = 'merchant.com.swapprofitllc.swapprofitapp' : pid = '05487257864798279761'

// stripe.setOptions({
//   publishableKey: 'pk_live_No3ckprr7lPnxOP2MGPqRDO500aYv6i73M',
//   merchantId: pid ,
//   androidPayMode: 'test',
// });

import OtherHeader from '../View-Components/OtherHeader'
import {Context} from '../Store/appContext'
import { useNavigation } from '@react-navigation/native';

PriceOption = (props) => {

  const { store, actions } = useContext(Context)
  const [ complete, setComplete ] = useState(true)

  // const startBuying = async (description, amount) => {

  //   const options = {
  //     requiredBillingAddressFields: ['all'],
  //     requiredShippingAddressFields: ['phone', 'postal_address'],
  //   }
  //   const items = [{ label: description, amount: amount }]
  //   const token = await stripe.paymentRequestWithApplePay(items, options)
      
  //   if(complete){        
  //     await stripe.completeApplePayRequest()
  //     console.log('ITT SHOULD WORKKKKK')
  //     var answer2 = await actions.swapToken.buy(props.tokens)
  //   } else{
  //     await stripe.completeApplePayRequest()
  //     console.log('CUT MY LIFE int PIECCES')
  //   }
  // }

    // CONFIRMATION ALERT
    const confirmationAlert = () => {
      Alert.alert(
        "Confirmation",
        'Are you want to purchase ' + props.swapTokens + ' Tokens?',
        [
          { text: 'Yes', onPress: () => actions.swapToken.buy(props.swapTokens)},
          { text: 'No', onPress: () => console.log("Cancel Pressed")}
        ]
      )
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
        {props.swapTokens} Tokens
      </Text>

      <Button full style={{ alignSelf:'center', justifyContent:'center', width:'100%'}} 
        //  onPress={()=> startBuying('for ' + props.tokens.toString() + ' Swap Tokens', props.dollars.toString())}
       onPress={() => confirmationAlert()}
       >
        <Text style={{textAlign:'center'}}>
          ${props.dollars}
        </Text>
      </Button>
    </Col>
  )
}

export default PurchaseTokens = (props) => {

  const { store, actions } = useContext(Context)
  const navigation = useNavigation()
  // requestPayment = () => {
  //   return stripe
  //     .paymentRequestWithCardForm()
  //     .then(stripeTokenInfo => {
  //       console.warn('Token created', { stripeTokenInfo });
  //     })
  //     .catch(error => {
  //       console.warn('Payment failed', { error });
  //     });
  // };[{
  //   label: '10 Tokens',
  //   amount: '1.99',
  // }]


  return(
    <Container>
      <Content>
      <OtherHeader title={'Purchase Tokens'} />
      <ScrollView style={{ alignSelf: 'stretch' }}>           
        <Grid transparent>
          <Button onPress={() => navigation.navigate('Card Form')}>
            <Text>Card Form</Text>
          </Button> 
          {Platform.OS == 'ios' ?
            <Button onPress={() => navigation.navigate('Apple Pay')}>
              <Text>Apple Pay</Text>
            </Button> 
            :
            <Button onPress={() => navigation.navigate('Android Pay')}>
              <Text>Android Pay</Text>
            </Button>
          }
          
          
          <Button onPress={() => navigation.navigate('Custom Card')}>
            <Text>Custom Card</Text>
          </Button>
          <Button onPress={() => navigation.navigate('Custom Bank')}>
            <Text>Custom Bank</Text>
          </Button>
          {/* <Button onPress={() => navigation.navigate('Source')}>
            <Text>Source</Text>
          </Button> */}
          {/* TIER 1 PURCHASES */}
          <Row style={{alignItems:'center'}}>
            <PriceOption image={require('../Images/5Real.png')}
              dollars={4.99} swapTokens={5} w={100} h={100} hx={100} />
            <PriceOption image={require('../Images/10Real.png')}
              dollars={9.99} swapTokens={10} w={100} h={100} hx={100} />
          </Row>
          {/* TIER 2 PURCHASES */}
          <Row style={{alignItems:'center'}}>
            <PriceOption image={require('../Images/25Real.png')}
              dollars={19.99} swapTokens={25} w={100} h={100} hx={100}/>
            <PriceOption image={require('../Images/50Real.png')}
              dollars={34.99} swapTokens={50}  w={100} h={100} hx={100}/>
          </Row>
          {/* TIER 3 PURCHASES */}
          <Row>
            <PriceOption image={require('../Images/100Real.png')}
              dollars={69.99} swapTokens={100} w={100} h={100} />
            <PriceOption image={require('../Images/150Real.png')}
              dollars={99.99} swapTokens={150} w={100} h={100} />
          </Row>
        </Grid>
        </ScrollView>
      </Content>
    </Container>
  )
}