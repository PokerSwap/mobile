import React, {useContext} from 'react';
import { Container, Content, List, Separator, Text, ListItem } from 'native-base';
import _Header from '../../View-Components/HomeHeader'
import { Context } from '../../Store/appContext'

import PotTracker from './Components/PotTracker'

export default SwapPot = (props) => {

  const {store, actions} = useContext(Context)

  const { navigation } = props;
  let tournament = navigation.getParam('tournament', 'NO-ID');
  let swaps = navigation.getParam('swaps', 'NO-ID')
  
  var start = 0
  var hey = swaps.forEach(swap => 
    start += (100*(swap.swap.percentage/100))-(0*(swap.swap.percentage/100))
    )
  var final = start.toFixed(2)

    var agreedSwaps = swaps.filter(swapBody => swapBody.swap.status=='agreed')
     console.log('agreedSwaps', agreedSwaps)

  return(
    <Container> 
      <Content>
        <List>
          <ListItem style={{justifyContent:'center'}} noIndent header>
            <Text style={{justifyContent:'center', textAlign:'center', fontWeight:'600', fontSize:24}}>{tournament.name}</Text>
          </ListItem>
              {agreedSwaps.map((content, index) => {
                return(
                <PotTracker
                  key={index}
                  swap={content.swap}
                  yourPayOut={0.00}
                  theirPayOut={100.00}
                />
              )})}
          <ListItem>
            <Text>Your final profits are: ${final}</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
)
}
