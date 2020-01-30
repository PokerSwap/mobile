import React, {useState} from 'react';
import { Header, Text, Icon } from 'native-base';

export default _Header = (props) => {

  return(
    <Header  style={{justifyContent:'space-between', alignItems:'center', backgroundColor:'rgb(248,248,248)'}}>
      
      {/* MENU ICON */}
      <Icon name="menu"
        onPress={() => props.drawer()}
        style={{marginLeft:10}}
      />
      
      {/* TITLE */}
      <Text style={{fontWeight:'bold', fontSize:20, color:'black'}}>{props.title}</Text>
      
      {/* TUTORIAL ICON */}
      <Icon 
        style={{marginRight:10}}
        type="SimpleLineIcons" 
        name="question"
        onPress={()=> props.tutorial()}
      />
    
    </Header>
  )
}
