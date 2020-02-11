import React, { useState } from 'react';
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
  let myPayOut = (props.yourPayOut).toFixed(2)

  let theirName = theirProfile.first_name + ' ' + theirProfile.last_name
  let theirNickName = theirProfile.nickname
  let theirPicture = theirProfile.profile_pic_url 
  let theirPercentage = swap.counter_percentage
  let theirPayOut = (props.theirPayOut).toFixed(2)


  let myFinalName
  let theirFinalName

  let youOwe = props.yourPayOut*(myPercentage/100)
  let theyOwe = props.theirPayOut*(theirPercentage/100)

  let netProfit = (theyOwe - youOwe).toFixed(2)
  

  myNickName != '' ? 
    myFinalName = 
      <View style={{flex:1, flexDirection:'column'}}>
        <Text style={{textAlign:'center', fontSize:24, fontWeight:'600'}}>{myNickName}</Text>
        <Text style={{textAlign:'center'}}>{myName}</Text>
      </View>
    :
    myFinalName = 
      <View>
        <Text style={{textAlign:'center', fontWeight:'600'}}>{myName}</Text>
      </View>
  theirNickName != '' ?
    theirFinalName = 
      <View style={{flex:1, flexDirection:'column'}}>
        <Text style={{textAlign:'center', fontSize:24, fontWeight:'600'}}>{theirNickName}</Text>
        <Text style={{textAlign:'center'}}>{theirName}</Text>
      </View>
    :
    theirFinalName = 
      <View style={{alignItems:'flex-start'}}>
        <Text style={{fontWeight:'600', fontSize:24}}>{theirName}</Text>
      </View>

console.log('NetProfit with '+ theirName + ' is ' + netProfit)


  return(
    <ListItem noIndent transparent style={{justifyContent:'center'}}>
      <Grid style={{justifyContent:'center', alignItems:'center', marginVertical:40}}>
        
        <Row>
          {/* Your Profile */}
          <Col style={{alignSelf:'center'}}>
            <Row style={{justifyContent:'center'}}>
           
              <Image source={{uri: myPicture}} 
                style={{
                  height:150, width:150, 
                  borderRadius:500, justifyContent:'center'}}
                />
              
            </Row>
            {myFinalName}
            <Row style={{justifyContent:'center'}}>
              <Text style={{textAlign:'center'}}>{myPercentage}%</Text></Row>
          </Col>
          
          {/* Their Profile */}
          <Col>
            <Row style={{justifyContent:'center'}}>
              <Image source={{uri: theirPicture}} 
              style={{height:150, width:150, borderRadius:500, justifyContent:'center'}}/></Row>
            {theirFinalName}
            <Row style={{justifyContent:'center'}}>
              <Text style={{textAlign:'center',}}>{theirPercentage}%
              </Text>
            </Row>
            <Row>
              <Text>W</Text>
            </Row>
          </Col>
        </Row>
        <Row><Text style={{fontSize:24}}>Winnings</Text></Row>
        <Row style={{justifyContent:'flex-end'}}>
          <Col style={{justifyContent:'flex-end'}}>
            <Text style={{alignSelf:'flex-end', marginRight:5, fontSize:18}}>
              ${myPayOut}
            </Text>
          </Col> 
          <Col>
            <Text style={{alignSelf:'flex-start', marginLeft:5, fontSize:18}}>
              ${theirPayOut}</Text></Col>
        </Row>
        <Row><Text style={{fontSize:24}}>Percentage</Text></Row>
        <Row style={{justifyContent:'flex-end'}}>
          <Col style={{justifyContent:'flex-end'}}>
            <Text style={{alignSelf:'flex-end', marginRight:5, fontSize:18}}>
              {myPercentage}%
            </Text>
          </Col>
          <Col>
            <Text style={{alignSelf:'flex-start', marginLeft:5, fontSize:18}}>
              {theirPercentage}%</Text></Col>
        </Row>
        <Row><Text style={{fontSize:24, fontWeight:'600'}}>Swap Profit</Text></Row>
        <Row style={{justifyContent:'flex-end', flexDirection:'column'}}>
          <Text style={{fontSize:36, fontWeight:'600'}}>${netProfit}</Text>
        </Row>
      </Grid>
    </ListItem>
  )
}
