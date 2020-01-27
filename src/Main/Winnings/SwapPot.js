import React, {useContext} from 'react';
import { Container, Content, List, Separator, Text, ListItem } from 'native-base';
import _Header from '../../View-Components/header'
import { Context } from '../../Store/appContext'

import PotTracker from './Components/PotTracker'

export default SwapPot = (props) => {

  const {store, actions} = useContext(Context)

  const { navigation } = props;
  let tournament = navigation.getParam('tournament', 'NO-ID');
  let swaps = navigation.getParam('swaps', 'NO-ID')
  let my_buyin = navigation.getParam('my_buyin', 'NO-ID')
  

  // var aTracker;

  // if( != 0){
  //   aTracker= 
  // }else{
  //   aTracker=<ListItem><Text>You did not </Text></ListItem>
  // }

  return(
    <Container>
      <Content>
        <List>
          <ListItem style={{justifyContent:'center'}} noIndent header>
            <Text style={{justifyContent:'center', textAlign:'center', fontWeight:'600', fontSize:24}}>{tournament.name}</Text>
          </ListItem>
              {swaps.map((content, index) => {
                return(
                <PotTracker
                  swap={content.swap}
                />
              )})}
          <ListItem>
            <Text>Your final profits are: </Text>
          </ListItem>
        </List>
      </Content>
    </Container>
)
}
