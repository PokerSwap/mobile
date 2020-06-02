import React, {useState, useContext, useEffect} from 'react';
import {Modal, View} from 'react-native'
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

  const [loading, setLoading] = useState(false)
  const [currentSwap, setCurrentSwap] = useState(null)
  const [time, setTime] = useState(null)

  var getSwap = async() => {
    var x = await actions.swap.getCurrent(swapID)
    setCurrentSwap(store.currentSwap)
    console.log('stop', currentSwap)
  }

  useEffect(() => {
    getSwap()
    getTime()
    return () => {
      // cleanup
    }
  }, [null])

  let getTime = async() => {
    var x = await actions.swap.convertTime(tournament.start_at)
    setTime(x)
  }

  let status =  navigation.getParam('status', 'default value');
  let swapID = navigation.getParam('swapID', 'default value');
  let buyin =  navigation.getParam('buyin', 'default value');
  let tournament = navigation.getParam('tournament', 'default value');

  let currentPath;

  // YOUR SWAP VIEW
  if (status == 'edit'){ 
    currentPath = 
      <EditPath navigation={props.navigation} 
        buyin={buyin} tournament={tournament}/>
  }    
  // INCOMING SWAP VIEW
  else if (status == 'incoming'){
    currentPath = 
      <IncomingPath navigation={props.navigation} 
        tournament_status={tournament.tournament_status}
        tournament_id={tournament.id} buyin={buyin} swap={currentSwap}/>
  } 
  // COUNTER INCOMING SWAP VIEW
  else if (status == 'counter_incoming'){
    currentPath = 
      <CounterIncomingPath navigation={props.navigation} 
        tournament_status={tournament.tournament_status}
        tournament_id={tournament.id} buyin={buyin} swap={currentSwap}/>
  }
  // PENDING SWAP VIEW
  else if (status == 'pending'){
    currentPath = 
      <PendingPath navigation={props.navigation}
        tournament_status={tournament.tournament_status}
        swap={currentSwap} tournament={tournament} buyin={buyin}/>
  } 
  // AGREED SWAP VIEW
  else if (status == 'agreed'){
    currentPath = 
      <AgreedPath navigation={props.navigation} 
        tournament_status={tournament.tournament_status}
        swap={currentSwap} tournament={tournament} buyin={buyin}/>
  }
  // REJECTED SWAP VIEW 
  else if (status == 'rejected'){
    currentPath = 
      <RejectedPath navigation={props.navigation} 
        tournament_status={tournament.tournament_status}
        buyin={buyin} swap={currentSwap}/>
  }
  // CANCELED SWAP VIEW 
  else if (status == 'canceled'){
    currentPath = 
      <CanceledPath navigation={props.navigation} 
        tournament_status={tournament.tournament_status}
        swap={currentSwap} buyin={buyin}/>
  }
  // INACTIVE SWAP VIEW
  else{
    currentPath = 
      <InactivePath navigation={props.navigation}
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
          tournament_start={time}/>
        </Card>
        {/* CURRENT STATUS OF BUYIN */}
        <Card style={{alignSelf:'center', width:'80%', 
          paddingVertical:15, backgroundColor:'rgb(38, 171, 75)'}}>
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
                    {buyin.table}
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
                    {buyin.seat}
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
                    {buyin.chips}
                  </Text>
                </Col>
              </Row>
            </Grid>
        </Card>        
        {/* SWAP BODY PATH */}
        {currentPath}
      </Content>
      
    </Container>
  )
}
