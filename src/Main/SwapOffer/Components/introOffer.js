import React, { useContext, useState } from 'react'
import { View, Alert } from 'react-native'
import { Button, Card, CardItem, Icon, Text } from 'native-base'

import { Context } from '../../../Store/appContext'

export default IntroOffer = (props) => {
  const {store, actions } = useContext(Context)

  const confirmationAlert = (action, status) => {
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
    props.setLoading(true)
    var answer = await actions.swap.statusChange(
      props.tournament_id, props.swap_id, props.buyin_id, status)
    props.setRefreshing(true)
    props.setLoading(false)
  }

  return(
    <Card transparent style={{
      alignSelf:'center', width:'90%', justifyContent:'center'}}>
      {store.myProfile.coins > 0 ?
        // WHEN YOU HAVE ENOUGH COINS
        <View style={{ alignSelf:'center', flexDirection:'column'}}>
          {/* COUNTER AND REJECT BUTTONS */}
          <CardItem style={{justifyContent:'space-between'}}>
            {/* COUNTER BUTTON */}
            <Button large warning style={{justifyContent:'center'}}
              onPress={()=> props.setCounter(!props.counter)}>
              <Text style={{fontWeight:'600'}}> Counter </Text>
              <Icon style={{marginLeft:-10}} type='Ionicons' name='ios-swap'/>
            </Button>
            {/* REJECT BUTTON */}
            <Button large danger 
              onPress={()=> confirmationAlert('reject','rejected')}>
              <Text style={{fontWeight:'600'}}> Reject </Text>
              <Icon style={{marginLeft:-10}} type='Entypo' name='circle-with-cross'/>
            </Button>
          </CardItem>
          {/* ACCEPT BUTTON */}
          <CardItem>
            <Button success full large style={{width:'100%'}}
              onPress={()=> confirmationAlert('accept','agreed')}>
              <Text style={{fontWeight:'600', fontSize:24}}> Accept </Text>
              <Icon style={{marginLeft:-10, fontSize:36}} type='Ionicons' name='md-checkmark'/>
            </Button>
          </CardItem>
        </View>
        :
        // WHEN YOU HAVE ZERO COINS
        <CardItem>
          {/* NO COINS WARNING */}
          <Text style={{textAlign:'center', fontSize:20}}> 
            In order to accept or counter this swap, 
            you need to purchase tokens.
          </Text>
          {/* PURCHASE TOKENS BUTTON */}
          <Button large success 
            onPress={() => props.navigation.navigate('PurchaseTokens')}>
            <Text>Purchase Tokens</Text>
          </Button>
        </CardItem>
      }
    </Card>
  )
}