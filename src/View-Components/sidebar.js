import React, {useContext} from 'react'
import { DrawerItems } from 'react-navigation-drawer'
import { Container, Content, Text, Icon, Button } from 'native-base'
import {Alert, View} from 'react-native'

import ProfileBioSideBar from '../Main/Profile/Components/ProfileBioSideBar'
import { Context } from '../Store/appContext'

// DRAWER PHYSICAL COMPONENT
export default SideBar = (props) => {

  const { store, actions } = useContext(Context)
  var profile = store.myProfile

  return(
  <Container>
    
    <Content>
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
          picture={profile.picture}
          navigation={props.navigation} />
            
      {/* DEFAULT BUTTONS */}
      <DrawerItems {...props} />

      {/* LOGOUT OPTION */}
      <View>

        <Button dark transparent
          style={{justifyContent:'flex-start'}}
          onPress={()=>
          Alert.alert(
            'Log out',
            'Do you want to logout?',
            [
              {text: 'Cancel', onPress: () => {return null}},
              {text: 'Confirm', onPress: () => {
                actions.user.logout(props.navigation)
              }},
            ],
            { cancelable: false }
          )  
        }>
          <Icon name='exit'/>
          <Text  style={{fontWeight: 'bold',textTransform:'none'}}>
            Logout</Text>
        </Button>
      </View>
    
    </Content>
  </Container>
  )
}
