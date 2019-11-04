import React, {Component} from 'react';
import {  Text } from 'native-base';
import { Col, Row } from 'react-native-easy-grid'

export default BuyInAttribute = (props) => {

  return(
    <Col>

      <Row style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center'}}> 
          {props.top} 
        </Text>
      </Row>

      <Row style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center'}}> 
          {props.bottom} 
        </Text>
      </Row>

    </Col> 
  )
}
