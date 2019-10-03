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
                  <Text style={{fontWeight:"600"}}>
                    {this.props.swaps} SWAPS
                  </Text>
                </Button>
              </Row>
              
              {/* TOURNEY BUYIN ENTRIES 
              <Content.Consumer>
                {({store, actions}) => {
                  return store.swaps.map((content, index) => {
                    return(
                      <SwapBody
                        id = {content.id}
                        name={content.name}
                        percent={content.percent}
                        state={content.status}
                        navigation={this.props.navigation}/>
                    )
                  })
                }}
              </Content.Consumer> */}
              
              </Col>
          </Grid>
        </ListItem>
      )
    }
  }