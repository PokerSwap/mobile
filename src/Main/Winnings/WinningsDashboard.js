import React, {} from 'react';
import { Container, Content, List, Separator, Text } from 'native-base';
import _Header from '../../View-Components/header'
import { Context } from '../../Store/appContext'
import WinningTracker from './Components/WinningTracker'

export default WinningsDashboard = (props) => {
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
          <Context.Consumer>
            {({store, actions})=> {              
              return store.past_buy_ins.map((content, index) => {
                return(
                  <WinningTracker 
                    
                  />
                  )
                })
              }}
          </Context.Consumer>


        </List>
      </Content>
    </Container>
)
}
