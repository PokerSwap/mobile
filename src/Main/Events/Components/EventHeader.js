import React, {} from 'react';
import { Text, Card, CardItem } from 'native-base';
import {View} from 'react-native'
import CountDown from 'react-native-countdown-component';

import moment from 'moment';

export default EventHeader = (props) => {

  var startMonth = props.tournament.start_at.substring(8,11)
  var startDay = props.tournament.start_at.substring(5,7)
  var startDayName = props.tournament.start_at.substring(0,3)

  var inSeconds = -(moment().diff(moment(props.tournament.start_at), "seconds"))
  console.log('start', props.tournament.start_at)
  console.log('inSeconds', inSeconds, typeof(inSeconds))
  // var CountDownz

  // if(0 < inSeconds < 604800){
  //   CountDownz =
  //     <CountDown
  //       until={inSeconds}
  //       onFinish={() => alert('This tournament is now live')}
  //       onPress={() => alert('hello')}
  //       size={30}
  //       digitTxtStyle={{color:'white'}}
  //       digitStyle={{backgroundColor:'green'}}
  //       timeToShow={['D','H','M', 'S']}
  //       timeLabels={{d:'D',h:'H', m: 'M', s: 'S'}}
  //     />
  // } else{
  //   CountDownz = null

  // } 

  return(
    <Card transparent style={{
      flex:1, flexDirection:'column',justifyContent:'center'}}>
      <CardItem style={{justifyContent:'center'}}>
        <Text style={{
          fontSize:24, fontWeight:'600', textAlign:'center'}}>
          {props.tournament.name}
        </Text>
      </CardItem>
      <CardItem style={{
        flex:1, flexDirection:'column', alignItems:'center'}}>
        <View style={{ 
          justifyContent:'center'}}>
          <Text style={{
            textAlign:'center', justifyContent:'center'}}>
            Hosted At:
          </Text>
          <Text style={{ marginVertical:5, textAlign:'center'}}>
            {props.tournament.address}
          </Text>
          <Text style={{
            fontSize:20, fontWeight:'500', textAlign:'center'}}>
            {props.tournament.city}, {props.tournament.state}
          </Text>
        </View>
      </CardItem>
      <CardItem style={{justifyContent:'center'}}>
        <View>
          <Text style={{textAlign:'center'}}>
            Begins on:
          </Text>
          <Text style={{fontSize:24, textAlign:'center'}}>
            {startDayName}. {startMonth} {startDay}
          </Text>
        </View>
        <View >
        </View>
      </CardItem>
    </Card>
  )
}

const styles = {
  container:{
    
  },
  text:{

  }
}