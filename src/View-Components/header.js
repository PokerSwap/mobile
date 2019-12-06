import React, {useState} from 'react';
import { Header, Text, Icon } from 'native-base';

export default _Header = (props) => {

  return(
    <Header  style={{justifyContent:'space-between', alignItems:'center'}}>
      
      {/* MENU ICON */}
      <Icon name="menu"
        onPress={() => props.drawer()}
        style={{marginLeft:10}}
      />
      
      {/* TITLE */}
      <Text style={{fontWeight:'600'}}>{props.title}</Text>
      
      {/* TUTORIAL ICON */}
      <Icon 
        style={{marginRight:10}}
        type="SimpleLineIcons" 
        name="question"
        onPress={()=> props.navigation.navigate('Tutorial')}
      />
    
    </Header>
  )
}
