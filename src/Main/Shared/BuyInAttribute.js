import React, {Component} from 'react';
import {  Text } from 'native-base';
import { Col, Row } from 'react-native-easy-grid'

export default class BuyInAttribute extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }

  render(){
    return(
      <Col>

        <Row style={{justifyContent:'center'}}>
          <Text style={{textAlign:'center'}}> 
            {this.props.top} 
          </Text>
        </Row>

        <Row style={{justifyContent:'center'}}>
          <Text style={{textAlign:'center'}}> 
            {this.props.bottom} 
          </Text>
        </Row>

      </Col> 
    )
  }
}

