import React, {Component} from 'react';
import { Container, List, ListItem, Content, Text } from 'native-base';
import _Header from "../../View-Components/header";
import TournamentBody from './Components/TournamentBody';
import { Context } from '../../Store/appContext'

export default class TournamentDashboard extends Component {
    constructor(props){
      super(props);
      this.state={}
    }
    
    render(){
      return(
        <Container>
          <_Header drawer={() => this.props.navigation.toggleDrawer()}/>
          <Content>
            <List>
             {/* TOURNAMENT LIST GENERATOR */}
                <Context.Consumer>
                  {({store, actions}) => {
                    return store.tournaments.map((content, index) => {
                      return(
                        <TournamentBody 
                          reel={this.props.navigation}
                          name={content.name} 
                          abbreviation={content.abbreviation}
                          status={content.status}
                          start_at={content.start_at}
                          end_at={content.end_at}
                          buy_ins={content.buy_ins}
                          flights={content.flights}
                          address={content.address}
                        />
                      )
                    })}
                  }
                </Context.Consumer>  
            </List>
          </Content>
        </Container>
      )
    }
}