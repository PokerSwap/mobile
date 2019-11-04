import React, {Component} from 'react';
import { Container, Content } from 'native-base';
import _Header from '../../View-Components/header'
import ProfileBio from './Components/ProfileBio';
import ProfileHistory from './Components/ProfileHistory'

export default ProfileScreen = (props) => {

  const { navigation } = props;
  let aName = navigation.getParam('name', 'NO-ID');
  let aState = navigation.getParam('state', 'NO-ID');

  
  let header;
  let history;

  if (aState=='public'){
    header= <_Header drawer={() => props.navigation.toggleDrawer()}/>

    history = null
  } else {
    header= <_Header drawer={() => props.navigation.toggleDrawer()}/>
    history = <ProfileHistory navigation={props.navigation}/>
  }

  return(
    <Container>
      {header}
      <Content>
          <ProfileBio name={aName} state={aState}/>
          {history}
      </Content>
    </Container>
  )
}
