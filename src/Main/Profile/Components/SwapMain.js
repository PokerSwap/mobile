import React, {Component} from "react";
import { Context } from "../../../Store/appContext";

import { ListItem } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid'

import SwapHead from './SwapHead';
import SwapBody from './SwapBody';

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
              {/* SWAP HEAD */}
              <Context.Consumer>
                {({store, actions}) => {
                  return(
                    <SwapHead 
                    tournament={this.props.tournament} 
                    date={this.props.startat}
                    swaps={this.props.swaps}/>
                  )
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