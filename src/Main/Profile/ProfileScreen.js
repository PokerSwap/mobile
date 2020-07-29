import React from 'react';
import { Container, Content  } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';

import ProfileBio from './Components/ProfileBio';
import HistoryList from './Components/HistoryList'

export default ProfileScreen = (props) => {
  const navigation = useNavigation()
  const route = useRoute()
  const { nickname } = route.params;
  const { user_id } = route.params;
  
  return(
    <Container> 
      <Content contentContainerStyle={{ justifyContent:'center'}}>
        {/* PROFILE BIO */}
        <ProfileBio user_id={user_id} nickname={nickname} />
        {/* HISTORY LIST */}
        <HistoryList user_id={user_id}/>
   
      </Content>
    </Container>
  )
}
