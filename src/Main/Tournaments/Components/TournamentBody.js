import React, { useContext, useEffect } from 'react';
import { Context } from '../../../Store/appContext'

import { View } from 'react-native';
import { ListItem, Text, Icon } from 'native-base';
import { Col } from 'react-native-easy-grid'

export default TournamentBody = (props) => {  

  const { store, actions } = useContext(Context);

  var bgColor, textColor, buttonColor, path;
  var navigation = props.navigation;

  const enterTournament = () => {
    navigation.push(path, {
      tournament_id: props.id,
      name: props.name,
      address: props.address,
      longitude: props.longitude,
      latitude: props.latitude,
      start_at: props.start_at,
      end_at: props.end_at,
      // flights: this.props.flights
    });
  }

    // var x = this.props.my_buy_ins.map((buy_in) => buy_in.id)
    // var z=[]
    // var y = this.props.flights.forEach((flight) => 
    //   flight.buy_ins.forEach((buy_in) => z.push(buy_in.id))
    // )
    
    // var matches = z.some(zz => zz == 1 || zz >= 4)

    // console.log(matches)
    // ACTIVE TOURNAMENT VIEW
  if (true) {
    bgColor = 'green';
    textColor = 'white';
    buttonColor = 'white';
    borderWidth = 4;
    path = 'TourneyLobby'
  } else {
    bgColor = 'white';
    textColor = 'black';
    buttonColor = null;
    borderWidth = 2;
    path = 'VerifyTicket'
  }

  var month = props.start_at.substring(8,11)
  var day = props.start_at.substring(5,7)
  var day_name = props.start_at.substring(0,3)

  return(
    <ListItem noIndent 
      style={{backgroundColor: bgColor, flexDirection:'row', justifyContent:'space-between'}}
      onPress={()=> enterTournament()} 
    >
      
      {/* TOURNAMENT DATE */}
      <Col style={{width:'28%', alignItems:'center'}}>

        {/* TOURNAMENT DATE BOX */}
        <View  
          style={{
            backgroundColor: bgColor,
            borderColor:buttonColor, borderRadius: borderWidth, alignContent:'center',
            flexDirection:"column", flex:0, justifyContent:"center", width:85, height:85
          }}
        >
          {/* TOURNAMENT START DATE*/}
          <Text style={{fontWeight:"600", fontSize:24, color:textColor}}>{month} {day}</Text>
          <Text style={{fontWeight:"600", fontSize:12, color:textColor, marginTop:5}}>{day_name}</Text>
        </View>        
    
      </Col>
              
      {/* TOURNAMENT DETAILS */}
      <Col style={{width: '62%'}}>

        {/* TOURNAMENT TITLE */}
        <Text 
          style={{color:textColor, 
          alignContent:'center',
          textAlign:'center',
          fontSize:20, fontWeight:'600'}}> 
          {props.name}
        </Text>

        {/* TOURNAMENT ADDRESS */}
        <Text 
          style={{color:textColor, 
          alignSelf:"flex-start",
          fontSize:16, fontWeight:'400'}}> 
          {/* {props.address} */}
        </Text>
      
      </Col>
      
      {/* RIGHT ARROW NAVIGATION */}
      <Col style={{justifyContent:'flex-end', width:'10%'}}>
          <Icon style={{justifyContent:'flex-end', alignSelf:'flex-end'}} type="FontAwesome5" name="angle-right"/>
      </Col>

    </ListItem>
  )
}




  // useEffect(() => {
  //   console.log('In 3 seconds, another message will appear'); 
  //   console.log('hasSomething', hasSomething)
  //   setTimeout(()=>{
  //     console.log('3 seconds have passed');
  //     props.navigation.navigate('Login')
  //   }, 3000)
  //   return () => {
  //     //cleanup
  //   };
  // }, []);

