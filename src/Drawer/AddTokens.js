import React, { useEffect, useState} from 'react';
import {Platform, Alert, StyleSheet, ScrollView, View} from 'react-native';
import NativeButton from 'apsl-react-native-button';

import { Body, Container, Content, Card, CardItem, H1,  H3, Left, Right, Text } from 'native-base';
import BuyButton from './ConfirmPurchase';
import _Header from '../View-Components/header'
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';

PriceOption = (props) => {

  return(
    <CardItem>
      <Left>
        <H3> {props.quantity} </H3>
      </Left>

      <Body>
        <H3> ${props.price} </H3>
      </Body>

      <Right>
        <Button onPress={()=> props.requestPurchase(props.productId)}>
          <Text>Buy</Text>
        </Button>
      </Right>
    </CardItem>
  )
}

export default AddTokens = (props) => {

  const [receipt, setReceipt] = useState(null)
  const [productList, setProductList] = useState('')
  const [availableItemsMessage, setAvailableItemsMessage] = useState('')

const check = ['SP_SwapToken_10',
'SP_SwapToken_25',
'SP_SwapToken_60']

  const itemSkus = Platform.select({
    ios: [
     'SP_SwapToken_10',
     'SP_SwapToken_25',
     'SP_SwapToken_60'
    ],
    android: [
     'com.swapprofitllc.swapprofit'
    ]
   });

   async function getStuff(){
    try {
      const result = await RNIap.initConnection();
      await RNIap.consumeAllItemsAndroid();
      console.log('result', result);
    } catch (err) {
      console.warn('sorry',err.code, err.message);
    }
   }

  useEffect(() => {
    getStuff();
    return () => {
      // cleanup
    };
  }, [])

  var goNext = () => {
    Alert.alert('Receipt', receipt);
  };

  var requestPurchase = async(sku) => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  var getItems = async () => {
    try {
      const products = await RNIap.getProducts(check);
      // const products = await RNIap.getSubscriptions(itemSkus);
      console.log('Products', products);
      setProductList(products);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  var getAvailablePurchases = async () => {
    try {
      console.info(
        'Get available purchases (non-consumable or unconsumed consumable)',
      );
      const purchases = await RNIap.getAvailablePurchases();
      console.info('Available purchases :: ', purchases);
      if (purchases && purchases.length > 0) {
        setAvailableItemsMessage(`Got ${purchases.length} items.`),
        setReceipt(purchases[0].transactionReceipt);
        
      }
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  };

  return(
    <Container>
      <_Header title={'Add Tokens'} drawer={() => props.navigation.toggleDrawer()}/>
      <Content contentContainerStyle={{flex:1, justifyContent:'center'}}>
      <ScrollView style={{ alignSelf: 'stretch' }}>
            <View style={{ height: 50 }} />
            <NativeButton
              onPress={getAvailablePurchases}
              activeOpacity={0.5}
              style={styles.btn}
              textStyle={styles.txt}
            >
              Get available purchases
            </NativeButton>

            <Text style={{ margin: 5, fontSize: 15, alignSelf: 'center' }}>
              {availableItemsMessage}
            </Text>

            <Text style={{ margin: 5, fontSize: 9, alignSelf: 'center' }}>
              {receipt}
            </Text>

             <NativeButton
              onPress={() => getItems()}
              activeOpacity={0.5}
              style={styles.btn}
              textStyle={styles.txt}
            >
              Get Products ({productList.length})
            </NativeButton>
            {/*{productList.map((product, i) => {
              return (
                <View
                  key={i}
                  style={{
                    flexDirection: 'column',
                  }}
                >
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 12,
                      color: 'black',
                      minHeight: 100,
                      alignSelf: 'center',
                      paddingHorizontal: 20,
                    }}
                  >
                    {JSON.stringify(product)}
                  </Text>
                </View>
              );
            })}
           */}
         <Card>

          <CardItem header style={{paddingBottom:20}}>
            <Left/><H1> Purchase Tokens </H1><Right/>
          </CardItem>

          
          <CardItem>
            <Left><H3> 10 </H3></Left>
            <Body><H3> $4.99 </H3></Body>
            <Right>
              <NativeButton >
                <Text>Buy</Text>
              </NativeButton>
            </Right>
          </CardItem>

          <CardItem>
            <Left><H3> 25 </H3></Left>
            <Body><H3> $9.99 </H3></Body>
            <Right>
              <NativeButton >
                <Text>Buy</Text>
              </NativeButton>
            </Right>
          </CardItem>
          
          <CardItem>
            <Left><H3> 50 </H3></Left>
            <Body><H3> $19.99 </H3></Body>
            <Right>
              <NativeButton >
                <Text>Buy</Text>
              </NativeButton>
            </Right>
          </CardItem>

          
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