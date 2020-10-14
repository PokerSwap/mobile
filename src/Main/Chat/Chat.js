
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
  var { a_avatar, nickname }  = route.params
  const [ chat, setChat ] = useState()
  const [messages, setMessages] = useState([{
    _id: 1, // Message Id
    text: 'Hello developer', // Actual test
    createdAt: new Date(), //Fine
    user: {
      _id: 2, // Fire store ID
      name: nickname, // Profile Name their_Profile.name
      avatar: a_avatar, // Profile Pic theirProifle.pic
    },
  }]);


  useEffect(() => {
    actions.chat.getCurrent()
    Fire.shared.on(message => 
      setMessages(previousState => GiftedChat.append(previousState.messages, message))
    );
    Fire.shared.on(message => console.log('message in store',message))
    console.log('messahes', messages)

    setMessages([
      {
        _id: 1, // Message Id
        text: 'Hello developer', // Actual test
        createdAt: new Date(), //Fine
        user: {
          _id: 2, // Fire store ID
          name: nickname, // Profile Name their_Profile.name
          avatar: a_avatar, // Profile Pic theirProifle.pic
        },
      },
    ])
    return () => {
      Fire.shared.off();
    }
  }, [true])

 
  const onSend = useCallback((messages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
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
          _id: Fire.shared.uid,
          name:store.myProfile.first_name,
          avatar:store.myProfile.profile_pic_url, 
           }} />
    </View>
    
  )
}