import React, {useContext} from 'react';
import { Container, Content, List, Separator, Text } from 'native-base';
import _Header from '../../View-Components/header'
import { Context } from '../../Store/appContext'
import WinningTracker from './Components/WinningTracker'

export default WinningsDashboard = (props) => {

  const {store, actions} = useContext(Context)

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
          {/* {store.buy_ins.map((content, index) => {
            return(
              <Text>{content.flight_id}</Text>
            )})
          } */}
        </List>
      </Content>
    </Container>
)
}
