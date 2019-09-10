import React, {Component} from "react";
import {  ListItem, Button, Text } from 'native-base';
import SwapHead from './SwapHead';
import SwapBody from './SwapBody';
import { Grid, Col, Row } from 'react-native-easy-grid'

export default class SwapMain extends Component {
    constructor(props){
      super(props);
      this.state={
  
      }
    }
    render(){

      return(
        <ListItem noIndent style={{flex:1, flexDirection:'column'}}>
          <Grid>
            <Col>
              <SwapHead 
                tournament={this.props.tournament} 
                date={this.props.date} year={this.props.year}
                swaps={this.props.swaps}/>
              <Row 
                style={{
                  marginVertical:20, 
                  justifyContent:'center' 
                }}
              >
                <Button large bordered info 
                  style={{
                    marginTop:10, 
                    width:'100%', 
                    justifyContent:'center'
                  }}
                >
                  <Text 
                    style={{fontWeight:"600"}}>
                    {this.props.swaps} SWAPS
                  </Text>
                </Button>
              </Row>
              <SwapBody  
                navigation = {this.props.navigation}
                name={this.props.names[0]} 
                percent={this.props.percents[0]}/>
              <SwapBody  
                navigation = {this.props.navigation}
                name={this.props.names[1]} 
                percent={this.props.percents[1]}/>
              <SwapBody
                navigation = {this.props.navigation}
                name={this.props.names[2]} 
                percent={this.props.percents[2]}/>
              </Col>
          </Grid>
        </ListItem>
      )
    }
  }