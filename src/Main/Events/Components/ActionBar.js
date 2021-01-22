import React from 'react';
import { Footer, Text, Spinner } from 'native-base';
import { Col } from 'react-native-easy-grid'

export default ActionBar = (props) => {

  var bg;
  !props.action ?
    bg='grey' : props.action.actions < 50 ?
      bg ='green' : bg='red'

  return(
    <Footer style={{maxHeight:60}}>
      {/* CURRENT USER'S NUMBER OF TOURNAMENT SWAPS  */}
      <Col style={{width:'50%', backgroundColor:'blue', alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
        <Text style={{fontSize:24, fontWeight:'600', color:'white', textAlign:'center'}}>
          Swaps:{' '}
        </Text>
        {!props.action ? 
          <Spinner/> 
          : 
          <Text style={{fontSize:24, fontWeight:'600', color:'white', textAlign:'center'}}>
            {props.action.swaps}
          </Text>}
      </Col>
      {/* CURRENT USER'S ACTION  */}
      <Col style={{width:'50%', backgroundColor:bg, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
        <Text style={{fontSize:24, fontWeight:'600', color:'white', textAlign:'center'}}>
          Action:{' '}
        </Text>
        {!props.action ? 
          <Spinner/> 
          : 
          <Text style={{fontSize:24, fontWeight:'600', color:'white', textAlign:'center'}}>
             {props.action.actions}%
          </Text>}
      </Col>
    </Footer> 
  )
}