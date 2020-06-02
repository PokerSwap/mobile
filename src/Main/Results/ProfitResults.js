import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Container, Content, List, Text, ListItem, Button } from 'native-base';

import _Header from '../../View-Components/HomeHeader'
import ProfitTracker from './Components/ProfitTracker'

import BustedModal from '../SwapOffer/Components/BustedModal'

import Spinner from 'react-native-loading-spinner-overlay'

export default ProfitResults = (props) => {
  const { navigation } = props;
  let tournament = navigation.getParam('tournament', 'NO-ID');
  let my_buyin = navigation.getParam('my_buyin', 'NO-ID')
  let buyins = navigation.getParam('buyins', 'NO-ID')
  let final_profit = navigation.getParam('final_profit', 'NO-ID')

  console.log('1',tournament)
  console.log('2',my_buyin)

  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [newChips, setNewChips] = useState()


  var agreedBuyins = buyins.filter(buyin => buyin.agreed_swaps.length > 0)

  return(
    <Container> 
      <Content>
        {/* MODAL */}
      <Modal
        animationType='fade'
        visible={visible}
        presentationStyle='overFullScreen'
        transparent={true}>
        <BustedModal 
          setVisible={setVisible} setLoading={setLoading}
          setNewChips={setNewChips} 
          buyin_id={my_buyin.id} 
          newTable={my_buyin.table} newSeat={my_buyin.seat} newChips={0} 
          tournament_id={tournament.id}
        />  
      </Modal>
      <Spinner visible={loading}/>
        <List>
          <ListItem noIndent header style={{
            justifyContent:'center', flexDirection:'column'}}>
            <Text style={{justifyContent:'center', textAlign:'center',
              fontWeight:'600', fontSize:20}}>
              {tournament.name}
            </Text>
            <Text style={{justifyContent:'center', marginTop:10, 
              textAlign:'center', fontSize:20}}>
              {tournament.start_at}
            </Text>
            {!my_buyin.winnings ?
              <Button full success  style={{marginTop:20}}
                onPress={()=> setVisible(true)}>
                <Text>Enter Place and Winnings</Text>
              </Button>
            :null}
          </ListItem>
          {agreedBuyins.map((buyin, index) => {
            return(
              <ProfitTracker key={index} 
                navigation={props.navigation}
                buyin={buyin}
                agreed_swaps={buyin.agreed_swaps}/>
          )})}
          <ListItem>
            <Text style={{fontSize:24}}>
              Your final profits are: ${final_profit}
            </Text>
          </ListItem>
        </List>
      </Content>
    </Container>
)
}
