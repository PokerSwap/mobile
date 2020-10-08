import React, { useContext } from 'react';
import { Context } from '../../../Store/appContext'
import { useNavigation } from '@react-navigation/native';

import { Image, View } from 'react-native'
import { Button, Icon, Card, CardItem, Text } from 'native-base';

import darkStyle from '../../../Themes/dark.js'
import lightStyle from '../../../Themes/light.js'

export default ProfileBioSideBar = (props) => {
  const {store, actions} = useContext(Context)
  const navigation = useNavigation()

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const enterProfile = async() => {
    navigation.push('Profile',{
      nickname: store.myProfile.nickname,
      user_id: store.myProfile.id
    });
  }

  let ifNickName
  props.nickname !== '' && props.nickname !== null ?
    ifNickName = ' "' + props.nickname + '" '
    : ifNickName = ' '

  var goPurchase = () => navigation.navigate('Purchase Tokens')
  
  return(
    <Card transparent style={{flex:1, flexDirection:'column', paddingTop:20}}>
      {/* YOUR PICTURE AND TOKENS */}
      <CardItem style={styles.topContainer}>
        {/* YOUR PICTURE */}
        <View style={styles.picture.container}>
          <Image source={{uri: props.profile_pic_url}} 
            style={styles.picture.image} />
        </View>
        {/* YOUR  SWAP TOKENS */}
        <View style={styles.tokens.container}>
          <Button large warning onPress={()=> goPurchase()}  
            style={styles.tokens.button}>
            <Text style={styles.tokens.text}>
              {store.myProfile.coins}
            </Text>
            <Icon type="FontAwesome5" name="coins" size={24}
              style={styles.tokens.text} />
          </Button>
        </View>
      </CardItem>
      {/* YOUR NAME */}
      <CardItem style={styles.name.container}>
        <Button style={styles.name.button} 
          transparent onPress={() => enterProfile()}>
          {ifNickName ?
            <Text style={{fontSize:20, textAlign:'center', marginBottom:5}}>
              {ifNickName}
            </Text> 
            : null}
          <Text style={styles.name.text} >
            {props.first_name} {props.last_name}
          </Text>
        </Button>
      </CardItem>
    </Card>
  )
}

const styles ={
  tokens:{
    button:{
      justifyContent:'center', width:120},
    container:{
      marginRight:0, justifyContent:'center' },
    icon:{
      paddingLeft:0, marginLeft:0, paddingRight:3},
    text:{
      fontSize:16, fontWeight:'600', paddingRight:0},
  },
  picture:{
    container:{
      marginLeft:10, width: 100, height:100, 
      position: 'relative',
      overflow: 'hidden', borderRadius: 100},
    image:{
      display: 'flex', margin: 'auto', 
      height: '100%', width: 'auto' }
  },
  name:{
    button:{
      flex:1, justifyContent:'center', flexDirection:'column' },
    container:{
      flex:1, justifyContent:'flex-start'},
    text:{
      fontSize:20, textAlign:'center', 
      textTransform:'capitalize'}
  },
  topContainer:{
    alignItems:'flex-start', justifyContent:'space-between', 
    flex:1, flexDirection:'row'}
}