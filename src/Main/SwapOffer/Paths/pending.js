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
        { text: 'Yes', onPress: () => cancelSwap()},
        { text: 'No', onPress: () => console.log("Cancel Pressed")}
      ]
    )
  }

  var cancelSwap = async() => {
    var answer = await actions.swap.statusChange(
      props.tournament.id, props.swap.id, "canceled"
    )
    props.navigation.goBack()
  }

  return(
    <Card transparent>
      <CardItem style={{justifyContent:'center'}}>
        {props.swap.percentage == props.swap.counter_percentage ?
          <Text style={{fontSize:24, textAlign:'center'}}>
            Your swap with {props.buyin.user_name} to share{' '}  
            {props.swap.percentage}% between the both of you is pending.
          </Text>
          :
          <Text style={{fontSize:24, textAlign:'center'}}>
            Your swap of {props.swap.percentage}% with{' '} 
             {props.buyin.user_name} to make a swap of{' '} 
             {props.swap.counter_percentage}% is pending.
          </Text>
      }
        
      </CardItem>
      <CardItem style={{justifyContent:'center'}}>  
        <Button large onPress={()=> showAlert()}>
          <Text>Cancel</Text>
        </Button>
      </CardItem>
    </Card>
  )
}