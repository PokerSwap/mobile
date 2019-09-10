import React, {Component} from 'react';
import {Container, Content, Button, Footer, List, ListItem, Text} from 'native-base';

import TourneyHeader from './Components/TourneyHeader'
import SwapEntry from '../Swaps/Components/SwapEntry'
import {Col} from 'react-native-easy-grid'

export default class TourneyLobby extends Component {
  constructor(props){
    super(props);
    this.state={
      swaps: 0,
      action: 0
    }
  }
  
  render(){
    return(
      <Container>
        <Content>
          <List>
            <ListItem itemHeader first>

              <TourneyHeader 
                title='#SHRPO' daytime='Thu 11:00AM' 
                date='Sep 1, 2019' 
                address='Seminole Hard Rock  HollyWood, FL'
              />

            {/* TOURNAMENT HEADER
              <Context.Consumer>
                {({store, actions}) => {
                  return store.tournaments.map((content, index) => {
                    return(
                      <TourneyHeader 
                        id={content.id}
                        title={content.name}
                        buyInTime={content.time}
                        outTime={content.outTime}
                        date={content.date}
                        address={content.address}
                      />
                    )
                  })
                }}
              </Context.Consumer> */}
            
            </ListItem>
            <SwapEntry
              name='You' stillIn='Yes' 
              table='20' seat='6' chips='10,000' 
              navigation={this.props.navigation}
            />
            
        {/* TOURNEY SWAP ENTRIES 
            <Content.Consumer>
              {({store, actions}) => {
                return store.swaps.map((content, index) => {
                  return(
                    <SwapEntry
                      id = {content.id}
                      name={content.name}
                      stillIn={content.stillIn}
                      table={content.table}
                      seat={content.seat}
                      chips={content.chips}
                      navigation={this.props.navigation}/>
                  )
                })
              }}
            </Content.Consumer> */}

            <SwapEntry name='Lou Garrison'  stillIn='Yes' table='1' seat='12' chips='34,000' offer='pending' navigation={this.props.navigation}/>
            <SwapEntry  name='Homer Simpson' stillIn='Yes' table='20' seat='6' chips='10,000' offer='agreed' apercent={33} navigation={this.props.navigation}/>
            <SwapEntry name='Paul Blart'  stillIn='Yes' table='12' seat='6' chips='24,000' offer='inactive' navigation={this.props.navigation}/>
            <SwapEntry name='Jack Nicholson'  stillIn='Yes' table='12' seat='9' chips='15,000' navigation={this.props.navigation} offer='recieved'/> 
          </List>
        </Content>
        <Footer style={{maxHeight:60}}>
          <Col>
            <Button  large
              style={{
                justifyContent:'center', 
                alignContent:'center',
                alignItems:'center'}}>
              <Text style={{
                textAlign:'center'}}>
                  SWAPS: {this.state.swaps}
              </Text>
            </Button>
          </Col>
          
          <Col>
            <Button transparent large
              style={{justifyContent:'center'}}>
              <Text >ACTION: {this.state.action}%</Text>
            </Button>
          </Col>
        </Footer>
      </Container>
    )
  }
}