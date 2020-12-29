import React, { useContext } from 'react';
import { Context } from '../Store/appContext'
import { useNavigation } from '@react-navigation/native'

import {View, StatusBar} from 'react-native';
import { Header, Text, Icon } from 'native-base';

import darkStyle from '../Themes/dark.js'
import lightStyle from '../Themes/light.js'

export default OtherHeader = (props) => {
  const { store, actions } = useContext(Context)

  const navigation = useNavigation()

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  
  return(
    
    <View  style={{
      justifyContent:'space-between', flexDirection:'row', 
      alignItems:'flex-end', paddingBottom:12, 
      backgroundColor:currentStyle.header.color,  height:'10%'}}>
      {/* MENU ICON */}
      <Icon type="Ionicons" name="ios-chevron-back" 
        style={{marginLeft:10, color:currentStyle.text.color}}
        onPress={() => navigation.goBack(null)} />
      {/* TITLE */}
      <Text style={{fontWeight:'bold', textAlign:'center', fontSize:20, 
        color:currentStyle.text.color}}>
        {props.title}
      </Text>
      {/* TUTORIAL ICON */}
      <Icon 
        style={{opacity:0}}
        type="SimpleLineIcons" 
        name="question"
        onPress={()=> props.tutorial()}/>

    </View>
    
  )
}