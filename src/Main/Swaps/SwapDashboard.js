import React, {Component} from 'react';
import { Container, Content, List, Separator, Text } from 'native-base';
import _Header from '../../View-Components/header'
import SwapEntry from './Components/SwapEntry';
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
              {/* INCOMING SWAPS LIST HEADER*/}
              <Separator style={{height:48}} bordered>
                <Text style={{fontSize:20}}> 
                  Incoming Swaps 
                </Text> 
              </Separator>

              {/* INCOMING SWAPS LIST
              <Context.Consumer>
                {({store, actions})=> {
                  return store.buy_ins.map((content, index) => {
                    return(
                      <SwapEntry 
                        key={id}
                        name={content.name}
                        percent={content.percent}
                        table={content.table}
                        seat={content.seat}
                        chips={content.chips}
                        offer={content.offer}
                      />
                    )
                  })

                }}
              </Context.Consumer> */}

              <SwapEntry name='Scooby Doo' 
                percent='4' 
                stillIn='Yes' 
                table='43' 
                seat='3' 
                chips='43,000' 
                offer='recieved'
              />
              
              {/* PENDING SWAPS LIST HEADER */}
              <Separator style={{height:48}} bordered>
                <Text style={{fontSize:20}}> Pending Swaps </Text>
              </Separator>
              
              {/* PENDING SWAPS LIST
              <Context.Consumer>
                {({store, actions})=> {
                  var pSwaps = store.swapList.filter(item => item.state =='pending')
                  return pSwaps.map((content, index) => {
                    return(
                      <SwapEntry 
                        key={id}
                        name={content.name}
                        percent={content.percent}
                        table={content.table}
                        seat={content.seat}
                        chips={content.chips}
                        offer={content.offer}
                      />
                    )
                  })

                }}
              </Context.Consumer> */}

              <SwapEntry 
                  name='Lou Garrison' percent='3' stillIn='Yes' 
                  table='12' seat='2' chips='34,000' offer='pending'
                />

              {/* CURRENT SWAPS LIST HEADER */}
              <Separator bordered style={{height:48}}>
                <Text style={{fontSize:20}}> 
                  Current Swaps 
                </Text>
              </Separator>
              
              {/* CURRENT SWAPS LIST
              <Context.Consumer>
                {({store, actions})=> {
                  return store.swapList.map((content, index) => {
                    return(
                      <SwapEntry 
                        key={id}
                        name={content.name}
                        percent={content.percent}
                        table={content.table}
                        seat={content.seat}
                        chips={content.chips}
                        offer={content.offer}
                      />
                    )
                  })

                }}
              </Context.Consumer> */}

              <SwapEntry 
                name='Homer Simpson' stillIn='Yes' 
                table='20' seat='6' chips='10,000'
                offer='agreed' apercent={33}
                navigation={this.props.navigation}
              />
            
            </List>
          </Content>
        </Container>
      )
    }
}