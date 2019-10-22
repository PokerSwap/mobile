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
          <_Header title={'Swap Dashboard'} drawer={() => this.props.navigation.toggleDrawer()}/>
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
                  var myProfile = store.profile_in_session
                  var myBuyIns = myProfile.buy_ins
                  
                  
                  return myBuyIns.map((content, index) => {
                    return(
                      <SwapTracker
                        key = {index}
                        name={content.flight.tournament}

                        first_name={myProfile.first_name}
                        last_name={myProfile.last_name}
                        id={myProfile.id} 
                        swaps={myProfile.receiving_swaps}
                        buy_in_ID= {content.id}

                        table={content.table}
                        seat={content.seat}
                        chips={content.chips}
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