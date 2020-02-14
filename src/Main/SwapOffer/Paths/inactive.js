import React, {useContext, useState} from 'react'

import {TouchableOpacity, View, Alert} from 'react-native'
import {Text, Button, Card, CardItem, Icon} from 'native-base'

import {Context} from '../../../Store/appContext'

export default InactivePath = (props) => {

  const {store, actions} = useContext(Context)
  
  const [percentage, setPercentage] = useState(1)

  const add = () => {
    percentage < 50 ? setPercentage(percentage+ 1) : setPercentage(50)
  }

  const subtract = () => {
    percentage > 1 ? setPercentage(percentage-1) : setPercentage(1)
  }

  const showAlert = (action) =>{

    Alert.alert(
      "Confirmation",
      'Are you want to ' + action + ' this swap?',
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
    var answer1 = await actions.swap.add(props.tournament_id, props.user_id, percentage, props.navigation);
  }

  return(
    <Card>

      <CardItem style={{justifyContent:'center'}}>
        <Text style={{marginRight:5,fontSize:24, textAlign:'center'}}>
          Swap With:
        </Text>    
      </CardItem>

      <CardItem style={{justifyContent:'center'}}>
        <Text style={{marginLeft:5,fontSize:36,justifyContent:'center'}}> 
          {props.user_name} 
        </Text>
      </CardItem>
      
      {store.myProfile.coins > 0 ? 
        <View>
          <CardItem style={{justifyContent:'center'}}>
            {/* SUBTRACT BUTTON */}
            <Button style={{width:50, height:50, borderRadius: 5, backgroundColor:'blue', alignContent:'center'}} 
              onPress={()=> subtract()}>
                <Icon style={{color:'white', fontSize:24}} type='FontAwesome5' name='minus'/>
            </Button>

            {/* SWAP PERCENTAGE */}
            <Text style={{fontSize:36, marginHorizontal:10}}> 
              {percentage}% 
            </Text>

            {/* ADD BUTTON */}
            <Button style={{width:50, height:50, borderRadius: 5, backgroundColor:'blue', alignContent:'center'}} 
              onPress={()=> add()}>
                <Icon style={{color:'white', fontSize:24}} type='FontAwesome5' name='plus'/>
            </Button>

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