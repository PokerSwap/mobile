
import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Context } from '../../Store/appContext'
import { useRoute } from '@react-navigation/native'
import moment from 'moment'

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

var x = async() => await actions.chat.getCurrent(chat_id)
.then(()=> setMessages(store.currentChat))
  useEffect(() => {
    x()
    // setMessages(previousState => GiftedChat.append(previousState.messages))
    console.log("this messages", messages)
    console.log("This is current Chat",store.currentChat)

    return () => {
      actions.chat.wipe()
    }
  }, [true])

  const onSend = useCallback(async(messages) => {
    // actions.chat.sendMessage(chat_id, message)
    // .then(()=>setMessages(store.currentChat.messages))
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    var wx = await actions.chat.sendMessage(chat_id, messages[messages.length -1].text)
  }, [])
 
  return (
    <View style={{flex:1}}>
      <OtherHeader title={'Chat'}/>

      <GiftedChat
        messages={messages}
         onSend={messages => onSend(messages)}
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