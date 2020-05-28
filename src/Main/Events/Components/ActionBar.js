import React, { useContext } from 'react';

import { Footer, Text, Spinner } from 'native-base';
import { Col } from 'react-native-easy-grid'

import { Context } from '../../../Store/appContext'

export default ActionBar = () => {
  const { store, actions} = useContext(Context)

  var bg;
  !store.action ?
    null : store.action.actions < 50 ?
      bg ='green' : bg='red'
  
  return(
    <Footer style={{maxHeight:60}}>
      {/* CURRENT USER'S NUMBER OF TOURNAMENT SWAPS  */}
      <Col style={{width:'50%', backgroundColor:'blue', justifyContent:'center'}}>
        {!store.action ? 
          <Spinner/> 
          : 
          <Text style={{fontSize:24, fontWeight:'600', color:'white', textAlign:'center'}}>
              Swaps: {store.action.swaps}
          </Text>}
      </Col>
      {/* CURRENT USER'S ACTION  */}
      <Col style={{width:'50%', backgroundColor:'green', justifyContent:'center'}}>
        {!store.action ? 
          <Spinner/> 
          : 
          <Text style={{fontSize:24, fontWeight:'600', color:'white', textAlign:'center'}}>
            Action: {store.action.actions}%
          </Text>}
      </Col>
    </Footer> 
  )
}