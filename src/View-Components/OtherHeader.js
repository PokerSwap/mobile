import React, { useContext } from 'react';
import { Context } from '../Store/appContext'
import { useNavigation } from '@react-navigation/native'

import { Header, Text, Icon } from 'native-base';

import darkStyle from '../Themes/dark.js'
import lightStyle from '../Themes/light.js'

export default OtherHeader = (props) => {
  const { store, actions } = useContext(Context)

  const navigation = useNavigation()

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  
  return(
    <Header  style={{justifyContent:'space-between', alignItems:'center', backgroundColor:currentStyle.background.color}}>
      {/* MENU ICON */}
      <Icon type="Ionicons" name="ios-chevron-back" style={{marginLeft:10}}
        onPress={() => navigation.goBack(null)} />
      {/* TITLE */}
      <Text style={{fontWeight:'bold', fontSize:20, color:currentStyle.text.color}}>
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