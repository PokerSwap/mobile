import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation, useRoute } from '@react-navigation/native'

import { View, Image, TouchableOpacity } from 'react-native'
import { Container, Content, List, ListItem, Text, Icon } from 'native-base';
import { Col } from 'react-native-easy-grid'

import OtherHeader from '../../View-Components/OtherHeader'

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default ContactsScreen = (props) => {
  const { store, actions } = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const navigation = useNavigation()

  const enterProfile = (id, first_name) => {
    navigation.push('Profile',{
      user_id: id,
      nickname: first_name,
    });
  }

  const enterChat = (chat_id, profile_pic_url, first_name) => {
    navigation.push('Chat', {
      a_avatar: profile_pic_url,
      nickname: first_name,
      chat_id: chat_id
    });
  }

  return(
    <Container style={{backgroundColor:currentStyle.background.color}}>      
      <Content contentContainerStyle={{backgroundColor:currentStyle.background.color}}>
      <OtherHeader title={'Contacts'} />
        <List>
          {store.myChats.map(chat => {
            var chatName
            chat.chat_user.nickname !== "" ? chatName = chat.chat_user.nickname : chatName = chat.chat_user.first_name + ' ' + chat.chat_user.last_name
            return(
            <ListItem noIdent key={chat.id}>
            <Col style={{width:"20%"}}>
              <TouchableOpacity onPress={() => enterProfile(chat.chat_user.id, chat.chat_user.first_name)}>
              <View  
            style={{marginTop:'4%', width: 60, 
                height: 60, position: 'relative',
                overflow: 'hidden', borderRadius: 100}}>
                {chat.chat_user.profile_pic_url ?
                  <Image style={{
                    display: 'flex', margin: 'auto', 
                    height: '100%', width: 'auto'}} 
                    source={{uri: chat.chat_user.profile_pic_url}} />
                  : null}
                </View>
              </TouchableOpacity>
            
            </Col>
            <Col style={{width:"80%" }}>
              <TouchableOpacity onPress={() => enterChat(chat.chat_user.id,chat.chat_user.profile_pic_url, chat.chat_user.first_name)}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={{marginLeft:10,fontSize:24, textAlign:'left', color: currentStyle.text.color}}>{chatName}</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{color: currentStyle.text.color}}>{chat.since}</Text>
                    <Icon name="angle-right" type="FontAwesome5" style={{marginLeft:10,color: currentStyle.text.color}}/>
                  </View>
                </View>
              </TouchableOpacity>
            </Col>
          </ListItem>)
          })}
          
        </List>
      </Content>
    </Container>
  )
}