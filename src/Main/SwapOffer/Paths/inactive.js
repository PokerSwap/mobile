import React, { useContext, useState } from 'react'
import { View, Alert } from 'react-native'
import { Text, Button, Card, CardItem } from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay'

import { Context } from '../../../Store/appContext'
import SpecialOffer from './specialOffer'
import StandardOffer from './standardOffer'

export default InactivePath = (props) => {

  const {store, actions} = useContext(Context)
  
  const [percentage, setPercentage] = useState(1)
  const [counterPercentage, setCounterPercentage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [visible, setVisible] = useState(false)

  var counterSwitch = () => {
    setVisible(!visible)
    setCounterPercentage(percentage)
  }


  const pAdd = () => {
    percentage < 50 ? 
      setPercentage(percentage+ 1) : setPercentage(50)
  }

  const pSubtract = () => {
    percentage > 1 ? 
      setPercentage(percentage-1) : setPercentage(1)
  }

  const cAdd = () => {
    counterPercentage < 50 ? 
      setCounterPercentage(counterPercentage+ 1) 
      : setCounterPercentage(50)
  }

  const cSubtract = () => {
    counterPercentage > 1 ? 
      setCounterPercentage(counterPercentage-1) 
      : setCounterPercentage(1)
  }

  const tAdd = () => {
    if(percentage < 50){
      setPercentage(percentage + 1) 
      setCounterPercentage(percentage) 
    } else {
      setPercentage(50), setCounterPercentage(50)
    }     
  }

  const tSubtract = () => {
    if(percentage > 1){
      setPercentage(percentage - 1) 
      setCounterPercentage(percentage) 
    } else {
      setPercentage(1), setCounterPercentage(1)
    }     
  }


  const confirmationAlert = (action) =>{
    Alert.alert(
      "Confirmation",
      'Are you want to ' + action + ' this swap?',
      [
        { text: 'Yes', onPress: () => swapStart()},
        { text: 'No', onPress: () => console.log("Cancel Pressed")}
      ]
    )
  }

  const swapStart = async() => {
    setLoading(true)
    var answer1 = await actions.swap.add(
      props.tournament.id, props.buyin.user_id, percentage, props.navigation);
    setLoading(false)
 }

  return(
    <Card transparent>
      <Spinner visible={loading}/>
      {store.myProfile.coins > 0 ? 
        !visible ?
          <StandardOffer confirmationAlert={confirmationAlert}
            counterSwitch={counterSwitch}
            percentage={percentage}
            tAdd={tAdd} tSubtract={tSubtract} />
          :
          <SpecialOffer confirmationAlert={confirmationAlert}
            otherUser={props.buyin.user_name} 
            counterSwitch={counterSwitch}
            percentage={percentage}
            counterPercentage={counterPercentage}
            pAdd={pAdd} pSubtract={pSubtract}
            cAdd={cAdd} cSubtract={cSubtract} />

        : 
        <View>
          <CardItem>
            <Text> 
              You need to purchase tokens in order 
              to swap with this person.
            </Text>
          </CardItem>

          <CardItem>
            <Button large success 
              onPress={()=> props.navigation.navigate('PurchaseTokens')}>
              <Text>Purchase Tokens</Text>
            </Button>
          </CardItem>
        </View>}
    </Card>
  )
}