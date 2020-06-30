import React, { useContext, useState } from 'react'
import { Alert, View } from 'react-native'
import { Text, Card, Button, CardItem, Spinner } from 'native-base'

import { Context } from '../../../Store/appContext'
import CompareCard from '../Components/CompareCard'

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
      {/* PENDING SWAP INFO */}
      <CardItem style={{justifyContent:'center'}}>
        {swap.percentage ?
          <View style={{width:'100%'}}>
            <Text style={{textAlign:'center'}}>
              PENDING SWAP{'\n'}{props.swapSince}
            </Text>
            <CompareCard 
              youColor={'orange'} themColor={'orange'}
              percentage={swap.percentage} 
              counter_percentage={swap.counter_percentage}
              buyin={buyin}/>
          </View>
          
          : <Spinner />}
      </CardItem>
      {/* CANCEL SWAP BUTTON */}
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