import React, {useContext} from 'react'
import { DrawerItems } from 'react-navigation-drawer'
import { Container, Content, Text, Icon, Button, Card, CardItem } from 'native-base'
import {Alert, View} from 'react-native'

import ProfileBioSideBar from '../Main/Profile/Components/ProfileBioSideBar'
import { Context } from '../Store/appContext'

import AsyncStorage from '@react-native-community/async-storage'

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
          navigation={props.navigation}
        />
      {/* <Card style={{flex:1, flexDirection:'row'}}>
      <View style={{alignSelf:'center'}}>
        <Button iconLeft large warning style={{marginVertical:5, width:100,justifyContent:'center'}}>
          <Icon type='FontAwesome5' name='coins' style={{color:'white'}}/>
          <Text style={{color:'white', fontSize:20, fontWeight:'600'}}>{user.coins}</Text>
        </Button>
      </View>
      <View>
        <Button>
          <Icon type='FontAwesome5' name='coins' style={{color:'white'}}/>
        </Button>
      </View>
      </Card>  */}
            
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
                AsyncStorage.removeItem('loginToken')
                props.navigation.navigate('LogIn')
              }},
            ],
            { cancelable: false }
          )  
        }>
          <Icon name='exit'/>
          <Text  style={{fontWeight: 'bold',textTransform:'none'}}>Logout</Text>
        </Button>
      </View>
    
    </Content>
  </Container>
  )
}
