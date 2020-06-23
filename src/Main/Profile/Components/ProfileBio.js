import React, { useContext, useEffect, useState } from 'react';
import { Image, View, Spinner } from 'react-native'
import { Button, Icon, Card, CardItem, Text } from 'native-base';
import { Context } from '../../../Store/appContext'

export default ProfileBio = (props) => { 
  const { store, actions } = useContext(Context)
  const [ profile, setProfile ] = useState({})
  console.log('profile', profile)

  useEffect(() => {
    console.log('profile', profile)

    getProfile()
    return () => {
      setProfile({})
      console.log('removed?', profile)
    }
  }, [])

  var getProfile = async() =>{
    var ass = await actions.profile.view(props.user_id)
    setProfile(store.profileView)
  }

  const openHendon = () => {
    props.navigation.push('WebView', {
      url: profile.hendon_url
    })
  }
  
  return(
    <Card transparent>
      {/* PROFILE PICTURE */}
      <CardItem style={{
        alignItems:'center', flex:1, 
        flexDirection:'column'}}>
        <View  style={{marginTop:'4%', width: 150, 
          height: 150, position: 'relative',
          overflow: 'hidden', borderRadius: 50}}>
          {profile ?
            <Image style={{
              display: 'flex', margin: 'auto', 
              height: '100%', width: 'auto'}} 
              source={{uri: profile.profile_pic_url}} />
            : null}
        </View>
        <View>
          <Text>{props.nickname}</Text>
        </View>
        {/* FULL NAME AND HENDON URL */}
        <View style={{flex:1, justifyContent:'center', height:70}}>
          {profile !== undefined ?
            <Button transparent 
              style={{flex:1, justifyContent:'center'}}  
              onPress={() => openHendon()}>
              <Text style={{fontSize:36, textAlign:'center'}}>
                {profile.first_name} {profile.last_name}
              </Text>
            </Button>
            : <Spinner /> }
        </View>
      </CardItem>
      {/* PROFILE COINS */}
      {props.user_id == store.myProfile.id ?
        <CardItem style={{justifyContent:'center'}}>
          <Button iconLeft warning onPress={() => props.navigation.navigate("PurchaseTokens")}>
            <Icon type='FontAwesome5' name='coins'/>
            <Text>{store.myProfile.coins}</Text>
          </Button>
        </CardItem>
        : null}
      {/* PROFILE STATS */}
      <CardItem style={{flex:1, flexDirection:'row',justifyContent:"space-around"}}>
        {/* RETURN OF INTEREST STAT */}
        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
          <Text style={{
            textAlign:'center', marginBottom:10, fontWeight:'500'}}> 
            R.O.I. 
          </Text>
          {profile !== undefined ?
            <Text style={{
              textAlign:'center', fontSize:30, fontWeight:'600'}}> 
              {profile.roi_rating}%
            </Text>
            :
            <Spinner/>}
        </View>
        {/* SWAP RATING STAT */}
        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
          <Text style={{textAlign:'center', marginBottom:10, fontWeight:'500'}}> 
            Swap Rating 
          </Text>
          {profile !== undefined ?
            <Text style={{textAlign:'center', fontSize:30, fontWeight:'600'}}> 
              {profile.swap_rating}
            </Text>
            :
            <Spinner /> }
        </View>  
        {/* CONFIRMED SWAPS STAT */}
        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
          <Text style={{textAlign:'center', marginBottom:10, fontWeight:'500'}}> 
            Confirmed Swaps 
          </Text>
          {profile !== undefined ?
            <Text style={{textAlign:'center', fontSize:30, fontWeight:'600'}}> 
              {profile.total_swaps} 
            </Text>
            : <Spinner />}
        </View>
      </CardItem>   
    </Card>
  )
}