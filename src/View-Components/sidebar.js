import React, { useContext, useState } from 'react'
import { Context } from '../Store/appContext'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import { Alert,  Linking, Switch, Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

import ProfileBioSideBar from '../Main/Profile/Components/ProfileBioSideBar'

import darkStyle from '../../src/Themes/dark.js'
import lightStyle from '../../src/Themes/light.js'

export default SideBar = (props) => {
  const navigation = useNavigation()
  const { store, actions } = useContext(Context)
    
  var uiMode = store.uiMode
  const [currentMode, setCurrentMode] = useState(uiMode)
  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const changeNow = async() => {
    var x = !currentMode
    setCurrentMode(x)
    var e = await actions.uiMode.change(x)
    AsyncStorage.setItem('uiMode', x.toString())
  }

  var profile = store.myProfile

  return(
    <DrawerContentScrollView style={{backgroundColor:currentStyle.background.color}}{...props}>
    
      <ProfileBioSideBar
        user_id={profile.id}
        first_name={profile.first_name}
        nickname={profile.nickname}
        last_name={profile.last_name}
        profile_pic_url={profile.profile_pic_url}
        username={profile.username}
        hendon_url={profile.hendon_url}
        roi_rating={profile.roi_rating}
        swap_rating={profile.swap_rating}
        total_swaps={profile.total_swaps}
        picture={profile.picture} />
      {/* DEFAULT BUTTONS */}
      <DrawerItemList {...props} />

      <DrawerItem label="Feedback" labelStyle={{color:currentStyle.text.color}}
        icon= {() => <Icon type="FontAwesome5" name="users-cog"
          style={{fontSize:24, color:currentStyle.text.color }} />}
        onPress={()=>  Linking.openURL("mailto:contact@swapprofitonline.com?subject=" + profile.first_name + " " + profile.last_name + " Feedback")}/>
      
      <View style={{flexDirection:'row'}}>
        <Icon type="FontAwesome5" name="moon" 
        style={{color:currentStyle.text.color}}/>
        <Text style={{color:currentStyle.text.color}}>Dark Mode</Text>
        <Switch value={!currentMode} onValueChange={() => changeNow()}/>
      </View>
      
      {/* LOGOUT OPTION */}
      <DrawerItem label="Log Out" labelStyle={{color:currentStyle.text.color}}
        icon= {() => <Icon type="Ionicons" name="ios-exit" 
          style={{fontSize:24, color:currentStyle.text.color }}/>}
        onPress={()=>
          Alert.alert(
            'Log out',
            'Do you want to logout?',
            [
              {text: 'Cancel', onPress: () => {return null}},
              {text: 'Confirm', onPress: () => actions.user.logout(navigation)},
            ],
            { cancelable: false }
      )}/>
      
    </DrawerContentScrollView>
  )
}

