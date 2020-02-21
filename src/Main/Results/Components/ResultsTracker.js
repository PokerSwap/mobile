import React from 'react';
import { ListItem, Text, Icon } from 'native-base';
import { Col } from 'react-native-easy-grid'

export default ResultsTracker = (props) => {  
  
  const enterWinnings = () => {
    props.navigation.push('SwapPot', {
      tournament: props.tournament,
      my_buyin: props.my_buyin,
      buyins: props.buyins,
      final_profit: props.final_profit
    })
  }
 
  return(
    <ListItem noIndent onPress={()=> enterWinnings()}>
      
      {/* TOURNAMENT TITLE */}
      <Col style={{width:'80%', justifyContent:'center'}}>
        <Text style={{color:'black', alignContent:'center',
          textAlign:'center', fontSize:20, fontWeight:'600'}}> 
          {props.tournament.name}
        </Text>
      </Col>

      {/* RIGHT ARROW NAVIGATION */}
      <Col style={{width:'20%'}}>
        <Icon type="FontAwesome5" name="angle-right" 
        style={{justifyContent:'center', alignSelf:'center'}} />    
      </Col>

    </ListItem>
  )
}