import React, {Component} from "react";
import {  ListItem, Button, Text } from 'native-base';
import SwapHead from './SwapHead';
import SwapBody from './SwapBody';
import { Grid, Col, Row } from 'react-native-easy-grid'
import { Context } from "../../../Store/appContext";

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
              {/* SWAP HEAD 
                W/ TOURNAMENT NAME, START DATE, AND SWAP NUMBERS */}
              <Context.Consumer>
                {({store, actions}) => {

                    <SwapHead 
                    tournament={this.props.tournament} 
                    date={this.props.startat}
                    swaps={this.props.swaps}/>
                }}
              </Context.Consumer>
              
              {/* SWAP BODY  */}
              <Context.Consumer>
                {({store, actions}) => {
                  // var x = store.swaps.filter(swap => swap.id == this.props.swaps)
                   return store.my_swaps.map((content, index) => {

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
              </Context.Consumer>
              
            </Col>
          </Grid>
        </ListItem>
      )
    }
  }