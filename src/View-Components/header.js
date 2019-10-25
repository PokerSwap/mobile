import React, {Component} from 'react';
import { Header, Body, Text, Left, Right, Icon } from 'native-base';

export default class _Header extends Component {
  constructor(props){
    super(props);
    this.state={}
  }

  render(){
    return(
      <Header style={{justifyContent:'space-between', alignItems:'center'}}>
        
        {/* MENU ICON */}
          <Icon name="menu"
            onPress={() => this.props.drawer()}/>
        
        {/* TITLE */}
          <Text style={{fontWeight:'600'}}>{this.props.title}</Text>
        
        {/* TUTORIAL ICON */}
          <Icon name="ios-clock"/>
      
      </Header>
    )
  }
}