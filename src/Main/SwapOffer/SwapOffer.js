import React, {useState, useContext} from 'react';
import {Container, Text, Content, Card, Icon, Header, } from 'native-base';
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

export default SwapOffer = (props) => {

  const { store, actions } = useContext(Context)

  const [percentage, setPercentage] =  useState(props.navigation.getParam('percentage', 'default value'));
  const [table, setTable] = useState(props.navigation.getParam('table', 'default value'));
  const [seat, setSeat] = useState(props.navigation.getParam('seat', 'default value'));
  const [chips, setChips] = useState(props.navigation.getParam('chips', 'default value'));

  const { navigation } = props;
  let mode = navigation.getParam('mode', 'NO-ID');
  let user_name = navigation.getParam('user_name', 'default value');
  let user_id = navigation.getParam('user_id', 'default value');
  let flight_id = navigation.getParam('flight_id', 'default value');
  let tournament_name = navigation.getParam('tournament_name', 'default value');
  let tournament_id = navigation.getParam('tournament_id', 'default value');
  let address = navigation.getParam('tournament_id', 'default value');
  let start_at = navigation.getParam('start_at', 'default value');
  let end_at = navigation.getParam('end_at', 'default value');


  var buyinEdit = async() => {
    var answer = await actions.buy_in.edit(
      flight_id,
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

  var swapUpdate = async() => {
    var answer = await actions.swap.statusChange(
      tournament_id, 
      user_id, 
      status,
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
  if (mode=='edit'){ 
    currentPath = 
      <EditPath 
        navigation={props.navigation} user_name={user_name}
        flight_id={flight_id}
        table={table} setTable={setTable}
        seat={seat} setSeat={setSeat}
        chips={chips} setChips={setChips}
        buyinEdit={buyinEdit}/>
  }    
  // RECEIVED SWAP VIEW
  else if (mode=='incoming'){
    currentPath = 
      <IncomingPath 
        navigation={props.navigation} user_name={user_name}
        percentage={percentage} setPercentage={setPercentage}
      />
  } 
  // PENDING SWAP VIEW
  else if (mode=='pending'){
    currentPath = 
      <PendingPath 
        navigation={props.navigation} user_name={user_name}
        percentage={percentage}
      />
  } 
  // AGREED SWAP VIEW
  else if (mode=='agreed'){
    currentPath = 
      <AgreedPath 
        navigation={props.navigation} user_name={user_name}
        percentage={percentage} setPercentage={setPercentage}
      />
  }
  // REJECTED SWAP VIEW 
  else if (mode=='rejected'){
    currentPath = 
      <RejectedPath 
        navigation={props.navigation} user_name={user_name}
        percentage={percentage} 
      />
  }
  // CANCELED SWAP VIEW 
  else if (mode=='canceled'){
    currentPath = 
      <CanceledPath
        navigation={props.navigation} user_name={user_name}
        percentage={percentage}
        swapUpdate={swapUpdate}
      />
  }
  // INACTIVE SWAP VIEW
  else{
    currentPath = 
      <InactivePath 
        navigation={props.navigation} user_name={user_name}
        percentage={percentage} setPercentage={setPercentage}
        add={add} subtract={subtract} 
        swapAdd={swapAdd}
      />
  }

  return(
    <Container>
      
      <Header style={{justifyContent:'flex-start', alignItems:'center', backgroundColor:'rgb(56,68,165)'}}>
        <TouchableOpacity onPress={()=> props.navigation.goBack()} style={{alignItems:'center', flexDirection:'row'}}>
          <Icon type='FontAwesome5' name='angle-left' style={{color:'white'}}/>
          <Text style={{fontWeight:'600', color:'white', marginLeft:10, fontSize:18}}> Go Back</Text>
        </TouchableOpacity>
      </Header>
      <Content>
      
        {/* HEADER */}
        <Card transparent style={{justifyContent:'center'}}>
          <TourneyHeader 
            id={tournament_id}
            tournament_name={tournament_name}
            address={address}
            start_at={start_at}
            end_at={end_at}

          />
          <Text style={{textAlign:'center'}}>User:</Text>
          <Text style={{fontSize:36, justifyContent:'center', textAlign:'center'}}>{user_name}</Text>
        </Card>

        {/* BODY */}
        {currentPath}
      </Content>
      
    </Container>
  )
}
