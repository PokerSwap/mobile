import React, {Component} from 'react';
import { Header, Text, Icon } from 'native-base';

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
          onPress={() => this.props.drawer()}
          style={{marginLeft:10}}
        />
        
        {/* TITLE */}
        <Text style={{fontWeight:'600'}}>{this.props.title}</Text>
        
        {/* TUTORIAL ICON */}
        <Icon 
          style={{marginRight:10}}
          type="SimpleLineIcons" 
          name="question"
        />
      
      </Header>
    )
  }
}