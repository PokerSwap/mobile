import React from 'react'
import { DrawerItems } from 'react-navigation-drawer'
import { Container, Content, Text, Icon, Button } from 'native-base'
import {Alert, View} from 'react-native'

import ProfileBio from '../Main/Profile/Components/ProfileBio'
import { Context } from '../Store/appContext'

// DRAWER PHYSICAL COMPONENT
export default SideBar = (props) => (
  <Container>
    
    <Content>
      
    <Context.Consumer>
        {({ store, actions }) => {
          var user = store.profile_in_session
            return(
              <ProfileBio 
              style={{marginTop:11}}
            first_name={user.first_name}
            last_name={user.last_name}
            username={user.username}
            roi={user.roi}
            rating={user.rating}
            picture={user.picture}
          />
            )
          }
        }
      </Context.Consumer>
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

