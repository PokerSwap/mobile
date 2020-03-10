import React, {useContext} from 'react';
import {  Text, ListItem, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'

import { Context } from '../../Store/appContext'

import BuyInAttribute from './Components/BuyInAttribute'
import SwapButton from './Components/SwapButton'

export default TournamentBuyIn = (props) => {

  const { store, actions } = useContext(Context)
  const { navigation } = props, {buyin} = props;

  console.log('bbbb', buyin)

  const enterProfile = async() => {
    var answer = await actions.profile.view(buyin.user_id);
    var profile = store.profileView
    var sccs = await actions.tracker.getPast()
    var past = store.myPastTrackers

    navigation.push('Profile',{
      id: profile.id,
      first_name: profile.first_name,
      nickname: profile.nickname,
      last_name: profile.last_name,
      roi_rating: profile.roi_rating,
      swap_rating: profile.swap_rating,
      total_swaps: profile.total_swaps,
      profile_pic_url: profile.profile_pic_url,
      hendon_url: profile.hendon_url,
      past:past
    });
  }

  var bg, txt;
  if (props.chips !== 0){
    if (buyin.user_id == store.myProfile.id){
      bg='#686868', txt='white'
    }else{
      bg='white', txt='black'}
  }else{
    bg='red', txt='white'
  }

  return(
    <ListItem noIndent style={{
      backgroundColor:bg, flexDirection:'column'}}>
      <Grid style={{marginVertical:10}}>
        <Col style={{width:'70%'}}>

          {/* PROFILE NAME */}
          <Row style={{justifyContent:'center'}}>
            <Button transparent 
              onPress={()=> enterProfile()}>
              <Text style={{fontSize:24, color:txt,
                textTransform:'capitalize'}}> 
                {buyin.user_name}
              </Text>
            </Button>
          </Row>

          {/* DETAILS */}
          <Row style={{marginTop:10}}>
            <BuyInAttribute top=' Table ' 
              bottom={buyin.table} txt={txt}/>
            <BuyInAttribute top=' Seat ' 
              bottom={buyin.seat} txt={txt}/>
            <BuyInAttribute top=' Chips ' 
              bottom={buyin.chips} txt={txt}/>
          </Row>

        </Col>
        
        <Col>
          <SwapButton navigation={props.navigation}
            tournament={props.tournament}
            updated_at={props.buyin.updated_at}
            buyin={buyin}
            txt={txt}/>
        </Col>

      </Grid>

    </ListItem>
  )
}
