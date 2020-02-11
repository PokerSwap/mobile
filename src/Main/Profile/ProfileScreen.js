import React, {useContext} from 'react';
import { Container, Content, Icon, Button, Left, Header, Text, List, ListItem } from 'native-base';

import ProfileHistoryCard from './Components/ProfileHistoryCard'

import ProfileBio from './Components/ProfileBio';

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
   
  var myPastSwaps = []
  var x = store.myPastTrackers.forEach(
    tracker => tracker.swaps.forEach(
      swapBody => myPastSwaps.push(swapBody.swap)
    ))
  var history = myPastSwaps.filter(swapBody => swapBody.recipient_user.id == id)

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

    {id !== store.myProfile.id ? 
      history.length != 0 ?
        <List>
          <ListItem noIndent itemHeader>
            <Text>History</Text>
          </ListItem>
          {history.map((content, index) => {
            return(
              <ProfileHistoryCard 
                key={index}
                id={content.id}
              />
            )
          })}
        </List>
        :
        <Text>You haven't had any swaps with this person</Text>
      :
      null         
    }
      </Content>
    </Container>
  )
}
