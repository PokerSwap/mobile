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

  // sortby
  //   date
  //   location

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
                      navigation={this.props.navigation}

                      key={content.id}
                      name={content.name} 
                      created_at={content.created_at}
                      updated_at={content.updated_at}

                      address={content.address}
                      latitude={content.latitude}
                      longitude={content.longitude}

                      flights={content.flights}
                      start_at={content.start_at}
                      end_at={content.end_at}
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