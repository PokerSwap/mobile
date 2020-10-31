import React, {useContext} from 'react';
import { Context } from '../Store/appContext'

import { View } from 'react-native'
import { Header, Text, Icon } from 'native-base';
import {  DrawerActions, useNavigation } from '@react-navigation/native';

import darkStyle from '../Themes/dark.js'
import lightStyle from '../Themes/light.js'

export default HomeHeader = (props) => {

  const { store, actions } = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  
  const navigation = useNavigation()
  return(
    <View style={{ height:50,justifyContent:'space-between', flexDirection:'row', alignItems:'center', 
      backgroundColor:currentStyle.header.color}}>
      {/* MENU ICON */}
      <Icon type="FontAwesome5" name="bars" style={{marginLeft:10, color:currentStyle.text.color}}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>
      {/* TITLE */}
      <Text style={{fontWeight:'bold', fontSize:20, color:currentStyle.text.color}}>
        {props.title}
      </Text>
      {/* TUTORIAL ICON */}
      <View></View>
      {/* <Icon style={{marginRight:10}} type="FontAwesome5" name="bell"
        // onPress={()=> navigation.push("Notifications")} 
        /> */}
    </View>
  )
}
