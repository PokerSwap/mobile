import React, { useContext } from 'react';
import { Context } from '../../../Store/appContext';

import { View } from 'react-native';
import { ListItem, Text, Icon } from 'native-base';
import { Col } from 'react-native-easy-grid'

export default WinningsTracker = (props) => {  

  const { store, actions } = useContext(Context);
  
  const enterWinnings = () => {
    props.navigation.push('SwapPot', {
      tournament: props.tournament,
      my_buyin: props.my_buyin,
      swaps: props.swaps
    })
  }

  return(
    <ListItem noIndent onPress={()=> enterWinnings()}>
      
      {/* TOURNAMENT DATE */}
      <Col style={{width:'28%', alignItems:'center'}}>

        {/* TOURNAMENT DATE BOX */}
        {/* <View  
          style={{
            backgroundColor: bgColor,
            borderColor:buttonColor, borderRadius: borderWidths, alignContent:'center',
            flexDirection:"column", flex:0, justifyContent:"center", width:85, height:85
          }}
        > */}
          {/* TOURNAMENT START DATE*/}
          {/* <Text style={{fontWeight:"600", fontSize:24, color:textColor}}>{month} {day}</Text>
          <Text style={{fontWeight:"600", fontSize:12, color:textColor, marginTop:5}}>{day_name}</Text>
        </View>         */}
    
      </Col>
              
      {/* TOURNAMENT DETAILS */}
      <Col style={{width: '62%'}}>

        {/* TOURNAMENT TITLE */}
        <Text 
          style={{color:'black', 
          alignContent:'center',
          textAlign:'center',
          fontSize:20, fontWeight:'600'}}> 
          {props.tournament.name}
        </Text>

      
      </Col>
      
      {/* RIGHT ARROW NAVIGATION */}
      <Col style={{justifyContent:'flex-end', width:'10%'}}>
          <Icon style={{justifyContent:'flex-end', alignSelf:'flex-end'}} type="FontAwesome5" name="angle-right"/>
      </Col>

    </ListItem>
  )
}