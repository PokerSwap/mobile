import React, {useContext, useState} from 'react'
import { Alert } from 'react-native'
import { Text, Card, Button, CardItem } from 'native-base'

import { Context } from '../../../Store/appContext'
import StandardOffer from './standardOffer'
import SpecialOffer from './specialOffer'

export default CounterPath = (props) => {
  const { store, actions } = useContext(Context)
  const [ percentage, setPercentage ] = useState( props.percentage )
  const [ cPercentage, setCPercentage ] = useState( props.counter_percentage )
  const [ offerPath, setOfferPath ] = useState(true)
  const [ visible, setVisible ] = useState(false)

  // OFFER TYPE SWITCH
  var counterSwitch = () => {
    setOfferPath(!offerPath)
    setVisible(!visible)
    setCPercentage(percentage)
  }
  // CONFIRMATION ALERT
  const confirmationAlert = () => {
    Alert.alert(
      "Confirmation",
      'Are you want to counter this swap?',
      [
        { text: 'Yes', onPress: () => swapCounter()},
        { text: 'No', onPress: () => console.log("Cancel Pressed")}
      ]
    )
  }
  // MAKE A COUNTER SWAP
  const swapCounter = async() => {
    props.setLoading(true)
    if(percentage == cPercentage){
      var answer = await actions.swap.statusChange(
        props.tournament_id, props.swap_id, props.buyin_id, 'pending', percentage )
    }else{
      var answer2 = await actions.swap.statusChange(
        props.tournament_id, props.swap_id, props.buyin_id, 'pending', percentage, cPercentage )
    }
    props.setRefreshing(true)
    props.setLoading(false)
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
    cPercentage < 50 ? 
      setCounterPercentage(cPercentage+ 1) 
      : setCPercentage(50)
  }
  // THEIR COUNTER PERCENTAGE - SUBTRACT
  const cSubtract = () => {
    cPercentage > 1 ? 
      setCPercentage(cPercentage-1) 
      : setCPercentage(1)
  }
  // BOTH PERCENTAGE - ADD
  const tAdd = () => {
    if(percentage < 50){
      setPercentage(percentage + 1) 
      setCPercentage(percentage) 
    } else {
      setPercentage(50), setCPercentage(50)
    }     
  }
  // BOTH PERCENTAGE - SUBTRACT
  const tSubtract = () => {
    if(percentage > 1){
      setPercentage(percentage - 1) 
      setCPercentage(percentage) 
    } else {
      setPercentage(1), setCPercentage(1)
    }     
  }

  return(
    <Card transparent style={{
      alignSelf:'center', width:'90%', justifyContent:'center'}}>
      {offerPath ?
        <StandardOffer confirmationAlert={confirmationAlert}
        counterSwitch={counterSwitch}
        percentage={percentage}
        tAdd={tAdd} tSubtract={tSubtract} />
        :
        <SpecialOffer confirmationAlert={confirmationAlert}
          counterSwitch={counterSwitch}
          percentage={percentage} counterPercentage={cPercentage}
          pAdd={pAdd} pSubtract={pSubtract}
          cAdd={cAdd} cSubtract={cSubtract} />}
        {/* GO BACK TO OFFER */}
        <CardItem>
          <Button large info 
            onPress={()=> props.setCounter(!props.counter)}>
            <Text>Go Back</Text>
          </Button>
        </CardItem>
    </Card>
  )
}