import React, {Component} from 'react';
import {Button, Text } from 'native-base';
import { Row, Col } from 'react-native-easy-grid';
import { Context } from '../../../Store/appContext'

export default  SwapBody = (props) => {

    return(
      <Row  style={{  displayFlex:1, marginVertical:10, alignItems:'center'}}>
          
        <Context.Consumer>
          {({ store, actions}) => {
            return(
              <Col  style={{justifyContent:'flex-end', width:'75%', alignItems:'center'}}>

                {/* SWAP USERNAME */}
                <Text 
                  // onPress={()=> actions.swap(props.navigation, props.name)}
                  style={{ textAlign:'right', fontSize:30}}>
                  {props.name}
                </Text>  
                  
                {/* SWAP PERCENT  */}
                <Button success large style={{ width:65, marginRight:25}}>
                  <Text>{props.percent}%</Text>
                </Button>
                
              </Col>
            )
          }} 
        </Context.Consumer> 
      </Row>
    )
  }
