import React, { useState, useEffect, useContext } from 'react';
import { Modal, View } from 'react-native';
import { Container, Content, List, Text, ListItem, Button } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from 'moment'
import { Grid, Row, Col } from 'react-native-easy-grid'

import { Context } from '../../Store/appContext'
import _Header from '../../View-Components/HomeHeader'
import ProfitTracker from './Components/ProfitTracker'
import BustedModal from '../SwapOffer/Components/BustedModal'

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
    if (agreedBuyins.length!== 0){
      var x = agreedBuyins.forEach((buyin, index) => {
        if (buyin.they_owe_total && buyin.you_owe_total){
          null
        }else{
          setAllPaid(false)
        }
      })
    }
    
    getBuyin()
    setRefreshing(false)
    return () => {
      // cleanup
    }
  }, [refreshing])

  var getBuyin = async() => {
    var eee = await actions.buy_in.getCurrent(my_buyin.id) 
  }

  console.log('allPaid',allPaid, tournament.results_link, final_profit)
  var profit
  allPaid & tournament.results_link !== null ? 
    final_profit >= 0 ?
      profit = "$" + Math.abs(final_profit).toFixed(2)
      : profit = "-$" + Math.abs(final_profit).toFixed(2)
    : agreedBuyins.length == 0 ? 
        profit= '$0.00' : profit = "Pending"
  

  var openResults = () => {
    navigation.push('Web View',{
      url: tournament.results_link
    })
  }

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
            <Grid>
              {/* TOURNAMENT NAME */}
              <Row>
                <Text style={{justifyContent:'center', textAlign:'center', fontWeight:'600', fontSize:20}}>
                  {tournament.name}
                </Text>
              </Row>
              <Row>
                <Col style={{width:'60%'}}>
                  {/* TOURNAMENT CASINO and Address */}
                  <Text style={{marginTop:20, textAlign:'center'}}>
                    {tournament.casino + '\n' + tournament.address + '\n' + 
                      tournament.city + ', ' + tournament.state + ' ' + tournament.zip_code}
                  </Text>
                  {/* TOURNAMENT START TIME */}
                  <Text style={{justifyContent:'center', marginVertical:10, textAlign:'center', fontSize:16}}>
                    {moment(tournament.start_at).format('llll')}
                  </Text>
                </Col>
                <Col style={{textAlign:'center', justifyContent:'center'}}>
                  <Text style={{alignText:'center'}}>
                    Swapped Players:
                  </Text>
                  <Text style={{alignText:'center', fontSize:24}}>
                    {agreedBuyins.length}
                  </Text>
                </Col>
              </Row>
              {/* TOURNAMENT RESULTS LINK */}
              {tournament.results_link ? 
                <Row style={{flexDirection:'column', justifyContent:'center', marginTop:10}}>
                  <Button block onPress={() => openResults()}>
                    <Text>
                      See Complete Event Results
                    </Text>
                  </Button>
                  <Text style={{marginTop:15, marginBottom:5}}>
                    Results posted {moment(tournament.updated_at).fromNow()}.
                  </Text>
                </Row>                
              : null}
            </Grid>
          </ListItem>         
          {/* NO SWAPS TEXT */}
          {agreedBuyins.length == 0 ?
            <ListItem noIndent style={{justifyContent:'center'}}>
              <Text style={{alignText:'center'}}>
                You didn't agree to any swaps in this event.
              </Text>
            </ListItem>
            : null }
          {/* ALL PROFIT TRACKERS */}
          {agreedBuyins.map((buyin, index) => {
            // console.log('myPlace', buyin)
            return(
              <ProfitTracker key={index}  myPlace={my_buyin.place}
                buyin={buyin} agreed_swaps={buyin.agreed_swaps}/>
          )})}
          {/* FINAL PROFIT */}
          <ListItem style={{flexDirection:'column'}}>
            <Text style={{fontSize:24, textAlign:'center'}}>
              Your final profit is:
            </Text>
            <Text style={{fontSize:36, fontWeight:'600', textAlign:'center'}}>
              {profit}
            </Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  )
}
