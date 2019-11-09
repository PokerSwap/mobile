import React, {useContext} from 'react';
import { Container, Content } from 'native-base';
import _Header from '../../View-Components/header'
import ProfileBio from './Components/ProfileBio';
import ProfileHistory from './Components/ProfileHistory'

import {Context} from '../../Store/appContext'

export default ProfileScreen = (props) => {

  const { store, actions } = useContext(Context)

  const { navigation } = props;
  let name = navigation.getParam('user_name', 'NO-ID');
  let id = navigation.getParam('id', 'NO-ID');
  
  let history;

  if (id == store.profile_in_session){
    history = null
  } else {
    history = <ProfileHistory navigation={props.navigation}/>
  }

  return(
    <Container>
      <_Header drawer={() => props.navigation.toggleDrawer()}/>
      <Content>
          <ProfileBio name={name} id={id} />
          {history}
      </Content>
    </Container>
  )
}
