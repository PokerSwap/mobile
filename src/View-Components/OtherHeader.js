import React, { useContext, useState } from 'react';
import { Context } from '../Store/appContext'
import { useNavigation } from '@react-navigation/native'

import {View, StatusBar} from 'react-native';
import { Header, Text, Icon } from 'native-base';

import darkStyle from '../Themes/dark.js'
import lightStyle from '../Themes/light.js'

export default OtherHeader = (props) => {
  const { store, actions } = useContext(Context)
  const [disabled, setDisabled] = useState(false)

  const navigation = useNavigation()

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  

  const handler = () => {
    setDisabled(true)
    if(props.title == "Event Lobby"){
      navigation.popToTop()
    }else if(props.title == "User Creation"){
      navigation.pop(2)
    }else{
      navigation.goBack(null)
    }
    setTimeout(()=>{setDisabled(false)}, 1000)
  }

  return(
    
    <View  style={{
      justifyContent:'space-between', flexDirection:'row', 
      alignItems:'flex-end', paddingBottom:12, 
      backgroundColor:currentStyle.header.color,  height:'10%'}}>
      {/* MENU ICON */}
      <Icon disabled={disabled} type="Ionicons" name="ios-chevron-back" 
        style={{marginLeft:10, color:currentStyle.text.color}}
        onPress={() => handler()} />
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