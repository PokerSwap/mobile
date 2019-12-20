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
  let flight_id = navigation.getParam('flight_id', 'default value');
  let tournament_name = navigation.getParam('tournament_name', 'default value');
  let tournament_id = navigation.getParam('tournament_id', 'default value');
  let address = navigation.getParam('tournament_id', 'default value');
  let start_at = navigation.getParam('start_at', 'default value');
  let end_at = navigation.getParam('end_at', 'default value');


  var buyinEdit = async() => {
    var answer = await actions.buy_in.edit(
      buyin_id,
      table,
      seat,
      chips, 
      props.navigation
    )
  }

  var swapAdd = async() => {
    var answer = await actions.swap.add(
      tournament_id, 
      user_id, 
      percentage,
      props.navigation
    )
  }

  // ADDING PERCENT TO SWAP - NO MORE THAN 50%
  var add = () => {
    if (percentage < 50){
    setPercentage(percentage + 1)
  }else{
    setPercentage(50)
    }
  }

  // SUBTRACTING PERCENT FROM SWAP - NO MORE THAN 50%
  var subtract = () => {
    if (percentage > 1){
      setPercentage(percentage - 1)
    }else{
      setPercentage(1)
    }
  }

  let currentPath;

  // YOUR SWAP VIEW
  if (status=='edit'){ 
    currentPath = 
      <EditPath 
        navigation={props.navigation} user_name={user_name}
        table={table} setTable={setTable}
        seat={seat} setSeat={setSeat}
        chips={chips} setChips={setChips}
        buyin_id={buyin_id}
        buyinEdit={buyinEdit}/>
  }    
  // RECEIVED SWAP VIEW
  else if (status=='incoming'){
    currentPath = 
      <IncomingPath 
        navigation={props.navigation} 
        user_name={user_name} 
        user_id={user_id}
        tournament_id={tournament_id}
        percentage={percentage}
        counter_percentage={counter_percentage}
      />
  } 
  // PENDING SWAP VIEW
  else if (status=='pending'){
    currentPath = 
      <PendingPath 
        navigation={props.navigation} 
        user_name={user_name}
        user_id={user_id}
        tournament_id={tournament_id}
        percentage={percentage}
        counter_percentage={counter_percentage}
      />
  } 
  // AGREED SWAP VIEW
  else if (status=='agreed'){
    currentPath = 
      <AgreedPath 
        navigation={props.navigation} 
        user_name={user_name}
        user_id={user_id}
        percentage={percentage} setPercentage={setPercentage}
        counter_percentage={counter_percentage}
      />
  }
  // REJECTED SWAP VIEW 
  else if (status=='rejected'){
    currentPath = 
      <RejectedPath 
        navigation={props.navigation} 
        user_name={user_name}
        percentage={percentage} 
        counter_percentage={counter_percentage}
      />
  }
  // CANCELED SWAP VIEW 
  else if (status=='canceled'){
    currentPath = 
      <CanceledPath
        navigation={props.navigation} 
        user_name={user_name}
        percentage={percentage}
        counter_percentage={counter_percentage}
      />
  }
  // INACTIVE SWAP VIEW
  else{
    currentPath = 
      <InactivePath 
        navigation={props.navigation} user_name={user_name}
        tournament_id={tournament_id} user_id={user_id}
        percentage={percentage} setPercentage={setPercentage}
        add={add} subtract={subtract} 
        swapAdd={swapAdd}
      />
  }

  return(
    <Container>
      
      <Header style={{
        justifyContent:'flex-start', 
        alignItems:'center', 
        backgroundColor:'rgb(56,68,165)'}}
      />
      <Content>
      
        {/* HEADER */}
        <Card transparent style={{justifyContent:'center'}}>
          {/* <TourneyHeader 
            id={tournament_id} tournament_name={tournament_name}
            address={address}
            start_at={start_at} end_at={end_at}
          /> */}
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

        {/* BODY */}
        {currentPath}
      </Content>
      
    </Container>
  )
}
