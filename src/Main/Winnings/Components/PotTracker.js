import React from 'react';
import {  ListItem, Text  } from 'native-base';
import { Image, View } from 'react-native'

import { Grid, Row, Col} from 'react-native-easy-grid'

export default PotTracker = (props) => {

  let swap = props.swap

  let myProfile = swap.sender_user
  let theirProfile = swap.recipient_user
  
  let myName = myProfile.first_name + ' ' + myProfile.last_name
  let myNickName = myProfile.nickname
  let myPicture = myProfile.profile_pic_url 
  let myPercentage = swap.percentage
  let myWinnings

  let theirName = theirProfile.first_name + ' ' + theirProfile.last_name
  let theirNickName = theirProfile.nickname
  let theirPicture = theirProfile.profile_pic_url 
  let theirPercentage = swap.counter_percentage
  let theirWinnings

  return(
    <ListItem noIndent transparent style={{justifyContent:'center'}}>
      <Grid style={{justifyContent:'center', alignItems:'center', marginVertical:40}}>
        <Row>
          <Col style={{alignSelf:'center'}}>
            <Row style={{justifyContent:'center'}}>
           
  <Image source={{uri: myPicture}} 
                style={{
                  height:150, width:150, 
                  borderRadius:500, justifyContent:'center'}}
                />
              
            </Row>
            <Row style={{justifyContent:'center'}}>
              <Text style={{textAlign:'center', fontSize:28, fontWeight:'600', paddingVertical:6}}>{myNickName}</Text>
              </Row>
            <Row style={{justifyContent:'center'}}>
              <Text style={{textAlign:'center', fontSize:18}}>{myName}</Text>
            </Row>
            <Row style={{justifyContent:'center'}}>
              <Text style={{textAlign:'center'}}>{myPercentage}%</Text></Row>
          </Col>
          <Col>
            <Row style={{justifyContent:'center'}}>
              <Image source={{uri: theirPicture}} 
              style={{height:150, width:150, borderRadius:500, justifyContent:'center'}}/></Row>
            <Row style={{justifyContent:'center'}}>
              <Text style={{textAlign:'center', fontSize:28, fontWeight:'600', paddingVertical:6}}>{theirNickName}</Text>
            </Row>
            <Row style={{justifyContent:'center'}}>
              <Text style={{textAlign:'center', fontSize:18}}>{theirName}</Text>
            </Row>
            <Row style={{justifyContent:'center'}}>
              <Text style={{textAlign:'center'}}>{theirPercentage}%
              </Text>
            </Row>
          </Col>
        </Row>
      </Grid>
    </ListItem>
  )
}
