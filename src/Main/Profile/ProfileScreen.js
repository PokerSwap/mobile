import React, { useContext, useEffect } from 'react';
import { Container, Content, Header, Text, List, ListItem } from 'native-base';
import { HeaderBackButton } from 'react-navigation-stack';

import { Context } from '../../Store/appContext'

import ProfileBio from './Components/ProfileBio';
import HistoryList from './Components/HistoryList'

export default ProfileScreen = (props) => {
  const { navigation } = props;

  let nickname = navigation.getParam('nickname', 'default_value');
  let user_id = props.navigation.getParam('user_id', 'NO-ID');
  

  return(
    <Container> 
      <Header style={{justifyContent:'flex-start'}}>
        <HeaderBackButton onPress={()=> props.navigation.goBack()} />
      </Header>
      <Content contentContainerStyle={{ justifyContent:'center'}}>
        {/* PROFILE BIO */}
        <ProfileBio user_id={user_id} navigation={props.navigation} />
        {/* HISTORY LIST */}
        <HistoryList user_id={user_id}/>
      </Content>
    </Container>
  )
}
