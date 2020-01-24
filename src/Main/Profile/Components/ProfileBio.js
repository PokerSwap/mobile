import React, {} from 'react';
import {Image, View } from 'react-native'
import { Button, Icon, Text } from 'native-base';
import { Col, Row } from 'react-native-easy-grid';

export default  ProfileBio = (props) => {
   
  const openHendon = () => {
    props.navigation.push('WebView', {
      url: props.hendon_url
    })
  }

  return(
    <Col>

      <Row style={{flex:1, justifyContent:"center"}}>
        <View 
          style={{marginTop:'4%',width: 100, height: 100, position: 'relative',
          overflow: 'hidden', borderRadius: 50}}>
          <Image style={{
            display: 'flex', margin: 'auto', 
            height: '100%', width: 'auto'}} 
            source={{uri: props.profile_pic_url}} />
        </View>
        {/* <Icon name="contact" style={{fontSize: 120}}/> */}
      </Row>
      
      <Row style={{displayFlex:1, justifyContent:"center"}}>
        <Button transparent onPress={() => openHendon()}>
          <Text>{props.first_name} {props.last_name}</Text>
        </Button>
      </Row>
      
      <Row style={{ displayFlex:1, justifyContent:"center", alignItems:"center" }} >
        <Text> R.O.I.: {props.roi_rating}% </Text>
      </Row>   
      
      <Row style={{ displayFlex:1, justifyContent:"center", alignItems:"center" }} >
        <Text> Rating: {props.swap_rating} </Text>
      </Row>   
      
      <Row style={{ displayFlex:1, justifyContent:"center", alignItems:"center" }} >
        <Text> Total Swaps: {props.total_swaps} </Text>
      </Row>   

    </Col>
  )
}
