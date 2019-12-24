import React, { useContext } from 'react';
import { Context } from '../../../Store/appContext';

import { View } from 'react-native';
import { ListItem, Text, Icon } from 'native-base';
import { Col } from 'react-native-easy-grid'

export default WinningsTracker = (props) => {  

  const { store, actions } = useContext(Context);
  
  const enterWinnings = () => {
    props.navigation.push('SwapPot', {
      tournament: props.tournament,
      my_buyin: props.my_buyin,
      swaps: props.swaps
    })
  }

  return(
    <ListItem noIndent onPress={()=> enterWinnings()}>
      
      <Col style={{width:'80%', justifyContent:'center'}}>

        {/* TOURNAMENT TITLE */}
        <Text 
          style={{color:'black', 
          alignContent:'center',
          textAlign:'center',
          fontSize:20, fontWeight:'600'}}> 
          {props.tournament.name}
        </Text>
        </Col>
<Col style={{width:'20%'}}>

      
      
      {/* RIGHT ARROW NAVIGATION */}
          <Icon style={{justifyContent:'center', alignSelf:'center'}} type="FontAwesome5" name="angle-right"/>
      
          </Col>
    </ListItem>
  )
}