import React, {useContext} from 'react';
import { Container, Content, List, ListItem, Separator, Text } from 'native-base';
import _Header from '../../View-Components/header'
import { Context } from '../../Store/appContext'
import SwapTracker from './Components/SwapTracker';

export default SwapDashboard = (props) => {

  const { store, actions } = useContext(Context)

  let liveTracker
  let x = store.my_trackers
  console.log('x',x)
  if(Object.keys(x)[0] == "message"){
    liveTracker = <ListItem noIndent style={{justifyContent:'center'}}>
        <Text style={{justifyContent:'center', textAlign:'center', 
          fontSize:24, width:'80%'}}> You have no live tournaments at the moment. </Text>
      </ListItem>
  } else{
      liveTracker = store.my_trackers.live.map((content, index) => {
        
        return(<SwapTracker
          navigation={props.navigation}
          my_buyin= {content.my_buyin}
          swaps = {content.swaps}
          tournament={content.tournament}
        />)
      })
      console.log('log', liveTracker)
    }
        
            

  return(
    <Container>
      <_Header title={'Swap Dashboard'}  navigation={props.navigation} drawer={() => props.navigation.toggleDrawer()}/>
      <Content>
        <List>

          {/* LIVE SWAPS LIST HEADER */}
          <Separator bordered style={{height:48, backgroundColor:'rgb(56,68,165)'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
              LIVE 
            </Text>                
          </Separator>
          {liveTracker}
          
          {/*SCHEDULED SWAPS LIST HEADER  */}
          
          <Separator bordered style={{height:48, backgroundColor:'gray'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
              STANDBY 
            </Text>
          </Separator>
         
        </List>
      </Content>
    </Container>
)
}
