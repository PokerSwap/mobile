import React, {useState, useContext} from 'react';
import {Container, Text, Content, Card } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'

import EventHeader from '../Events/Components/EventHeader'
import { Context } from '../../Store/appContext';

import AgreedPath from './Paths/agreed';
import CanceledPath from './Paths/canceled';
import IncomingPath from './Paths/incoming';
import CounterIncoming from './Paths/counter_incoming';
import EditPath from './Paths/edit';
import InactivePath from './Paths/inactive';
import RejectedPath from './Paths/rejected';
import PendingPath from './Paths/pending';

export default SwapOffer = (props) => {

  const { store, actions } = useContext(Context)
  const { navigation } = props;

  let status =  navigation.getParam('status', 'default value');
  let swap =  navigation.getParam('swap', 'default value');
  let buyin =  navigation.getParam('buyin', 'default value');
  let updated_at =navigation.getParam('updated_at', 'default value');
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
        buyin={buyin} swap={swap}/>
  } 
  // COUNTER INCOMING SWAP VIEW
  else if (status == 'incoming'){
    currentPath = 
      <CounterIncomingPath navigation={props.navigation} 
        tournament_status={tournament.tournament_status}
        buyin={buyin} swap={swap}/>
  }
  // PENDING SWAP VIEW
  else if (status == 'pending'){
    currentPath = 
      <PendingPath navigation={props.navigation}
        tournament_status={tournament.tournament_status}
        swap={swap} tournament={tournament} buyin={buyin}/>
  } 
  // AGREED SWAP VIEW
  else if (status == 'agreed'){
    currentPath = 
      <AgreedPath navigation={props.navigation} 
        tournament_status={tournament.tournament_status}
        swap={swap} tournament={tournament} buyin={buyin}/>
  }
  // REJECTED SWAP VIEW 
  else if (status == 'rejected'){
    currentPath = 
      <RejectedPath navigation={props.navigation} 
        tournament_status={tournament.tournament_status}
        buyin={buyin} swap={swap}/>
  }
  // CANCELED SWAP VIEW 
  else if (status == 'canceled'){
    currentPath = 
      <CanceledPath navigation={props.navigation} 
        tournament_status={tournament.tournament_status}
        swap={swap} buyin={buyin}/>
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
      
      <Content>

        {/* EVENT HEADER */}
        <Card transparent>
          <EventHeader tournament={tournament} />
        </Card>

        {/* CURRENT STATUS TITLE */}
        <Card transparent style={{ justifyContent:'center'}}>
          <Text style={{textAlign:'center', fontWeight:'600'}}>
            CURRENT STATUS:
          </Text>
        </Card>
        
        {/* CURRENT STATUS OF BUYIN */}
        <Card style={{alignSelf:'center', width:'80%', 
          paddingVertical:15, backgroundColor:'rgb(38, 171, 75)'}}>
            <Grid>
              <Row style={{
                justifyContent:'center', marginBottom:10}}>
                <Text style={{color:'white',
                  textAlign:'center', fontSize:30}}>
                  {buyin.user_name}
                </Text>
              </Row>
              
              
              <Row>

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
        
        {/* LAST UPDATED STATUS */}
        <Card transparent style={{justifyContent:'center'}}>
          <Text style={{textAlign:'center', fontSize:24, 
            lineHeight:50, textTransform:'capitalize'}}> 
            {status} Since: {"\n"} {updated_at}
          </Text>
        </Card>
        
        {/* SWAP BODY PATH */}
        {currentPath}
      </Content>
      
    </Container>
  )
}
