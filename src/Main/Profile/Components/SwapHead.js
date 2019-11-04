import React, {Component} from 'react';
import { Button, Text } from 'native-base';
import { Col, Row } from 'react-native-easy-grid';

export default SwapHead = () => {
  return(
    <Row>

      <Col style={{justifyContent:'center'}}>
        
        <Button large bordered info style={{
          flexDirection:"column", 
          justifyContent:"center",
          marginTop:20,
          marginLeft:10,
          height:80,
          width:80}}>
          <Text 
            style={{
              fontWeight:"bold", 
              textAlign:'center'}}>
            {props.date}
          </Text>
        </Button> 
      
      </Col>              
      
      <Col style={{ 
        alignItems:'flex-start', 
        width:'70%',
        justifyContent:'flex-start'}}
      >
        <Row style={{justifyContent:'flex-start'}}>
          <Text style={{
            fontSize:24, 
            textAlign:'left',
            fontWeight:'600'}}>
            {props.tournament}
          </Text>
        </Row>
      </Col>      
    
    </Row>
        
  )
}
