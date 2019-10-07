import React, {Component} from 'react';
import { View } from 'react-native';
import { Button, Content, Card, CardItem, H1, H3, Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Linking } from 'react-native';
import { Context } from '../../../Store/appContext'

export default class ProfileBio extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
      let x;
      if (this.props.state == 'public'){
        x = <H1>{this.props.name}</H1>
      } else {
        x = <H1>Peter Dinklage</H1>
      }
      
        return(
          <Context.Consumer>
            {({ store, actions }) => {
              var user = store.my_profile;
              return(
                <Grid>
                  <Col>
                    <Row style={{flex:1, justifyContent:"center"}}>
                      <Icon name="contact" style={{fontSize: 120}}/>
                    </Row>
                    <Row style={{displayFlex:1, justifyContent:"center"}}>
                      <Button transparent>
                        <H3>{user.first_name} {user.last_name}</H3>
                      </Button>
                    </Row>
                    <Row 
                      style={{ displayFlex:1, justifyContent:"center", alignItems:"center" }} >
                      <View style={{ borderWidth:1, displayFlex:1, padding:5,
                        flexDirection:'row', alignItems:"center", marginRight:5 }}>
                        <H3> R.O.I.: </H3>
                        <H3> {user.roi}% </H3>
                      </View>
                      <View style={{ borderWidth:1, displayFlex:1, padding:5, flexDirection:'row',
                        alignItems:"center",  marginLeft:5 }} >
                        <H3> {user.rating} </H3>
                        <Icon name="star" style={{color:"gold"}}/>
                      </View>
                    </Row>   
                  </Col>
                </Grid>
          )}}
          </Context.Consumer>
        )
    }
}