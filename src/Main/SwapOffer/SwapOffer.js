import React, {useState, useContext, useEffect} from 'react';
import { Container, Text, Content, Card } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'
import Spinner from 'react-native-loading-spinner-overlay'
import moment from 'moment';

import { Context } from '../../Store/appContext';
import EventHeader from '../Events/Components/EventHeader'
import AgreedPath from './Paths/agreed';
import CanceledPath from './Paths/canceled';
import IncomingPath from './Paths/incoming';
import CounterIncomingPath from './Paths/counter_incoming';
import EditPath from './Paths/edit';
import InactivePath from './Paths/inactive';
import RejectedPath from './Paths/rejected';
import PendingPath from './Paths/pending';

export default SwapOffer = (props, {navigation}) => {
  const { store, actions } = useContext(Context)

  let status =  props.navigation.getParam('status', 'default value');
  let swap = props.navigation.getParam('swap', 'default value');
  let buyin =  props.navigation.getParam('buyin', 'default value');
  let tournament = props.navigation.getParam('tournament', 'default value');
  let buyinSince = props.navigation.getParam('buyinSince', 'default value');
  // let swapSince = props.navigation.getParam('swapSince', 'default value');

  const [ loading, setLoading ] = useState(false)
  const [ currentSwap, setCurrentSwap ] = useState(swap)
  const [ aStatus, setAStatus ] = useState(status)
  const [ currentBuyin, setCurrentBuyin ] = useState(buyin)
  const [ tTime, setTTime ] = useState(null)
  const [ sTime, setSTime ] = useState(null)
  const [ bTime, setBTime ] = useState(buyinSince)
  const [ refreshing, setRefreshing ] = useState(false);

   // YOUR SWAP VIEW
   if (store.myProfile.id == buyin.user_id){ 
    currentPath = 
      <EditPath navigation={props.navigation} 
        setLoading={setLoading} setRefreshing={setRefreshing} 
        buyin={buyin} tournament={tournament}/>
  }    
  // INCOMING SWAP VIEW
  else if (aStatus == 'incoming'){
    currentPath = 
      <IncomingPath navigation={props.navigation} 
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        swapSince={sTime}
        tournament_id={tournament.id} buyin={buyin} swap={currentSwap}/>
  } 
  // COUNTER INCOMING SWAP VIEW
  else if (aStatus == 'counter_incoming'){
    currentPath = 
      <CounterIncomingPath navigation={props.navigation} 
      setLoading={setLoading} setRefreshing={setRefreshing}
      swapSince={sTime}  
      tournament_status={tournament.tournament_status}
        tournament_id={tournament.id} buyin={buyin} swap={currentSwap}/>
  }
  // PENDING SWAP VIEW
  else if (aStatus == 'pending'){
    currentPath = 
      <PendingPath navigation={props.navigation} 
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        swapSince={sTime}
        swap={currentSwap} tournament={tournament} buyin={buyin}/>
  } 
  // AGREED SWAP VIEW
  else if (aStatus == 'agreed'){
    currentPath = 
      <AgreedPath navigation={props.navigation} 
        setLoading={setLoading} setRefreshing={setRefreshing} 
        tournament_status={tournament.tournament_status}
        swapSince={sTime}
        swap={currentSwap} tournament={tournament} buyin={buyin}/>
  }
  // REJECTED SWAP VIEW 
  else if (aStatus == 'rejected'){
    currentPath = 
      <RejectedPath navigation={props.navigation} 
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        swapSince={sTime}
        buyin={buyin} swap={currentSwap}/>
  }
  // CANCELED SWAP VIEW 
  else if (aStatus == 'canceled'){
    currentPath = 
      <CanceledPath navigation={props.navigation} 
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        swapSince={sTime}
        swap={currentSwap} buyin={buyin}/>
  }
  // INACTIVE SWAP VIEW
  else {
    currentPath = 
      <InactivePath navigation={props.navigation} 
      setAStatus={setAStatus} setCurrentSwap ={setCurrentSwap}
        setLoading={setLoading} setRefreshing={setRefreshing}
        tournament_status={tournament.tournament_status}
        tournament={tournament} buyin={buyin}/>
  }

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

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('didBlur', () => {
  //     bx()
  // });
  //   return () => {
  //   // unsubscribe()
  //   }
  // }, [navigation])

  var bx = async() => {
    var eee = await actions.swap.removeCurrent()
    setCurrentSwap(null)
    console.log('currentSwap',store.currentSwap)
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
          <EventHeader tournament_name={tournament.name}
          tournamentTime={tTime}/>
        </Card>
        {/* CURRENT STATUS OF BUYIN */}
        <Card style={{alignSelf:'center', width:'90%', 
          paddingTop:15, marginTop:-15, backgroundColor:'rgb(38, 171, 75)'}}>
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
            {/* BUYIN LAST UPDATED TIME */}
            <Row style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
              <Text style={{color:'white', fontWeight:'bold', paddingVertical:10, paddingRight:10,
                textAlign:'right', fontSize:12}}>
                Updated: {bTime}
              </Text>
            </Row>
          </Grid>
        </Card>        
        {/* SWAP BODY PATH */}
        {currentPath}
      </Content>
    </Container>
  )
}
