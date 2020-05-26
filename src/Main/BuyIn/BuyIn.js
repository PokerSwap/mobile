import React, { useContext } from 'react';
import {  Accordion, Button, ListItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { throttle } from 'lodash'

import { Context } from '../../Store/appContext'

import BuyInAttribute from './Components/BuyInAttribute'
import SwapButton from './Components/SwapButton'
import SwapHeader from './Components/SwapHeader'
import SwapList from './Components/SwapList'

export default BuyIn = (props) => {
  const { store, actions } = useContext(Context)
  const { navigation } = props,  {buyin} = props;

  var allSwaps 
  buyin.user_id != store.myProfile.id ?   
    props.agreed_swaps !== [] ?
      props.other_swaps !== [] ?
        allSwaps = [...props.agreed_swaps, ...props.other_swaps]
        : allSwaps = [...props.agreed_swaps]
      : props.other_swaps !== [] ?
        allSwaps = [...props.other_swaps]
        : allSwaps = null
    : allSwaps = null

  const _renderHeader = (item, expanded) => {
    return(
      <SwapHeader 
        allSwaps={allSwaps}
        expanded={expanded} />
    )
  }

  const _renderContent= () => {
    return(
      <SwapList
        allSwaps={allSwaps}
        tournament={props.tournament}
        buyin={buyin}
        navigation={props.navigation} />
  )}

  const enterProfile = async() => {
    navigation.push('Profile',{
      id: buyin.id,
      nickname: buyin.user_name
    });
  }

  const handler = throttle(enterProfile, 1000, { leading: true, trailing: false });


  var bg, txt;
  if (buyin.chips !== 0){
    if (buyin.user_id == store.myProfile.id){
      bg='#686868', txt='white'
    }else{
      bg='white', txt='black'}
  }else{
    bg='red', txt='white'
  }
    
  return(
    <ListItem noIndent style={{ backgroundColor:bg, flexDirection:'column'}}>
      <Grid style={{marginVertical:10}}>
        <Row style={{width:'100%'}}>
          {/* BUYIN INFORMATION */}
          <Col style={{width:'70%'}}>
            {/* PROFILE NAME */}
            <Row style={{justifyContent:'center'}}>
              <Button transparent 
                onPress={()=> handler()}>
                <Text style={{fontSize:24, color:txt,
                  textTransform:'capitalize'}}> 
                  {buyin.user_id !== store.myProfile.id ? 
                    buyin.user_name 
                    : store.myProfile.user_name == null ?
                      store.myProfile.first_name
                      : store.myProfile.user_name} 
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


          {/* BUTTON WITH VARIABLE PATHS */}
          {props.agreed_swaps !== undefined ?
          //Buyins you have with swaps
            <SwapButton navigation={props.navigation}
              allSwaps={allSwaps}  
              agreed_swaps={props.agreed_swaps}
              other_swaps={props.other_swaps}
              tournament={props.tournament}
              action={props.action}
              updated_at={props.buyin.updated_at}
              buyin={buyin} txt={txt}/>
            : 
            buyin.user_id !== store.myProfile.id ? 
              <Text>Buy</Text>
              :
              <SwapButton navigation={props.navigation}
              allSwaps={allSwaps}  
              action={props.action}
              agreed_swaps={props.agreed_swaps}
              other_swaps={props.other_swaps}
              tournament={props.tournament}
              updated_at={props.buyin.updated_at}
              buyin={buyin}
              txt={txt}/>
          }  
        </Row>
        {/* BUSTED TITLE */}
        {buyin.chips == 0 ?
          <Row style={{backgroundColor:'red', 
            justifyContent:'center', paddingTop:10}}>
            <Text style={{color:'white', fontSize:24, 
              fontWeight:'600', textAlign:'center'}}>
              BUSTED
            </Text>
          </Row>
          : null }
        {/* BUSTED INFORMATION */}
        { buyin.chips == 0 ?
          <Row style={{justifyContent:'space-around'}}>
            <Text style={{color:'white'}}>Place: {buyin.place}</Text>
            <Text style={{color:'white'}}>Cashed Out: {buyin.winnings}</Text>
          </Row>
          : 
          null }
      </Grid>
      {/* BUTTON ACCORDION */}
      { allSwaps !== null ?
        <Accordion style={{width:'100%'}}
          dataArray={[{placeholder:'placeholder'}]}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          animation={true}
          expanded={true}/>
        : null }
    </ListItem>
  )
}
