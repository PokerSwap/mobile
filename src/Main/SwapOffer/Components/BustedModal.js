import React, { useState, useContext } from 'react'
import { TextInput, View, TouchableOpacity } from 'react-native'
import { Text, Icon } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'

import {Context} from '../../../Store/appContext'

export default BustedModal = (props) => {
  const { store, actions } = useContext(Context)
  const [place, setPlace] = useState('')
  const [winnings, setWinnings] = useState('')

  var txtWinnings = null
console.log('a', props.buyin_id)
console.log('b', props.newTable)

console.log('c', props.newSeat)

console.log('d', props.newChips)

console.log('e', props.tournament_id)


  var bustedComplete = async() => {
    props.setNewChips(0)
    props.setLoading(true)
    var answer1 = await actions.buy_in.edit(
      props.buyin_id, props.newTable, props.newSeat, 0, props.tournament_id, false)
    var answer2 = await actions.buy_in.busted(
      props.buyin_id, place, winnings, props.tournament_id )
    props.setLoading(false)
    props.setVisible(false)
  } 

  return(

      <View style={modalStyles.background}>
        <View style={ modalStyles.main }>        
          
          <Text style={{fontSize:24, textAlign:'center'}}>
            Enter your place and cash amount you won.
          </Text>

          <Grid style={{marginVertical:10}}>
            
            <Col style={{justifyContent:'center'}}>             
              <View style={ modalStyles.field.view }>
                <Icon type='Ionicons' name='ios-ribbon'/>
                <Text style={ modalStyles.field.text }>
                {'  '}Place
                </Text>
              </View>

              <TextInput 
                style={ modalStyles.field.textInput }
                placeholder={'5'}
                keyboardType='number-pad'
                placeholderTextColor='grey'
                blurOnSubmit={false}
                returnKeyType="done"
                onSubmitEditing={() => { txtWinnings.focus(); }}
                value={place}    
                onChangeText={placeX => setPlace( placeX )}/>
           
              <View style={modalStyles.field.view}>
                <Icon type='FontAwesome5' name='dollar-sign'/>
                <Text style={modalStyles.field.text}>
                  {'  '}Cash Amount
                </Text>
              </View>

              <TextInput 
                style={modalStyles.field.textInput}
                keyboardType='decimal-pad'
                returnKeyType="done"
                placeholderTextColor='grey'
                placeholder={'$100.00'}
                ref={(input) => { txtWinnings = input; }} 
                blurOnSubmit={true}
                value={winnings}    
                onChangeText={winningsX => setWinnings( winningsX )} />

              <Row style={{marginTop:20, justifyContent:'space-around'}}>
              
                <TouchableOpacity onPress={()=> bustedComplete()}>
                  <Text style={modalStyles.button.text}>
                    Submit
                  </Text>
                </TouchableOpacity>
              
                <TouchableOpacity onPress={()=>props.setVisible(false)}>
                  <Text style={modalStyles.button.text}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </Row>
            </Col>
          </Grid>
          
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
      fontSize:24, textAlign:'center'},
    textInput:{
      padding:10, borderRadius:10, alignSelf:'center',
      fontSize:24, borderWidth:1, width:'50%', 
      textAlign:'center', borderColor:'rgba(0,0,0,0.2)' },
    view:{
      flexDirection:'row', justifyContent:'center', 
      marginBottom:10, marginTop:25 }
  },
  main:{ 
    padding:15, alignSelf:'center', backgroundColor:'white', 
    width:'80%', height:'65%', margin: 'auto', position: 'relative',
    top: '25%', left: 0, bottom: 0, right: 0}
}