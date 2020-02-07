import React, {useContext, useState} from 'react'

import {View, Alert, TouchableOpacity} from 'react-native'
import {Text, Card, Button, CardItem} from 'native-base'

import {Context} from '../../../Store/appContext'

export default CounterPath = (props) => {

  const {store, actions } = useContext(Context)

  const [percentage, setPercentage] = useState(props.percentage)

  const showAlert = (action, status) =>{

    Alert.alert(
      "Confirmation",
      'Are you want to counter this swap?',
      [
        {
          text: 'Yes',
          onPress: () => swapCounter()
        },
        {
          text: 'No',
          onPress: () => console.log("Cancel Pressed"),
        }
      ]
    )
  }

  const swapCounter = async() => {
    var answer = await actions.swap.statusChange(
      props.tournament_id, 
      props.user_id,
      false,
      //status 
      'sending',
      percentage,
      props.counter_percentage
    )
    if(x=='agreed'){var answer2 = await actions.coin.spend()}
    var answer3 = await actions.tracker.getAll()
    props.navigation.goBack()
  }


  // ADDING PERCENT TO SWAP - NO MORE THAN 50%
  const add = (x) => {
    if (x !== 'long'){
      percentage < 50 ?
        setPercentage(percentage + 1)
        :
        setPercentage(50)
    } else{
        setPercentage(percentage + 5)
      
    }

    
      
  }

  // SUBTRACTING PERCENT FROM SWAP - NO MORE THAN 50%
  const subtract = (x) => {
    if (percentage > 1){
      setPercentage(percentage - 1)
    }else{
      setPercentage(1)
    }
  }

  return(
    <Card transparent style={{alignSelf:'center', width:'80%', justifyContent:'center'}}>

      <CardItem style={{justifyContent:'center'}}>
        <TouchableOpacity onPress={()=> subtract()} >
          <View style={{width:100, height:100, borderRadius: 5, backgroundColor:'blue'}}>
            <Text style={{fontSize:36, color:'white', textAlign:'center'}}>-</Text>
          </View>
        </TouchableOpacity>

        <Text style={{fontSize:36, marginHorizontal:10}}> {percentage}% </Text>

        <TouchableOpacity onPress={()=> add('short')} >
          <View style={{width:100, height:100, borderRadius: 5, backgroundColor:'blue'}}>
            <Text style={{fontSize:36, color:'white', textAlign:'center'}}>+</Text>
          </View>
        </TouchableOpacity>

      </CardItem>

      {/* <CardItem style={{justifyContent:'center'}}>
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



          </CardItem>  */}

        <CardItem>
          <Button large success 
            onPress={()=> console.log('lol')}>
            <Text> SEND SWAP </Text>
          </Button>
        </CardItem>

        <CardItem>
          <Button large info 
            onPress={()=> props.setCounter(!props.counter)}>
            <Text>Go Back</Text>
          </Button>
        </CardItem>

    </Card>
  )
}