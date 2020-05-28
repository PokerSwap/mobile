import React from 'react';
import { ListItem, Text } from 'native-base';

export default EventHeader = (props) => {
  return(
    <ListItem itemHeader first>
      <Text style={{ fontSize:18, fontWeight:'600', textAlign:'center'}}>
        {props.tournament.name}
      </Text>
    </ListItem>
  )
}