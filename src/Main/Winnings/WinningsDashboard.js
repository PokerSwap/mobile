import React, {useContext} from 'react';
import { Container, Content, List, Separator, Text, ListItem } from 'native-base';
import _Header from '../../View-Components/header'
import { Context } from '../../Store/appContext'
import WinningsTracker from './Components/WinningsTracker'

export default WinningsDashboard = (props) => {

  const {store, actions} = useContext(Context)

  var recentTracker;

  if(store.pastTrackers.length != 0){
    recentTracker = store.pastTrackers.map((content, index) => {
    return(
      <WinningsTracker 
        tournament={content.tournament}
        my_buyin={content.my_buyin}
        swaps={content.swaps}
        navigation={props.navigation}
      />
    )})
  }else{
    <ListItem><Text>No Recent Winnings</Text></ListItem>
  } 

  return(
    <Container>
      <_Header title={'Winnings Dashboard'} drawer={() => props.navigation.toggleDrawer()}/>
      <Content>
        <List>

          {/* LIVE SWAPS LIST HEADER */}
          <Separator bordered style={{height:48, backgroundColor:'rgb(56,68,165)'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
              RECENT 
            </Text>                
          </Separator>       
          {recentTracker}
          <Separator bordered style={{height:48, backgroundColor:'rgb(56,68,165)'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
              HISTORY 
            </Text>                
          </Separator>       
        </List>
      </Content>
    </Container>
)
}
