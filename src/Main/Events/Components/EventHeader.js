import React, {} from 'react';
import { Text, Card, CardItem } from 'native-base';
import {View} from 'react-native'
import CountDown from 'react-native-countdown-component';

import moment from 'moment';

export default EventHeader = (props) => {



  return(
    <Card transparent style={{
      flex:1, flexDirection:'column',justifyContent:'center'}}>
      <CardItem style={{justifyContent:'center'}}>
        <Text style={{
          fontSize:24, fontWeight:'600', textAlign:'center'}}>
          {props.tournament.name}
        </Text>
      </CardItem>

    </Card>
  )
}

const styles = {
  container:{
    
  },
  text:{

  }
}