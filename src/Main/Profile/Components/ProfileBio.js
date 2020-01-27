import React, {} from 'react';
import {Image, View } from 'react-native'
import { Button, Icon, Card, CardItem, Text } from 'native-base';

export default ProfileBio = (props) => {
   
  const openHendon = () => {
    props.navigation.push('WebView', {
      url: props.hendon_url
    })
  }

  let ifNickName

  props.nickname != '' ?
    ifNickName = ' "' + props.nickname + '" '
    :
    ifNickName = ' '

  return(
    <Card transparent>
      <CardItem style={{alignItems:'center', flex:1, flexDirection:'column'}}>
        <View 
          style={{marginTop:'4%', width: 200, height: 200, position: 'relative',
          overflow: 'hidden', borderRadius: 50}}>
          <Image style={{
            display: 'flex', margin: 'auto', 
            height: '100%', width: 'auto'}} 
            source={{uri: props.profile_pic_url}} />
        </View>
        <View style={{flex:1, justifyContent:'center', height:70}}>
          <Button style={{flex:1, justifyContent:'center'}} transparent onPress={() => openHendon()}>
            <Text style={{fontSize:36, textAlign:'center'}}>{props.first_name}{ifNickName}{props.last_name}</Text>
          </Button>
        </View>
      </CardItem>

      <CardItem style={{flex:1, flexDirection:'row', justifyContent:"space-around"}}>
        
        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
          <Text style={{textAlign:'center', marginBottom:10, fontWeight:'500'}}> R.O.I. </Text>
          <Text style={{textAlign:'center', fontSize:30, fontWeight:'600'}}> {props.roi_rating}% </Text>
        </View>

        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
          <Text style={{textAlign:'center', marginBottom:10, fontWeight:'500'}}> Swap Rating </Text>
          <Text style={{textAlign:'center', fontSize:30, fontWeight:'600'}}> {props.swap_rating}/5 </Text>
        </View>  
        
        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
          <Text style={{textAlign:'center', marginBottom:10, fontWeight:'500'}}> Total Swaps </Text>
          <Text style={{textAlign:'center', fontSize:30, fontWeight:'600'}}> {props.total_swaps} </Text>
        </View>
      </CardItem>   

    </Card>
  )
}
