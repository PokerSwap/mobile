import React, {} from 'react';
import { Text, Button } from 'native-base';
import { Linking } from 'react-native';
import { Row, Col, Grid } from 'react-native-easy-grid';

export default  TourneyHeader = (props) => {

  var startMonth = props.start_at.substring(8,11)
  var startDay = props.start_at.substring(5,7)
  var startDayName = props.start_at.substring(0,3)

  var endMonth = props.end_at.substring(8,11)
  var endDay = props.end_at.substring(5,7)
  var endDayName = props.end_at.substring(0,3)

  return(
    <Grid transparent style={{marginHorizontal:5}}>
      <Col style={{marginBottom:5}}>       
        <Row><Text style={{fontSize:24}}>{props.name}</Text></Row>        
        <Row><Text>{props.address}</Text></Row>
        <Row style={{marginVertical:10}}>
          <Col>
            <Row><Text>Begins on:</Text></Row>
            <Row><Text style={{fontSize:24}}>{startDayName}, {startMonth}. {startDay}</Text></Row>
          </Col>
          <Col>
            <Row><Text>Ends On:</Text></Row>
            <Row><Text style={{fontSize:24}}>{endDayName}, {endMonth}. {endDay}</Text></Row>
          </Col>
        </Row>

        {/* INFO BUTTONS */}
        <Row>

          {/* ACTIVE BUTTON */}
          <Col>
            <Button success style={{justifyContent:'center'}}>
              <Text>ACTIVE</Text>
            </Button>
          </Col>
                
          {/* TOURNEY INFO BUTTON */}
          <Col>
            <Button 
              // onPress={()=>Linking.openURL('www.thepokersociety.com/tournament/'+ props.id)}
              style={{justifyContent:'center'}}>
              <Text >Tourney Info</Text>
            </Button>
          </Col>

        </Row>
      
      </Col>
    </Grid>
  )
}
