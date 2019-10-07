import React, {Component} from 'react';
import {Button, Text } from 'native-base';
import { Row, Col } from 'react-native-easy-grid';
import { Context } from '../../../Store/appContext'

export default class SwapBody extends Component {
    constructor(props){
      super(props);
      this.state={
      }
    }
    render(){
      return(
        <Row  style={{  displayFlex:1, marginVertical:10, alignItems:'center'}}>
          <Col  style={{justifyContent:'flex-end', width:'75%', alignItems:'center'}}>
            <Context.Consumer>
              {({ store, actions}) => {
                return(
                  <Text 
                    onPress={()=> actions.swap(this.props.navigation, this.props.name)}
                    style={{ textAlign:'right', fontSize:30}}>
                    {this.props.name}
                  </Text>  
                )
              }} 
            </Context.Consumer> 
          </Col> 
          <Col style={{  alignItems:'flex-end',  width:'25%'}}> 
            <Button success large style={{ width:65, marginRight:25}}>
              <Text>{this.props.percent}%</Text>
            </Button>
          </Col>
        </Row>
      )
    }
}