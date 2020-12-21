import React,{ useContext} from 'react';
import { Context } from '../../../Store/appContext'

import { Text } from 'native-base';
import { Row, Col} from 'react-native-easy-grid'

import darkStyle from '../../../Themes/dark.js'
import lightStyle from '../../../Themes/light.js'

export default IndividualOweRow = (props) => {
  const {store, actions} = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  return(
    <Row style={{padding:10, borderTopWidth:1, 
      borderColor:'#D3D3D3' }}>
      <Col style={{width:'25%', alignSelf:'center'}}>
        <Text style={{textAlign:'left',  fontSize:24, color:currentStyle.text.color}}>
          Swap {props.number + 1}
        </Text>
      </Col>
      {props.you_owe ?
        <Col>
          <Text style={{ fontSize:20, alignSelf:'center', marginBottom:5, color:currentStyle.text.color}}>
            {props.swap.percentage}%
          </Text>
          <Text style={{fontSize:20, alignSelf:'center', color:currentStyle.text.color}}>
            ${props.you_owe}
          </Text>
        </Col>
      :
        <Col style={{justifyContent:'flex-start'}}>
          <Text style={{alignSelf:'center', fontSize:24, marginBottom:5, textAlign:'center', color:currentStyle.text.color}}>
            {props.swap.counter_percentage}%
          </Text>
          <Text style={{fontSize:36, color:currentStyle.text.color}}>-</Text>                
        </Col>}
      {props.they_owe ?
        <Col style={{justifyContent:'flex-start'}}>
          <Text style={{alignSelf:'center', fontSize:20, marginBottom:5, textAlign:'center', color:currentStyle.text.color}}>
            {props.swap.counter_percentage}%
          </Text>
          <Text style={{fontSize:20, alignSelf:'center', textAlign:'center', color:currentStyle.text.color}}>
            ${props.they_owe}
          </Text>
        </Col>
        :
        <Col style={{justifyContent:'flex-start'}}>
          <Text style={{alignSelf:'center', fontSize:24, marginBottom:5, textAlign:'center', color:currentStyle.text.color}}>
            {props.swap.counter_percentage}%
          </Text>
          <Text style={{fontSize:36, color:currentStyle.text.color}}>-</Text>                
        </Col>}
    </Row>
          
        
        
  )
}