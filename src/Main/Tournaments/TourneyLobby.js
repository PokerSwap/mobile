import React, {Component} from 'react';
import {Container, Content, Button, Footer, List, ListItem, Text} from 'native-base';

import TourneyHeader from './Components/TourneyHeader'
import BuyIn from '../Swaps/Components/BuyIn'
import {Col} from 'react-native-easy-grid'

export default class TourneyLobby extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  
  render(){
    return(
      <Container>
        <Content>
          <List>

            {/* TOURNAMENT HEADER */}
            <ListItem itemHeader first>
              <TourneyHeader 
                id={this.props.id}
                name={this.props.name}
                address={this.props.address}
                abbreviation={this.props.abbreviation}
                start_at={this.props.start_at}
                end_at={this.props.end_at}
              />
            </ListItem>

            {/* CURRENT USER'S BUYIN */}
            <Content.Consumer>
              {({store, actions}) => {
                var you = store.buy_ins.filter(item => item.user_id == 1 )
                return you.map((content, index) => {
                  return(
                    <BuyIn
                      name='You' stillIn='Yes' 
                      table='20' seat='6' chips='10,000' 
                      navigation={this.props.navigation}
                    />
                  )
                })
              }}
            </Content.Consumer> 
            
            {/* TOURNEY BUYIN ENTRIES  */}
            <Content.Consumer>
              {({store, actions}) => {
                var everyone_else = store.buy_ins.filter(item => item.user_id !== 1)
                return everyone_else.map((content, index) => {
                  return(
                    <BuyIn
                      id = {content.id}
                      name={content.name}
                      stillIn={content.stillIn}
                      table={content.table}
                      seat={content.seat}
                      chips={content.chips}
                      state={content.status}
                      navigation={this.props.navigation}
                    />
                  )
                })
              }}
            </Content.Consumer> 

{/* TOURNEY BUYIN ENTRIES  */}
            <Content.Consumer>
              {({store, actions}) => {
                var everyone_else = store.buy_ins.filter(item => item.user_id !== 1)
                return everyone_else.map((content, index) => {
                  return(
                    <BuyIn
                      id = {content.id}
                      name={content.name}
                      stillIn={content.stillIn}
                      table={content.table}
                      seat={content.seat}
                      chips={content.chips}
                      state={content.status}
                      navigation={this.props.navigation}
                    />
                  )
                })
              }}
            </Content.Consumer> 

          </List>
        </Content>

        {/* FOOTER CONTAINS NUMBER OF SWAPS AND ACTION */}
        <Footer style={{maxHeight:60}}>
          
          {/* CURRENT USER'S NUMBER OF CURRENT TOURNAMENT SWAPS */}
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
          

          {/* CURRENT USER'S ACTION */}
          <Col>
            <Button transparent large style={{justifyContent:'center'}}>
              <Text >ACTION: {this.state.action}%</Text>
            </Button>
          </Col>
        </Footer>
      </Container>
    )
  }
}