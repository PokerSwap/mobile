import React, {useState, useContext} from 'react';
import {Container, Text, Content, Card, Icon, Header, CardItem } from 'native-base';
import {TouchableOpacity} from 'react-native'

import TourneyHeader from '../Tournaments/Components/TourneyHeader'
import { Context } from '../../Store/appContext';

import AgreedPath from './Paths/agreed';
import CanceledPath from './Paths/canceled';
import IncomingPath from './Paths/incoming';
import EditPath from './Paths/edit';
import InactivePath from './Paths/inactive';
import RejectedPath from './Paths/rejected';
import PendingPath from './Paths/pending';

import { Grid, Row, Col } from 'react-native-easy-grid'

export default SwapOffer = (props) => {

  const { store, actions } = useContext(Context)

  const [percentage, setPercentage] =  useState(props.navigation.getParam('percentage', 'default value'));
  const [counter_percentage, setCounterPercentage] =  useState(props.navigation.getParam('counter_percentage', 'default value'));
  const [table, setTable] = useState(props.navigation.getParam('table', 'default value'));
  const [seat, setSeat] = useState(props.navigation.getParam('seat', 'default value'));
  const [chips, setChips] = useState(props.navigation.getParam('chips', 'default value'));

  const { navigation } = props;
  let status = navigation.getParam('status', 'NO-ID');
  let user_name = navigation.getParam('user_name', 'default value');
  let user_id = navigation.getParam('user_id', 'default value');
  let buyin_id = navigation.getParam('buyin_id', 'default value');
  let swap_id =  navigation.getParam('swap_id', 'default value');
  let swap_updated_at =  navigation.getParam('swap_updated_at', 'default value');
  let flight_id = navigation.getParam('flight_id', 'default value');


  let updated_at =navigation.getParam('updated_at', 'default value');
  let tournament_name = navigation.getParam('tournament_name', 'default value');
  let tournament_id = navigation.getParam('tournament_id', 'default value');
  let address = navigation.getParam('address', 'default value');
  let city = navigation.getParam('city', 'default value');
  let state = navigation.getParam('state', 'default value');
  let start_at = navigation.getParam('start_at', 'default value');
  let action = navigation.getParam('action', 'default value');

  let currentPath;

  // YOUR SWAP VIEW
  if (status=='edit'){ 
    currentPath = 
      <EditPath 
        navigation={props.navigation} user_name={user_name}
        table={table} seat={seat} chips={chips} buyin_id={buyin_id}/>
  }    
  // RECEIVED SWAP VIEW
  else if (status=='incoming'){
    currentPath = 
      <IncomingPath 
        navigation={props.navigation} 
        user_name={user_name} user_id={user_id}
        percentage={percentage} setPercentage={setPercentage}
        counter_percentage={counter_percentage} setCounterPercentage={setCounterPercentage}
        swap_id={swap_id} swap_updated_at={swap_updated_at} />
  } 
  // PENDING SWAP VIEW
  else if (status=='pending'){
    currentPath = 
      <PendingPath 
        navigation={props.navigation} user_name={user_name}
        percentage={percentage} counter_percentage={counter_percentage}
        swap_id={swap_id} swap_updated_at={swap_updated_at}/>
  } 
  // AGREED SWAP VIEW
  else if (status=='agreed'){
    currentPath = 
      <AgreedPath 
        navigation={props.navigation} user_name={user_name}
        percentage={percentage} counter_percentage={counter_percentage} 
        user_id={user_id} tournament_id={tournament_id}
        swap_updated_at={swap_updated_at}/>
  }
  // REJECTED SWAP VIEW 
  else if (status=='rejected'){
    currentPath = 
      <RejectedPath 
        navigation={props.navigation} user_name={user_name}
        percentage={percentage} counter_percentage={counter_percentage}
        swap_updated_at={swap_updated_at}/>
  }
  // CANCELED SWAP VIEW 
  else if (status=='canceled'){
    currentPath = 
      <CanceledPath
        navigation={props.navigation} 
        user_name={user_name}
        percentage={percentage} counter_percentage={counter_percentage}
        swap_updated_at={swap_updated_at}/>
  }
  // INACTIVE SWAP VIEW
  else{
    currentPath = 
      <InactivePath 
        navigation={props.navigation} user_name={user_name}
        tournament_id={tournament_id} user_id={user_id}/>
  }

  let updated;
   status == 'edit'?
    updated = updated_at
    :
    updated = swap_updated_at

  return(
    <Container>
      
      <Content>
        <Card transparent>
        {/* <TourneyHeader 
            name={tournament_name}
            address={address} city={city} state={state}
            start_at={start_at} 
          /> */}
        </Card>
        <Card transparent style={{ justifyContent:'center'}}>
          <CardItem style={{justifyContent:'center'}}>
            <Text style={{textAlign:'center', fontWeight:'600'}}>
              SELECTED BUY-IN:
            </Text>
          </CardItem>
        </Card>
        {/* HEADER */}
        <Card  style={{alignSelf:'center', width:'80%', paddingVertical:5}}>
          
          <CardItem>
            <Grid>
              <Row style={{justifyContent:'center', marginBottom:10}}><Text style={{textAlign:'center', fontSize:30}}>{user_name}</Text></Row>
              <Row>
                <Col style={{justifyContent:'center'}}>
                  <Text style={{textAlign:'center', fontSize:18}}>Table:</Text>
                  <Text style={{textAlign:'center', fontSize:24}}>{table}</Text>
                </Col>
                <Col style={{justifyContent:'center'}}>
                  <Text style={{textAlign:'center', fontSize:18}}>Seat:</Text>
                  <Text style={{textAlign:'center', fontSize:24}}>{seat}</Text>
                </Col>
                <Col style={{justifyContent:'center'}}>
                  <Text style={{textAlign:'center', fontSize:18}}>Chips:</Text>
                  <Text style={{textAlign:'center', fontSize:24}}>{chips}</Text>
                </Col>
              </Row>
            </Grid>
          </CardItem>

        </Card>
        <Text> Last Update: </Text>
          <Text>{updated} </Text>
        {/* BODY */}
        {currentPath}
      </Content>
      
    </Container>
  )
}
