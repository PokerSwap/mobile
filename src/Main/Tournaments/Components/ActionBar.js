import React, {useContext} from 'react';

import { Button, Footer, Text, Spinner } from 'native-base';
import { Col, Row } from 'react-native-easy-grid'
import {Context} from '../../../Store/appContext'


export default ActionBar = (props) => {

  const { store, actions} = useContext(Context)
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
            {!store.action ? 
              <Spinner/> 
              : 
              <Text>Swaps: {store.action.swaps}</Text>}
          </Button>
        </Col>

        {/* CURRENT USER'S ACTION  */}
        <Col>
          <Button transparent large style={{justifyContent:'center'}}>
            {!store.action ? 
              <Spinner/> 
              : 
              <Text style={{color:'clue'}}>Action: {store.action.actions}%</Text>}
          </Button>
        </Col>

      </Row>
    </Footer> 
  )
}