import React, {useContext, useState} from 'react'

import {View, Alert, TouchableOpacity} from 'react-native'
import {Text, Card, Button, CardItem} from 'native-base'

import {Context} from '../../../Store/appContext'

export default IncomingPath = (props) => {

  const {store, actions } = useContext(Context)

const [counter, setCounter] = useState(false)

  const showAlert = (action, status) =>{

    Alert.alert(
      "Confirmation",
      'Are you want to ' + action + ' this swap?',
      [
        {
          text: 'Yes',
          onPress: () => swapChange(status)
        },
        {
          text: 'No',
          onPress: () => console.log("Cancel Pressed"),
        }
      ]
    )
  }

  const swapChange = async(x) => {
    var answer = await actions.swap.statusChange(
      props.tournament_id, 
      props.user_id,
      false,
      //status 
      x,
      props.percentage,
      props.counter_percentage
    )
    if(x=='agreed'){var answer2 = await actions.coin.spend()}
    var answer3 = await actions.tracker.getAll()
    props.navigation.goBack()
  }

  const counterSwitch = async() =>{
    setCounter(!counter)
  }

  return(
    <Card transparent style={{alignSelf:'center', width:'80%', justifyContent:'center'}}>
      
      <CardItem style={{ alignSelf:'center'}}>
        {props.percentage == props.counter_percentage ?
          <Text style={{fontSize:20, alignText:'center'}}>
            {props.user_name} wants to swap {props.percentage}% between the both of you
          </Text>
          : 
          <Text style={{fontSize:20, alignText:'center'}}>
            {props.user_name} wants to swap {props.counter_percentage}% while you swap {props.percentage}%
          </Text>}
      </CardItem>

      {store.myProfile.coins > 0 ?
        counter == false ?
          <View style={{ alignSelf:'center'}}>
            <CardItem>
              <Button success large
                onPress={()=> showAlert('accept','agreed')}>
                <Text> Accept Offer </Text>
              </Button>
            </CardItem>
          
            <CardItem>
              <Button large warning onPress={()=> setCounter(!counter)}>
                <Text> Counter Offer </Text>
              </Button>
            </CardItem>

            <CardItem>
              <Button>
                <Text></Text>
              </Button>
            </CardItem>
          </View>
          :
          <View>
            <Button onPress={()=> setCounter(!counter)}>
              <Text>Changeback</Text>
            </Button>
          </View>
        :
        <View>
          <CardItem>
            <Text style={{textAlign:'center', fontSize:20,}}> In order to accept or counter this swap, you need to purchase tokens.</Text>
          </CardItem>
        
          <CardItem style={{justifyContent:'center'}}>
            <Button large success onPress={() => props.navigation.navigate('PurchaseTokens')}>
              <Text>Purchase Tokens</Text>
            </Button>
          </CardItem>
        </View>
      }

      {/* <CardItem style={{justifyContent:'center'}}>
        <TouchableOpacity onPress={()=> props.subtract()}>
          <View style={{width:100, height:100, borderRadius: 5, backgroundColor:'blue'}}>
            <Text style={{fontSize:36, color:'white', textAlign:'center'}}>-</Text>
          </View>
        </TouchableOpacity>

        <Text style={{fontSize:36, marginHorizontal:10}}> {props.percentage}% </Text>

        <TouchableOpacity onPress={()=> props.add()}>
          <View style={{width:100, height:100, borderRadius: 5, backgroundColor:'blue'}}>
            <Text style={{fontSize:36, color:'white', textAlign:'center'}}>+</Text>
          </View>
        </TouchableOpacity>

      </CardItem>

      <CardItem style={{justifyContent:'center'}}>
            <TouchableOpacity onPress={()=> props.c_subtract()}>
              <View style={{width:100, height:100, borderRadius: 5, backgroundColor:'blue'}}>
                <Text style={{fontSize:36, color:'white', textAlign:'center'}}>-</Text>
              </View>
            </TouchableOpacity>

            <Text style={{fontSize:36, marginHorizontal:10}}> {props.counter_percentage}% </Text>

            <TouchableOpacity onPress={()=> props.c_add()}>
              <View style={{width:100, height:100, borderRadius: 5, backgroundColor:'blue'}}>
                <Text style={{fontSize:36, color:'white', textAlign:'center'}}>+</Text>
              </View>
            </TouchableOpacity>

          </CardItem> */}

      <CardItem style={{ alignSelf:'center'}}>
        <Button large danger onPress={()=> showAlert('reject','rejected')}>
          <Text> Reject Swap </Text>
        </Button>
      </CardItem>

    </Card>
  )
}