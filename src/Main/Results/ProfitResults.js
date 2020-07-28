import React, { useState, useEffect, useContext } from 'react';
import { Modal } from 'react-native';
import { Container, Content, List, Text, ListItem } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay'

import { Context } from '../../Store/appContext'
import _Header from '../../View-Components/HomeHeader'
import ProfitTracker from './Components/ProfitTracker'
import BustedModal from '../SwapOffer/Components/BustedModal'

import { useNavigation, useRoute } from '@react-navigation/native'


export default ProfitResults = (props) => {
  const { store, actions } = useContext(Context)

  const route = useRoute()
  const navigation = useNavigation();
  const { tournament } = route.params;
  const { my_buyin } = route.params;  
  const { buyins } = route.params;
  const { final_profit } = route.params;


  const [ loading, setLoading ] = useState(false)
  const [ visible, setVisible ] = useState(false)
  const [ refreshing, setRefreshing ] = useState(false)
  const [ allPaid, setAllPaid ] = useState(true)

  var agreedBuyins = buyins.filter(buyin => buyin.agreed_swaps.length > 0)
  
  useEffect(() => {
    var x = agreedBuyins.forEach((buyin, index) => {
      if (buyin.they_owe_total && buyin.you_owe_total){
        null
      }else{
        setAllPaid(false)
      }
    })
    getBuyin()
    setRefreshing(false)
    return () => {
      // cleanup
    }
  }, [refreshing])

  var getBuyin = async() => {
    var eee = await actions.buy_in.getCurrent(my_buyin.id) 
  }

  var profit
  allPaid ? 
    final_profit >= 0 ?
      profit = "$" + Math.abs(final_profit).toFixed(2)
      : profit = "-$" + Math.abs(final_profit).toFixed(2)
    : profit = "Pending"
  
  return(
    <Container> 
      <Content>
        <Spinner visible={loading}/>
        {/* MODAL */}
        <Modal
          animationType='fade'
          visible={visible}
          presentationStyle='overFullScreen'
          transparent={true}>
          <BustedModal 
            setRefreshing={setRefreshing}
            setVisible={setVisible} setLoading={setLoading}
            buyin_id={my_buyin.id} 
            tournament_id={tournament.id}
            mode={'entry'} />  
        </Modal>
        {/* LOADING SPINNER */}
        <Spinner visible={loading}/>
        {/* MAIN BODY */}
        <List>
          <ListItem noIndent header style={{justifyContent:'center', flexDirection:'column'}}>
            {/* TOURNAMENT NAME */}
            <Text style={{justifyContent:'center', textAlign:'center',
              fontWeight:'600', fontSize:20}}>
              {tournament.name}
            </Text>
            {/* TOURNAMENT START TIME */}
            <Text style={{justifyContent:'center', marginTop:10, textAlign:'center', fontSize:20}}>
              {tournament.start_at}
            </Text>
          </ListItem>
          {agreedBuyins.length == 0 ?
            <ListItem noIndent style={{justifyContent:'center'}}>
              <Text style={{alignText:'center'}}>
                You didn't agree to any swaps in this event.
              </Text>
            </ListItem>
            : null }
          {/* ALL PROFIT TRACKERS */}
          {agreedBuyins.map((buyin, index) => {
            return(
              <ProfitTracker key={index} 
                buyin={buyin} agreed_swaps={buyin.agreed_swaps}/>
          )})}
          {/* FINAL PROFIT */}
          <ListItem style={{flexDirection:'column'}}>
            <Text style={{fontSize:24, textAlign:'center'}}>
              Your final profit is:
            </Text>
            <Text style={{fontSize:36, fontWeight:'600', textAlign:'center'}}>{profit}</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  )
}
