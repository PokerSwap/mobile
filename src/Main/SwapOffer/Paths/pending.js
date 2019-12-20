import React, {useContext} from 'react'
import {TextInput} from 'react-native'
import {Text, Card, Button, CardItem} from 'native-base'

import {Context} from '../../../Store/appContext'

export default PendingPath = (props) => {

  const { store, actions } = useContext(Context)


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
    var answer2 = await actions.tracker.getAll()
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
        <Button onPress={()=> cancelSwap()}>
          <Text>Cancel</Text>
        </Button>
      </CardItem>
    </Card>
  )
}