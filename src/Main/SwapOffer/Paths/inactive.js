import React, { useContext, useState } from 'react'
import { View, Alert } from 'react-native'
import { Text, Button, Card, CardItem } from 'native-base'

import { Context } from '../../../Store/appContext'
import SpecialOffer from '../Components/specialOffer'
import StandardOffer from '../Components/standardOffer'

export default InactivePath = (props) => {
  const { store, actions } = useContext(Context)
  const [ percentage, setPercentage ] = useState(1)
  const [ counterPercentage, setCounterPercentage ] = useState(1)
  const [ visible, setVisible ] = useState(false)

  // OFFER TYPE SWITCH
  var counterSwitch = () => {
    setVisible(!visible)
    setCounterPercentage(percentage)
  }
  // MY PERCENTAGE - ADD
  const pAdd = () => {
    percentage < 50 ? 
      setPercentage(percentage+ 1) : setPercentage(50)
  }
  // MY PERCENTAGE - SUBTRACT
  const pSubtract = () => {
    percentage > 1 ? 
      setPercentage(percentage-1) : setPercentage(1)
  }
  // THEIR COUNTER PERCENTAGE - ADD
  const cAdd = () => {
    counterPercentage < 50 ? 
      setCounterPercentage(counterPercentage+ 1) 
      : setCounterPercentage(50)
  }
  // THEIR COUNTER PERCENTAGE - SUBTRACT
  const cSubtract = () => {
    counterPercentage > 1 ? 
      setCounterPercentage(counterPercentage-1) 
      : setCounterPercentage(1)
  }
  // BOTH PERCENTAGE - ADD
  const tAdd = () => {
    if(percentage < 50){
      setPercentage(percentage + 1) 
      setCounterPercentage(percentage) 
    } else {
      setPercentage(50), setCounterPercentage(50)
    }     
  }
  // BOTH PERCENTAGE - SUBTRACT
  const tSubtract = () => {
    if(percentage > 1){
      setPercentage(percentage - 1) 
      setCounterPercentage(percentage) 
    } else {
      setPercentage(1), setCounterPercentage(1)
    }     
  }
  // SWAP CONFIRMATION ALERT
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
  // CREATE A SWAP
  const swapStart = async() => {
    props.setLoading(true)
    if(percentage == counterPercentage){
      var answer1 = await actions.swap.add(
        props.tournament.id, props.buyin.user_id, props.buyin.id, percentage);
    }else{
      var answer1 = await actions.swap.add(
        props.tournament.id, props.buyin.user_id, props.buyin.id, percentage, counterPercentage);
    }
    props.setRefreshing(true)
    props.setLoading(false)
  }

  return(
    <Card transparent>
      
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