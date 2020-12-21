import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from 'moment'

import { Modal, View } from 'react-native';
import { Container, Content, List, Text, ListItem, Button } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay'
import { Grid, Row, Col } from 'react-native-easy-grid'

import _Header from '../../View-Components/HomeHeader'
import ProfitTracker from './Components/ProfitTracker'
import BustedModal from '../SwapOffer/Components/BustedModal'

import BounceColorWrapper from '../../Functional/BounceColorWrapper'
import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default ProfitResults = (props) => {
  const { store, actions } = useContext(Context)

  const route = useRoute()
  const navigation = useNavigation();
  const { tournament, my_buyin, buyins, final_profit } = route.params;

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const [ loading, setLoading ] = useState(false)
  const [ visible, setVisible ] = useState(false)
  const [ refreshing, setRefreshing ] = useState(false)
  const [ allPaid, setAllPaid ] = useState(true)
  console.log('Buyins in the Results: ', buyins)
  var agreedBuyins = buyins.filter(buyin => buyin.agreed_swaps.length > 0)
  
  useEffect(() => {
    if (agreedBuyins.length!== 0){
      var x = agreedBuyins.forEach((buyin, index) => {
        if (buyin.they_owe_total && buyin.you_owe_total){
          null
        }else{
          setAllPaid(false)
        }
      })
    }
    
    getBuyin()
    setRefreshing(false)
    return () => {
      // cleanup
    }
  }, [refreshing])

  var getBuyin = async() => {
    var eee = await actions.buy_in.getCurrent(my_buyin.id) 
  }

  // console.log('allPaid',allPaid, tournament.results_link, final_profit)
  var profit
  allPaid & tournament.results_link !== null ? 
    final_profit >= 0 ?
      profit = "$" + Math.abs(final_profit).toFixed(2)
      : profit = "-$" + Math.abs(final_profit).toFixed(2)
    : agreedBuyins.length == 0 ? 
        profit= '$0.00' : profit = "Pending"
  

  var openResults = () => {
    console.log('url',tournament.results_link)
    navigation.push('Web View',{
      url: tournament.results_link
    })
  }

  return(
    <Container> 
      <BounceColorWrapper style={{flex: 1}} mainColor={currentStyle.background.color}>
      <Content contentContainerStyle={{backgroundColor:currentStyle.background.color}}>
        <Spinner visible={loading}/>
        {/* MODAL */}
        <Modal
          animationType='fade'
          visible={visible}
          presentationStyle='overFullScreen'
          transparent={true}>
          <BustedModal 
            setRefreshing={setRefreshing}
            setVisible={setVisible} setLoading={setLoading}
            buyin_id={my_buyin.id} 
            tournament_id={tournament.id}
            mode={'entry'} />  
        </Modal>
        {/* LOADING SPINNER */}
        <Spinner visible={loading}/>
        {/* MAIN BODY */}
        <List style={{backgroundColor:currentStyle.background.color}}>
          <ListItem noIndent header style={{justifyContent:'center', flexDirection:'column'}}>
            <Grid style={{alignSelf:'center', width:'100%'}}>
              {/* TOURNAMENT NAME */}
              <Row style={{justifyContent:'center', marginTop:10}}>
                <Text style={{justifyContent:'center', textAlign:'center', fontWeight:'600', fontSize:20, color:currentStyle.text.color}}>
                  {tournament.name}
                </Text>
              </Row>
              <Row style={{justifyContent:'space-around'}}>
                <Col style={{ width:'70%'}}>
                  {/* TOURNAMENT CASINO and Address */}
                  <Text style={{marginTop:20, textAlign:'center', color:currentStyle.text.color}}>
                    {tournament.casino + '\n' + tournament.address + '\n' + 
                      tournament.city + ', ' + tournament.state + ' ' + tournament.zip_code}
                  </Text>
                  {/* TOURNAMENT START TIME */}
                  <Text style={{justifyContent:'center', marginVertical:10, textAlign:'center', fontSize:16, color:currentStyle.text.color}}>
                    {moment(tournament.start_at).format('llll')}
                  </Text>
                </Col>
                <Col style={{textAlign:'center', justifyContent:'center'}}>
                  <Text style={{textAlign:'center',marginBottom:10,color:currentStyle.text.color}}>
                    Swapped Players:
                  </Text>
                  <Text style={{textAlign:'center', color:currentStyle.text.color,fontSize:24}}>
                    {agreedBuyins.length}
                  </Text>
                </Col>
              </Row>
              {/* TOURNAMENT RESULTS LINK */}
              {tournament.results_link ? 
                <Row style={{flexDirection:'column', justifyContent:'center', marginTop:10}}>
                  <Button block onPress={() => openResults()}>
                    <Text style={{color:currentStyle.text.color}}>
                      See Complete Event Results
                    </Text>
                  </Button>
                  <Text style={{marginTop:15, marginBottom:5, color:currentStyle.text.color}}>
                    Results posted {moment(tournament.updated_at).fromNow()}.
                  </Text>
                </Row>                
              : null}
            </Grid>
          </ListItem>         
          {/* NO SWAPS TEXT */}
          {agreedBuyins.length == 0 ?
            <ListItem noIndent style={{justifyContent:'center'}}>
              <Text style={{textAlign:'center', paddingVertical:10, color:currentStyle.text.color}}>
                You didn't agree to any swaps in this event.
              </Text>
            </ListItem>
            : null }
          {/* ALL PROFIT TRACKERS */}
          {agreedBuyins.map((buyin, index) => {
            // console.log('myPlace', buyin)
            return(
              <ProfitTracker key={index}  myPlace={my_buyin.place}
                buyin={buyin} agreed_swaps={buyin.agreed_swaps}/>
          )})}
          {/* FINAL PROFIT */}
          <ListItem noIndent style={{flexDirection:'column', paddingTop:30, paddingBottom:30}}>
            <Text style={{fontSize:24, textAlign:'center', color:currentStyle.text.color}}>
              Your final profit is:
            </Text>
            <Text style={{fontSize:36, fontWeight:'600', textAlign:'center', color:currentStyle.text.color}}>
              {profit}
            </Text>
          </ListItem>
        </List>
      </Content>
      </BounceColorWrapper>
    </Container>
  )
}
