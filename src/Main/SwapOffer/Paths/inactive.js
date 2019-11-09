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
      
      <CardItem style={{justifyContent:'center'}}> 
        <Text style={{marginRight:5,fontSize:24,justifyContent:'center'}}>Swap Offer:</Text>
      </CardItem>

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
            actions.swap.add(tournament_id, user_id, percentage),
            actions.profile.get()
          }}>
          <Text> Offer Swap </Text>
        </Button>
      </CardItem>

    </Card>
  )
}