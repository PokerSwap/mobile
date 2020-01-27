import React, {} from 'react';
import { Text, Card, CardItem } from 'native-base';
import {View} from 'react-native'

export default  TourneyHeader = (props) => {

  var startMonth = props.start_at.substring(8,11)
  var startDay = props.start_at.substring(5,7)
  var startDayName = props.start_at.substring(0,3)

  return(
    <Card transparent style={{flex:1, flexDirection:'column',justifyContent:'center'}}>
      <CardItem style={{justifyContent:'center'}}>
        <Text style={{fontSize:24, fontWeight:'600', textAlign:'center'}}>
          {props.name}
        </Text>
      </CardItem>
      <CardItem style={{flex:1, flexDirection:'column', alignItems:'center'}}>
        <View style={{ justifyContent:'center'}}>
          <Text style={{textAlign:'center', justifyContent:'center'}}>Hosted At:</Text>
          <Text style={{marginVertical:5, textAlign:'center'}}>{props.address}</Text>
          <Text style={{fontSize:20, fontWeight:'500', textAlign:'center'}}>{props.city}, {props.state}</Text>
        </View>
        </CardItem>
        <CardItem>
        <View>
          <Text style={{textAlign:'center'}}>Begins on:</Text>
          <Text style={{fontSize:24, textAlign:'center'}}>{startDayName}. {startMonth} {startDay}</Text>
        </View>
      </CardItem>
    </Card>
  )
}
