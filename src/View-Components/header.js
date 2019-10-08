import React, {Component} from 'react';
import { Header, Body, Text, Left, Right, Icon } from 'native-base';

export default class _Header extends Component {
    constructor(props){
      super(props);
      this.state={
  
      }
    }
  
    render(){
        return(
            <Header>
              <Left>
                <Icon name="menu"
                  onPress={() => this.props.drawer()}/>
              </Left>
              <Body>
                <Text>Swap Poker</Text>
              </Body>
              <Right>
                <Icon name="question"/>
              </Right>
            </Header>
      )
    }
  }