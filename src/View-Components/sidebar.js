import React, {useContext} from 'react'
import { DrawerItems } from 'react-navigation-drawer'
import { Container, Content, Text, Icon, Button } from 'native-base'
import {Alert, View} from 'react-native'

import ProfileBio from '../Main/Profile/Components/ProfileBio'
import { Context } from '../Store/appContext'

import AsyncStorage from '@react-native-community/async-storage'

// DRAWER PHYSICAL COMPONENT
export default SideBar = (props) => {

  const { store, actions } = useContext(Context)
  var user = store.myProfile

  return(
  <Container>
    
    <Content>
      <ProfileBio 
        style={{marginTop:11}}
        first_name={user.first_name}
        last_name={user.last_name}
        profile_pic_url={user.profile_pic_url}
        username={user.username}
        roi={user.roi}
        rating={user.rating}
        picture={user.picture}
      />
      <View style={{alignSelf:'center'}}>
        <Button iconLeft large warning style={{marginVertical:5, width:100,justifyContent:'center'}}>
          <Icon type='FontAwesome5' name='coins' style={{color:'white'}}/>
          <Text style={{color:'white', fontSize:20, fontWeight:'600'}}>{user.coins}</Text>
        </Button>
      </View>
            
      {/* DEFAULT BUTTONS */}
      <DrawerItems {...props} />
      
      {/* LOGOUT OPTION */}
      <View>

        <Button transparent
          style={{justifyContent:'flex-start'}}
          onPress={()=>
          Alert.alert(
            'Log out',
            'Do you want to logout?',
            [
              {text: 'Cancel', onPress: () => {return null}},
              {text: 'Confirm', onPress: () => {
                AsyncStorage.removeItem('loginToken')
                props.navigation.navigate('LogIn')
              }},
            ],
            { cancelable: false }
          )  
        }>
          <Icon name='exit'/>
          <Text style={{fontWeight: 'bold'}}>Logout</Text>
        </Button>
      </View>
    
    </Content>
  </Container>
  )
}
