import React, {useContext} from 'react';
import {Image, View } from 'react-native'
import { Button, Icon, Card, CardItem, Text } from 'native-base';

import {Context} from '../../../Store/appContext'

export default ProfileBioSideBar = (props) => {
   
  const {store, actions} = useContext(Context)

  const enterProfile = async() => {
    var answer = await actions.profile.view(props.user_id);
    var profile = store.profileView
    console.log('profile:',profile)
    props.navigation.push('Profile',{
      first_name: profile.first_name,
      nickname: profile.nickname,
      last_name: profile.last_name,
      roi_rating: profile.roi_rating,
      swap_rating: profile.swap_rating,
      total_swaps: profile.total_swaps,
      profile_pic_url: profile.profile_pic_url,
      hendon_url: profile.hendon_url,
      id: profile.id,
      past: []
    });
  }

  let ifNickName

  props.nickname !== '' && props.nickname !== null ?
    ifNickName = ' "' + props.nickname + '" '
    : ifNickName = ' '

  var goPurchase = () => props.navigation.navigate('PurchaseTokens')
  
  return(
    <Card transparent style={{flex:1, flexDirection:'column', paddingTop:20}}>
      {/* YOUR PICTURE AND COINS */}
      <CardItem style={styles.topContainer}>
        {/* YOUR PICTURE */}
        <View style={styles.picture.container}>
          <Image source={{uri: props.profile_pic_url}} 
            style={styles.picture.image} />
        </View>
        {/* YOUR COINS */}
        <View style={styles.coins.container}>
          <Button large warning onPress={()=> goPurchase()}  
            style={styles.coins.button}>
            <Text style={styles.coins.text}>
              {store.myProfile.coins}
            </Text>
            <Icon type="FontAwesome5" name="coins" size={24}
              style={styles.coins.text} />
          </Button>
        </View>
      </CardItem>
      {/* YOUR NAME */}
      <CardItem style={styles.name.container}>
        <Button style={styles.name.button} 
          transparent onPress={() => enterProfile()}>
          <Text style={styles.name.text} >
            {props.first_name}{ifNickName}{props.last_name}
          </Text>
        </Button>
      </CardItem>
    </Card>
  )
}

const styles ={
  coins:{
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
      flex:1, justifyContent:'center' },
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