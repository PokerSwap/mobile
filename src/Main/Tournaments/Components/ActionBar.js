import React, {useContext, useEffect} from 'react';

import { Button, Footer, List, ListItem, Text} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'


export default ActionBar = (props) => {
  return(
    // {/* FOOTER CONTAINS NUMBER OF SWAPS AND ACTION  */}
    <Footer style={{maxHeight:60}}>
      {/* CURRENT USER'S NUMBER OF TOURNAMENT SWAPS  */}
      <Row>
        <Col>
          <Button  large
            style={{
              justifyContent:'center', 
              alignContent:'center',
              alignItems:'center'}}>
            <Text style={{
              textAlign:'center'}}>
                SWAPS: {props.action.swaps}
            </Text>
          </Button>
        </Col>

        {/* CURRENT USER'S ACTION  */}
        <Col>
          <Button transparent large style={{justifyContent:'center'}}>
            <Text >ACTION: {props.action.actions}%</Text>
          </Button>
        </Col>

      </Row>
    </Footer> 
  )
}