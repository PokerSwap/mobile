import React, {Component} from 'react';
import { ListItem, H2, H1, Text, Button } from 'native-base';
import { Linking } from 'react-native';
import { Row, Col, Grid } from 'react-native-easy-grid';

export default class TourneyHeader extends Component {
  constructor(){
    super();
    this.state={}
  }
  
  render(){
    return(
      <Grid transparent style={{marginHorizontal:5}}>
        <Row style={{marginBottom:5}}>
          <Col>
            <Row><H2>{this.props.title}</H2></Row>
            <Row><Text>{this.props.address}</Text></Row>
          </Col>
          <Col>
            <Row><H2>{this.props.date}</H2></Row>
            <Row><Text>{this.props.daytime}</Text></Row>
          </Col>
        </Row>
        <Row>
          
          
          <Col>
            <Button success style={{justifyContent:'center'}}>
              <Text>ACTIVE</Text>
            </Button>
          </Col>
          
          
          <Col>
            <Button 
              onPress={()=>Linking.openURL('www.thepokersociety.com/tournament/'+ this.props.id)}
              style={{justifyContent:'center'}}>
              <Text >Tourney Info</Text>
            </Button>
          </Col>

        </Row>
      </Grid>
    )
  }
}