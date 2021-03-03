import React, { useContext } from 'react';
import { Context } from '../Store/appContext'
import { useNavigation } from '@react-navigation/native';

import {View, Image, Linking, SafeAreaView} from 'react-native'
import { Container, Content, Text, List, ListItem } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'

import OtherHeader from '../View-Components/OtherHeader'

import darkStyle from '../Themes/dark.js'
import lightStyle from '../Themes/light.js'

export default SettingsScreen = () => {
    const navigation = useNavigation()
    const { store, actions } = useContext(Context)

    var nick
    store.myProfile.nickname == '' ? nick="N/A" : nick= '\n' + store.myProfile.nickname

    var url 
    store.myProfile.hendon_url == '' || store.myProfile.hendon_url == null ? 
        url="N/A" 
        : 
        url= '\n' + store.myProfile.hendon_url

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    return(
        <Container>
            <SafeAreaView style={{flex:1,backgroundColor:currentStyle.header.color}}>

            <OtherHeader title={'Settings'} />
            <Content style={{backgroundColor:currentStyle.background.color}}>      
                
                <List>

                    {/* PROFILE BIO ON TOP */}
                    <ListItem noIndent header>
                        <Grid>
                            <Col style={{width:'33%'}}>
                                <View style={{marginLeft:10, width: 100, height:100, 
                                position: 'relative', overflow: 'hidden', borderRadius: 100}}>
                                <Image source={{uri: store.myProfile.profile_pic_url}} 
                                    style={{display: 'flex', margin: 'auto', 
                                    height: '100%', width: 'auto'}} />
                                </View>
                            </Col>
                            <Col>
                                <Row>
                                    <Text style={{color:currentStyle.text.color}}>
                                        Full Name:{'\n'}
                                        {store.myProfile.first_name} {store.myProfile.last_name}
                                    </Text>
                                </Row>
                                <Row>
                                    <Text style={{color:currentStyle.text.color}}>
                                        Nickname: {nick}
                                    </Text>
                                </Row>
                                <Row>
                                    <Text style={{color:currentStyle.text.color}}>
                                        Hendon URL: {url}
                                    </Text>
                                </Row>
                            </Col>
                        </Grid>
                    </ListItem>

                    {/* CHANGE EMAIL BUTTON */}
                    <ListItem noIndent 
                        onPress={()=> navigation.navigate('Change Email')}>
                        <Text style={{color:currentStyle.text.color}}> 
                            Change Email 
                        </Text>
                    </ListItem>

                    {/* CHANGE PASSWORD BUTTON */}
                    <ListItem noIndent 
                        onPress={()=> navigation.navigate('Change Password')}>
                        <Text style={{color:currentStyle.text.color}}>
                            Change Password 
                        </Text>
                    </ListItem>

                    {/* CHANGE PICTURE BUTTON */}
                    <ListItem noIndent 
                        onPress={()=> navigation.navigate('Change Picture')}>
                        <Text style={{color:currentStyle.text.color}}> 
                            Change Profile Picture 
                        </Text>
                    </ListItem>

                    {/* CHANGE NICKNAME BUTTON */}
                    <ListItem noIndent 
                        onPress={()=> navigation.navigate('Change Nickname')}>
                        <Text style={{color:currentStyle.text.color}}> 
                            Change Nickname 
                        </Text>
                    </ListItem>

                    {/* ADD/CHANGE HENDON PROFILE */}
                    {store.myProfile.hendon_url !== null ?
                        <ListItem noIndent 
                            onPress={()=> Linking.openURL("mailto:contact@swapprofitonline.com?subject=" + 
                                store.myProfile.first_name + " " + store.myProfile.last_name + 
                                " - Change Hendon Profile")}>
                            <Text style={{color:currentStyle.text.color}}> 
                                Change Hendon Profile
                            </Text>
                        </ListItem>
                        :
                        <ListItem noIndent 
                            onPress={()=> navigation.navigate('Update Hendon')}>
                            <Text style={{color:currentStyle.text.color}}> 
                                Add Hendon Profile 
                            </Text>
                        </ListItem>
                    }

                    {/* CHANGE NICKNAME BUTTON */}
                    <ListItem noIndent 
                        onPress={()=> navigation.navigate('Configure Notifications')}>
                        <Text style={{color:currentStyle.text.color}}> 
                        Configure Notifications 
                        </Text>
                    </ListItem>

                </List>
            </Content>  
            </SafeAreaView>
        </Container>
    )
}
