import React, {} from 'react';
import { Text } from 'native-base';
import { Row, Col, Grid } from 'react-native-easy-grid';

export default  TourneyHeader = (props) => {

  var startMonth = props.start_at.substring(8,11)
  var startDay = props.start_at.substring(5,7)
  var startDayName = props.start_at.substring(0,3)

  return(

    <Grid transparent style={{marginHorizontal:25, marginTop:20, justifyContent:'center'}}>
      <Col style={{marginBottom:5}}>       
        <Row style={{justifyContent:'center'}}><Text style={{fontSize:24, textAlign:'center'}}>{props.tournament_name}</Text></Row>        
        <Row><Text>{props.address}</Text></Row>
        <Row style={{marginVertical:10}}>
          <Col>
            <Row><Text>Begins on:</Text></Row>
            <Row><Text style={{fontSize:24}}>{startDayName}. {startMonth} {startDay}</Text></Row>
          </Col>
          
        </Row>
      </Col>
    </Grid>
  )
}
