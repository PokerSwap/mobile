import React, {useContext} from 'react';
import { Container, Content, Icon, Button, Left, Header, Text, Card, CardItem } from 'native-base';
import { TouchableOpacity, View} from 'react-native'
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";



import ProfileBio from './Components/ProfileBio';
import ProfileHistory from './Components/ProfileHistory'

import {Context} from '../../Store/appContext'

export default ProfileScreen = (props) => {

  const { store, actions } = useContext(Context)

  const { navigation } = props;
  let first_name = navigation.getParam('first_name', 'default_value');
  let last_name = navigation.getParam('last_name', 'NO-ID');
  let nickname = navigation.getParam('nickname', 'default_value');

  let id = navigation.getParam('id', 'NO-ID');
  let roi_rating = navigation.getParam('roi_rating', 'NO-ID');
  let swap_rating = navigation.getParam('swap_rating', 'NO-ID');
  let total_swaps = navigation.getParam('total_swaps', 'NO-ID');

  let hendon_url = navigation.getParam('hendon_url', 'NO-ID');
  let profile_pic_url = navigation.getParam('profile_pic_url','NO-ID')

  let history;

  id == store.myProfile.id ? 
    history = <ProfileHistory navigation={props.navigation}/>
    :
    history = 
      <Card transparent >
        <CardItem style={{ justifyContent:'center'}}>
          <Text style={{fontSize:24, fontWeight:'600', textAlign:'center'}}> 
            You haven't swapped with this person before.
          </Text>
        </CardItem>
      </Card> 
  
  
  return(
    <Container> 
      <Header head>
        <Left>
          <Button transparent  onPress={() => navigation.goBack(null)}>
            <Icon type='Ionicons' name='ios-arrow-back' />
          </Button>
        </Left>
        
      </Header>
      <Content contentContainerStyle={{justifyContent:'center'}}>

        <ProfileBio 
          navigation={props.navigation} id={id}
          first_name={first_name} nickname={nickname} last_name={last_name} 
          roi_rating={roi_rating} swap_rating={swap_rating} total_swaps={total_swaps}
          hendon_url={hendon_url} profile_pic_url={profile_pic_url}/>
        {history}
      </Content>
    </Container>
  )
}
