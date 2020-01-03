import React from 'react'

import { Button, Segment, Text} from 'native-base';

import Geolocation from '@react-native-community/geolocation';


export default TournamentSort = (props) => {

  const s = async() => {
    var sss =  Geolocation.getCurrentPosition(info => console.log(info));

  }

  return(
    <Segment >
      <Button first active onPress={()=> props.setSort('Zip Code')}>
        <Text>Zip Code</Text>
      </Button>
      <Button last onPress={()=> s()}>
        <Text>Current Location</Text>
      </Button>
    </Segment>
  )
}