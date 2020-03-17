import React, { useContext } from 'react';
import { View } from 'react-native';
import { ListItem, Text, Icon } from 'native-base';
import { getDistance, convertDistance } from 'geolib';
import { Col } from 'react-native-easy-grid'

import { Context } from '../../../Store/appContext';

export default EventBody = (props) => {  

  const { store, actions } = useContext(Context);
  var {navigation} = props, {tournament} = props;
  var start_at = props.tournament.start_at
  var bgColor, textColor, borderWidths, buttonColor, path;
 
  const enterTournament = async() => {
    var answer1 = await actions.tournament.getAction(tournament.tournament_id);
    var answer2 = await actions.tournament.getCurrent(tournament.tournament_id);

    var answer3 = await navigation.push(path, {
      action: store.action,
      tournament: store.currentTournament.tournament,
      buyins: store.currentTournament.buyins,
      navigation: props.navigation,
      flights: store.currentTournament.tournament.flights,
      flight_id: tournament.id,
      tournament_id: tournament.tournament_id,

      name: tournament.name,
      my_buyin: store.currentTournament.my_buyin
    });
  }


  // ACTIVE TOURNAMENT VIEW
  if (tournament.buy_in) {
    bgColor = 'green', textColor = 'white', buttonColor = 'white',
    borderWidths = 4, path = 'EventLobby'
  } else {
    bgColor = 'white',textColor = 'black', buttonColor = null,
     borderWidths = 2, path = 'VerifyTicket'
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

//  var faraway = getDistance(
//    props.myCoords,
//    {latitude: tournament.latitude, 
//     longitude: tournament.longitude}
//  )
//  var distance = convertDistance(faraway, 'mi').toFixed(1)

  var renderedItem 
  if(props.mode=='byDate' || props.mode=='byName'){
    renderedItem = null
  }else if(props.mode=='byZip'){
    renderedItem = 
      <Text style={{fontWeight:"600", fontSize:12, 
        color:textColor, marginTop:5}}>
        {tournament.city}
      </Text>
  }else if(props.mode=='byLocation'){
    renderedItem=
      <Text style={{fontWeight:"600", fontSize:12, 
        color:textColor, marginTop:5}}>
        {/* {distance} miles */}
      </Text>
  }else{
    console.log('somethign went wrong')
  }

 
  return(
    <ListItem noIndent 
      style={{backgroundColor: bgColor, flexGrow:1, 
        flexDirection:'row', justifyContent:'space-between'}}
      onPress={()=> enterTournament()}>
      
      {/* TOURNAMENT DATE */}
      <Col style={{width:'28%', alignItems:'center'}}>

        {/* TOURNAMENT DATE BOX */}
        <View style={{backgroundColor: bgColor, 
          borderColor:buttonColor, borderRadius: borderWidths, 
          alignContent:'center', flexDirection:"column", 
          flex:0, width:85, height:85, justifyContent:"center"}}>

<Text style={{fontWeight:"600", fontSize:16, fontWeight:'400',
            color:textColor, marginBottom:2, textAlign:'center'}}>
            {day_name} 
          </Text>
          {/* TOURNAMENT START DATE*/}
          <Text style={{fontWeight:"600", 
            fontSize:24, color:textColor}}>
            {month} {day}
          </Text>
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
          {tournament.name}
        </Text>
      </Col>
      
      {/* RIGHT ARROW NAVIGATION */}
      <Col style={{justifyContent:'flex-end', width:'10%'}}>
        <Icon type="FontAwesome5" name="angle-right"
          style={{justifyContent:'flex-end', 
          alignSelf:'flex-end', color:textColor}}/>
      </Col>

    </ListItem>
  )
}

// const styles = {
//   date:{
//     day:{},

//   },
//   name:{ 
//      alignContent:'center',
//     textAlign:'center', fontSize:20, fontWeight:'600'}

// }