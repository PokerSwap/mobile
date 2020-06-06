import React, {useContext, useState} from 'react'
import {Alert} from 'react-native'
import {Text, Card, Button, CardItem, Spinner} from 'native-base'

import {Context} from '../../../Store/appContext'

import Spinnerx from 'react-native-loading-spinner-overlay'

export default PendingPath = (props) => {
  const { store, actions } = useContext(Context)
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    props.setRefreshing(true)
    var answer = await actions.swap.statusChange(
      props.tournament.id, swap.id, "canceled") 
      props.setRefreshing(false)

    setLoading(false)

  }

  return(
    <Card transparent>
      <Spinnerx visible={loading}/>
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
          <Button full large style={{width:'100%', backgroundColor:'#a3a3a3'}}onPress={()=> showAlert()}>
            <Text>Cancel</Text>
          </Button>
        </CardItem>
        : null}  
    </Card>
  )
}