import React, {Component} from 'react';

import { Container, List, Content } from 'native-base';

import _Header from "../../View-Components/header";
import TournamentBody from './Components/TournamentBody';
import { Context } from '../../Store/appContext'

export default TournamentDashboard = (props) => {

  return(

    <Container>
      <_Header title={'Tournament Dashboard'} drawer={() => props.navigation.toggleDrawer()}/>
      <Content>
        <List>
          
          {/* TOURNAMENT LIST GENERATOR */}
          <Context.Consumer>
            {({store, actions}) => {
              var buy_ins = store.profile_in_session.buy_ins
              return store.tournaments.map((content, index) => {
                return(
                  <TournamentBody 
                    navigation={props.navigation}

                    my_buy_ins={buy_ins}

                    key={index}
                    id = {content.id}
                    name={content.name} 
                    created_at={content.created_at} 
                    updated_at={content.updated_at}

                    address={content.address}
                    latitude={content.latitude}
                    longitude={content.longitude}

                    // flights={content.flights}
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
