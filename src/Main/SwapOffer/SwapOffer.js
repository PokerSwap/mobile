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

export default SwapOffer = (props) => {
  const { store, actions } = useContext(Context)
  const { navigation } = props;

  let status =  navigation.getParam('status', 'default value');
  let swapID = navigation.getParam('swapID', 'default value');
  let buyin =  navigation.getParam('buyin', 'default value');
  let tournament = navigation.getParam('tournament', 'default value');
  let buyinSince = navigation.getParam('buyinSince', 'default value');
  let swapSince = navigation.getParam('swapSince', 'default value');


  const [loading, setLoading] = useState(false)
  const [currentSwap, setCurrentSwap] = useState(null)
  const [currentBuyin, setCurrentBuyin] = useState(buyin)

  const [ currentStatus, setCurrentStatus ] = useState(status)
  const [tTime, setTTime] = useState(null)
  const [sTime, setSTime] =useState(null)

  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    getSwap()
    getBuyin()
    setRefreshing(false)
    return () => {
      // cleanup
    }
  }, [refreshing])


  var getBuyin = async() => {
    var x = await actions.buy_in.getCurrent(buyin.id)
    setCurrentBuyin(store.currentBuyin)
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
      null
    }
    
  }

  useEffect(() =>{
    getTime()   
    return () => {
      // cleanup
    }
  }, [null])

  let getTime = async() => {
    var x = await actions.swap.convertTime(tournament.start_at)
    setTTime(x)
  }

  let currentPath;

  // YOUR SWAP VIEW
  if (status == 'edit'){ 
    currentPath = 
      <EditPath navigation={props.navigation} setRefreshing={setRefreshing}
        buyin={buyin} tournament={tournament}/>
  }    
  // INCOMING SWAP VIEW
  else if (store.currentSwap.status == 'incoming'){
    currentPath = 
      <IncomingPath navigation={props.navigation} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        tournament_id={tournament.id} buyin={buyin} swap={currentSwap}/>
  } 
  // COUNTER INCOMING SWAP VIEW
  else if (store.currentSwap.status == 'counter_incoming'){
    currentPath = 
      <CounterIncomingPath navigation={props.navigation} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        tournament_id={tournament.id} buyin={buyin} swap={currentSwap}/>
  }
  // PENDING SWAP VIEW
  else if (store.currentSwap.status == 'pending'){
    currentPath = 
      <PendingPath navigation={props.navigation} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        swap={currentSwap} tournament={tournament} buyin={buyin}/>
  } 
  // AGREED SWAP VIEW
  else if (store.currentSwap.status == 'agreed'){
    currentPath = 
      <AgreedPath navigation={props.navigation} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        swap={currentSwap} tournament={tournament} buyin={buyin}/>
  }
  // REJECTED SWAP VIEW 
  else if (store.currentSwap.status == 'rejected'){
    currentPath = 
      <RejectedPath navigation={props.navigation} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        buyin={buyin} swap={currentSwap}/>
  }
  // CANCELED SWAP VIEW 
  else if (store.currentSwap.status == 'canceled'){
    currentPath = 
      <CanceledPath navigation={props.navigation} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        swap={currentSwap} buyin={buyin}/>
  }
  // INACTIVE SWAP VIEW
  else{
    currentPath = 
      <InactivePath navigation={props.navigation} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        tournament={tournament} buyin={buyin}/>
  }

  return(
    <Container>
    <Spinner visible={loading}/>
      <Content>
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
                      Updated: {buyinSince} ago
                    </Text>
              </Row>
            </Grid>
        </Card>        
        {status !== 'edit' && status !== 'inactive' ?
          swapSince !== 'default value' ?
            <Text style={{textAlign:'center'}}>Swap Occured: {swapSince}</Text>
            : <Text style={{textAlign:'center'}}>Swap Occured: {sTime}</Text>
          : null}
        {/* SWAP BODY PATH */}
        {currentPath}
      </Content>
      
    </Container>
  )
}
