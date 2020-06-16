import React, {useContext, useState} from 'react'
import {Alert, View } from 'react-native'
import {Text, Card, Button, CardItem, Spinner} from 'native-base'

import {Context} from '../../../Store/appContext'
import CompareCard from '../Components/CompareCard'

import Spinnerx from 'react-native-loading-spinner-overlay'

export default PendingPath = (props) => {
  const { store, actions } = useContext(Context)
  const [ loading, setLoading ] = useState(false)
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
    props.setLoading(true)
    props.setRefreshing(true)
    var answer = await actions.swap.statusChange(
      props.tournament.id, swap.id, buyin.id, "pending", "canceled") 
    props.setRefreshing(false)
    
    props.setLoading(false)

  }

  return(
    <Card transparent>
      <CardItem style={{justifyContent:'center'}}>
        {swap.percentage ?
          <View>
            <Text style={{textAlign:'center'}}>This swap with {buyin.user_name} is currently pending as of {swap.updated}</Text>
            <CompareCard 
              youColor={'orange'} themColor={'orange'}
              percentage={swap.percentage} 
              counter_percentage={swap.counter_percentage}
              buyin={buyin}/>
          </View>
          
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