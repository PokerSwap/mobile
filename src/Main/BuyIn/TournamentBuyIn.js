import React, { useContext }  from 'react'
import { Context } from '../../Store/appContext'

import {  Text, ListItem, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { throttle } from 'lodash'

import BuyInAttribute from './Components/BuyInAttribute'
import SwapButton from './Components/SwapButton'

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default TournamentBuyIn = (props) => {
  const { store, actions } = useContext(Context)
  const { navigation } = props, {buyin} = props;

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const enterProfile = () => {
    navigation.push('Profile',{
      user_id: buyin.user_id,
      nickname: buyin.user_name
    });
  }

  const handler = throttle(enterProfile, 1000, { leading: true, trailing: false });

  var bg, txt;
  if (props.chips !== 0){
    if (buyin.user_id == store.myProfile.id){
      bg='blue', txt='white'
    }else{
      bg=currentStyle.background.color, txt=currentStyle.text.color}
  }else{
    bg='red', txt='white'
  }

  return(
    <ListItem noIndent style={{
      backgroundColor:bg, flexDirection:'column'}}>
      <Grid style={{marginVertical:10}}>
        {/* BUYIN INFORMATION */}
        <Col style={{width:'70%'}}>
          {/* PROFILE NAME */}
          <Row style={{justifyContent:'center'}}>
            <Button transparent 
              onPress={()=> handler()}>
              <Text style={{fontSize:24, color:txt,
                textTransform:'capitalize'}}> 
                {buyin.user_name}
              </Text>
            </Button> 
          </Row>
          {/* BUYIN DETAILS */}
          <Row style={{marginTop:10}}>
            <BuyInAttribute top=' Table ' 
              bottom={buyin.table} txt={txt}/>
            <BuyInAttribute top=' Seat ' 
              bottom={buyin.seat} txt={txt}/>
            <BuyInAttribute top=' Chips ' 
              bottom={buyin.chips} txt={txt}/>
          </Row>
        </Col>
        {/* SWAP BUTTON */}
        <Col>
          <SwapButton 
            tournament={props.tournament} action={props.action}
            updated_at={props.buyin.updated_at}
            my_buyin={props.my_buyin} buyin={buyin}
            txt={txt} setRefreshing={props.setRefreshing}/>
        </Col>
      </Grid>
    </ListItem>
  )
}