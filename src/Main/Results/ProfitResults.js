import React, { useState, useEffect, useContext } from 'react';
import { Modal } from 'react-native';
import { Container, Content, List, Text, ListItem } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay'

import { Context } from '../../Store/appContext'
import _Header from '../../View-Components/HomeHeader'
import ProfitTracker from './Components/ProfitTracker'
import BustedModal from '../SwapOffer/Components/BustedModal'

export default ProfitResults = (props) => {
  const { navigation } = props;
  const { store, actions } = useContext(Context)

  let tournament = navigation.getParam('tournament', 'NO-ID');
  let my_buyin = navigation.getParam('my_buyin', 'NO-ID')
  let buyins = navigation.getParam('buyins', 'NO-ID')

  const [ loading, setLoading ] = useState(false)
  const [ visible, setVisible ] = useState(false)
  const [ refreshing, setRefreshing ] = useState(false)
  const [ allPaid, setAllPaid ] = useState(true)

  var agreedBuyins = buyins.filter(buyin => buyin.agreed_swaps.length > 0)
  var myResult = store.currentResults.filter(result => result.user_id == my_buyin.user_id)
  
  useEffect(() => {
    var x = agreedBuyins.forEach((buyin, index) => {
      if (buyin.they_owe_total && buyin.you_owe_total){
        null
      }else{
        setAllPaid(false)
      }
    })
    y()
    setRefreshing(false)
    return () => {
      // cleanup
    }
  }, [refreshing])

  var y = async() => {
    var eee = await actions.buy_in.getCurrent(my_buyin.id) 
  }

  var final_profit = 0
  var fd = agreedBuyins.forEach((buyin, index) => {
    var theirResult = store.currentResults.filter(result => result.user_id == buyin.recipient_user.id)
    buyin.agreed_swaps.forEach(swap => {
      var me = parseInt(myResult[0].winnings) * (swap.percentage * 0.01)
      var them = parseInt(theirResult[0].winnings) * (swap.counter_percentage * 0.01)
      var sum = them - me
      final_profit += sum
    })
  })

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
          {/* ALL PROFIT TRACKERS */}
          {agreedBuyins.map((buyin, index) => {
            var theirResult = store.currentResults.filter(result => result.user_id == buyin.recipient_user.id)
            return(
              <ProfitTracker key={index} 
                myResult={myResult[0]}
                theirResult={theirResult[0]}
                navigation={props.navigation}
                buyin={buyin}
                agreed_swaps={buyin.agreed_swaps}/>
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
