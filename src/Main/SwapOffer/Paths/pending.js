import React, {useContext} from 'react'
import {Alert} from 'react-native'
import {Text, Card, Button, CardItem} from 'native-base'

import {Context} from '../../../Store/appContext'

export default PendingPath = (props) => {

  const { store, actions } = useContext(Context)

  const showAlert = () =>{
    Alert.alert(
      "Confirmation",
      'Are you want to cancel this swap?',
      [
        {
          text: 'Yes',
          onPress: () => cancelSwap()
        },
        {
          text: 'No',
          onPress: () => console.log("Cancel Pressed"),
        }
      ]
    )
  }

  var cancelSwap = async() => {
    var answer = await actions.swap.statusChange(
      props.tournament_id, 
      props.user_id,
      false,
      //status 
      "canceled",
      props.percentage,
      props.counter_percentage
    )
    var answer2 = await actions.coin.buy(0,1)
    var answer3 = await actions.tracker.getAll()
    var answer4 = await actions.profile.get()
    props.navigation.goBack()
  }

  return(
    <Card>
      <CardItem style={{justifyContent:'center'}}>
        <Text>Swap with {props.user_name} is pending</Text>
      </CardItem>
      <CardItem style={{justifyContent:'center'}}>
        <Text>{props.percentage}%</Text>
      </CardItem>
      <CardItem style={{justifyContent:'center'}}>  
        <Button onPress={()=> showAlert()}>
          <Text>Cancel</Text>
        </Button>
      </CardItem>
    </Card>
  )
}