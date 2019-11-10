import React, {useState, useContext} from 'react';
import {Container, Text, Content, Card } from 'native-base';

import TourneyHeader from '../Tournaments/Components/TourneyHeader'
import { Context } from '../../Store/appContext';

import AgreedPath from './Paths/agreed';
import DonePath from './Paths/received';
import EditPath from './Paths/edit';
import InactivePath from './Paths/inactive';
import ReceivedPath from './Paths/edit';
import RejectedPath from './Paths/rejected';
import SentPath from './Paths/sent';

export default SwapOffer = (props) => {

  const { store, actions } = useContext(Context)

  const [percentage, setPercentage] =  useState(1);
  const [table, setTable] = useState(props.navigation.getParam('table', 'default value'));
  const [seat, setSeat] = useState(props.navigation.getParam('seat', 'default value'));
  const [chips, setChips] = useState(props.navigation.getParam('chips', 'default value'));

  console.log('table', table)

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

  let currentPath;

  // YOUR SWAP VIEW
  if (mode=='edit'){ 
    currentPath = 
      <EditPath 
        user_name={user_name}
        flight_id={flight_id}
        table={table} setTable={setTable}
        seat={seat} setSeat={setSeat}
        chips={chips} setChips={setChips}
        buyinEdit={buyinEdit}/>
  }    
  // RECEIVED SWAP VIEW
  else if (mode=='received'){
    currentPath = 
      <ReceivedPath 
      user_name={user_name}

      />
  } 
  // PENDING SWAP VIEW
  else if (mode=='sent'){
    currentPath = 
      <SentPath 
        user_name={user_name}

        tournament_id={tournament_id}
      />
  } 
  // AGREED SWAP VIEW
  else if (mode=='agreed'){
    currentPath = 
      <AgreedPath 
        user_name={user_name}

      />
  }
  // REJECTED SWAP VIEW 
  else if (mode=='rejected'){
    currentPath = 
      <RejectedPath 

      />
  }
  // INACTIVE SWAP VIEW
  else{
    currentPath = 
      <InactivePath 
        percentage={percentage} setPercentage={setPercentage}
        user_name={user_name}
        add={add} subtract={subtract} 
        swapAdd={swapAdd}
      />
  }

  return(
    <Container>
      <Content>
        
        {/* HEADER */}
        <Card transparent style={{justifyContent:'center'}}>
          <TourneyHeader 
            id={tournament_id}
            name={tournament_name}
            address={address}
            start_at={start_at}
            end_at={end_at}

          />
          <Text style={{fontSize:24, justifyContent:'center', textAlign:'center'}}>{user_name}</Text>
        </Card>

        {/* BODY */}
        {currentPath}

      </Content>
    </Container>
  )
}
