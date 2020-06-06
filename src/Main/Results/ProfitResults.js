import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import { Container, Content, List, Text, ListItem, Button } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay'

import _Header from '../../View-Components/HomeHeader'
import ProfitTracker from './Components/ProfitTracker'
import BustedModal from '../SwapOffer/Components/BustedModal'

export default ProfitResults = (props) => {
  const { navigation } = props;
  let tournament = navigation.getParam('tournament', 'NO-ID');
  let my_buyin = navigation.getParam('my_buyin', 'NO-ID')
  let buyins = navigation.getParam('buyins', 'NO-ID')
  let final_profit = navigation.getParam('final_profit', 'NO-ID')

  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [newChips, setNewChips] = useState()
  const [allPaid, setAllPaid] = useState(true)

  useEffect(() => {
    var x = agreedBuyins.forEach((buyin, index) => {
      if (buyin.they_owe_total && buyin.you_owe_total){
        null
      }else{
        setAllPaid(false)
      }
    })
    return () => {
      // cleanup
    }
  }, [null])

  var agreedBuyins = buyins.filter(buyin => buyin.agreed_swaps.length > 0)

  var profit
  allPaid ? 
    final_profit < 0 ?
      profit = "-$" + Math.abs(final_profit).toFixed(2)
      : profit = "$" + Math.abs(final_profit).toFixed(2)
    : profit = "Pending"
  
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
            buyin_id={my_buyin.id} 
            tournament_id={tournament.id}
            mode={'entry'}
          />  
        </Modal>
        {/* LOADING SPINNER */}
        <Spinner visible={loading}/>
        {/* MAIN BODY */}
        <List>
          <ListItem noIndent header style={{
            justifyContent:'center', flexDirection:'column'}}>
            {/* TOURNAMENT NAME */}
            <Text style={{justifyContent:'center', textAlign:'center',
              fontWeight:'600', fontSize:20}}>
              {tournament.name}
            </Text>
            {/* TOURNAMENT START TIME */}
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
          {/* ALL PROFIT TRACKERS */}
          {agreedBuyins.map((buyin, index) => {
            return(
              <ProfitTracker key={index} 
                navigation={props.navigation}
                buyin={buyin}
                agreed_swaps={buyin.agreed_swaps}/>
          )})}
          {/* FINAL PROFIT */}
          <ListItem>
            <Text style={{fontSize:24}}>
              Your final profits are: {profit}
            </Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  )
}
