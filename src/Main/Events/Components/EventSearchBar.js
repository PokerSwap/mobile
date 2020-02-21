import React, {useContext, useState} from 'react'
import { TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { Icon, Item, Text} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, request} from 'react-native-permissions';
 
import {Context} from '../../../Store/appContext'

export default EventSearchBar = (props) => {

  const { store, actions } = useContext(Context)
  const [value, setValue] = useState('')

  const testValue = async(value) => {
    const regexZip = new RegExp('^\\d{5}$');
    const regexName = new RegExp('^[a-zA-Z0-9_.-]+$');
    if(regexZip.test(value)){
      var answer1 = await actions.tournament.getInitial('zip', value)    
      props.setMode('byZip')
    } else if(regexName.test(value)){
      var answer2 = await actions.tournament.getInitial('name', value)
      props.setMode('byName')    
    }else{
      props.setPage(1)
      var answer2 = await actions.tournament.getInitial()
      props.setMode('byDate')
    }
  }



  const askPersmission = async () => {
    
    try{
      request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        })
      )
      var answeer = await getByLocation()
    }catch(error){
      console.log('error', error)
    }
  };

  const getByLocation = () => {
    let a_latitude, a_longitude;
    let myCoordinates = Geolocation.getCurrentPosition(info => {
      console.log('locationinfo',info);
      a_latitude = info.coords.latitude;
      a_longitude = info.coords.longitude;
      props.setMode('byLocation')
      props.setMyCoords({latitude:a_latitude,longitude:a_longitude})
      getNearest(a_latitude, a_longitude)
    })
  }

  const getNearest = async(myLatitude, myLongitude) => {
    var answer = await actions.tournament.getInitial('lat',myLatitude,'lon', myLongitude)
  }

  return(
    <View style={{flex:1, flexDirection:'row',
    alignItems:'center', justifyContent:'space-around', marginVertical:15}}>
      
      {/* SEARCH INPUT */}
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

      {/* SEARCH BUTTON */}
      <TouchableOpacity onPress={()=> testValue(value)}>
        <Text style={{color:'blue'}}>Search</Text>
      </TouchableOpacity>

      {/* SEARCH BY LOCATION BUTTON */}
      <TouchableOpacity style={{marginRight:5}}
        onPress={()=> askPersmission()}>
        <Icon 
          name='location-arrow' type='FontAwesome5'
          style={{color:'blue', fontSize:18}}
        />
      </TouchableOpacity>
    </View>
  )
}