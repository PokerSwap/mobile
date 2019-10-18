import React, {Component} from 'react';
import { Container, Content, List, Separator, Text } from 'native-base';
import _Header from '../../View-Components/header'
import { Context } from '../../Store/appContext'
import SwapTracker from './Components/SwapTracker';

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

              {/* SCHEDULED SWAPS LIST HEADER */}
              <Separator bordered style={{height:48, backgroundColor:'gray'}}>
                <Text style={{fontSize:20, color:'white', fontWeight:'600', textAlign:'center'}}> 
                  STANDBY 
                </Text>
              </Separator>

              {/* SCHEDULED TOURNAMENT TITLE AND BOX */}
              <Context.Consumer>
                {({store, actions})=> {
                  var mySwaps = store.profile_in_session.receiving_swaps
                  return mySwaps.map((content, index) => {
                    var x = content.tournament_id;
                    var tournament = () => actions.tournament.get(x)
                    return(
                      <SwapTracker
                        tournament = {tournament.name}
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
}