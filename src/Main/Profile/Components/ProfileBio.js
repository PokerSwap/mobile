import React, { useContext, useEffect, useState } from 'react';
import { Image, View, Spinner, Linking, Modal, TouchableWithoutFeedback } from 'react-native'
import { Button, Icon, Card, CardItem, Text, Radio } from 'native-base';
import { Context } from '../../../Store/appContext';
import { useNavigation } from '@react-navigation/native'

import { Grid, Row, Col} from 'react-native-easy-grid'


 ReportModal = (props) => {

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

export default ProfileBio = (props) => { 
  const { store, actions } = useContext(Context)
  const [ profile, setProfile ] = useState({})
  const [ visible, setVisible ] = useState(false)

  const navigation = useNavigation()
 
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
    navigation.push('Web View', {
      url: profile.hendon_url
    })
  }

  const openChat = () => {
    navigation.push('Chat', {
      myProfile: store.myProfile,
      theirProfile: profile
    }
    )
  }


  
  return(
    <Card transparent>

      <Modal
        animationType='fade'
        visible={visible}
        presentationStyle='overFullScreen'
        transparent={true}>
        <ReportModal  setVisible={setVisible}
          myProfile={store.myProfile} theirProfile={profile} />
      </Modal>

      {/* PROFILE PICTURE */}
      <CardItem style={{
        alignItems:'center', flex:1, 
        flexDirection:'column'}}>
          <Grid>
            <Col>
              <Row>
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
              </Row>
              <Row style={{justifyContent:'center'}}>
                  <Text style={{textAlign:'center', marginTop:5, fontize:18}}>{props.nickname}</Text>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                  <Text style={{
                    textAlign:'center', marginBottom:10, fontWeight:'500'}}> 
                    R.O.I. 
                  </Text>
                  {profile !== undefined ?
                    <Text style={{
                      textAlign:'center', fontSize:24, fontWeight:'600'}}> 
                      {profile.roi_rating}%
                    </Text>
                    :
                    <Spinner/>}
                </View>
                </Col>
                <Col>
                {/* SWAP RATING STAT */}
                <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', marginBottom:10, fontWeight:'500'}}> 
                    Swap Rating 
                  </Text>
                  {profile !== undefined ?
                    <Text style={{textAlign:'center', fontSize:24, fontWeight:'600'}}> 
                      {profile.swap_rating}
                    </Text>
                    :
                    <Spinner /> }
                </View>  
                </Col>
        
              </Row>
           
              <Row>
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

              </Row>
            </Col>
        
          </Grid>
        
        {/* FULL NAME AND HENDON URL */}
        <View style={{flex:1, justifyContent:'center', height:70}}>
          {profile !== undefined ?
            <Button transparent onPress={() => openHendon()}
              style={{flex:1, justifyContent:'center'}}>
              <Text style={{fontSize:24, textAlign:'center'}}>
                {profile.first_name} {profile.last_name}
              </Text>
            </Button>
            : <Spinner /> }
        </View>
      </CardItem>
      {/* PROFILE COINS */}
      {props.user_id == store.myProfile.id ?
        <CardItem style={{justifyContent:'center' , marginVertical:-20}}>
          <Button iconLeft warning onPress={() => navigation.navigate("Purchase Tokens")}>
            <Icon type='FontAwesome5' name='coins'/>
            <Text>{store.myProfile.coins}</Text>
          </Button>
        </CardItem>
        : 
        <CardItem style={{justifyContent:'center', flexDirection:'column', width:'100%', marginVertical:-20, paddingBottom: 0}}>
          <Button block iconLeft info onPress={() => openChat()}>
            <Icon type='FontAwesome5' name='comments'/>
            <Text style={{fontSize:24}}>Chat</Text>
          </Button>
          <Button style={{alignSelf:'center'}}transparent iconLeft light 
            onPress={() => setVisible(true)} title="play@thepokersociety.com">
            {/* <Icon type='FontAwesome5' name='exclamation-circle'/> */}
            <Text>Report</Text>
          </Button>
          
        </CardItem>
        }
    </Card>
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
    view:{
      flexDirection:'row', justifyContent:'flex-start', alignItems:'center',
      marginBottom:10, marginTop:25 }
  },
  main:{ 
    padding:15, alignSelf:'center', backgroundColor:'white', 
    width:'80%', height:'50%', margin: 'auto', position: 'relative',
    top: '10%', left: 0, bottom: 0, right: 0}
}