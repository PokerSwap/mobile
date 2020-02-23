import React from 'react'
import {Text} from 'native-base'
import {Col, Row} from 'react-native-easy-grid'

export default BuyInAttribute = (props) => {

  return(
    <Col>

      <Row style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center', color:props.txt}}> 
          {props.top} 
        </Text>
      </Row>

      <Row style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center', color:props.txt}}> 
          {props.bottom} 
        </Text>
      </Row>

    </Col> 
  )
}