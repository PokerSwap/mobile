import React from 'react';
import { View } from 'react-native'
import { Header, Text, Icon } from 'native-base';
import {  DrawerActions, useNavigation } from '@react-navigation/native';

export default HomeHeader = (props) => {
const navigation = useNavigation()
  return(
    <Header style={{ justifyContent:'space-between', alignItems:'center', 
      backgroundColor:'rgb(248,248,248)'}}>
      {/* MENU ICON */}
      <Icon type="FontAwesome5" name="bars" style={{marginLeft:10}}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
      {/* TITLE */}
      <Text style={{fontWeight:'bold', fontSize:20, color:'black'}}>
        {props.title}
      </Text>
      {/* TUTORIAL ICON */}
      <View></View>
      {/* <Icon style={{marginRight:10}} type="FontAwesome5" name="bell"
        // onPress={()=> navigation.push("Notifications")} 
        /> */}
    </Header>
  )
}
