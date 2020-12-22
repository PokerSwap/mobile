import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from 'moment'

import { Modal, View, FlatList, RefreshControl } from 'react-native';
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
  const [ theTournament, setTheTournament ] = useState(tournament)
  const [ _my_buyin, set_My_Buyin ] = useState(my_buyin)
  const [ theBuyins, setTheBuyins ] = useState(buyins)
  const [ theFinalProfit, setTheFinalProfit ] = useState(final_profit)
  console.log('Buyins in the Results: ', theBuyins)
  var agreedBuyins = theBuyins.filter(buyin => buyin.agreed_swaps.length > 0)
  
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
    var eee = await actions.buy_in.getCurrent(_my_buyin.id) 
  }


  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    var answer = await actions.tracker.getPastSpecific(theTournament.id)
    setTheTournament(answer.tournament)
    set_My_Buyin(answer.my_buyin)
    setTheFinalProfit(answer.final_profit)
    setTheBuyins(answer.buyins)
     agreedBuyins = theBuyins.filter(buyin => buyin.agreed_swaps.length > 0)
     wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);
  // console.log('allPaid',allPaid, tournament.results_link, final_profit)
  var profit
  allPaid & theTournament.results_link !== null ? 
    theFinalProfit >= 0 ?
      profit = "$" + Math.abs(theFinalProfit).toFixed(2)
      : profit = "-$" + Math.abs(theFinalProfit).toFixed(2)
    : agreedBuyins.length == 0 ? 
        profit= '$0.00' : profit = "Pending"
  

  var openResults = () => {
    console.log('url',theTournament.results_link)
    navigation.push('Web View',{
      url: theTournament.results_link
    })
  }

  const profitTracker = ({ item, index }) => { 
    return(
      <ProfitTracker key={index}  myPlace={_my_buyin.place}
            buyin={item} agreed_swaps={item.agreed_swaps}/>
    )
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
            buyin_id={_my_buyin.id} 
            tournament_id={theTournament.id}
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
                  {theTournament.name}
                </Text>
              </Row>
              <Row style={{justifyContent:'space-around'}}>
                <Col style={{ width:'70%'}}>
                  {/* TOURNAMENT CASINO and Address */}
                  <Text style={{marginTop:20, textAlign:'center', color:currentStyle.text.color}}>
                    {theTournament.casino + '\n' + theTournament.address + '\n' + 
                      theTournament.city + ', ' + theTournament.state + ' ' + theTournament.zip_code}
                  </Text>
                  {/* TOURNAMENT START TIME */}
                  <Text style={{justifyContent:'center', marginVertical:10, textAlign:'center', fontSize:16, color:currentStyle.text.color}}>
                    {moment(theTournament.start_at).format('llll')}
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
              {theTournament.results_link ? 
                <Row style={{flexDirection:'column', justifyContent:'center', marginTop:10}}>
                  <Button block onPress={() => openResults()}>
                    <Text style={{color:currentStyle.text.color}}>
                      See Complete Event Results
                    </Text>
                  </Button>
                  <Text style={{marginTop:15, marginBottom:5, color:currentStyle.text.color}}>
                    Results posted {moment(theTournament.updated_at).fromNow()}.
                  </Text>
                </Row>                
              : null}
            </Grid>
          </ListItem>         
          {/* NO SWAPS TEXT */}
          {agreedBuyins.length == 0 ?
            <FlatList
              refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              ListFooterComponent={
                <Segment style={{
                  width:'80%', marginTop:20, alignSelf:'center', backgroundColor:'rgba(0,0,0,0)'}}>
                
            {/* <ListItem noIndent style={{justifyContent:'center'}}> */}
              <Text style={{textAlign:'center', paddingVertical:10, color:currentStyle.text.color}}>
                You didn't agree to any swaps in this event.
              </Text>
            </Segment>}/>

            : null }
            
          <Content contentContainerStyle={{backgroundColor:currentStyle.background.color}} 
          refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>       
            <FlatList
            data={agreedBuyins}
            renderItem={profitTracker}
            keyExtractor={(content, index) => index.toString()}
            ListFooterComponent={<Text style={{textAlign:'center'}}></Text>} />
          </Content>
          
          {/* ALL PROFIT TRACKERS */}
          {/* {agreedBuyins.map((buyin, index) => {
            // console.log('myPlace', buyin)
            return(
              <ProfitTracker key={index}  myPlace={_my_buyin.place}
                buyin={buyin} agreed_swaps={buyin.agreed_swaps}/>
          )})} */}
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
