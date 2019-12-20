import React, {useContext} from 'react'

import {TouchableOpacity, View} from 'react-native'
import {Text, Button, Card, CardItem} from 'native-base'

import {Context} from '../../../Store/appContext'

export default InactivePath = (props) => {

  const {store, actions} = useContext(Context)
  

  return(
    <Card>

      <CardItem style={{justifyContent:'center'}}>
        <Text style={{marginRight:5,fontSize:24, textAlign:'center'}}>Swap With:</Text>    
      </CardItem>

      <CardItem style={{justifyContent:'center'}}>
        <Text style={{marginLeft:5,fontSize:36,justifyContent:'center'}}> {props.user_name} </Text>
      </CardItem>
      
      {store.my_profile.coins > 0 ? 
        <View>
          <CardItem style={{justifyContent:'center'}}>
            {/* SUBTRACT BUTTON */}
            <TouchableOpacity onPress={()=> props.subtract()}>
              <View style={{width:50, height:50, borderRadius: 5, backgroundColor:'blue'}}>
                <Text style={{fontSize:36, color:'white', textAlign:'center'}}>-</Text>
              </View>
            </TouchableOpacity>

            {/* SWAP PERCENTAGE */}
            <Text style={{fontSize:36, marginHorizontal:10}}> {props.percentage}% </Text>

            {/* ADD BUTTON */}
            <TouchableOpacity onPress={()=> props.add()}>
              <View style={{width:50, height:50, borderRadius: 5, backgroundColor:'blue'}}>
                <Text style={{fontSize:36, color:'white', textAlign:'center'}}>+</Text>
              </View>
            </TouchableOpacity>

          </CardItem>
          <CardItem style={{justifyContent:'center'}}>
            <Button large 
              onPress={async() => {
                var answer = await actions.swap.add(props.tournament_id, props.user_id, props.percentage);
                actions.tracker.getAll()
              }}>
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