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
      hendon_url: profile.hendon_url
    });
  }

  let ifNickName

  props.nickname != '' ?
    ifNickName = ' "' + props.nickname + '" '
    :
    ifNickName = ' '

  return(
    <Card transparent>
      <CardItem style={{alignItems:'flex-start', flex:1, flexDirection:'column'}}>
        <View 
          style={{marginTop:'4%', width: 50, height:50, position: 'relative',
          overflow: 'hidden', borderRadius: 100}}>
          <Image style={{
            display: 'flex', margin: 'auto', 
            height: '100%', width: 'auto'}} 
            source={{uri: props.profile_pic_url}} />
        </View>
        <View style={{flex:1, justifyContent:'flex-start'}}>
          <Button style={{flex:1, justifyContent:'flex-start'}} transparent onPress={() => enterProfile()}>
            <Text style={{fontSize:20, textAlign:'left'}}>{props.first_name}{ifNickName}{props.last_name}</Text>
          </Button>
        </View>
      </CardItem>

 

    </Card>
  )
}
