import React from 'react';
import { Text } from 'native-base';
import { Row, Col} from 'react-native-easy-grid'


export default IndividualOweRow = (props) => {
    
  return(
    <Row style={{padding:5, borderTopWidth:1, 
      borderColor:'#D3D3D3' }}>
      <Col style={{width:'25%', alignSelf:'center'}}>
        <Text style={{textAlign:'left',  fontSize:24}}>
          Swap {props.number + 1}
        </Text>
      </Col>
      {props.you_owe ?
        <Col>
          <Text style={{ fontSize:20, alignSelf:'center', marginBottom:5}}>
            {props.swap.percentage}%
          </Text>
          <Text style={{fontSize:20, alignSelf:'center'}}>
            ${props.you_owe}
          </Text>
        </Col>
      :
        <Col style={{justifyContent:'flex-start'}}>
          <Text style={{alignSelf:'center', fontSize:24, marginBottom:5, textAlign:'center'}}>
            {props.swap.counter_percentage}%
          </Text>
          <Text style={{fontSize:36}}>-</Text>                
        </Col>}
      {props.they_owe ?
        <Col style={{justifyContent:'flex-start'}}>
          <Text style={{alignSelf:'center', fontSize:20, marginBottom:5, textAlign:'center'}}>
            {props.swap.counter_percentage}%
          </Text>
          <Text style={{fontSize:20, alignSelf:'center', textAlign:'center'}}>
            ${props.they_owe}
          </Text>
        </Col>
        :
        <Col style={{justifyContent:'flex-start'}}>
          <Text style={{alignSelf:'center', fontSize:24, marginBottom:5, textAlign:'center'}}>
            {props.swap.counter_percentage}%
          </Text>
          <Text style={{fontSize:36}}>-</Text>                
        </Col>}
    </Row>
          
        
        
  )
}