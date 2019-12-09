import React, {useContext} from 'react';
import { Container, Content, Icon, Header, Text } from 'native-base';
import { TouchableOpacity} from 'react-native'

import ProfileBio from './Components/ProfileBio';
import ProfileHistory from './Components/ProfileHistory'

import {Context} from '../../Store/appContext'

export default ProfileScreen = (props) => {

  const { store, actions } = useContext(Context)

  const { navigation } = props;
  let first_name = navigation.getParam('first_name', 'default_value');
  let last_name = navigation.getParam('last_name', 'NO-ID');
  let id = navigation.getParam('id', 'NO-ID');
  let roi = navigation.getParam('roi', 'NO-ID');
  let hendon_url = navigation.getParam('hendon_url', 'NO-ID');
  let profile_pic_url = navigation.getParam('profile_pic_url','NO-ID')

  let history;

  id == store.my_profile.id ? 
    history = null :
      history = <ProfileHistory navigation={props.navigation}/>
  
  return(
    <Container> 
      <Header style={{justifyContent:'flex-start'}}>
        
        <TouchableOpacity 
          onPress={() => props.navigation.goBack()} 
          style={{flexDirection:'row'}}>
          <Icon type='FontAwesome5' name='angle-left'/>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </Header>
      <Content>
        <ProfileBio 
          navigation={props.navigation}
          first_name={first_name} last_name={last_name} 
          roi={roi} hendon_url={hendon_url} 
          profile_pic_url={profile_pic_url}/>
        {history}
      </Content>
    </Container>
  )
}
