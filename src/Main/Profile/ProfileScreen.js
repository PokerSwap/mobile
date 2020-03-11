import React, {useContext, useEffect} from 'react';
import {View} from 'react-native'
import { Container, Content, Icon, Button, 
  Left, Header, Text, List, ListItem } from 'native-base';

import ProfileHistoryCard from './Components/ProfileHistoryCard'
import ProfileBio from './Components/ProfileBio';
import SwapList from '../../Main/BuyIn/Components/SwapList'

import Store, {Context} from '../../Store/appContext'



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
  let past = navigation.getParam('past','NO-ID')



  var history =[]
  if(id !== store.myProfile.id ){
    var checkingHistory = past.forEach(
      tracker =>  {
        var y = tracker.buyins.filter(buyin => 
          buyin.recipient_user.id == id)
        if (y.length !== 0) {
          y[0]["tournament_name"] = tracker.tournament.name
          history.push(...y)
         }else {null}
      }
    )
  } else{
    history=store.myPastTrackers
    console.log('wait')
  }
  

  

  return(
    <Container> 
      <Header head>
        <Left>
          <Button transparent  
            onPress={() => navigation.goBack(null)}>
            <Icon 
              type='Ionicons' name='ios-arrow-back' />
          </Button>
        </Left>
      </Header>
      
      <Content contentContainerStyle={{
        justifyContent:'center'}}>

        <ProfileBio navigation={props.navigation} id={id}
          first_name={first_name} nickname={nickname} last_name={last_name} 
          roi_rating={roi_rating} swap_rating={swap_rating} total_swaps={total_swaps}
          hendon_url={hendon_url} profile_pic_url={profile_pic_url}/>

    {id !== store.myProfile.id ? 
      history !== [] ?
        <List style={{justifyContent:'center'}}>
          <ListItem noIndent itemHeader
            style={{justifyContent:'center'}}>
            <Text style={{ textAlign:'center', 
              fontWeight:'600', fontSize:24}}>
              History
            </Text>
          </ListItem>
          {history.map((content, index) => {

            console.log('content',content)
            var allSwaps
            var agreed_swaps = content.agreed_swaps
            var other_swaps = content.other_swaps

            agreed_swaps !== [] ? 
              other_swaps !== [] ?
                allSwaps = [...agreed_swaps, ...other_swaps] 
                : 
                allSwaps = [...agreed_swaps]
              : 
              other_swaps !== [] ?
                allSwaps = [...other_swaps]
                : 
                allSwaps = null
            
                console.log('allSwaps',allSwaps)

            return(
              <ProfileHistoryCard
                key={index}
                allSwaps={allSwaps}
                buyin={content}
                navigation={props.navigation}
                myTrackers={store.myPastTrackers}/>
            )
          })}
        </List>
        :
        <Text>You haven't swapped had any swaps before </Text>
      :
      // <List style={{justifyContent:'center'}}>
      //   <ListItem noIndent itemHeader
      //     style={{justifyContent:'center'}}>
      //     <Text style={{ textAlign:'center', 
      //       fontWeight:'600', fontSize:24}}>
      //       History
      //     </Text>
      //   </ListItem>
      //   {history.}
      // </List>
      <Text> This is you </Text>
             
    }
      </Content>
    </Container>
  )
}
