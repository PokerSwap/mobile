import React from 'react';
import { Footer, Text, Spinner } from 'native-base';
import { Col } from 'react-native-easy-grid'

export default ActionBar = (props) => {
  var action = props.action

  var bg;
  !action ?
    null : action.actions <= 50 ?
      bg ='green' : bg='red'

  return(
    <Footer style={{maxHeight:60}}>
      {/* CURRENT USER'S NUMBER OF TOURNAMENT SWAPS  */}
      <Col style={{width:'50%', backgroundColor:'blue', alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
      <Text style={{fontSize:24, fontWeight:'600', color:'white', textAlign:'center'}}>
        Swaps:{' '}</Text>
        {!action ? 
          <Spinner/> 
          : 
          <Text style={{fontSize:24, fontWeight:'600', color:'white', textAlign:'center'}}>
            {action.swaps}
          </Text>}
      </Col>
      {/* CURRENT USER'S ACTION  */}
      <Col style={{width:'50%', backgroundColor:'green', alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
      <Text style={{fontSize:24, fontWeight:'600', color:'white', textAlign:'center'}}>
            Action:{' '}</Text>
        {!action ? 
          <Spinner/> 
          : 
           <Text style={{fontSize:24, fontWeight:'600', color:'white', textAlign:'center'}}>
             {action.actions}%</Text>}
      </Col>
    </Footer> 
  )
}