import React, {useContext, useState} from 'react'
import { Button, Header, Icon, Content, Item, Text} from 'native-base';
import Geolocation from '@react-native-community/geolocation';


import {Context} from '../../../Store/appContext'
import { TouchableWithoutFeedback, TextInput, Keyboard, View, TouchableOpacity } from 'react-native';

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
    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginBottom:10}}>
      
        <Item rounded style={{width:'65%', height:40, backgroundColor:'#D3D3D3'}}>
          <Icon name="ios-search" />
          <TextInput 
            value={value}
            autoCorrect={false}
            style={{width:'85%'}}
            onChangeText={valueX=> setValue(valueX)}
            clearButtonMode='always'
            placeholder="Search Tournaments"
            placeholderTextColor='#696969' />
        </Item>
      <TouchableOpacity   onPress={()=> testValue(value)}>
        <Text style={{color:'blue'}}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginRight:5}}
      onPress={()=> getByLocation()}>
        <Icon 
          name='location-arrow' type='FontAwesome5'
          style={{color:'blue', fontSize:18}}
        />
      </TouchableOpacity>
    </View>
  )
}