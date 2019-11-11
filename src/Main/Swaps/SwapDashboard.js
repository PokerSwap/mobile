import React, {useContext} from 'react';
import { Container, Content, List, Separator, Text } from 'native-base';
import _Header from '../../View-Components/header'
import Store, { Context } from '../../Store/appContext'
import SwapTracker from './Components/SwapTracker';

export default SwapDashboard = (props) => {

const { store, actions } = useContext(Context)

  var x = store.swapCurrent
  let liveTracker
  if(store.swapCurrent.message == "Buy_in not found"){
    liveTracker = <Text> You have no live tournaments at the moment. </Text>
  } else{
    liveTracker = <SwapTracker
                      navigation={props.navigation}
                      my_current_buy_in= {x.my_current_buy_in}
                      other_swaps = {x.other_swaps}
                      tournament={x.tournament}
                    />
    }    
            

  return(
    <Container>
      <_Header title={'Swap Dashboard'} drawer={() => props.navigation.toggleDrawer()}/>
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
