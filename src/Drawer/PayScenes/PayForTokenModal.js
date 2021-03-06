import React, { useContext, useState } from 'react';
import { Context } from '../../Store/appContext'
import stripe, { errorCodes } from 'tipsi-stripe';

import { Text, Icon, Button } from 'native-base';
import { View, Image, TouchableOpacity, Platform } from 'react-native'
import { Grid, Row, Col} from 'react-native-easy-grid'
import  Spinner  from 'react-native-loading-spinner-overlay'

import btnGPay from '../../Images/buygooglepay.png';
import AppleBtn from '../../Images/apple-pay.png';

stripe.setOptions({
  publishableKey: "pk_test_naJmK081a9UfJNnL69Om9P2d00kktSrYwC",
  merchantId: 'merchant.com.swapprofitllc.swapprofitapp',
  androidPayMode: 'test',
});

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'
export default PayForTokenModal = (props) => {

  const { store, actions } = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const [merchant, setMerchant] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [lastOrderNumber, setLastOrderNumber] = useState(0)
  const [userEmail, setUserEmail] = useState(store.myProfile.email)
  const [merchantEmail, setMerchantEmail] = useState('lou@pokersociety.com')
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const [total, setTotal] = useState(1.00)

  const handleOnPressPayBtn = async () => {
    const number = 1 + 1;
    const zeros = 5 - number.toString().length;
    const order = {
      merchant: merchantEmail,
      number: '0'.repeat(zeros) + number,
      user: userEmail,
      createdDate: new Date(),
    };
    // console.log('order', order)


    try {
      // IOS STRIPE PAYMENT PROCESS
      if (Platform.OS === 'ios') {
        const options = { currencyCode: 'USD' };
        const items = [{
          label: props.swapTokens.toString() + ' Swap Tokens',
          amount: props.dollars.toString(),
        }];
        const token = await stripe.paymentRequestWithApplePay(items, options);
        console.log('TOKEN APPLE ?', token);
        
        // APPLE PAYMENT TOKEN SUCCESS
        if (token) {
          setIsLoadingPayment(true)
          setIsLoading(true)
          const accessToken = store.userToken;
          const startURL = 'http://gabriels-imac.local:3000'
          // const url = 'https://swapprofit-beta.herokuapp.com/'
          const url = startURL + '/me/transactions'
          try{
          var e = await actions.swapToken.buy(props.swapTokens)

          console.log('RESPONSE REQUEST', e);
          if (e !== null) {
                setIsLoadingPayment(false)
                setIsLoading(false)
                
                await stripe.completeNativePayRequest();
                actions.profile.get()
                props.setVisible(false)
              } else {
                setIsLoadingPayment(false)
                setIsLoading(false)
                console.log('Error', 'Error processing the request');
                stripe.cancelNativePayRequest();
              }
           
          // APPLE BACKEND FAILURE
          }catch(err){
            console.log('ERROR REQUEST ENDPOINT STRIPE IOS', err);
            setIsLoadingPayment(false)
            setIsLoading(false)
            console.log('Error', 'Error processing the request');
            stripe.cancelNativePayRequest();
          };
        } 
        // APPLE TOKEN FAILED
        else {
          setIsLoadingPayment(false)
          setIsLoading(false)
          console.log('Error', 'Payment server error');
          stripe.cancelNativePayRequest();
        }
      } 
      // ANDROID STRIPE PAYMENT PROCESS
      else {
        const options = {
          total_price: props.dollars.toString(),
          currency_code: 'USD',
          shipping_address_required: false,
          billing_address_required: false,
          shipping_countries: ['US'],
          line_items: [{
              currency_code: 'USD',
              description: props.swapTokens.toString() + ' Swap Tokens',
              total_price: props.dollars.toString(),
              unit_price: props.dollars.toString(),
              quantity: '1',
            }]
        };
        const token = await stripe.paymentRequestWithNativePay(options);
        console.log('TOKEN G PAY ?', token);
        
        // ANDROID PAYMENT TOKEN SUCCESS
        if (token) {
          setIsLoading(true)
          setIsLoadingPayment(true)
          console.log('INSIDE TOKEN')
          const accessToken = store.userToken;
          var startURL = 'http://gabriels-imac.local:3000'
          // const url = 'https://swapprofit-beta.herokuapp.com/me/transactions'
          var url = startURL +'/me/transactions'
          let data = {
            coins: props.swapTokens
          }
          try{

            var e = await actions.swapToken.buy(props.swapTokens)

            console.log('RESPONSE REQUESTS ANDROID ', e);
              if (e !== null) {
                setIsLoadingPayment(false)
                setIsLoading(false)
                await stripe.completeNativePayRequest();
                actions.profile.get()
                props.setVisible(false)
              } else {
                console.log('Error', 'Error processing the request');
                setIsLoadingPayment(false),
                setIsLoading(false)
                stripe.cancelNativePayRequest();
              }
 
          // ANDROID PAYMENT ENDPOINT FAILURE
        }catch( err) {
            console.log('ERROR ENDPOINT STRIPE ANDROID', err);
            setIsLoadingPayment(false)
            setIsLoading(false)
            console.log('Error', 'Error processing the request');
            stripe.cancelNativePayRequest();
            // console.log('errror endpoint stripe', err);
          };
        } else {
          console.log('Error', 'Error processing the request');
          setIsLoadingPayment(false)
          setIsLoading(false)
          stripe.cancelNativePayRequest();
        }
      }
    }
    // OVERALL PROCESS FAILURE
    catch(error){
      console.log(error)
      setIsLoadingPayment(false)
      setIsLoading(false)
      const errorCode = errorCodes[error.code];
      const title = Platform.OS === 'ios' ? 'Apple Pay' : 'Google Pay';
      const errorDescription = errorCode ? errorCode.description : 'Error';
      console.log('ERROR LAST CATCH ', error.message);
      console.log(title, errorDescription);
      stripe.cancelNativePayRequest();
    };
  }

  return(
    // FULL BACKGROUND
    <View style={styles.fullBackground}>
      {/* WHITE BOX BACKGROUND */}
      <View style={[styles.whiteBackground, {backgroundColor:currentStyle.background.color}]}> 
      <Spinner visible={isLoading}/>
      <Text style={{textAlign:'center', marginTop:10, fontSize:24,color:currentStyle.text.color}}>Buy Tokens</Text>
      <Grid>
        <Col>
          <Row style={{justifyContent:'flex-end', alignItems:'center'}}>
            <Text style={{textAlign:'right', fontSize:20,color:currentStyle.text.color}}>
              Current Coins:
            </Text>
          </Row>
          <Row style={{justifyContent:'flex-end', alignItems:'center'}}>
            <Text style={{textAlign:'right', fontSize:20, color:currentStyle.text.color}}>
              Added Coins:
            </Text>
          </Row>
          <Row style={{justifyContent:'flex-end', alignItems:'center'}}>
            <Text style={{textAlign:'right', fontSize:20, color:currentStyle.text.color}}>
              New Coins: 
            </Text>
          </Row>
        </Col>
        <Col>
          <Row style={{alignItems:'center'}}>
            <Icon type="FontAwesome5" name='coins' style={{color:'#FFD700'}}/>
            <Text style={{fontSize:20, color:currentStyle.text.color}}>{store.myProfile.coins}</Text>      
          </Row>
          <Row style={{alignItems:'center'}}>
            <Icon type="FontAwesome5" name='circle' style={{color:'#FFD700'}}/>
            <Text style={{fontSize:20, color:currentStyle.text.color}}>{props.swapTokens}</Text>      
          </Row>
          <Row style={{alignItems:'center'}}>
            <Icon type="FontAwesome5" name='coins' style={{color:'#FFD700'}}/>
            <Text style={{fontSize:20, color:currentStyle.text.color}}>{store.myProfile.coins + props.swapTokens}</Text>      
          </Row>
        </Col>
      </Grid>
      <Grid>
        <Row style={{justifyContent:'center'}}>
          <Text style={{fontSize:30, textAlign:'center', color:currentStyle.text.color}}>
            ${props.dollars}
          </Text>
        </Row>
        <Row style={{justifyContent:'center'}}>
          <TouchableOpacity style={{borderWidth:1, backgroundColor:currentStyle.text.color, borderRadius:50, justifyContent:'center'}} // disabled={disabled} 
            onPress={() => handleOnPressPayBtn()}>
              {Platform.OS === 'ios' ? 
                <View style={{width:250, justifyContent:'center'}}>
                  {/* <Text>Buy with </Text> */}
                  {/* <AppleBtn width={45} height={45} /> */}
                  <Image source={AppleBtn} style={{width:240, height:40, alignSelf:'center'}}  />
                </View>
                : 
                <View style={{width:250, justifyContent:'center'}}>
                  <Image source={btnGPay} style={{height:40, width:240, alignSelf:'center'}}/>
                </View>}
          </TouchableOpacity>
        </Row>
        <Row style={{justifyContent:'center'}}>
          <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>props.setVisible(false)}>
            <Text style={{textAlign:'center', fontSize:20, color:currentStyle.text.color}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Row>
      </Grid>
      </View>
    </View>
  )
}

const styles = {
  fullBackground:{
    backgroundColor:'rgba(0,0,0,0.6)', height:'100%', 
    alignContent:'stretch'},
  whiteBackground:{
    alignSelf:'center',  flexDirection:'column',
    width:'80%', height:'80%', margin: 'auto', position: 'relative',
    top: '13%', left: 0, bottom: 0, right: 0}
}