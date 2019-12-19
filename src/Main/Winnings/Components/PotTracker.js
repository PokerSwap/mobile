import React, {useContext} from 'react';
import {  ListItem, Text  } from 'native-base';
import _Header from '../../../View-Components/header'
import { Context } from '../../../Store/appContext'
import { Image } from 'react-native'

import { Grid, Row, Col} from 'react-native-easy-grid'

export default PotTracker = (props) => {

  const {store, actions} = useContext(Context)

  let swap = props.swap

  let myProfile = swap.sender_user
  let theirProfile = swap.recipient_user
  
  let myName = myProfile.first_name + ' ' + myProfile.nickname + ' ' + myProfile.last_name
  let myPicture = myProfile.profile_pic_url 
  let myPercentage = swap.percentage
  let myWinnings

  let theirName = theirProfile.first_name + ' ' + theirProfile.nickname + ' ' + theirProfile.last_name
  let theirPicture = theirProfile.profile_pic_url 
  let theirPercentage = swap.counter_percentage
  let theirWinnings

  return(

    
        <ListItem noIndent style={{justifyContent:'center'}}>
          <Grid style={{justifyContent:'center'}}>
            <Row>
              <Col style={{alignSelf:'center'}}>
                <Row style={{justifyContent:'center'}}><Image source={{uri: myPicture}} style={{height:100, width:100, borderRadius:500, justifyContent:'center'}}/></Row>
                <Row style={{justifyContent:'center'}}><Text style={{textAlign:'center'}}>{myName}</Text></Row>
                <Row style={{justifyContent:'center'}}><Text style={{textAlign:'center'}}>{myPercentage}%</Text></Row>
              </Col>
              <Col>
                <Row style={{justifyContent:'center'}}><Image source={{uri: theirPicture}} style={{height:100, width:100, borderRadius:500, justifyContent:'center'}}/></Row>
                <Row style={{justifyContent:'center'}}><Text style={{textAlign:'center'}}>{theirName}</Text></Row>
                <Row style={{justifyContent:'center'}}><Text style={{textAlign:'center'}}>{theirPercentage}%</Text></Row>
              </Col>
            </Row>
            
          </Grid>
              

        </ListItem>
      
)
}
