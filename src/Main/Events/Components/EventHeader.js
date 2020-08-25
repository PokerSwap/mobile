import React from 'react';
import { Linking, TouchableOpacity } from 'react-native'
import { ListItem, Text } from 'native-base';
import moment from 'moment';

export default EventHeader = (props) => {


  const openGPS = (lat, lng) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${lat},${lng}`;
    Linking.openURL(url);
  }

  return(
    <ListItem itemHeader first style={{flexDirection:'column'}}>
      {/* TOURNAMENT NAME */}
      <Text style={{ fontSize:18, fontWeight:'600', textAlign:'center'}}>
        {props.tournament_name}
      </Text>
      {/* TOURNAMENT START */}
      <Text style={{fontSize:14, textAlign:'center', marginTop:10}}>
          Start Time:{'\n'}{moment(props.tournamentTime).format('llll')}
      </Text>    
      {/* TOURNAMENT ADDRESS */}
      <TouchableOpacity onPress={() => openGPS(props.lat, props.long)}>
        <Text style={{marginTop:20, textAlign:'center', color:'rgb(0,112,255)'}}>
          {props.tournament_address}
        </Text>  
      </TouchableOpacity>
    </ListItem>
  )
}