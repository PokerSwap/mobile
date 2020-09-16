import React from 'react';
import { Linking, TouchableOpacity, View } from 'react-native'
import { Button, Text } from 'native-base'
import moment from 'moment'

export default InfoModal = (props) => {

  const openGPS = () => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${props.tournament.latitude},${props.tournament.longitude}` 
    Linking.openURL(url);
  }

  return(
    <View style={modalStyles.background}>
      {/* WHITE BACKGROUND */}
      <View style={ modalStyles.main }> 
        {/* TOURNAMENT ADDRESS */}
        <Text style={{fontSize:20, textAlign:'center', fontWeight:'600'}}>
          {props.tournament_name}
        </Text>
        {/* TOURNAMENT START DATE */}
        <Text style={{textAlign:'center', paddingVertical:10}}>
          {moment(props.tournament_start).format('llll')}
        </Text>
        {/* TOURNAMENT ADDRESS */}
        <TouchableOpacity onPress={() => openGPS()}>
          <Text style={{textAlign:'center', color:'rgb(0, 122, 255)'}}>
            {props.tournament_address}
          </Text>
        </TouchableOpacity>
        {/* DETAIL ROW 1 */}
        <View style={{flexDirection:'row', paddingTop:10}}>
          {/* STARTING STACK FIELD */}
          <View style={{width:'50%'}}>
            <Text style={{fontWeight:'600',textAlign:'center'}}>Starting Stack:</Text>
            <Text style={{textAlign:'center', fontSize:20}}>15,000</Text>
          </View>
          {/* BLINDS FIELD */}
          <View style={{width:'50%'}}>
            <Text style={{fontWeight:'600',textAlign:'center'}}>Blinds:</Text>
            <Text style={{textAlign:'center', fontSize:20}}>20</Text>
          </View>
        </View>
        {/* DETAIL ROW 2 */}
        <View style={{flexDirection:'row', paddingTop:10}}>           
          <View style={{width:'50%'}}>
            <Text style={{fontWeight:'600',textAlign:'center'}}>Placeholder:</Text>
            <Text style={{textAlign:'center', fontSize:20}}>Here</Text>
          </View>
          {/* BUY-IN AMOUNT */}
          <View style={{width:'50%'}}>
            <Text style={{fontWeight:'600',textAlign:'center'}}>Buy-In:</Text>
            <Text style={{textAlign:'center', fontSize:20}}>$500</Text>
          </View>
        </View>
        {/* CLOSE BUTTON */}
        <Button block  light iconRight onPress={() => props.setVisible(false)}
          style={{justifyContent:'center', marginTop:20}}>
          <Text style={{color:'white'}}>Close</Text>
        </Button>
      </View>
    </View>
  )
}

const modalStyles = {
  background:{
    backgroundColor:'rgba(0,0,0,0.6)', 
    height:'100%', alignContent:'center' },
  button:{
    text:{
      textAlign:'center', fontSize:24}
  },
  field:{
    text:{
      fontSize:24, textAlign:'center', marginRight:15},
    textInput:{
      padding:10, borderRadius:10, alignSelf:'center',
      fontSize:24, borderWidth:1, width:'50%', 
      textAlign:'center', borderColor:'rgba(0,0,0,0.2)' },
    view:{
      flexDirection:'row', justifyContent:'flex-start', alignItems:'center',
      marginBottom:10, marginTop:25 }
  },
  main:{ 
    padding:15, alignSelf:'center', backgroundColor:'white', flexDiection:'column', justifyContent:'center',
    width:'80%', height:'60%', margin: 'auto', position: 'relative',
    top: '20%', left: 0, bottom: 0, right: 0}
}