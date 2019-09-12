import React, {Component} from 'react';
import { Container, List, ListItem, Content, Text } from 'native-base';
import _Header from "../../View-Components/header";
import TournamentBody from './Components/TournamentBody'

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
              <ListItem itemDivider >
                <Text>2019</Text>
              </ListItem>
            {/* TOURNAMENT LIST GENERATOR
                <Context.Consumer>
                  {({store, actions}) => {
                    return store.tournaments.map((content, index) => {
                      return(
                        <TournamentBody 
                          reel={this.props.navigation}
                          title={content.title} 
                          status={content.status}
                          date={content.date} 
                          year={content.year}
                          address={content.address}
                        />
                      )
                    })}
                  }
                </Context.Consumer>
                 */}
                
                <TournamentBody 
                  reel={this.props.navigation}
                  title='#IMANIUS' status='active'
                  month="SEP" day="13" year='2019'
                  street='2122 SW 122 Blvd.' 
                  city='Hollywood' state='FL' zip='35654'
                />
              
                <TournamentBody
                  reel={this.props.navigation}
                  title='#MCUNO' status='inactive'
                  month="DEC" day="23" year='2019'
                  street='3483 NE 100 Terr.' 
                  city='Atlanta' state='GA' zip='42422'
                />

                <TournamentBody
                  reel={this.props.navigation}
                  title='#ONEENN' status='inactive'
                  month="MAR" day="13" year='2020'
                  street='43222 SE 21100 St' 
                  city='Albourny' state='NY' zip='23322'
                />
            </List>

          </Content>
        </Container>
      )
    }
}