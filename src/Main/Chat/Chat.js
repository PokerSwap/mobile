
import React, { useState, useContext, useCallback, useEffect, useRef } from 'react'
import { Context } from '../../Store/appContext'
import { useRoute } from '@react-navigation/native'

import { AppState, View, StatusBar } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

import OtherHeader from '../../View-Components/OtherHeader';

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js' 

export default ChatScreen = (props) => {
  const { store, actions } = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  var route = useRoute()
  var { nickname, their_id, chat_id }  = route.params
  const [messages, setMessages] = useState([]);

  var getChat = async() => {
    console.log('refresh chat here')
    actions.chat.getCurrent(chat_id)
    .then(()=> setMessages(store.currentChat))
    .then(()=> actions.refresh.chat(false))
    .then(()=> console.log('refresh stop', store.refreshChat))
  }

  useEffect(() => {

    getChat()

    return () => {
      actions.chat.wipe()
      actions.chat.getMine()
    }
  }, [store.refreshChat])

  const onSend = useCallback(async(messages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    var wx = await actions.chat.sendMessage(chat_id, their_id, messages[messages.length -1].text)
  }, [])

  // REFRESH AFTER REOPENING FROM BACKGROUND
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    getChat()
    console.log("AppState", appState.current);
  };
 
  return (
    <View style={{flex:1}}>
      <View style={{height:20, position:'absolute', top:0, alignSelf:'flex-start',  backgroundColor:currentStyle.header.color}}>
        <StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
          backgroundColor={'rgb(38, 171, 75)'}/>
      </View>
      <OtherHeader title={nickname}/>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: store.myProfile.id,
          name:store.myProfile.first_name,
          avatar:store.myProfile.profile_pic_url }} />
    </View>
    
  )
}