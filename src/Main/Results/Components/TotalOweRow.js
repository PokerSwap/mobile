import React, { useContext } from 'react';
import { Context } from '../../../Store/appContext'

import { Text } from 'native-base';
import { Row, Col} from 'react-native-easy-grid'

import darkStyle from '../../../Themes/dark.js'
import lightStyle from '../../../Themes/light.js'

export default TotalOweRow = (props) => {
    const { store, actions } = useContext(Context)

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    return(
        <Row style={{paddingTop:20, borderTopWidth:1, backgroundColor: currentStyle.background.color, 
            borderColor:'#D3D3D3'}}>
            <Col style={{width:'25%'}}>
                <Text style={{fontSize:24, color: currentStyle.text.color}}>Total</Text>
            </Col>
            <Col>
                {props.you_owe_total ?
                    <Text style={{fontSize:24, fontWeight:'600',textAlign:'center', 
                        color: currentStyle.text.color}}>
                        ${props.you_owe_total.toFixed(2)}
                    </Text>
                    :
                    <Text style={{fontSize:36, textAlign:'left', color: currentStyle.text.color}}>-</Text>}
            </Col>
            
            <Col style={{justifyContent:'flex-start'}}>
                {props.they_owe_total ?
                <Text style={{
                    fontSize:24, fontWeight:'600',textAlign:'center', color: currentStyle.text.color}}>
                    ${props.they_owe_total.toFixed(2)}
                </Text>
                :
                <Text style={{fontSize:36, textAlign:'left', color: currentStyle.text.color}}>-</Text>}
            </Col>
        </Row>
    )
}