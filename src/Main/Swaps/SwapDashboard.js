import React, {Component} from 'react';
import { Container, Content, List, Separator, Text } from 'native-base';
import _Header from '../../View-Components/header'
import BuyIn from './Components/BuyIn';
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

              {/* INCOMING SWAPS LIST HEADER */}
              <Separator style={{height:48}} bordered>
                <Text style={{fontSize:20}}> Incoming Swaps </Text> 
              </Separator>

              {/* INCOMING SWAPS LIST */}
              <Context.Consumer>
                {({store, actions})=> {
                  var incomingSwaps = store.swaps.filter(item => item.state =='incoming')
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
              </Context.Consumer> 
              
              {/* PENDING SWAPS LIST HEADER */}
              <Separator style={{height:48}} bordered> 
                <Text style={{fontSize:20}}> Pending Swaps </Text>
              </Separator>
              
              {/* PENDING SWAPS LIST */}
              <Context.Consumer>
                {({store, actions})=> {
                  var pendingSwaps = store.swaps.filter(item => item.state =='pending')
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
              </Context.Consumer> 

              {/* CURRENT SWAPS LIST HEADER */}
              <Separator bordered style={{height:48}}>
                <Text style={{fontSize:20}}> Current Swaps </Text>
              </Separator>
              
              {/* CURRENT SWAPS LIST */}
              <Context.Consumer>
                {({store, actions})=> {
                  var currentSwaps = store.swaps.filter(item => item.state =='current')
                  return currentSwaps.map((content, index) => {
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
              </Context.Consumer> 
            
            </List>
          </Content>
        </Container>
      )
    }
}