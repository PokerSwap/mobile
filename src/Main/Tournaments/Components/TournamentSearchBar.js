import React, {useContext, useState} from 'react'
import { Button, Header, Icon, Input, Item, Text} from 'native-base';
import Geolocation from '@react-native-community/geolocation';


import {Context} from '../../../Store/appContext'
import { TouchableWithoutFeedback, TextInput, Keyboard, ScrollView } from 'react-native';

export default TournamentSearchBar = (props) => {

  const { store, actions } = useContext(Context)
  
  const [location, setLocation] = useState(false)
  const [value, setValue] = useState('')

  const testValue = async(value) => {
    const regexZip = new RegExp('^\\d{5}$');
    const regexName = new RegExp('^[a-zA-Z0-9_.-]*$');
    if(regexZip.test(value)){
      var answer1 = await actions.tournament.getInitial('zip', value)    
    } else if(regexName.test(value)){
      var answer2 = await actions.tournament.getInitial('name', value)    
    }else{
      console.log('nope')
    }
  }

  const getByLocation = () => {
    let a_latitude, a_longitude;
    let myCoordinates = Geolocation.getCurrentPosition(info => {
      console.log(info);
      a_latitude = info.coords.latitude;
      a_longitude = info.coords.longitude;
      getNearest(a_latitude, a_longitude)
    })
  }

  const getNearest = async(myLatitude, myLongitude) => {
    setLocation(true)
    console.log("lat", myLatitude)
    console.log("lon", myLongitude)

    var answer = await actions.tournament.getInitial('lat',myLatitude,'lon', myLongitude)
  }

  return(
    <Header searchBar rounded>
      <ScrollView style={{flex: 1}}
        keyboardShouldPersistTaps='handled'>
        <Item style={{width:'100%'}}>
          <Icon name="ios-search" />
          <TextInput 
            value={value}
            onChangeText={valueX=> setValue(valueX)}
            placeholder="Search Tournaments" />
        </Item>
      </ScrollView>
      <Button transparent onPress={()=> testValue(value)}>
        <Text>Search</Text>
      </Button>
      <Button transparent
      onPress={()=> getByLocation()}
        style={{width:80, height:60}}>
        <Icon 
          name='location-arrow' type='FontAwesome5'
        />
      </Button>
    </Header>
  )
}