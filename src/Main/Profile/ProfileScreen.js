import React, { useContext, useEffect } from 'react';
import { Container, Content, Header, Text, List, ListItem } from 'native-base';
import { HeaderBackButton } from 'react-navigation-stack';

import { Context } from '../../Store/appContext'

import ProfileBio from './Components/ProfileBio';
import HistoryList from './Components/HistoryList'

export default ProfileScreen = (props) => {
  const { store, actions } = useContext(Context)
  const { navigation } = props;

  let nickname = navigation.getParam('nickname', 'default_value');
  let id = navigation.getParam('id', 'NO-ID');

  useEffect(() => {
    var x = actions.profile.view(id)
    console.log(store.profile.view)
  });
  
  return(
    <Container> 
      <Header style={{justifyContent:'flex-start'}}>
        <HeaderBackButton onPress={()=> props.navigation.goBack()} />
      </Header>
      <Content contentContainerStyle={{ justifyContent:'center'}}>
        {/* PROFILE BIO */}
        <ProfileBio navigation={props.navigation} />
        {/* HISTORY LIST */}
        <HistoryList />
      </Content>
    </Container>
  )
}
