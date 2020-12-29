import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Context } from '../../Store/appContext';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';

import { RefreshControl, Text, View, StatusBar } from 'react-native'
import { Container, Content, Card } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'
import Spinner from 'react-native-loading-spinner-overlay'

import AgreedPath from './Paths/agreed';
import CanceledPath from './Paths/canceled';
import IncomingPath from './Paths/incoming';
import CounterIncomingPath from './Paths/counter_incoming';
import EditPath from './Paths/edit';
import InactivePath from './Paths/inactive';
import RejectedPath from './Paths/rejected';
import PendingPath from './Paths/pending';

import BounceColorWrapper from '../../Functional/BounceColorWrapper'
import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default SwapOffer = (props) => {
  const { store, actions } = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const route = useRoute();
  const { status, swap, buyin, tournament, buyinSince } = route.params;
  const [ loading, setLoading ] = useState(false)
  const [ currentSwap, setCurrentSwap ] = useState(swap)
  const [ aStatus, setAStatus ] = useState(status)
  const [ currentBuyin, setCurrentBuyin ] = useState(buyin)
  const [ tTime, setTTime ] = useState(null)
  const [ sTime, setSTime ] = useState(null)
  const [ bTime, setBTime ] = useState(buyinSince)
  const [ refreshing, setRefreshing ] = useState(false);


  var getBuyin = async() => {
    var x = await actions.buy_in.getCurrent(buyin.id)
    setCurrentBuyin(store.currentBuyin)
    var xy = moment(store.currentBuyin.updated_at).fromNow()
    var Time = await actions.time.convertShort(xy)
    setBTime(Time)
  }

  var getSwap = async() => {
    if (aStatus !== 'inactive' && aStatus !== 'edit'){
      // console.log('getting swap from SwapOffer', swap)
      var x = await actions.swap.getCurrent(currentSwap.id)
      setCurrentSwap(store.currentSwap)
      setAStatus(store.currentSwap.status)
      var labelTime = moment(store.currentSwap.updated_at).fromNow()
      setSTime(labelTime)
    } else{
      if(buyin.user_id == store.myProfile.id){
        setAStatus('edit')
      }else{
        setAStatus('inactive')
      }
    }
  }

  let getTime = async() => {
    var x = await actions.time.convertLong(tournament.start_at)
    setTTime(x)
  }

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getBuyin()
    getSwap()
    getTime()
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);


   // YOUR SWAP VIEW
   if (store.myProfile.id == buyin.user_id){ 
    currentPath = 
      <EditPath 
        setLoading={setLoading} onRefresh={onRefresh} setRefreshing={setRefreshing} 
        buyin={buyin} tournament={tournament}/>
  }    
  // INCOMING SWAP VIEW
  else if (aStatus == 'incoming'){
    currentPath = 
      <IncomingPath 
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        swap={currentSwap} swapSince={sTime}
        tournament_id={tournament.id} buyin={buyin} />
  } 
  // COUNTER INCOMING SWAP VIEW
  else if (aStatus == 'counter_incoming'){
    currentPath = 
      <CounterIncomingPath 
        setLoading={setLoading} setRefreshing={setRefreshing}
        swapSince={sTime} swap={currentSwap}
        tournament_status={tournament.tournament_status}
        tournament_id={tournament.id} buyin={buyin} />
  }
  // PENDING SWAP VIEW
  else if (aStatus == 'pending'){
    currentPath = 
      <PendingPath 
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        swapSince={sTime} swap={currentSwap}
        tournament={tournament} buyin={buyin}/>
  } 
  // AGREED SWAP VIEW
  else if (aStatus == 'agreed'){
    currentPath = 
      <AgreedPath 
        setLoading={setLoading} setRefreshing={setRefreshing} 
        tournament_status={tournament.tournament_status}
        swapSince={sTime} swap={currentSwap} 
        tournament={tournament} buyin={buyin}/>
  }
  // REJECTED SWAP VIEW 
  else if (aStatus == 'rejected'){
    currentPath = 
      <RejectedPath 
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        swapSince={sTime} buyin={buyin} swap={currentSwap}/>
  }
  // CANCELED SWAP VIEW 
  else if (aStatus == 'canceled'){
    currentPath = 
      <CanceledPath 
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        swap={currentSwap} swapSince={sTime}
         buyin={buyin}/>
  }
  // INACTIVE SWAP VIEW
  else {
    currentPath = 
      <InactivePath 
        setAStatus={setAStatus} setCurrentSwap ={setCurrentSwap}
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        tournament={tournament} buyin={buyin}/>
  }


  useEffect(() => {
    getBuyin()
    getSwap()
    getTime()
    return () => {
      // cleanup
    }
  }, [false])

  // useEffect(() => {
  //   getBuyin()
  //   getSwap()
  //   getTime()
  //   actions.refresh.toggle()
  // },[store.refresh] )


  let currentPath;

  return(
    <View style={{flex:1,  backgroundColor:currentStyle.background.color}}>
      <View style={{height:20,  backgroundColor:currentStyle.header.color}}>
        <StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
          backgroundColor={'rgb(38, 171, 75)'}/>
      </View>
      <OtherHeader title={'Swap Offer'} />
      <Spinner visible={loading}/>
      <Content contentContainerStyle={{backgroundColor:currentStyle.background.color}}  refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        {/* EVENT HEADER */}
        <Card transparent style={{marginVertical:40, width:'90%', alignSelf:'center', flexDirection:'column', backgroundColor:currentStyle.background.color}}>
          <Text style={{marginVertical:10, fontSize:20, fontWeight:'bold', textAlign:'center', color: currentStyle.text.color}}>
            {tournament.name}
          </Text>
        </Card>
       
        {/* CURRENT STATUS OF BUYIN */}
        <Card style={{alignSelf:'center', flex:1, width:'90%', 
          paddingTop:15, backgroundColor:'rgb(38, 171, 75)'}}>
            {/* USERNAME */}
            <Row style={{
              justifyContent:'center', marginBottom:10}}>
              <Text style={{color:'white',
                textAlign:'center', fontSize:30}}>
                {buyin.user_name}
              </Text>
            </Row>
            {/* BUYIN INFO */}
            <Row>
              {/* TABLE */}
              <Col style={{justifyContent:'center'}}>
                <Text style={{color:'white',
                  textAlign:'center', fontSize:18}}>
                  Table:
                </Text>
                <Text style={{color:'white',
                  textAlign:'center', fontSize:24}}>
                  {currentBuyin.table}
                </Text>
              </Col>
              {/* SEAT */}
              <Col style={{justifyContent:'center'}}>
                <Text style={{color:'white',
                  textAlign:'center', fontSize:18}}>
                  Seat:
                </Text>
                <Text style={{color:'white',
                  textAlign:'center', fontSize:24}}>
                  {currentBuyin.seat}
                </Text>
              </Col>
              {/* CHIPS */}
              <Col style={{justifyContent:'center'}}>
                <Text style={{color:'white',
                  textAlign:'center', fontSize:18}}>
                  Chips:
                </Text>
                <Text style={{color:'white',
                  textAlign:'center', fontSize:24}}>
                  {currentBuyin.chips}
                </Text>
              </Col>
            </Row>
            {/* BUYIN LAST UPDATED TIME */}
            <Row style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
              <Text style={{color:'white', fontWeight:'bold', paddingVertical:10, paddingRight:10,
                textAlign:'right', fontSize:12}}>
                Updated: {bTime}
              </Text>
            </Row>
        </Card>        
        {/* SWAP BODY PATH */}
        {currentPath}
        </Content>

        </View>
      
  )
}
