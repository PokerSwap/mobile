import React, { useContext, useState } from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Icon } from 'native-base'
import { Alert,  Linking, Switch, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import ProfileBioSideBar from '../Main/Profile/Components/ProfileBioSideBar'
import { Context } from '../Store/appContext'

// DRAWER PHYSICAL COMPONENT
export default SideBar = (props) => {
  const navigation = useNavigation()
  const { store, actions } = useContext(Context)
  var profile = store.myProfile



  return(
    <DrawerContentScrollView {...props}>
    
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

      <DrawerItem label="Feedback"
        icon= {() => <Icon type="FontAwesome5" style={{fontSize:24}} name="users-cog" />}
        onPress={()=>  Linking.openURL("mailto:contact@swapprofitonline.com?subject=" + profile.first_name + " " + profile.last_name + " Feedback")}/>


      {/* LOGOUT OPTION */}
      <DrawerItem label="Log Out"
        icon= {() => <Icon type="Ionicons" name="ios-exit" />}
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

