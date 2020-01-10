import React, {useContext, useState} from 'react'
import { View } from 'react-native'
import { Button, Segment, Text} from 'native-base';
import Geolocation from '@react-native-community/geolocation';

import { Context } from '../../../Store/appContext';

export default TournamentSort = (props) => {

  const { store, actions } = useContext(Context)

  // SORT ORDER TOURNAMENTS
  const [asc, setAsc] = useState(props.order=='asc')
  const [desc, setDesc] = useState(props.order=='desc')
  const checkSort = (an_order) => {
    !(an_order=='asc' && props.order=='asc' )?
      !(an_order=='desc' && props.order=='desc') ?
        startSort(props.order, props.searchInput) : null
      :
      null
  }
  const startSort = async (an_order2, searchInput) => {
    
    an_order2 == 'asc' ? an_order2  = 'desc' : an_order2  = 'asc'

    var c

    an_order2 == 'asc' ? c=true : c=false
    var d = !c
    props.setOrder(an_order2)
    props.setPage(1)
    setAsc(c) 
    setDesc(d)
    console.log('order before',an_order2)
    var answer = await actions.tournament.getInitial(props.limit, an_order2, undefined, undefined, undefined, undefined, searchInput)
  }

  // GET CLOSEST TOURNAMENTS
  const [location, setLocation] = useState(false)
  const getLocation = () => {

    let a_latitude, a_longitude 
    let myCoordinates = Geolocation.getCurrentPosition(info => {
      console.log(info);
      a_latitude = info.coords.latitude;
      a_longitude = info.coords.longitude;
      getNearest(props.limit, a_latitude, a_longitude)
    })
  }
  const getNearest = async(limit, myLatitude, myLongitude) => {
    setLocation(true)
    var answer = await actions.tournament.getInitial(limit,'asc','lat',myLatitude,'lon', myLongitude)
  }

  // GET TOURNAMENTS IN ZIPCODE
  const [zipcode, setZipcode] = useState(false)

  return(
    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
      
      <Segment>
        
        <Button first active={asc} 
          onPress={()=> checkSort('asc')}>
          <Text>Asc.</Text>
        </Button>
        
        <Button last active={desc} 
          onPress={()=> checkSort('desc')}>
          <Text>Desc.</Text>
        </Button>
      </Segment>
      
      <Segment >
        
        <Button first active={zipcode} 
          onPress={()=> console.log('lol')}>
          <Text>Zip Code</Text>
        </Button>
        
        <Button last active={location} 
          onPress={()=> getLocation(props.limit)}>
          <Text>Current Location</Text>
        </Button>
      </Segment>
    </View>
  )
}