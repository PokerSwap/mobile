import React, {useContext} from 'react';
import { Container, Content, Button, Text } from 'native-base';
import _Header from '../../View-Components/header'
import ProfileBio from './Components/ProfileBio';
import ProfileHistory from './Components/ProfileHistory'

import {Context} from '../../Store/appContext'

export default ProfileScreen = (props) => {

  const { store, actions } = useContext(Context)

  const { navigation } = props;
  let first_name = navigation.getParam('first_name', 'NO-ID');
  let last_name = navigation.getParam('last_name', 'NO-ID');
  let id = navigation.getParam('id', 'NO-ID');
  let roi = navigation.getParam('roi', 'NO-ID');
  let hendon_url = navigation.getParam('hendon_url', 'NO-ID');
  let profile_pic_url = navigation.getParam('profile_pic_url','NO-ID')

  let history;

  if (id == store.my_profile.id){
    history = null
  } else {
    history = <ProfileHistory navigation={props.navigation}/>
  }

  return(
    <Container>
      <_Header drawer={() => props.navigation.toggleDrawer()}/>
      <Content>
          <Button onPress={() => props.navigation.goBack(null)} title="Go back anywhere" />

          <ProfileBio 
            first_name={first_name} last_name={last_name} 
            roi={roi} hendon_url={hendon_url} 
            profile_pic_url={profile_pic_url}/>
          {history}
      </Content>
    </Container>
  )
}
