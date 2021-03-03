import React, {useContext} from 'react';
import { Context } from '../../Store/appContext'
import { useRoute } from '@react-navigation/native';

import { View, StatusBar, SafeAreaView } from 'react-native'
import { Container, Content  } from 'native-base';

import ProfileBio from './Components/ProfileBio';
import HistoryList from './Components/HistoryList'

import BounceColorWrapper from '../../Functional/BounceColorWrapper'
import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'
import OtherHeader from '../../View-Components/OtherHeader';

export default ProfileScreen = (props) => {
    const { store, actions } = useContext(Context)

    var currentStyle
        store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
    const route = useRoute()
    const { nickname, user_id } = route.params;
  
    return(
        <Container style={{backgroundColor:currentStyle.background.color}}> 
            <BounceColorWrapper style={{flex: 1}} mainColor={currentStyle.background.color}>
            <View style={{height:20,  backgroundColor:currentStyle.header.color}}>
                <StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
                    backgroundColor={'rgb(38, 171, 75)'}/>
            </View>   
                 
            <SafeAreaView style={{flex:1,backgroundColor:currentStyle.header.color}}>
     
            <OtherHeader title={"Profile Screen"}/>
            <Content contentContainerStyle={{ justifyContent:'center', flex:1, backgroundColor:currentStyle.background.color }}>
                <View style={{ backgroundColor:currentStyle.background.color,flex:1}}>
                {/* PROFILE BIO */}
                <ProfileBio user_id={user_id} nickname={nickname} />
                
                {/* HISTORY LIST */}
                <HistoryList user_id={user_id}/>
                </View>
                
            </Content>
            </SafeAreaView>
            </BounceColorWrapper>
           
        </Container>
    )
}
