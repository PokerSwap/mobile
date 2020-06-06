import React, {useContext, useState} from 'react'
import { Alert } from 'react-native'
import {Text, Card, Button, CardItem} from 'native-base'

import {Context} from '../../../Store/appContext'
import StandardOffer from './standardOffer'
import SpecialOffer from './specialOffer'


export default CounterPath = (props) => {
  const { store, actions } = useContext(Context)
  const [ percentage, setPercentage ] = useState( props.percentage )
  const [ cPercentage, setCPercentage ] = useState( props.counter_percentage )

  const [ offerPath, setOfferPath] = useState(true)
  
  const [visible, setVisible] = useState(false)


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

  const swapCounter = async() => {
    if(offerPath){
      var answer = await actions.swap.statusChange(
        props.tournament_id, props.swap_id, 'pending', percentage )
    }else{
      var answer2 = await actions.swap.statusChange(
        props.tournament_id, props.swap_id, 'pending', percentage, cPercentage )
    }
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
    cPercentage < 50 ? 
      setCounterPercentage(cPercentage+ 1) 
      : setCPercentage(50)
  }

  const cSubtract = () => {
    cPercentage > 1 ? 
      setCPercentage(cPercentage-1) 
      : setCPercentage(1)
  }

  const tAdd = () => {
    if(percentage < 50){
      setPercentage(percentage + 1) 
      setCPercentage(percentage) 
    } else {
      setPercentage(50), setCPercentage(50)
    }     
  }

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
          percentage={percentage}
          counterPercentage={cPercentage}
          pAdd={pAdd} pSubtract={pSubtract}
          cAdd={cAdd} cSubtract={cSubtract} />}
        


        <CardItem>
          <Button large info 
            onPress={()=> props.setCounter(!props.counter)}>
            <Text>Go Back</Text>
          </Button>

        </CardItem>

    </Card>
  )
}