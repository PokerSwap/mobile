import React, { useContext, useState } from 'react';
import { Alert,  ScrollView, Image, View, Modal, Platform } from 'react-native';
import { Container, Content,  Button, Text } from 'native-base';
import { Grid, Col, Row} from 'react-native-easy-grid'
import stripe from 'tipsi-stripe';

import PayForTokenModal from './PayScenes/PayForTokenModal'

// var pid;
// Platform.IOS == 'ios' ? pid = 'merchant.com.swapprofitllc.swapprofitapp' : pid = '05487257864798279761'

// stripe.setOptions({
//   publishableKey: 'pk_live_No3ckprr7lPnxOP2MGPqRDO500aYv6i73M',
//   merchantId: pid ,
//   androidPayMode: 'test',
// });


import OtherHeader from '../View-Components/OtherHeader'

PriceOption = (props) => {

  const [ visible, setVisible] = useState(false)

  return(
    <Col style={{ 
      justifyContent:'center', alignItems:'center',
       borderColor:'#d3d3d3', borderRightWidth:1, 
      borderTopWidth:1}}>
        <Modal
          animationType='fade'
          visible={visible}
          presentationStyle='overFullScreen'
          transparent={true}>
          <PayForTokenModal  setVisible={setVisible}
            dollars={props.dollars}
            swapTokens={props.swapTokens} />
        </Modal>
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
       onPress={() => setVisible(true)}
       >
        <Text style={{textAlign:'center'}}>
          ${props.dollars}
        </Text>
      </Button>
    </Col>
  )
}

export default PurchaseTokens = (props) => {


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