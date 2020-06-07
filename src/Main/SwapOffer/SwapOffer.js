import React, {useState, useContext, useEffect} from 'react';
import {Container, Text, Content, Card } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'
import Spinner from 'react-native-loading-spinner-overlay'

import EventHeader from '../Events/Components/EventHeader'
import { Context } from '../../Store/appContext';

import AgreedPath from './Paths/agreed';
import CanceledPath from './Paths/canceled';
import IncomingPath from './Paths/incoming';
import CounterIncomingPath from './Paths/counter_incoming';
import EditPath from './Paths/edit';
import InactivePath from './Paths/inactive';
import RejectedPath from './Paths/rejected';
import PendingPath from './Paths/pending';

import moment from 'moment';


export default SwapOffer = (props) => {
  const { store, actions } = useContext(Context)
  const { navigation } = props;

  let status =  navigation.getParam('status', 'default value');
  let swapID = navigation.getParam('swapID', 'default value');
  let buyin =  navigation.getParam('buyin', 'default value');
  let tournament = navigation.getParam('tournament', 'default value');
  let buyinSince = navigation.getParam('buyinSince', 'default value');
  let swapSince = navigation.getParam('swapSince', 'default value');

  const [ loading, setLoading ] = useState(false)
  const [ currentSwap, setCurrentSwap ] = useState({status:status})
  const [ currentBuyin, setCurrentBuyin ] = useState(buyin)
  const [ tTime, setTTime ] = useState(null)
  const [ sTime, setSTime ] = useState(swapSince)
  const [ bTime, setBTime ] = useState(buyinSince)
  const [ refreshing, setRefreshing ] = useState(true);

   // YOUR SWAP VIEW
   if (store.myProfile.id == buyin.user_id){ 
    currentPath = 
      <EditPath navigation={props.navigation} 
        setLoading={setLoading} setRefreshing={setRefreshing} 
        buyin={buyin} tournament={tournament}/>
  }    
  // INCOMING SWAP VIEW
  else if (currentSwap.status == 'incoming'){
    currentPath = 
      <IncomingPath navigation={props.navigation} 
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        tournament_id={tournament.id} buyin={buyin} swap={currentSwap}/>
  } 
  // COUNTER INCOMING SWAP VIEW
  else if (currentSwap.status == 'counter_incoming'){
    currentPath = 
      <CounterIncomingPath navigation={props.navigation} 
      setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        tournament_id={tournament.id} buyin={buyin} swap={currentSwap}/>
  }
  // PENDING SWAP VIEW
  else if (currentSwap.status == 'pending'){
    currentPath = 
      <PendingPath navigation={props.navigation} 
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        swap={currentSwap} tournament={tournament} buyin={buyin}/>
  } 
  // AGREED SWAP VIEW
  else if (currentSwap.status == 'agreed'){
    currentPath = 
      <AgreedPath navigation={props.navigation} 
        setLoading={setLoading} setRefreshing={setRefreshing} 
        tournament_status={tournament.tournament_status}
        swap={currentSwap} tournament={tournament} buyin={buyin}/>
  }
  // REJECTED SWAP VIEW 
  else if (currentSwap.status == 'rejected'){
    currentPath = 
      <RejectedPath navigation={props.navigation} 
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        buyin={buyin} swap={currentSwap}/>
  }
  // CANCELED SWAP VIEW 
  else if (currentSwap.status == 'canceled'){
    currentPath = 
      <CanceledPath navigation={props.navigation} 
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        swapTime={swapSince}
        swap={currentSwap} buyin={buyin}/>
  }
  // INACTIVE SWAP VIEW
  else{
    currentPath = 
      <InactivePath navigation={props.navigation} 
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        tournament={tournament} buyin={buyin}/>
  }


  var getBuyin = async() => {
    var x = await actions.buy_in.getCurrent(buyin.id)
    setCurrentBuyin(store.currentBuyin)
    var x = moment(store.currentBuyin.updated_at).fromNow()
    var y, since
    if (x.includes('a ') || x.includes('an ')) { 
      y = '1'
    } else{
      y = parseInt(x.replace(/[^0-9\.]/g, ''), 10);
    }
    if (x.includes('second')) { since = 'Just Now' } 
    else if(x.includes('minute')){ since = y + 'm' } 
    else if(x.includes('hour')){ since = y + 'h' } 
    else if(x.includes('day')){ since = y + 'd' } 
    else if(x.includes('week')){ since = y + 'w' }
    else if(x.includes('month')){ since = y + 'M' }
    else if(x.includes('year')){ since = y + 'Y' }
    else{ null }
    if (since != 'Just Now'){
      setBTime(since + ' ago')
    }else{
      setBTime(since)
    }
    
  }

  var getSwap = async() => {
    // console.log('swapID',swapID)
    if (swapID){
      var x = await actions.swap.getCurrent(swapID)
      setCurrentSwap(store.currentSwap)
      console.log('currentSwap', store.currentSwap)
      console.log('swapSince', swapSince)
      var labelTime = await actions.swap.convertTime(tournament.start_at)
      setSTime(labelTime)
    } else{
      if(buyin.user_id == store.myProfile.id){
        setCurrentSwap({status:'edit'})
      }else{
        setCurrentSwap({status:'inactive'})
      }
    }
  }

  let getTime = async() => {
    var x = await actions.swap.convertTime(tournament.start_at)
    setTTime(x)
  }

  useEffect(() => {
    getSwap()
    getBuyin()
    getTime()   
    setRefreshing(false)
    return () => {
      // cleanup
    }
  }, [refreshing])

  let currentPath;

  

  return(
    <Container>
      <Content>
      <Spinner visible={loading}/>

        {/* EVENT HEADER */}
        <Card transparent>
          <EventHeader 
          tournament_name={tournament.name}
          tournament_start={tTime}/>
        </Card>
        {/* CURRENT STATUS OF BUYIN */}
        <Card style={{alignSelf:'center', width:'90%', 
          paddingTop:15, backgroundColor:'rgb(38, 171, 75)'}}>
            <Grid>
              
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
              <Row style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
                <Text style={{color:'white', fontWeight:'bold', paddingVertical:10, paddingRight:10,
                  textAlign:'right', fontSize:12}}>
                  Updated: {bTime}
                </Text>
              </Row>
            </Grid>
        </Card>        
        {/* {status !== 'edit' && status !== 'inactive' ?
          swapSince !== 'default value' ?
            <Text style={{textAlign:'center'}}>Swap Occured: {swapSince}</Text>
            : <Text style={{textAlign:'center'}}>Swap Occured: {sTime}</Text>
          : null} */}
        {/* SWAP BODY PATH */}
        {currentPath}
      </Content>
      
    </Container>
  )
}
