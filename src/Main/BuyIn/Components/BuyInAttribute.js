import React, {useContext} from 'react'
import { Context } from '../../../Store/appContext'

import { Text } from 'native-base'
import { Col, Row } from 'react-native-easy-grid'

import darkStyle from '../../../Themes/dark.js'
import lightStyle from '../../../Themes/light.js'

export default BuyInAttribute = (props) => {
    const { store, actions } = useContext(Context)

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

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