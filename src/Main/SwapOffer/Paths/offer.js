import React, {useContext} from 'react'
import {View, Alert } from 'react-native'
import { Text, Card, Button, CardItem } from 'native-base'

import {Context} from '../../../Store/appContext'

export default OfferPath = (props) => {

  const {store, actions } = useContext(Context)

  const showAlert = (action, status) =>{

    Alert.alert(
      "Confirmation",
      'Are you want to ' + action + ' this swap?',
      [
        { text: 'Yes', onPress: () => swapChange(status) },
        { text: 'No', onPress: () => console.log("Cancel Pressed") }
      ]
    )
  }

  const swapChange = async(status) => {
    console.log('all', props.tournament_id, props.swap_id, status)
    var answer = await actions.swap.statusChange(
      props.tournament_id, props.swap_id, status)
    var answer2 = await actions.coin.spend()
    var answer3 = await actions.tracker.getAll()
    props.navigation.goBack()
  }

  return(
    <Card transparent style={{
      alignSelf:'center', width:'90%', justifyContent:'center'}}>

      {store.myProfile.coins > 0 ?
        <View style={{ alignSelf:'center'}}>
          
          <CardItem>
            <Button success large
              onPress={()=> showAlert('accept','agreed')}>
              <Text> Accept Offer </Text>
            </Button>
          </CardItem>
        
          <CardItem>
            <Button large warning 
              onPress={()=> props.setCounter(!props.counter)}>
              <Text> Counter Offer </Text>
            </Button>
          </CardItem>

          <CardItem style={{ alignSelf:'center'}}>
            <Button large danger 
              onPress={()=> showAlert('reject','rejected')}>
              <Text> Reject Swap </Text>
            </Button>
          </CardItem>

        </View>
        :
        <View style={{width:'100%'}}>
          <CardItem>
            <Text style={{textAlign:'center', fontSize:20}}> 
              In order to accept or counter this swap, 
              you need to purchase tokens.
            </Text>
          </CardItem>
        
          <CardItem style={{justifyContent:'center'}}>
            <Button large success 
              onPress={() => props.navigation.navigate('PurchaseTokens')}>
              <Text>Purchase Tokens</Text>
            </Button>
          </CardItem>
        </View>
      }
    </Card>
  )
}