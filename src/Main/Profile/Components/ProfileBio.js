import React, { useContext, useEffect, useState } from 'react';
import { Image, View, Spinner } from 'react-native'
import { Button, Icon, Card, CardItem, Text } from 'native-base';

import { Context } from '../../../Store/appContext'

// import  Grey  from '../../../Images/grey.png'

export default ProfileBio = (props) => { 
  const { store, actions } = useContext(Context)
  const [ profile, setProfile ] = useState(null)

  useEffect(() => {
    getProfile()
    return () => {
      // cleanup
    }
  }, [])

  var aProfile
  var getProfile = async() =>{
      var ass = await actions.profile.view(props.user_id)
      console.log('profile', profile, store.profileView)
      var x = await setProfile(store.profileView)
      aProfile = store.profileView
  }

  const openHendon = () => {
    props.navigation.push('WebView', {
      url: aProfile.hendon_url
    })
  }

  // let ifNickName
  // props.nickname != '' ?
  //   ifNickName = ' "' + props.nickname + '" '
  //   :
  //   ifNickName = ' '

  
  return(
    <Card transparent>
      <CardItem style={{
        alignItems:'center', flex:1, 
        flexDirection:'column'}}>
        <View 
          style={{marginTop:'4%', width: 200, 
          height: 200, position: 'relative',
          overflow: 'hidden', borderRadius: 50}}>
          
          {profile ?
            <Image style={{
              display: 'flex', margin: 'auto', 
              height: '100%', width: 'auto'}} 
              source={{uri: store.profileView.profile_pic_url}} />
            :
            null}
             {/* <Image style={{
               display: 'flex', backgroundColor:'grey', margin: 'auto', 
               height: '100%', width: 'auto'}} />} */}

        </View>

        <View style={{flex:1, justifyContent:'center', height:70}}>
        {store.profileView ?
          <Button transparent 
            style={{flex:1, justifyContent:'center'}}  
            onPress={() => openHendon()}>
            <Text style={{fontSize:36, textAlign:'center'}}>
              {store.profileView.first_name} {store.profileView.last_name}
            </Text>
          </Button>
          :
          <Spinner />}
        </View>
      </CardItem>

      {props.user_id == store.myProfile.id ?
        <CardItem style={{justifyContent:'center'}}>
          <Button iconLeft warning onPress={() => props.navigation.navigate("PurchaseTokens")}>
            <Icon type='FontAwesome5' name='coins'/>
            <Text>{store.myProfile.coins}</Text>
          </Button>
        </CardItem>
        :
        null}

      <CardItem style={{flex:1, flexDirection:'row',justifyContent:"space-around"}}>
        
        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
          <Text style={{
            textAlign:'center', marginBottom:10, fontWeight:'500'}}> 
            R.O.I. 
          </Text>
          {store.profileView ?
            <Text style={{
              textAlign:'center', fontSize:30, fontWeight:'600'}}> 
              {store.profileView.roi_rating}% 
            </Text>
            :
            <Spinner/>}
        </View>

        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
          <Text style={{textAlign:'center', marginBottom:10, fontWeight:'500'}}> 
            Swap Rating 
          </Text>
          {store.profileView ?
            <Text style={{textAlign:'center', fontSize:30, fontWeight:'600'}}> 
              {store.profileView.swap_rating}
            </Text>
            :
            <Spinner /> }
        </View>  
        
        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
          <Text style={{textAlign:'center', marginBottom:10, fontWeight:'500'}}> 
            Total Swaps 
          </Text>
          {store.profileView ?
            <Text style={{textAlign:'center', fontSize:30, fontWeight:'600'}}> 
              {store.profileView.total_swaps} 
            </Text>
            :
            <Spinner />}
        </View>
      </CardItem>   
    </Card>
  )
}
