import React, { useContext } from 'react'
import { Context } from '../../../Store/appContext'
import { useNavigation } from '@react-navigation/native'

import { View, Alert } from 'react-native'
import { Button, Card, CardItem, Icon, Text } from 'native-base'

import lightStyle from '../../../Themes/light'
import darkStyle from '../../../Themes/dark'

export default IntroOffer = (props) => {
  const {store, actions } = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  const navigation = useNavigation()
  // CONFIMATION ALERT
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
  // CHANGE SWAP STATUS ACTION - ACCEPT, REJECT, COUNTER
  const swapChange = async(status) => {
    props.setLoading(true)
    var answer = await actions.swap.statusChange(
      props.tournament_id, props.swap_id, props.buyin_id, props.currentStatus, status)
    props.onRefresh()
    props.setLoading(false)
  }

  return(
    <Card transparent style={{
      alignSelf:'center', width:'90%', justifyContent:'center', backgroundColor:currentStyle.background.color}}>
      {store.myProfile.coins > 0 ?
        // WHEN YOU HAVE ENOUGH TOKENS
        <View style={{ alignSelf:'center', flexDirection:'column'}}>
          {/* COUNTER AND REJECT BUTTONS */}
          <CardItem style={{justifyContent:'space-between', backgroundColor:currentStyle.background.color}}>
            {/* COUNTER BUTTON */}
            <Button large warning style={{justifyContent:'center'}}
              onPress={()=> props.setCounter(!props.counter)}>
              <Text style={{fontWeight:'600'}}> Counter </Text>
              <Icon style={{marginLeft:-10}} 
                type='Ionicons' name='ios-swap-horizontal'/>
            </Button>
            {/* REJECT BUTTON */}
            <Button large danger 
              onPress={()=> confirmationAlert('reject','rejected')}>
              <Text style={{fontWeight:'600'}}> Reject </Text>
              <Icon style={{marginLeft:-10}} type='Entypo' name='circle-with-cross'/>
            </Button>
          </CardItem>
          {/* ACCEPT BUTTON */}
          <CardItem style={{ backgroundColor:currentStyle.background.color}}>
            <Button success full large style={{width:'100%'}}
              onPress={()=> confirmationAlert('accept','agreed')}>
              <Text style={{fontWeight:'600', fontSize:24}}> Accept </Text>
              <Icon style={{marginLeft:-10, fontSize:36}} type='Ionicons' name='md-checkmark'/>
            </Button>
          </CardItem>
        </View>
        :
        // WHEN YOU HAVE ZERO TOKENS
        <CardItem style={{flexDirection:'column', color:currentStyle.background.color}}>
          {/* NO TOKENS WARNING */}
          <Text style={{textAlign:'center', fontSize:18, marginBottom:25}}> 
            In order to accept or counter this swap, 
            you need to purchase tokens.
          </Text>
          {/* PURCHASE TOKENS BUTTON */}
          <Button large success style={{alignSelf:'center'}} 
            onPress={() => navigation.navigate('Purchase Tokens')}>
            <Text>Purchase Tokens</Text>
          </Button>
          <Button large danger style={{marginTop:25}}
            onPress={()=> confirmationAlert('reject','rejected')}>
            <Text style={{fontWeight:'600'}}> Reject </Text>
            <Icon style={{marginLeft:-10}} type='Entypo' name='circle-with-cross'/>
          </Button>
        </CardItem>
      }
    </Card>
  )
}