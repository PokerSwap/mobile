import React, {Component} from 'react';
import { Header, Body, Text, Left, Right, Icon } from 'native-base';

export default class _Header extends Component {
  constructor(props){
    super(props);
    this.state={}
  }

  render(){
    return(
      <Header>
        
        {/* MENU ICON */}
        <Left>
          <Icon name="menu"
            onPress={() => this.props.drawer()}/>
        </Left>
        
        {/* TITLE */}
        <Body>
          <Text>Swap Profit</Text>
        </Body>
        
        {/* TUTORIAL ICON */}
        <Right>
          <Icon name="ios-clock"/>
        </Right>
      
      </Header>
    )
  }
}