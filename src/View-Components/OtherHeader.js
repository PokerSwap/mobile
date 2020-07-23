import React from 'react';
import { Header, Text, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native'

export default OtherHeader = (props) => {
  const navigation = useNavigation()
  return(
    <Header  style={{justifyContent:'space-between', alignItems:'center', backgroundColor:'rgb(248,248,248)'}}>
      
      {/* MENU ICON */}
      <Icon name="ios-arrow-back" style={{marginLeft:10}}
        onPress={() => navigation.goBack()} />
      
      {/* TITLE */}
      <Text style={{fontWeight:'bold', fontSize:20, color:'black'}}>
        {props.title}
      </Text>
      
      {/* TUTORIAL ICON */}
      <Icon 
        // style={{marginRight:10}}
        // type="SimpleLineIcons" 
        // name="question"
        // onPress={()=> props.tutorial()}
      />
    
    </Header>
  )
}