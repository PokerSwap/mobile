import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../Store/appContext';
import { useNavigation } from '@react-navigation/native'

import { Image, View, Spinner, Linking, Modal, TextInput, TouchableOpacity } from 'react-native'
import { Button, Icon, Card, CardItem, Content, Text, Radio, Toast } from 'native-base';
import { Grid, Row, Col} from 'react-native-easy-grid'

import darkStyle from '../../../Themes/dark.js'
import lightStyle from '../../../Themes/light.js'


 ReportModal = (props) => {
  const { store, actions } = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const [abuse, setAbuse] = useState(false)
  const [identity, setIdentity] = useState(false)
  const [other, setOther] = useState(false)


  const reportUser = async() => {
    var myReason
    if(abuse){
      myReason = "Abusive Behavior"
    }else if(identity){
      myReason = "Stolen Identity"
    }else if(other){
      myReason = "Other"
    }else{ 
      return console.log("Please enter a thing")
    }

    var myName = props.myProfile.first_name + " " + props.myProfile.last_name;
    var myID = props.myProfile.id;
    var theirName = props.theirProfile.first_name + " " + props.theirProfile.last_name
    var theirID = props.theirProfile.id

    var mySubject = myName + " - " + myReason + " Report: "+ theirName;
    var myDescription = myName + " (" + myID.toString() + ") - " + myReason + " Report: "+ theirName + " (" + theirID + ") \n \n Complaint: \n" 

    var answer1 = await Linking.openURL("mailto:contact@swapprofitonline.com?subject=" + mySubject + "&body="  + myDescription)
  } 

  return(
      <View style={modalStyles.background}>

        <View style={ modalStyles.main }> 
         
          <View style={modalStyles.field.view}>
          <Radio color={"#f0ad4e"} selectedColor={"#5cb85c"} selected={identity}  
            onPress={()=> {
              setIdentity(true);
              setAbuse(false);
              setOther(false);
            }}/>
            <Icon style={{marginLeft:15, marginRight:10}} type='FontAwesome5' name='eye'/>
            <Text> Stolen Identity</Text>
           
          </View>

          <View style={modalStyles.field.view}>
          <Radio color={"#f0ad4e"} selectedColor={"#5cb85c"} selected={abuse} 
            onPress={()=> {
              setAbuse(true);
              setIdentity(false);
              setOther(false);
            }}/>
            <Icon style={{marginLeft:15, marginRight:10}} type='FontAwesome5' name='frown'/>
            <Text> Abusive Behavior</Text>
            
          </View>

          <View style={modalStyles.field.view}>
          <Radio color={"#f0ad4e"} selectedColor={"#5cb85c"} selected={other} 
            onPress={()=> {
              setOther(true);
              setAbuse(false);
              setIdentity(false);


            }}/>
            <Icon style={{marginLeft:15, marginRight:10}} type='FontAwesome5' name='question-circle'/>
            <Text> Other</Text>
            
          </View>

          <Button style={{marginTop:20, marginBottom:10}}block iconLeft onPress={() => reportUser()}>
            <Icon type='FontAwesome5' name='envelope'/>  
            <Text style={{fontSize:20}}>Email</Text>
          </Button>
             <View style={{justifyContent:'center'}}>
             <Button style={{alignSelf:'center'}}transparent iconLeft onPress={()=> props.setVisible(false)}>
            <Text style={{fontSize:20}}>
              Cancel
            </Text>
          </Button>
              </View> 
          
        </View>

      </View>
  )
}

var MessageModal = (props) => {
  const { store, actions } = useContext(Context)
  const [message, setMessage] = useState('')

  var navigation = useNavigation()
  const startChat = async () => {
    if (message.length == 0){
      return Toast.show({duration:4000, text:"You need to write something"})
    }else{null}

    var sk = await actions.chat.open(props.their_id, message)
    .then(()=> console.log('sk', sk))
    .then(()=> navigation.push('Chat', {
      a_avatar: props.profile.profile_pic_url,
      nickname: props.profile.first_name,
      their_id: props.profile.id,
      chat_id: store.currentChatID
    }))
    .then(() => props.setVisible2(false))
  }

  return(
    <View style={modalStyles.background}>
      
      <View style={ modalStyles.main }> 
      
        <View style={modalStyles.field.view2}>
          <Text style={modalStyles.field.text}>Start Chatting!</Text>
        </View>

        <View style={modalStyles.field.view2}>
          <TextInput 
            style={modalStyles.field.textInput2}
            placeholder="Hi there! Wanna swap?"
            placeholderTextColor='grey'
            blurOnSubmit={true}
            selectionColor={'#D3D3D3'}
            returnKeyType="next"
            autoCapitalize='none'
            autoCorrect={false} 
            value={message}    
            onChangeText={messageX => setMessage( messageX )} />
        </View>

        <View style={modalStyles.field.view2}>
          <Button style={{alignSelf:'center'}} onPress={()=> startChat()}>
            <Text>Start Chat</Text>
          </Button>
        </View>

        <View style={modalStyles.field.view2}>
          <TouchableOpacity onPress={()=> props.setVisible2(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      
      </View>
    </View>
  )
}

export default ProfileBio = (props) => { 
  const { store, actions } = useContext(Context)
  const [ profile, setProfile ] = useState({})
  const [ visible, setVisible ] = useState(false)
  const [ visible2, setVisible2 ] = useState(false)

  const navigation = useNavigation()


  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
 
  useEffect(() => {
    getProfile()
    return () => {
      setProfile({})
    }
  }, [])

  var getProfile = async() =>{
    var ass = await actions.profile.view(props.user_id)
    setProfile(store.profileView)
  }

  const openHendon = () => {
    if(profile.hendon_url!=='' && profile.hendon_url!==null){
      navigation.push('Web View', {
        url: profile.hendon_url
      })
    }else{
        return Toast.show({text:"This user does not have a hendon mob profile", color:'green', position:'top', duration:3000 })
      }
    }

  const openChat = async() => {
    var z = await actions.chat.retrieve(props.user_id)
    console.log('data here', {
      a_avatar: profile.profile_pic_url,
      nickname: profile.first_name,
      their_id: profile.id,
      chat_id: z
    })
    if(z){navigation.push('Chat', {
      a_avatar: profile.profile_pic_url,
      nickname: profile.first_name,
      their_id: profile.id,
      chat_id: z
    })}else{
      setVisible2(true)
    }
  }
 
  return(
    <Content transparent contentContainerStyle={{backgroundColor: currentStyle.background.color,}}>
      {/* REPORT MODAL */}
      <Modal
        animationType='fade'
        visible={visible}
        presentationStyle='overFullScreen'
        transparent={true}>
        <ReportModal  setVisible={setVisible}
          myProfile={store.myProfile} theirProfile={props.profile} />
      </Modal>
      <Modal
        animationType='fade'
        visible={visible2}
        presentationStyle='overFullScreen'
        transparent={true}> 
        <MessageModal  setVisible2={setVisible2} their_id={props.user_id}
          myProfile={store.myProfile} profile={profile}  />
     </Modal>
      {/* PROFILE PICTURE AND STATS */}
      <CardItem style={{ alignItems:'center', backgroundColor: currentStyle.background.color, flex:1, flexDirection:'column'}}>
        <Grid style={{backgroundColor:currentStyle.background.color}}>
          {/* PROFILE PICTURE AND NICKNAME */}
          <Col>
            <View  style={{marginTop:'4%', width: 150, 
              height: 150, position: 'relative', overflow: 'hidden', borderRadius: 50}}>
              {profile ?
                <Image style={{
                  display: 'flex', margin: 'auto', 
                  height: '100%', width: 'auto'}} 
                  source={{uri: profile.profile_pic_url}} />
                : null}
             </View>
            
            
          </Col>
          {/* PROFILE STATS */}
          <Col>
              <Row>
                <Col>
                <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                  <Text style={{
                    textAlign:'center', marginBottom:10, fontWeight:'500', color:currentStyle.text.color}}> 
                    R.O.I. 
                  </Text>
                  {profile !== undefined ?
                    <Text style={{
                      textAlign:'center', fontSize:24, fontWeight:'600', color:currentStyle.text.color}}> 
                      {profile.roi_rating}%
                    </Text>
                    :
                    <Spinner/>}
                </View>
                </Col>
                <Col>
                {/* SWAP RATING STAT */}
                <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', marginBottom:10, fontWeight:'500', color:currentStyle.text.color}}> 
                    Swap Rating 
                  </Text>
                  {profile !== undefined ?
                    <Text style={{textAlign:'center', fontSize:24, fontWeight:'600', color:currentStyle.text.color}}> 
                      {parseFloat(profile.swap_rating).toFixed(1)}
                    </Text>
                    :
                    <Spinner /> }
                </View>  
                </Col>
        
              </Row>
           
              <Row>
                {/* CONFIRMED SWAPS STAT */}
                <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', marginBottom:10, fontWeight:'500', color:currentStyle.text.color}}> 
                    Confirmed Swaps 
                  </Text>
                  {profile !== undefined ?
                    <Text style={{textAlign:'center', fontSize:30, fontWeight:'600', color:currentStyle.text.color}}> 
                      {profile.total_swaps} 
                    </Text>
                    : <Spinner />}
                </View>

            </Row>
          </Col>
        </Grid>
        
        {/* FULL NAME AND HENDON URL */}
        <View style={{flex:1, marginVertical:10, justifyContent:'center', height:100, backgroundColor:currentStyle.background.color}}>
          {profile !== undefined ?
            profile.nickname !== "" || profile.nickname.length !== 0 ?
              <Text style={{textAlign:'center', marginTop:5, fontSize:18, color:currentStyle.text.color}}>
                "{profile.nickname}"
              </Text>
              : null 
            : null}
          
            {profile !== undefined ?
                <Text style={{fontSize:24, textAlign:'center', color:currentStyle.text.color}}>
                    {profile.first_name} {profile.last_name}
                </Text>
                : 
                null }

            {profile !== undefined ?
                <TouchableOpacity transparent onPress={() => openHendon()}
                    style={{flex:1, justifyContent:'center'}}>
                    <Text style={{fontSize:18, textAlign:'center',  color:'#4682bf', textDecorationLine: 'underline'}}>
                        See Profile
                    </Text>
                </TouchableOpacity>
                : 
                null }
        </View>
      </CardItem>
      {/* PROFILE COINS / CHAT BUTTON */}
      {props.user_id == store.myProfile.id ?
        <CardItem style={{justifyContent:'center' , flexDirection:'column', width:'100%', backgroundColor:currentStyle.background.color}}>
          <Button block iconLeft warning onPress={() => navigation.navigate("Purchase Tokens")}>
            <Icon type='FontAwesome5' name='coins'/>
            <Text>{store.myProfile.coins}</Text>
          </Button>
        </CardItem>
        : 
        <CardItem style={{justifyContent:'center', flexDirection:'column', width:'100%', paddingBottom: 0, backgroundColor:currentStyle.background.color}}>
          <Button full iconLeft info onPress={() => openChat()}>
            <Icon type='FontAwesome5' name='comments'/>
            <Text style={{fontSize:24}}>Chat</Text>
          </Button>
          <Button style={{alignSelf:'center'}}transparent iconLeft light 
            onPress={() => setVisible(true)} title="play@thepokersociety.com">
            {/* <Icon type='FontAwesome5' name='exclamation-circle'/> */}
            <Text>Report</Text>
          </Button>
        </CardItem>}
    </Content>
  )
}

const modalStyles = {
  background:{
    backgroundColor:'rgba(0,0,0,0.6)', 
    height:'100%', alignContent:'center' },
  button:{
    text:{
      textAlign:'center', fontSize:24}
  },
  field:{
    text:{
      fontSize:24, textAlign:'center', marginRight:15},
    textInput:{
      padding:10, borderRadius:10, alignSelf:'center',
      fontSize:24, borderWidth:1, width:'50%', 
      textAlign:'center', borderColor:'rgba(0,0,0,0.2)' },
      textInput2:{
        padding:10, borderRadius:10, alignSelf:'center',
        fontSize:18, borderWidth:1, width:'100%', 
        textAlign:'center', borderColor:'rgba(0,0,0,0.2)' },
    view:{
      flexDirection:'row', justifyContent:'center', alignItems:'center',
      marginBottom:10, marginTop:25 },
    view2:{flexDirection:'row', width:'85%', justifyContent:'center', alignItems:'center', alignSelf:'center',
    marginBottom:10, marginTop:25 }
  },
  main:{ 
    padding:15, display:'flex',justifyContent:'center', alignText:'center', borderRadius:25, alignSelf:'center', backgroundColor:'white', 
    width:'80%', height:'50%', position: 'relative',
    top: '10%', left: 0, bottom: 0, right: 0}
}