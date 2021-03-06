import React, { useState, useContext, useEffect, useRef } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation, useRoute } from '@react-navigation/native'

import { AppState, View, Image, TouchableOpacity, SafeAreaView } from 'react-native'
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

    const enterChat = (chat_id, they_id, profile_pic_url, first_name) => {
        // console.log("Chat id", chat_id)
        console.log('theyid', they_id)
        navigation.push('Chat', {
            a_avatar: profile_pic_url,
            nickname: first_name,
            their_id: they_id,
            chat_id: chat_id
        });
    }

    useEffect(() => {  
        const unsubscribe = navigation.addListener('focus', () => {
            actions.chat.getMine() 
        });
        return () => {
            unsubscribe
        }
    }, [])

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
        actions.chat.getMine()
        console.log("AppState", appState.current);
    };

    return(
        <Container style={{backgroundColor:currentStyle.background.color}}>      
            <SafeAreaView style={{flex:1,backgroundColor:currentStyle.header.color}}>

            <OtherHeader title={'Contacts'} />
            <Content contentContainerStyle={{flex:1,backgroundColor:currentStyle.background.color}}>

                <View style={{flex:1,backgroundColor:currentStyle.background.color}}>

                
                <List style={{flex:1}}>
                {store.myChats.length != 0 ?
                    store.myChats.map(chat => {

                        var chatName
                        chat.chat_user.nickname !== "" ? 
                            chatName = chat.chat_user.nickname 
                            : 
                            chatName = chat.chat_user.first_name
                        var userr

                        var xyz = chat.last_message.message
                        chat.last_message.user_id == store.myProfile.id ?
                            userr = "You: " : userr = chatName + ": "
                        var xyz = chat.last_message.message

                        var preview 
                        xyz.length < 16 ? 
                            preview = userr + xyz : preview = userr + xyz.substr(0,16) + '...'
                        
                        return(
                            <ListItem noIndent key={chat.id}>
                                <Col style={{width:"20%"}}>
                                    <TouchableOpacity onPress={() => enterProfile(
                                        chat.chat_user.id, chat.chat_user.first_name)}>
                                    <View style={{marginTop:'4%', width: 60, 
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
                                    <TouchableOpacity onPress={() => enterChat(chat.id, chat.chat_user.id,
                                        chat.chat_user.profile_pic_url, chat.chat_user.first_name)}>
                                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                        <View style={{flexDirection:'column', alignItems:'flex-start', 
                                            justifyContent:'flex-start', textAlign:'left'}}>
                                            <Text style={{marginLeft:10,fontSize:24, textAlign:'left', 
                                                alignSelf:'flex-start', color: currentStyle.text.color}}>
                                                {chatName}
                                            </Text>
                                            <Text style={{alignSelf:'flex-start',marginLeft:10, 
                                                color: currentStyle.text.color}}>
                                                {preview}
                                            </Text>
                                        </View>
                                        <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{color: currentStyle.text.color}}>
                                            {chat.since}
                                        </Text>
                                        <Icon name="angle-right" type="FontAwesome5" 
                                            style={{marginLeft:10,color: currentStyle.text.color}}/>
                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                </Col>
                            </ListItem> )
                    })
                    :
                    
                    <Text style={{color:currentStyle.text.color, textAlign:'center', marginTop:15}}>
                        You have no chats
                    </Text> }
                
                </List>
                </View>
            </Content>
            </SafeAreaView>
        </Container>
    )
}