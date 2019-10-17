import React, {Component} from 'react';
import { Container, Content, List, Separator, Text } from 'native-base';
import _Header from '../../View-Components/header'
import { Context } from '../../Store/appContext'
import SwapCard from './Components/SwapCard'

export default class SwapDashboard extends Component {
    constructor(){
      super();
      this.state={}
    }
    
    render(){


      return(
        <Container>
          <_Header drawer={() => this.props.navigation.toggleDrawer()}/>
          <Content>
            <List>
              {/* LIVE SWAPS LIST HEADER */}
              <Separator bordered style={{height:48, backgroundColor:'rgb(56,68,165)'}}>
                <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
                  LIVE 
                </Text>
              </Separator>

              {/* LIVE SWAPS LIST */}
              {/* <Context.Consumer>
                {({store, actions})=> {
                  var tournaments
                  return torunaments.map((content, index) => {
                    return(
                      <Tournament 
                        name={content.name}
                      />
                  )})}}
              </Context.Consumer>  */}

              {/* INCOMING SWAPS LIST */}
              {/* <Context.Consumer>
                {({store, actions})=> {
                  var incomingSwaps = store.my_swaps.filter(item => item.state =='incoming')
                  return incomingSwaps.map((content, index) => {
                    return(
                      <BuyIn 
                        key={index}
                        name={content.name}
                        percent={content.percent}
                        table={content.table}
                        seat={content.seat}
                        chips={content.chips}
                        offer={content.offer}
                      />
                  )})}}
              </Context.Consumer>  */}
  
              {/* SCHEDULED SWAPS LIST HEADER */}
              <Separator bordered style={{height:48, backgroundColor:'gray'}}>
                <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
                  STANDBY 
                </Text>
              </Separator>

              {/* SCHEDUELED SWAPS LIST */}
              <Context.Consumer>
                {({store, actions})=> {
                  var mySwaps = store.profile_in_session.receiving_swaps;
                  return mySwaps.map((content, index) => {
                    return(
                      <SwapCard
                        key={index}
                        tournament={content.tournament_id}
                        percentage={content.percentage}
                        first_name={content.user.first_name}
                        last_name={content.user.last_name}
                      />
                  )})}}
              </Context.Consumer>  

            </List>
          </Content>
        </Container>
      )
    }
}