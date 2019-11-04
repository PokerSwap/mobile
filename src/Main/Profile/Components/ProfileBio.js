import React, {Component} from 'react';
import { Button, Icon, Text } from 'native-base';
import { Col, Row } from 'react-native-easy-grid';
import { Linking } from 'react-native';
import { Context } from '../../../Store/appContext'

export default  ProfileBio = (props) => {
   
  return(

    <Col>
      
      <Row style={{flex:1, justifyContent:"center"}}>
        <Icon name="contact" style={{fontSize: 120}}/>
      </Row>
      
      <Row style={{displayFlex:1, justifyContent:"center"}}>
        <Button transparent>
          <Text>{props.first_name} "{props.username}" {props.last_name}</Text>
        </Button>
      </Row>
      
      <Row 
        style={{ displayFlex:1, justifyContent:"center", alignItems:"center" }} >
        
        <Text> R.O.I.: {props.roi}% </Text>
      
        <Text> Rating: {props.rating} </Text>
        <Icon name="star" style={{color:"gold"}}/>
      </Row>   

    </Col>
  )
}
