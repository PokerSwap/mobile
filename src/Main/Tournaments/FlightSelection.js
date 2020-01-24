import React, {useState, useContext} from 'react';
import {Picker} from 'react-native';
import {Container, Content} from 'native-base';

import { Context } from '../../Store/appContext';
import _Header from "../../View-Components/header";
import '../../Images/placeholder.jpg';

export default FlightSelection = (props) => {

  const { store, actions } = useContext(Context)

  const [flight_id, setFlight] = useState('')

  var navigation = props.navigation;
  let flights = navigation.getParam('flights', 'NO-ID');

  var FlightSelection = flights.map((flight) => {
      
    var startMonth = flight.start_at.substring(8,11)
    var startDay = flight.start_at.substring(5,7)
    
    var startTime = flight.start_at.substring(16,22)

    var day_name = flight.start_at.substring(0,3)
    var day_num = flight.day


    var labelTime = 'Day ' + day_num + ' ' + day_name + '.  ' + startMonth + '. ' + startDay + ', ' + startTime 
      
    return(
        <Picker.Item 
          label= {labelTime}
          value={flight.id}
        />
      )
  })

  return(
    <Container>
      <Content>

        <Picker            
          selectedValue={flight_id}
          onValueChange={ (itemValue, itemIndex) => setFlight(itemValue) }
        >
          <Picker.Item label='Please select your flight...' value='-1' />
          {FlightSelection}
        </Picker>
        


      </Content>
    </Container>
  )
}