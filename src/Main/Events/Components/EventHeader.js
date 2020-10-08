import React, { useState, useContext } from 'react';
import { Context } from '../../../Store/appContext.js'
import moment from 'moment';

import { Modal } from 'react-native'
import { ListItem, Text, Button } from 'native-base';

import darkStyle from '../../../Themes/dark.js'
import lightStyle from '../../../Themes/light.js'

import InfoModal from '../Components/InfoModal'

export default EventHeader = (props) => {
  const { store, actions } = useContext(Context)
  const [ visible, setVisible ] = useState(false)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  
  return(
    <ListItem itemHeader first style={{flexDirection:'column'}}>
       <Modal
          animationType='fade'
          visible={visible}
          presentationStyle='overFullScreen'
          transparent={true}>
          <InfoModal  setVisible={setVisible}
            tournament_name={props.tournament_name}
            tournament_address={props.tournament_address} 
            tournament_start={props.tournamentTime}
            tournament={props.currentTournament}/>
        </Modal>
      {/* TOURNAMENT NAME */}
      <Text style={{ fontSize:18, fontWeight:'600', textAlign:'center', color:'black'}}>
        {props.tournament_name}
      </Text>
      {/* TOURNAMENT START */}
      <Text style={{fontSize:14, textAlign:'center', marginTop:10, marginBottom:10, color:'black'}}>
        {moment(props.tournamentTime).format('llll')}
      </Text>    
      <Button block info onPress={() => setVisible(!visible)}>
        <Text>Event Info</Text>
      </Button>
      {/* TOURNAMENT ADDRESS */}
      {/* <TouchableOpacity onPress={() => openGPS(props.lat, props.long)}>
        <Text style={{marginTop:20, textAlign:'center', color:'rgb(0,112,255)'}}>
          {props.tournament_address}
        </Text>  
      </TouchableOpacity> */}
    </ListItem>
  )
}