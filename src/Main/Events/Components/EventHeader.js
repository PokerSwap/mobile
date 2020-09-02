import React, {useState} from 'react';
import { TouchableOpacity, Modal } from 'react-native'
import { ListItem, Text } from 'native-base';
import moment from 'moment';

import InfoModal from '../Components/InfoModal'

export default EventHeader = (props) => {

  const [visible, setVisible] = useState(false)
  


  return(
    <ListItem itemHeader first style={{flexDirection:'column'}}>
       <Modal
          animationType='fade'
          visible={visible}
          presentationStyle='overFullScreen'
          transparent={true}>
          <InfoModal  setVisible={setVisible}
            tournament_name={props.tournament_name}
            tournament_address={tournament_address} 
            tournament_start={tournamentTime}
            tournament={currentTournament}/>
        </Modal>
      {/* TOURNAMENT NAME */}
      <Text style={{ fontSize:18, fontWeight:'600', textAlign:'center'}}>
        {props.tournament_name}
      </Text>
      {/* TOURNAMENT START */}
      <Text style={{fontSize:14, textAlign:'center', marginTop:10}}>
        {moment(props.tournamentTime).format('llll')}
      </Text>    
      <Button block info onPress={() => setVisible(!visible)}>
        <Text>Event Info</Text>
      </Button>
      {/* TOURNAMENT ADDRESS */}
      <TouchableOpacity onPress={() => openGPS(props.lat, props.long)}>
        <Text style={{marginTop:20, textAlign:'center', color:'rgb(0,112,255)'}}>
          {props.tournament_address}
        </Text>  
      </TouchableOpacity>
    </ListItem>
  )
}