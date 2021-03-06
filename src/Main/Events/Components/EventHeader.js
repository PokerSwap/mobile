import React, { useState, useContext } from 'react';
import { Context } from '../../../Store/appContext.js'
import moment from 'moment';

import { Modal } from 'react-native'
import { ListItem, Text, Button } from 'native-base';

import InfoModal from '../Components/InfoModal'

import darkStyle from '../../../Themes/dark.js'
import lightStyle from '../../../Themes/light.js'

export default EventHeader = (props) => {
    const { store, actions } = useContext(Context)
    const [ visible, setVisible ] = useState(false)

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  
    return(
        <ListItem itemHeader first style={{flexDirection:'column', 
            backgroundColor:currentStyle.background.color}}>
            <Modal
                animationType='fade'
                visible={visible}
                presentationStyle='overFullScreen'
                transparent={true}>
                <InfoModal  
                    setVisible={setVisible} 
                    tournament={props.tournament} />
                </Modal>
            {/* TOURNAMENT NAME */}
            <Text style={{ fontSize:18, fontWeight:'600', textAlign:'center', 
                color:currentStyle.text.color}}>
                {props.tournament.name}
            </Text>
            {/* TOURNAMENT START */}
            <Text style={{fontSize:14, textAlign:'center', marginTop:10, 
                marginBottom:10, color:currentStyle.text.color}}>
                {moment(props.tournament.start_at).format('llll')}
            </Text>    
            <Button block info onPress={() => setVisible(!visible)}>
                <Text>Event Info</Text>
            </Button>
        </ListItem>
    )
}