import React from 'react';
import { Text } from 'native-base';
import { Row, Col} from 'react-native-easy-grid'

export default TotalOweRow = (props) => {
    
  return(
    <Row style={{paddingTop:20, borderTopWidth:1, borderColor:'#D3D3D3'}}>
      <Col style={{width:'25%'}}>
        <Text style={{fontSize:24}}>Total</Text>
      </Col>
      <Col>
        {props.you_owe_total ?
          <Text style={{fontSize:24, fontWeight:'600',textAlign:'center'}}>
            ${props.you_owe_total.toFixed(2)}
          </Text>
          :
          <Text style={{fontSize:36, textAlign:'left'}}>-</Text>}
      </Col>
      
      <Col style={{justifyContent:'flex-start'}}>
        {props.they_owe_total ?
          <Text style={{
            fontSize:24, fontWeight:'600',textAlign:'center'}}>
            ${props.they_owe_total.toFixed(2)}
          </Text>
          :
          <Text style={{fontSize:36, textAlign:'left'}}>-</Text>}
      </Col>
    </Row>
  )
}