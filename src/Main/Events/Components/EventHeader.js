import React from 'react';
import { View } from 'react-native'
import { ListItem, Text } from 'native-base';
import moment from 'moment';
import {Grid, Row, Col} from 'react-native-easy-grid'


export default EventHeader = (props) => {
  return(
    <ListItem itemHeader first style={{flexDirection:'column'}}>
      <Text style={{ fontSize:18, fontWeight:'600', textAlign:'center'}}>
        {props.tournament_name}
      </Text>
      <Grid>
        <Col style={{width:'60%'}}>
          <Row>
            <Text style={{marginTop:20, textAlign:'center'}}>
              {props.tournament_address}
            </Text>
          </Row>          
          <Row style={{justifyContent:'center'}}>
            <Text style={{fontSize:14, textAlign:'center', marginTop:10}}>
                Start Time:{'\n'}{moment(props.tournamentTime).format('llll')}
            </Text>
          </Row>
        </Col>
        <Col>
          <Row style={{justifyContent:'center', flexDirection:'column'}}>
            <Text style={{textAlign:'center'}}>
              Players:
            </Text>
            <Text style={{fontSize:24}}>
              {props.tournament_players}
            </Text>
          </Row>
          <Row>

          </Row>
          
        </Col>
        </Grid>


      
    </ListItem>
  )
}