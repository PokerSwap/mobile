import React, {useState, useEffect, useContext } from 'react';
import {
  Text, Image,
  View, Dimensions, TouchableOpacity,
  Platform, StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Container, Content } from 'native-base';
// import firebase from '@react-native-firebase/app';
import stripe, { errorCodes } from 'tipsi-stripe';
// import { URLPAYMENT } from '../../shared/apis';
// import { fetchNewOrder, fetchNewPayment, fetchOrders } from '../../actions/orders';
// import { parsePrice, alertMessage, normalizePrice } from '../../shared/utils';
// import { tax, KEYPROD, UNITPRICE } from '../../config';

import moment from 'moment'

import { Context } from '../../Store/appContext'

import btnGPay from '../../Images/buygooglepay.png';
import AppleBtn from '../../Images/apple-pay.svg';

import { useNavigation, useRoute } from '@react-navigation/native'

stripe.setOptions({
  publishableKey: "pk_test_naJmK081a9UfJNnL69Om9P2d00kktSrYwC",
  merchantId: 'merchant.com.swapprofitllc.swapprofitapp',
  androidPayMode: 'test',
});

export default CardFormScreen = () => {
  
  const { store, actions } = useContext(Context)

  const navigation = useNavigation()
  const route = useRoute()

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
      createdDate: moment(),
    };
    console.log('order', order)

    console.log('button pressed')
    try {
      if (Platform.OS === 'ios') {
        const options = {
          currencyCode: 'USD',
        };
        const items = [{
            label: '5 Swap Tokens',
            amount: (1.00).toString(),
          }];

        const token = await stripe.paymentRequestWithApplePay(items, options);
        console.log('TOKEN APPLE ?', token);
        if (token) {
          setIsLoadingPayment(true)
          setIsLoading(true)
						const accessToken = store.userToken;
						const url = 'https://swapprofit-beta.herokuapp.com/me/transactions'

						let data = {
							coins: 5
						}

						let response = await fetch(url, {
							method:'POST',
							body: JSON.stringify(data),
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
            .then(async (res) => {
              console.log('RESPONSE REQUEST', res);
              if (res.ok == true) {
  // //               // console.log('Succcess enpoint stripe ', res.data.charge);
  // //               // const dataSave = {
  // //               //   idPayment: res.data.charge.id,
  // //               //   userBuyer: userInfo.email,
  // //               //   totalAmount: (res.data.charge.amount / 100).toFixed(2),
  // //               //   balance_transaction: res.data.charge.balance_transaction,
  // //               //   name: token.card.name,
  // //               //   last4digi: token.card.last4,
  // //               //   brand: token.card.brand,
  // //               // };
  // //               // await fetchNewPayment(dataSave).then(() => {
  // //               //   order.promos.forEach((promo) => this.props.promoCart.removeFromCart(promo.id));
  // //               // });
  // //               // await fetchNewOrder(order, res.data.charge.id).then(() => {
  // //               //   this.setState({ isLoadingPayment: false, isLoading: false });
  // //               //   this.props.navigation.push('SuccessfulOrderScreen');
  // //               // });
                setIsLoadingPayment(false)
                setIsLoading(false)
                await stripe.completeNativePayRequest();
                // paid = true;
              } else {
                    setIsLoadingPayment(false)
                    setIsLoading(false)
                    console.log('Error', 'Error processing the request');
                    stripe.cancelNativePayRequest();
              }
            })
            .catch((err) => {
              console.log('ERROR REQUEST ENDPOINT STRIPE IOS', err);
              setIsLoadingPayment(false)
              setIsLoading(false)
              console.log('Error', 'Error processing the request');
              stripe.cancelNativePayRequest();
            });
        } else {
          setIsLoadingPayment(false)
          setIsLoading(false)
          console.log('Error', 'Payment server error');
          stripe.cancelNativePayRequest();
        }
  //       //finish
      } else {
        var ax = 1.00;
        var bx = 1;
        const options = {
          total_price: ax.toString(),
          currency_code: 'USD',
          shipping_address_required: false,
          billing_address_required: false,
          shipping_countries: ['US'],
          line_items: [{
              currency_code: 'USD',
              description: "5 Swap Tokens",
              total_price: ax.toString(),
              unit_price: ax.toString(),
              quantity: bx.toString(),
            }]
        };

        const token = await stripe.paymentRequestWithNativePay(options);
        console.log('TOKEN G PAY ?', token);
        if (token) {
          setIsLoading(true)
          setIsLoadingPayment(true)
          console.log('starting')

          const accessToken = store.userToken;
						const url = 'https://swapprofit-beta.herokuapp.com/me/transactions'

						let data = {
							coins: 5
						}

						await fetch(url, {
							method:'POST',
							body: JSON.stringify(data),
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

  //         // await axios
  //         //   .post(
  //         //     URLPAYMENT,
  //         //     {
  //         //       token: token.tokenId,
  //         //       emailCustomer: userInfo.email,
  //         //       totalAmount: this.getTotals().total.toFixed(2),
  //         //     },
  //         //     {
  //         //       headers: {
  //         //         Authorization: accessTokenAuthorization,
  //         //       },
  //         //     },
  //         //   )
            .then(async (res) => {
              console.log('RESPONSE REQUESTS ANDROID ', res);
              if (res.ok) {
  //             //   // console.log('Succcess enpoint stripe ', res.data.charge);
  //             //   const dataSave = {
  //             //     idPayment: res.data.charge.id,
  //             //     userBuyer: userInfo.email,
  //             //     totalAmount: (res.data.charge.amount / 100).toFixed(2),
  //             //     balance_transaction: res.data.charge.balance_transaction,
  //             //     name: token.card.name,
  //             //     last4digi: token.card.last4,
  //             //     brand: token.card.brand,
  //             //   };
  //             //   await fetchNewPayment(dataSave).then(() => {
  //             //     order.promos.forEach((promo) => this.props.promoCart.removeFromCart(promo.id));
  //             //   });
  //             //   await fetchNewOrder(order, res.data.charge.id).then(() => {
  //             //     this.setState({ isLoadingPayment: false, isLoading: false });
  //             //     this.props.navigation.push('SuccessfulOrderScreen');
  //             //   });
                setIsLoadingPayment(false)
                setIsLoading(false)
                await stripe.completeNativePayRequest();
                // paid = true;
              } else {
                console.log('Error', 'Error processing the request');
                setIsLoadingPayment(false),
                setIsLoading(false)
                stripe.cancelNativePayRequest();
              }
            })
            .catch((err) => {
              console.log('ERROR ENDPOINT STRIPE ANDROID', err);
              setIsLoadingPayment(false)
              setIsLoading(false)
              console.log('Error', 'Error processing the request');
              stripe.cancelNativePayRequest();
              // console.log('errror endpoint stripe', err);
            });
        } else {
          console.log('Error', 'Error processing the request');
          setIsLoadingPayment(false)
          setIsLoading(false)
          stripe.cancelNativePayRequest();
        }
      }
      }catch(error){
        console.log(error)
    // } catch (error) {
      setIsLoadingPayment(false)
      setIsLoading(false)
      const errorCode = errorCodes[error.code];
      const title = Platform.OS === 'ios' ? 'Apple Pay' : 'Google Pay';
      const errorDescription = errorCode ? errorCode.description : 'Error';
      console.log('ERROR LAST CATCH ', error.message);
      console.log(title, errorDescription);
      stripe.cancelNativePayRequest();
    // }
   };
  }
  
  



  return (
    <Container>
      {/* {isLoading ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#302a4e" />
          {isLoadingPayment && (
            <Text
              style={{ color: '#302a4e', fontSize: 17, marginBottom: 20, }}>
              Processing payment..
            </Text>
          )}
        </View> : null } */}
      <Content>
        
                
        <View style={styles.containerTextMount}>
          <Text style={styles.summaryAmountCheckout}>${total.toFixed(2)}</Text>
        </View>

        <View 
        style={styles.btn}
        >
          <TouchableOpacity // disabled={disabled} 
          onPress={() => handleOnPressPayBtn()} styles={styles.btnPay}>
            {Platform.OS === 'ios' ? 
              <View >
                <Text  style={styles.textBuyApple}
                >Buy with </Text>
                <Image source={AppleBtn} style={{width:45, height:45}}  />
              </View>
             : 
              <Image source={btnGPay} style={styles.imgBtnGpay} />}
          </TouchableOpacity>
        </View>

      </Content>
    </Container>
  );
}

const styles = {
  btn: {
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: Dimensions.get('window').width <= 350 ? 26 : 29,
    fontWeight: '500',
    marginRight: 5,
  },
  icon: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
  },
  btnPay: {
    flexDirection: 'row',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0,0,0)',
    width: Platform.OS === 'android' ? '100%' : '40%',
  },
  textBuyApple: {
    fontWeight: '600',
    fontSize: Dimensions.get('window').width <= 375 ? 17 : 18,
  },
  quantity: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 25,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 1,
    paddingBottom: 1,
  },
  iconApple: {
    marginRight: 6,
    marginBottom: 4,
  },
  imgBtnGpay: {
    width: 195,
    height: Dimensions.get('window').width <= 350 ? 45 : 50,
  },
};
