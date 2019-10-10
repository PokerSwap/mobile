import React, {Component} from 'react';
import { Container, Content, List, Separator, Text } from 'native-base';
import _Header from '../../View-Components/header'
import { Context } from '../../Store/appContext'

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
              <Separator bordered style={{height:48, backgroundColor:'blue'}}>
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
              
              {/* PENDING SWAPS LIST */}
              {/* <Context.Consumer>
                {({store, actions})=> {
                  var pendingSwaps = store.my_swaps.filter(item => item.state =='pending')
                  return pendingSwaps.map((content, index) => {
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
              {/* <Context.Consumer>
                {({store, actions})=> {
                  var schedueledSwaps = store.my_swaps.filter(item => item.state =='schedueled')
                  return schedueledSwaps.map((content, index) => {
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

            </List>
          </Content>
        </Container>
      )
    }
}