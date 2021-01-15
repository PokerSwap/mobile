import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from 'moment-timezone'

import { AppState, Modal, View, FlatList, RefreshControl, StatusBar } from 'react-native';
import { Container, Content, List, Text, ListItem, Button, Segment } from 'native-base';
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
  const { tournament, my_buyin, agreed_buyins, final_profit, results_link } = route.params;

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const [ loading, setLoading ] = useState(false)
  const [ visible, setVisible ] = useState(false)
  const [ refreshing, setRefreshing ] = useState(false)
  const [ resultsLink, setResultsLink] = useState(results_link)
  const [ allPaid, setAllPaid ] = useState(route.params.allPaid)
  const [ _my_buyin, set_My_Buyin ] = useState(my_buyin)
  const [ agreedBuyins, setAgreedBuyins] = useState(agreed_buyins)
  const [ theFinalProfit, setTheFinalProfit ] = useState(final_profit)


  useEffect(() => {  
    const unsubscribe = navigation.addListener('focus', () => {
      
      
    getT()
    set_My_Buyin(store.currentResult.my_buyin)
    setResultsLink(store.currentResult.resultsLink)
    setTheFinalProfit(store.currentResult.final_profit)
    setAgreedBuyins(store.currentResult.agreed_buyins)
    setAllPaid(store.currentResult.allPaid)
    wait(2000).then(() => setRefreshing(false));
  });

    return () => {
      unsubscribe
    }
  }, [refreshing])

  var getT = () => {
    return(actions.tracker.getPastSpecific(tournament.id))
  }

  // useEffect(() => {
  //   setRefreshing(true)
    
  //   actions.refresh.offer(false)
  //   setRefreshing(false)
  //   // return () => {
  //   //   cleanup
  //   // }
  // }, [store.refreshResult])


  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    var answer = await actions.tracker.getPastSpecific(tournament.id)
    set_My_Buyin(answer.my_buyin)
    setResultsLink(store.currentResult.resultsLink)
    setAllPaid(store.currentResult.allPaid)
    setAgreedBuyins(store.currentResult.agreed_buyins)
    setTheFinalProfit(answer.final_profit)
     wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  // REFRESH AFTER REOPENING FROM BACKGROUND (START)

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground on Swap Results");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    var answer = actions.tracker.getPastSpecific(tournament.id)    
    set_My_Buyin(answer.my_buyin)
    setTheFinalProfit(answer.final_profit)
    setAgreedBuyins(answer.agreed_buyins)
    setResultsLink(answer.resultsLink)
    setAllPaid(answer.allPaid)
    console.log("AppState", appState.current);
  };

  // console.log('check', agreedBuyins)
  // REFRESH AFTER REOPENING FROM BACKGROUND (END)


  var profit
  allPaid & results_link !== null ? 
    theFinalProfit >= 0 ?
      profit = "$" + Math.abs(theFinalProfit).toFixed(2)
      : profit = "-$" + Math.abs(theFinalProfit).toFixed(2)
    : agreedBuyins == [] || agreedBuyins == undefined ? 
        profit= '$0.00' : profit = "Pending"
  

  var openResults = () => {
    navigation.push('Web View',{
      url: results_link
    })
  }

    console.log('item', Object.keys(store.currentResult)  )

  const profitTracker = ({ item, index }) => { 
    console.log('item', Object.keys(item))
    return(
      <ProfitTracker key={index} my_buyin={my_buyin}  myPlace={my_buyin.place}
            buyin={item} agreed_swaps={item.agreed_swaps}/>
    )
  }
  return(
    <Container style={{flex:1, height:'100%'}}>
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
          buyin_id={my_buyin.id} 
          tournament_id={tournament.id}
          mode={'entry'} />  
      </Modal>
      <View style={{backgroundColor:currentStyle.background.color, height:'100%'}}>
     

      
    
      {/* NO SWAPS TEXT */}
      <FlatList
          style={{backgroundColor:currentStyle.background.color}}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={store.currentResult.agreed_buyins}
          renderItem={profitTracker}
          ListHeaderComponent={
            <View style={{ width:'100%', backgroundColor:currentStyle.backgroundColor}}>
              <Text style={{justifyContent:'center', marginTop:20, textAlign:'center', fontWeight:'600', fontSize:20, color:currentStyle.text.color}}> 
                {tournament.name}
              </Text>
              {/* TOURNAMENT CASINO and Address*/}
              <Text style={{marginTop:20, textAlign:'center', color:currentStyle.text.color}}>
                {tournament.casino.name + '\n' + tournament.casino.address + '\n' + 
                  tournament.casino.city + ', ' + tournament.casino.state + ' ' + tournament.casino.zip_code}
              </Text>
              {/* TOURNAMENT START TIME */}
              <Text style={{justifyContent:'center', marginVertical:10, textAlign:'center', fontSize:16, color:currentStyle.text.color}}>
                {moment(tournament.start_at).tz(tournament.casino.time_zone).format('llll z')}
              </Text>
              {store.currentResult.results_link !== null ? 
              <View style={{flexDirection:'column', alignSelf:'center', width:'80%', justifyContent:'center', marginTop:10}}>
                <Button style={{alignSelf:'center'}} block onPress={() => openResults()}>
                  <Text style={{color:currentStyle.text.color, }}>
                    See Complete Event Results
                  </Text>
                </Button>
                 <Text style={{marginTop:15, marginBottom:5, textAlign:'center', color:currentStyle.text.color}}>
                   Results posted {moment(tournament.updated_at).fromNow()}.
                 </Text>
               </View>                
            : null}
            </View>}
          ListFooterComponent={
            <View style={{backgroundColor:currentStyle.background.color, alignSelf:'center', width:'80%'}}>
          {store.currentResult.agreed_buyins == [] || store.currentResult.agreed_buyins == undefined ?
            <Text style={{color:currentStyle.text.color, paddingTop:20,  fontSize:20, textAlign:'center'}}>
              You did not agree to any swaps in this event.
            </Text> 
            : <View style={{paddingVertical:30, paddingBottom:100}}>
            <Text style={{fontSize:24, textAlign:'center', color:currentStyle.text.color}}>
              Your final profit is:
            </Text>
            <Text style={{fontSize:36, fontWeight:'600', textAlign:'center', color:currentStyle.text.color}}>
              {profit}
            </Text>
          </View> }
            
          </View>
          }
        />
        
          
    
          
           
         
     </View>     

    </Container>
  )
}
