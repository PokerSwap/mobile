import React from 'react';
import { ListItem, Text, Icon } from 'native-base';
import { Col } from 'react-native-easy-grid'

export default ResultsTracker = (props) => {  
  
  const enterProfitResults = () => {
    props.navigation.push('ProfitResults', {
      tournament: props.tournament,
      my_buyin: props.my_buyin,
      buyins: props.buyins,
      final_profit: props.final_profit
    })
  }
 
  return(
    <ListItem noIndent onPress={()=> enterProfitResults()}>
      
      {/* TOURNAMENT TITLE */}
      <Col style={{width:'80%', justifyContent:'center'}}>
        <Text style={{color:'black', fontSize:20, fontWeight:'600',
          alignContent:'center', textAlign:'center' }}> 
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