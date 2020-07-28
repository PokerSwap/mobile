import React, { useState, useContext, useEffect } from 'react';
import { View, Image } from 'react-native'
import { Container, Content, List, Spinner, ListItem, Text, Icon } from 'native-base';
import { useNavigation, useRef, useRoute } from '@react-navigation/native'
import { Col } from 'react-native-easy-grid'

import { Context } from '../../Store/appContext'

import OtherHeader from '../../View-Components/OtherHeader'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ContactsScreen = (props) => {
  const { store, actions } = useContext(Context)

  const route = useRoute()
  const navigation = useNavigation()

  // var aProfile

  // useEffect(() => {
  //   x()
    
  //   return () => {
  //     // cleanup
  //   }
  // }, [null])

  var x = {
    coins: 0,
    created_at: "Sun, 26 Jul 2020 21:35:15 GMT",
    devices: [],
    email: "katz234@gmail.com",
    first_name: "Cary",
    hendon_url: "https://pokerdb.thehendonmob.com/player.php?a=r&n=26721",
    id: 2,
    last_name: "Katz",
    nickname: "",
    profile_pic_url: "https://pokerdb.thehendonmob.com/pictures/carykatzpic.png",
    roi_rating: 100.0,
    swap_availability_status: "active",
    swap_rating: 4.3,
    total_swaps: 26,
    transactions: [],
    updated_at: "Mon, 27 Jul 2020 00:35:12 GMT"
  }

  const enterProfile = () => {
    navigation.push('Profile',{
      user_id: x.id,
      nickname: "Cary Katz" 
    });
  }

  const enterChat = () => {
    navigation.push('Chat');
  }

  return(
    <Container>      
      <Content>
      <OtherHeader title={'Contacts'} 
        goBackToHome={() => navigation.goBack(null)}/>
        <List>
          <ListItem noIdent>
            <Col style={{width:"20%"}}>
              <TouchableOpacity onPress={() => enterProfile()}>
              <View  
            style={{marginTop:'4%', width: 60, 
                height: 60, position: 'relative',
                overflow: 'hidden', borderRadius: 100}}>
                {x ?
                  <Image style={{
                    display: 'flex', margin: 'auto', 
                    height: '100%', width: 'auto'}} 
                    source={{uri: x.profile_pic_url}} />
                  : null}
                </View>
              </TouchableOpacity>
            
            </Col>
            <Col style={{width:"80%" }}>
              <TouchableOpacity onPress={() => enterChat()}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={{marginLeft:10,fontSize:24, textAlign:'left'}}>{x.first_name} {x.last_name}</Text>
                  <Icon name="angle-right" type="FontAwesome5"/>
                </View>
              </TouchableOpacity>
            </Col>
          </ListItem>
        </List>
      </Content>
    </Container>
  )
}