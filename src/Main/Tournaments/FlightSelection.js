import React, {useState, useContext} from 'react';
import { View, Picker} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';


import { Context } from '../../Store/appContext';
import _Header from "../../View-Components/HomeHeader";
import '../../Images/placeholder.jpg';

export default FlightSelection = (props) => {

  const { store, actions } = useContext(Context)

  var navigation = props.navigation;
  let flights = navigation.getParam('flightMap', 'NO-ID');
  let flight_id = navigation.getParam('flight_id', 'NO-ID');
  let setFlight = navigation.getParam('setFlight', 'NO-ID');

  console.log('flights', flights)

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
      <Content >
        <View            
>
          <Picker   
            selectedValue={flight_id}
            onValueChange={ (itemValue, itemIndex) => setFlight(itemValue) }
          >
            <Picker.Item label='Please select your flight...' value='-1' />
            {FlightSelection}
          </Picker>
        </View>
        
        {/* <Button onPress={()=> console.log()}>
          <Text> Select </Text>
        </Button> */}

      </Content>
    </Container>
  )
}