import React from 'react';
import { ListItem, Text } from 'native-base';

export default EventHeader = (props) => {
  return(
    <ListItem itemHeader first style={{flexDirection:'column'}}>
      <Text style={{ fontSize:18, fontWeight:'600', textAlign:'center'}}>
        {props.tournament_name}
      </Text>
      <Text style={{fontSize:18, marginTop:10}}>
        {props.tournamentTime}
      </Text>
    </ListItem>
  )
}