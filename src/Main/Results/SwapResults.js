import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from 'moment'

import { Modal, View, FlatList, RefreshControl, StatusBar } from 'react-native';
import { Container, Content, List, Text, ListItem, Button } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay'
import { Grid, Row, Col } from 'react-native-easy-grid'

import OtherHeader from '../../View-Components/OtherHeader'
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
  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
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
    <View style={{flex:1}}>
      <View style={{height:20,  backgroundColor:currentStyle.header.color}}>
        <StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
          backgroundColor={'rgb(38, 171, 75)'}/>
      </View>
      <OtherHeader title={'Swap Results'}/>
      {/* <BounceColorWrapper style={{flex: 1}} mainColor={currentStyle.background.color}> */}
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
    
    
   
      {/* NO SWAPS TEXT */}
      {agreedBuyins.length == 0 ?
        <FlatList
          refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListFooterComponent={
            <Segment style={{
              width:'80%', marginTop:20, alignSelf:'center', backgroundColor:'rgba(0,0,0,0)'}}>
              <Text style={{textAlign:'center', paddingVertical:10, color:currentStyle.text.color}}>
                You didn't agree to any swaps in this event.
              </Text>
            </Segment>}/>
        : <FlatList
          style={{backgroundColor:currentStyle.background.color}}
          data={agreedBuyins}
          renderItem={profitTracker}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} />}
          keyExtractor={(content, index) => index.toString()}
          ListHeaderComponent={<View style={{backgroundColor:currentStyle.background.color}}>
          <Text style={{justifyContent:'center', marginTop:20, textAlign:'center', fontWeight:'600', fontSize:20, color:currentStyle.text.color}}> 
              {theTournament.name}
            </Text>
    
            <View style={{ width:'100%'}}>
                {/* TOURNAMENT CASINO and Address*/}
                <Text style={{marginTop:20, textAlign:'center', color:currentStyle.text.color}}>
                  {theTournament.casino + '\n' + theTournament.address + '\n' + 
                    theTournament.city + ', ' + theTournament.state + ' ' + theTournament.zip_code}
                </Text>
                {/* TOURNAMENT START TIME */}
                <Text style={{justifyContent:'center', marginVertical:10, textAlign:'center', fontSize:16, color:currentStyle.text.color}}>
                  {moment(theTournament.start_at).format('llll')}
                </Text>
              </View>
              
    
              {theTournament.results_link ? 
              <View style={{flexDirection:'column', justifyContent:'center', marginTop:10}}>
                <Button block onPress={() => openResults()}>
                  <Text style={{color:currentStyle.text.color}}>
                    See Complete Event Results
                  </Text>
                </Button>
                <Text style={{marginTop:15, marginBottom:5, color:currentStyle.text.color}}>
                  Results posted {moment(theTournament.updated_at).fromNow()}.
                </Text>
              </View>                
            : null}
          
        </View>}
          ListFooterComponent={<View style={{paddingVertical:30}}>
            <Text style={{fontSize:24, textAlign:'center', color:currentStyle.text.color}}>
            Your final profit is:
          </Text>
          <Text style={{fontSize:36, fontWeight:'600', textAlign:'center', color:currentStyle.text.color}}>
            {profit}
          </Text>
            </View>} /> }
          
         
      {/* FINAL PROFIT */}
            
          

    </View>
  )
}
