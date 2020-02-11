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

  console.log('swap id', props.swap_id)
  var cancelSwap = async() => {
    var answer = await actions.swap.statusChange(
      props.swap_id, "canceled"
    )
    var answer2 = await actions.swap.buy(0,1)
    var answer3 = await actions.tracker.getAll()
    var answer4 = await actions.profile.get()
    props.navigation.goBack()
  }

  return(
    <Card transparent>
      <CardItem style={{justifyContent:'center'}}>
        <Text style={{fontSize:18, textAlign:'center'}}>Your swap of {props.percentage}% with {props.user_name} to make a swap of {props.counter_percentage}% is pending.</Text>
      </CardItem>
      <CardItem style={{justifyContent:'center'}}>  
        <Button onPress={()=> showAlert()}>
          <Text>Cancel</Text>
        </Button>
      </CardItem>
    </Card>
  )
}