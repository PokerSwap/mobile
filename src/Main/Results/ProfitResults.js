import React from 'react';
import { Container, Content, List, Text, ListItem } from 'native-base';

import _Header from '../../View-Components/HomeHeader'
import ProfitTracker from './Components/ProfitTracker'

export default ProfitResults = (props) => {

  const { navigation } = props;
  let tournament = navigation.getParam('tournament', 'NO-ID');
  let my_buyin = navigation.getParam('my_buyin', 'NO-ID')
  let buyins = navigation.getParam('buyins', 'NO-ID')
  let final_profit = navigation.getParam('final_profit', 'NO-ID')

  var agreedBuyins = buyins.filter(buyin => buyin.agreed_swaps.length > 0)

  return(
    <Container> 
      <Content>
        <List>
          <ListItem noIndent header
          style={{justifyContent:'center'}}>
            <Text style={{justifyContent:'center', textAlign:'center',
              fontWeight:'600', fontSize:24}}>
              {tournament.name}
            </Text>
          </ListItem>
          {agreedBuyins.map((buyin, index) => {
            return(
              <ProfitTracker
                key={index} navigation={props.navigation}
                buyin={buyin}
                agreed_swaps={buyin.agreed_swaps}/>
          )})}
          <ListItem>
            <Text>Your final profits are: ${final_profit}</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
)
}
