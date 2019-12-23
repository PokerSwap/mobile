import React, {useContext} from 'react'

import {TouchableOpacity, View, Alert} from 'react-native'
import {Text, Button, Card, CardItem} from 'native-base'

import {Context} from '../../../Store/appContext'

export default InactivePath = (props) => {

  const {store, actions} = useContext(Context)
  
  const showAlert = (actione) =>{

    Alert.alert(
      "Confirmation",
      'Are you want to ' + actione + ' this swap?',
      [
        {
          text: 'Yes',
          onPress: () => swapStart()
        },
        {
          text: 'No',
          onPress: () => console.log("Cancel Pressed"),
        }
      ]
    )
  }

  const swapStart = async() => {
    var answer1 = await actions.swap.add(props.tournament_id, props.user_id, props.percentage);
    var answer2 = await actions.coin.spend(1)
    var answer3 = await actions.tracker.getAll()
    var answer4 = await actions.profile.get()
    props.navigation.goBack()
  }

  console.log(props.action)

  return(
    <Card>

      <CardItem style={{justifyContent:'center'}}>
        <Text style={{marginRight:5,fontSize:24, textAlign:'center'}}>Swap With:</Text>    
      </CardItem>

      <CardItem style={{justifyContent:'center'}}>
        <Text style={{marginLeft:5,fontSize:36,justifyContent:'center'}}> {props.user_name} </Text>
      </CardItem>
      
      {store.myProfile.coins > 0 ? 
        <View>
          <CardItem style={{justifyContent:'center'}}>
            {/* SUBTRACT BUTTON */}
            <TouchableOpacity onPress={()=> props.subtract()}>
              <View style={{width:100, height:100, borderRadius: 5, backgroundColor:'blue'}}>
                <Text style={{fontSize:36, color:'white', textAlign:'center'}}>-</Text>
              </View>
            </TouchableOpacity>

            {/* SWAP PERCENTAGE */}
            <Text style={{fontSize:36, marginHorizontal:10}}> {props.percentage}% </Text>

            {/* ADD BUTTON */}
            <TouchableOpacity onPress={()=> props.add()}>
              <View style={{width:100, height:100, borderRadius: 5, backgroundColor:'blue'}}>
                <Text style={{fontSize:36, color:'white', textAlign:'center'}}>+</Text>
              </View>
            </TouchableOpacity>

          </CardItem>

          <CardItem>
            <Text>The remaining action you have in this tournament is {props.action}</Text>
          </CardItem>

          
          <CardItem style={{justifyContent:'center'}}>
            <Button large onPress={() => showAlert('offer')}>
              <Text> Offer Swap </Text>
            </Button>
          </CardItem>
        </View>
        : 
        <View>
          <CardItem>
            <Text> You need to purchase tokens in order to swap with this person.</Text>
          </CardItem>

          <CardItem>
            <Button large success onPress={()=> props.navigation.navigate('PurchaseTokens')}>
              <Text>Purchase Tokens</Text>
            </Button>
          </CardItem>
        </View>
      }


    </Card>
  )
}