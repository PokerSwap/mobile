import React, { useState, useContext } from 'react'
import { KeyboardAvoidingView, TextInput, View, TouchableOpacity } from 'react-native'
import { Text, Icon } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'

import {Context} from '../../../Store/appContext'

import Spinner from 'react-native-loading-spinner-overlay'


export default BustedModal = (props) => {
  const { store, actions } = useContext(Context)
  const [place, setPlace] = useState('')
  const [winnings, setWinnings] = useState('')
  const [mode, setMode] = useState(props.mode)

  const [loading, setLoading] = useState(false)
  var txtWinnings = null

  var a_behavior, offBy;

  if (Platform.OS == 'ios'){
    a_behavior='position' 
     offBy= -300
    // marginee=20
  }else{
    a_behavior='padding'
    offBy = -600
    // marginee = 30
  }

  var bustedComplete = async() => {
    if (mode=='busted'){
      props.setNewChips(0)
      setLoading(true)
      var answer1 = await actions.buy_in.edit(
        props.buyin_id, props.newTable, props.newSeat, 0, props.tournament_id, false)
      var answer2 = await actions.buy_in.busted(
        props.buyin_id, place, winnings, props.tournament_id )
      console.log('done')
        setLoading(false)
        props.navigation.goBack()
      props.setVisible(false)
    }else if(mode=='entry'){
      setLoading(true)
      var answer2 = await actions.buy_in.entry(
        props.buyin_id, place, winnings, props.tournament_id )
      
      setLoading(false)
      props.setVisible(false)
    }else{
      null
    }

    var answer1 = await actions.buy_in.edit(
      props.buyin_id, props.newTable, props.newSeat, 0, props.tournament_id, false)

  } 

  return(
    <KeyboardAvoidingView  behavior={a_behavior} keyboardVerticalOffset={offBy}>
         <View style={modalStyles.background}>


        <View style={ modalStyles.main }>        
         
         <Spinner visible={loading}/>

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
              </View>

              <View style={modalStyles.field.view}>
                <Icon type='FontAwesome5' name='dollar-sign'/>
                <Text style={modalStyles.field.text}>
                  {'  '}Cash
                </Text>

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
              </View>

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
      </KeyboardAvoidingView> 

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
      flexDirection:'row', justifyContent:'center', alignItems:'center',
      marginBottom:10, marginTop:25 }
  },
  main:{ 
    padding:15, alignSelf:'center', backgroundColor:'white', 
    width:'80%', height:'50%', margin: 'auto', position: 'relative',
    top: '10%', left: 0, bottom: 0, right: 0}
}