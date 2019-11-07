import React, {} from 'react';
import { Container, Content, List, Separator, Text } from 'native-base';
import _Header from '../../View-Components/header'
import { Context } from '../../Store/appContext'
import SwapTracker from './Components/SwapTracker';

export default SwapDashboard = (props) => {


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

          <Context.Consumer>
            {({store, actions})=> {    
              var buy_ins = store.profile_in_session.buy_ins;
              return buy_ins.map((content, index) => {
                return(
                  <SwapTracker
                    key = {index}
                    navigation={props.navigation}
                    buy_in_ID= {content.id}
                    user_name={content.user_name}
                    user_id={content.user_id} 
                    table={content.table}
                    seat={content.seat}
                    chips={content.chips}
                    flight_id={content.flight_id}
                  />
                )
                })
              }}
          </Context.Consumer>
          {/* SCHEDULED SWAPS LIST HEADER  */}
          
          <Separator bordered style={{height:48, backgroundColor:'gray'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
              STANDBY 
            </Text>
          </Separator>

          <Context.Consumer>
            {({store, actions})=> {          
              var buy_ins = store.profile_in_session.buy_ins;
              return buy_ins.map((content, index) => {
                return(
                  <SwapTracker
                    key = {index}
                    navigation={props.navigation}
                    buy_in_ID= {content.id}
                    user_name={content.user_name}
                    user_id={content.user_id} 
                    table={content.table}
                    seat={content.seat}
                    chips={content.chips}
                    flight_id={content.flight_id}
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
