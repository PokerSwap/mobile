import React, { useContext, useState } from 'react';
import {Content, Card, CardItem, Button} from 'native-base'
import { useNavigation } from '@react-navigation/native'


export default HowToSwapScreen = (props) => {

  const navigation = useNavigation()

  
  return(
    <Content>
      <Card>
        {/* EDIT BUYIN */}
        <CardItem style={{flexDirection:'column'}}>
          <Button style={{backgroundColor:'grey', width:70, height:70, 
            justifyContent:'center', alignSelf:'center'}}>
            {lastCol}
          </Button>
        </CardItem>
        {/* INACTIVE SWAP */}
        <CardItem style={{flexDirection:'column'}}>
          <Button style={{backgroundColor:buttonColor, width:70, height:70, 
            justifyContent:'center', alignSelf:'center'}}>
            {lastCol}
          </Button>
        </CardItem>
        {/* PENDING SWAP */}
        <CardItem style={{flexDirection:'column'}}>
          <Button style={{backgroundColor:'orange', width:70, height:70, 
            justifyContent:'center', alignSelf:'center'}}>
            {lastCol}
          </Button>
        </CardItem>
        {/* AGREED SWAP */}
        <CardItem style={{flexDirection:'column'}}>
          <Button style={{backgroundColor:'green', width:70, height:70, 
            justifyContent:'center', alignSelf:'center'}}>
            {lastCol}
          </Button>
        </CardItem>
        {/* REJECTED SWAP */}
        <CardItem style={{flexDirection:'column'}}>
          <Button style={{backgroundColor:'red', width:70, height:70, 
            justifyContent:'center', alignSelf:'center'}}>
            {lastCol}
          </Button>
        </CardItem>
        {/* INCOMING SWAP */}
        <CardItem style={{flexDirection:'column'}}>
          <Button style={{backgroundColor:'green', width:70, height:70, 
            justifyContent:'center', alignSelf:'center'}}>
            {lastCol}
          </Button>
        </CardItem>
        {/* COUNTER-INCOMING SWAP */}
        <CardItem style={{flexDirection:'column'}}>
          <Button style={{backgroundColor:buttonColor, width:70, height:70, 
            justifyContent:'center', alignSelf:'center'}}>
            {lastCol}
          </Button>
        </CardItem>
        {/* CANCELED SWAP */}
        <CardItem style={{flexDirection:'column'}}>
          <Button style={{backgroundColor:'grey', width:70, height:70, 
            justifyContent:'center', alignSelf:'center'}}>
            {lastCol}
          </Button>
        </CardItem>
      </Card>
    </Content>
  )
}