import React, {useContext} from 'react'

import {TouchableOpacity, View} from 'react-native'
import {Text, Card, CardItem} from 'native-base'

import {Context} from '../../../Store/appContext'

export default InactivePath = (props) => {

  const {store, actions} = useContext(Context)

  return(
    <Card>

      <CardItem>
        <Text style={{marginRight:5,fontSize:24}}>Swap With:</Text>    
      </CardItem>

      <CardItem>
        <Text style={{marginLeft:5,fontSize:24,}}> {props.user_name} </Text>
      </CardItem>
      
      <CardItem>
        <Text style={{marginRight:5,fontSize:24}}>Swap Offer:</Text>
      </CardItem>

      <CardItem>

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

      <CardItem>
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