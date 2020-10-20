
import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Context } from '../../Store/appContext'
import { useRoute, useNavigation } from '@react-navigation/native'
import moment from 'moment'

import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import {Spinner} from 'react-native-loading-spinner-overlay'

import OtherHeader from '../../View-Components/OtherHeader';
import Fire from './Fire';

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js' 

export default ChatScreen = (props) => {
  const { store, actions } = useContext(Context)


  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  var route = useRoute()
 

  var { a_avatar, nickname, their_id, from_tournament, chat_id }  = route.params
  const [messages, setMessages] = useState();
console.log('chat id', chat_id)
var x = async() => {
    actions.chat.getCurrent(chat_id)
    .then(()=> setMessages(store.currentChat))
    .then(()=> actions.chat.refresh(false))}
  useEffect(() => {

    x()
    console.log("this messages", messages)
    console.log("This is current Chat",store.currentChat)

    return () => {
      actions.chat.wipe()
      actions.chat.getMine()
    }
  }, [store.chatRefresh])

  const onSend = useCallback(async(messages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    var wx = await actions.chat.sendMessage(chat_id, their_id, messages[messages.length -1].text)
  }, [])
 
  return (
    <View style={{flex:1}}>
      <OtherHeader title={nickname}/>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: store.myProfile.id,
          name:store.myProfile.first_name,
          avatar:store.myProfile.profile_pic_url, 
           }} />
    </View>
    
  )
}