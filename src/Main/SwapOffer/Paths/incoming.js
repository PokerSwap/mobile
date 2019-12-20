import React, {useContext} from 'react'

import {TextInput} from 'react-native'
import {Text, Card, Button, CardItem} from 'native-base'
import {Row} from 'react-native-easy-grid'

import {Context} from '../../../Store/appContext'

export default IncomingPath = (props) => {

  const {store, actions } = useContext(Context)

  var swapChange = async(x) => {
    var answer = await actions.swap.statusChange(
      props.tournament_id, 
      props.user_id,
      false,
      //status 
      x,
      props.percentage,
      props.counter_percentage
    )
    var answer2 = await actions.coin.spend()
    var answer3 = await actions.tracker.getAll()
    props.navigation.goBack()
  }

  return(
    <Card>

      {props.percentage == props.counter_percentage ?
        <CardItem>
          <Text>{props.user_name} wants to swap {props.percentage}% between the both of you</Text>
        </CardItem>
        : 
        <CardItem>
          <Text>{props.user_name}% wants to swap {props.counter_percentage}% while you swap {props.percentage}%</Text>
        </CardItem>
      }

      {store.my_profile.coins > 0 ?
        <View>
          <CardItem>
            <Button success
              onPress={()=> swapChange("agreed")}>
              <Text> Accept Offer </Text>
            </Button>
          </CardItem>
        
          <CardItem>
            <Button warning>
              <Text> Counter Offer </Text>
            </Button>
          </CardItem>
        </View>
        :
        <View>
          <CardItem>
            <Text> In order to accept or counter this swap, you need to purchase tokens.</Text>
          </CardItem>
        
          <CardItem>
            <Button large success onPress={() => props.navigation.navigate('PurchaseTokens')}>
              <Text>Purchase Tokens</Text>
            </Button>
          </CardItem>
        </View>
      }

      <CardItem>
        <Button danger onPress={()=> swapChange("rejected")}>
          <Text> Reject Swap </Text>
        </Button>
      </CardItem>

    </Card>
  )
}