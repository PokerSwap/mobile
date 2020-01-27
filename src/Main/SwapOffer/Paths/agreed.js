import React from 'react'
import {Text, Button, Card, CardItem} from 'native-base'
import {View} from 'react-native'

export default AgreedPath = (props) => {


  return(
    <Card transparent>
      <CardItem style={{justifyContent:'center'}}>
        {props.percentage == props.counter_percentage ?
          <Text style={{textAlign:'center', fontSize:24}}>You and {props.user_name} agreed to swap {props.percentage}% while {props.user_name} agreed to swap {props.counter_percentage}%</Text>
          :
          <View style={{flex:1, flexDirection:'column'}}>
            <Text style={{textAlign:'center', fontSize:24}}>You agreed to swap {props.percentage}% while</Text>
            <Text style={{textAlign:'center', fontSize:24}}>{props.user_name} agreed to swap {props.counter_percentage}%</Text>
          </View>
        }
      </CardItem>
    </Card>
  )
}