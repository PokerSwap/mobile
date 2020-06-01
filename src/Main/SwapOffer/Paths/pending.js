import React, {useContext} from 'react'
import {Alert} from 'react-native'
import {Text, Card, Button, CardItem, Spinner} from 'native-base'

import {Context} from '../../../Store/appContext'

export default PendingPath = (props) => {
  const { store, actions } = useContext(Context)

  const {swap} = props, {buyin} = props;

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
      props.tournament.id, swap.id, "canceled"
    ) 
    props.navigation.goBack()
  }

  return(
    <Card transparent>
      <CardItem style={{justifyContent:'center'}}>
        {swap ?
          swap.percentage == swap.counter_percentage ?
            <Text style={{fontSize:24, textAlign:'center'}}>
              Your swap with {buyin.user_name} to share{' '}  
              {swap.percentage}% between the both of you is pending.
            </Text>
            :
            <Text style={{fontSize:24, textAlign:'center'}}>
              Your swap of {props.swap.percentage}% with{' '} 
              {buyin.user_name} to make a swap of{' '} 
              {swap.counter_percentage}% is pending.
            </Text>
          : <Spinner />}
      </CardItem>
      {swap ?
        <CardItem style={{justifyContent:'center'}}>  
          <Button large onPress={()=> showAlert()}>
            <Text>Cancel</Text>
          </Button>
        </CardItem>
        : null}  
    </Card>
  )
}