import React, { useContext } from 'react';
import { Context } from '../../../Store/appContext'
import { useNavigation } from '@react-navigation/native'
import { throttle } from 'lodash';

import { View } from 'react-native';
import { ListItem, Text, Icon } from 'native-base';
import { Col } from 'react-native-easy-grid'

import darkStyle from '../../../Themes/dark.js'
import lightStyle from '../../../Themes/light.js'

export default EventBody = (props) => {  
  const { store, actions } = useContext(Context)
  const navigation = useNavigation()
  var {event} = props;
  var start_at = props.event.start_at
  var bgColor, textColor, borderWidths, buttonColor, path;

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const enterTournament = () => {
    var startAddress = event.casino + '\n' + event.address + '\n' + event.city + ', ' +
      event.state + ' ' + event.zip_code
    navigation.push(path, {
      tournament_id: event.tournament_id,
      tournament_start: event.start_at,
      tournament_name: event.name,
      tournament_address: startAddress,
      flight_id: event.id,
      tournament_lat: event.tournament.latitude,
      tournament_long: event.tournament.longitude,
      casino: event.casino
    });
  }

  const handler = throttle(enterTournament, 1000, { leading: true, trailing: false });

  // ACTIVE TOURNAMENT VIEW
  if (event.buy_in) { 
    bgColor = 'green', textColor = 'white', buttonColor = 'white',
    borderWidths = 4, path = 'Event Lobby'
  } else {
    bgColor = currentStyle.background.color,textColor = currentStyle.text.color, buttonColor = null,
    borderWidths = 2, path = 'Verify Ticket'
  }
  var month = start_at.substring(8,11)
  var day = start_at.substring(5,7)
  var day_name = start_at.substring(0,3)

  var startHour = parseInt(start_at.substring(16,19))
    var startM 
    if (startHour % 12!==0){
      if(startHour/12 >= 1){ startM = ' PM', startHour%=12 }
      else{ startM = ' AM' }
    } else{
      if(startHour == 0){ startM = ' AM', startHour=12 }
      else{ startM = ' PM' }
    }
  var startTime = startHour + ':' + start_at.substring(20,22) + startM


  var renderedItem 
  if(props.mode=='byDate' || props.mode=='byName'){
    renderedItem = null
  }else if(props.mode=='byZip'){
    renderedItem = 
      <Text style={{fontWeight:"600", fontSize:12, 
        color:textColor, marginTop:5}}>
        {event.city}
      </Text>
  }else if(props.mode=='byLocation'){
    renderedItem=
      <Text style={{fontWeight:"600", fontSize:12, 
        color:textColor, marginTop:5}}>
        {event.distance !== undefined ?
          event.distance < 10 ?
            event.distance.toFixed(1)
            : event.distance.toFixed(0)
        :null	} mi.						
      </Text>
  }else{
    console.log('somethign went wrong with search mode')
  }

  return(
    <ListItem noIndent onPress={()=> handler()}
      style={{backgroundColor: bgColor, flexGrow:1, 
        flexDirection:'row', justifyContent:'space-between'}}>
      {/* TOURNAMENT DATE */}
      <Col style={{width:'28%', alignItems:'center'}}>
        {/* TOURNAMENT DATE BOX */}
        <View style={{backgroundColor: bgColor, 
          borderColor:buttonColor, borderRadius: borderWidths, 
          alignContent:'center', flexDirection:"column", 
          flex:0, width:85, height:85, justifyContent:"center"}}>
          {/* TOURNAMENT START DAY-NAME */}
          <Text style={{fontWeight:"600", fontSize:16, fontWeight:'400',
            color:textColor, marginBottom:2, textAlign:'center'}}>
            {day_name} 
          </Text>
          {/* TOURNAMENT START DATE*/}
          <Text style={{fontWeight:"600", fontSize:22, color:textColor}}>
            {month} {day}
          </Text>
          {/* TOURNAMENT START DATE */}
          <Text style={{fontWeight:"400", fontSize:16, 
            color:textColor, marginTop:5, textAlign:'center'}}>
            {startTime}
          </Text>
          {/* TOURNAMENT ADDRESS */}
          {renderedItem}
        </View>        
      </Col>
      {/* TOURNAMENT TITLE */}    
      <Col style={{width: '62%'}}>
        <Text style={{color:textColor, alignContent:'center',
          textAlign:'center', fontSize:20, fontWeight:'600'}}> 
          {event.name}
        </Text>
      </Col>
      {/* RIGHT ARROW NAVIGATION */}
      <Col style={{justifyContent:'flex-end', width:'10%'}}>
        <Icon type="FontAwesome5" name="angle-right"
          style={{justifyContent:'flex-end', alignSelf:'flex-end', color:textColor}}/>
      </Col>
    </ListItem>
  )
}