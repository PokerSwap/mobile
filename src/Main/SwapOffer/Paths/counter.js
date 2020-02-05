import React, {useContext} from 'react'

import {View, Alert, TouchableOpacity} from 'react-native'
import {Text, Card, Button, CardItem} from 'native-base'

import {Context} from '../../../Store/appContext'

export default CounterPath = (props) => {

  const {store, actions } = useContext(Context)

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



  return(
    <Card transparent style={{alignSelf:'center', width:'80%', justifyContent:'center'}}>

      {props.percentage == props.counter_percentage ?
        <CardItem style={{ alignSelf:'center'}}>
          <Text style={{fontSize:20, alignText:'center'}}>{props.user_name} wants to swap {props.percentage}% between the both of you</Text>
        </CardItem>
        : 
        <CardItem>
          <Text style={{fontSize:20, alignText:'center'}}>
            {props.user_name} wants to swap {props.counter_percentage}% while you swap {props.percentage}%
          </Text>
        </CardItem>
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