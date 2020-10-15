
import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Context } from '../../Store/appContext'
import { useRoute } from '@react-navigation/native'

import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

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


  useEffect(() => {
    actions.chat.getCurrent(chat_id)
    // setMessages(previousState => GiftedChat.append(previousState.messages, message))
    setMessages(store.currentChat.messages)

    return () => {
      // Fire.shared.off();
    }
  }, [true])

  const onSend = useCallback((message) => {
    actions.chat.sendMessage(chat_id, message)
    setMessages(store.currentChat.messages)
  }, [])
 
  return (
    <View style={{flex:1}}>
      <OtherHeader title={'Chat'}/>

      <GiftedChat
        messages={messages}
         onSend={messagesd => onSend(messagesd)}
        // onSend={() => {
        //   Fire.shared.send
        //   console.log('ummm', Fire.shared.send)
        // }}
        user={{
          _id: store.myProfile.id,
          name:store.myProfile.first_name,
          avatar:store.myProfile.profile_pic_url, 
           }} />
    </View>
    
  )
}