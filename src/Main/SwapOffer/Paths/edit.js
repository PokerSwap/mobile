import React, { useState, useContext } from 'react'

import { TextInput, View, 
  Alert, Modal, TouchableOpacity } from 'react-native'
import { Text, Card, CardItem, Button, Icon } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'

import {Context} from '../../../Store/appContext'

AModal = (props) => {
  const { store, actions } = useContext(Context)
  const [place, setPlace] = useState('')
  const [winnings, setWinnings] = useState('')

  var bustedComplete = async() => {
    props.setNewChips(0)
    var answer1 = await actions.buy_in.edit(
      props.buyin_id, props.newTable, props.newSeat, 0, props.tournament_id, false)
    var answer2 = await actions.buy_in.busted(
      props.buyin_id, place, winnings, props.tournament_id )
    props.setVisible(false)
  } 

  var txtWinnings = null

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
              
                <TouchableOpacity onPress={()=>bustedComplete()}>
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
    width:'80%', height:'45%', margin: 'auto', position: 'relative',
    top: '25%', left: 0, bottom: 0, right: 0}
}

export default EditPath = (props) => {

  const { store, actions } = useContext(Context)

  const [newTable, setNewTable] = useState(parseInt(props.buyin.table))
  const [newSeat, setNewSeat] = useState(props.buyin.seat)
  const [newChips, setNewChips] = useState(props.buyin.chips)
  const [visible, setVisible] = useState(false)

  let txtSeat = null, txtChips = null, isDisabled;

  newTable != '' && newSeat != '' && newChips != '' ?
    isDisabled = false : isDisabled = true

  const buyinEdit = async() => {
    if(newChips !== '0'){
    var answer = await actions.buy_in.edit(
      props.buyin.id, newTable, newSeat, newChips, props.buyin.tournament_id, false
    )}else{
      bustedAlert()
    }
  }

  const bustedAlert = () =>{
    Alert.alert(
      "Busted Confirmation",
      "Are you officially busted out of the tournament?",
      [
        { text: 'Yes', onPress: () => rebuyAlert() },
        { text: 'No', onPress: () => console.log("Cancel Pressed"), }
      ]
    )
  }

  const rebuyEnter = async() => {
    console.log(props.buyin.tournament_id, props.buyin)
    var answer1 = await actions.tournament.getAction(props.buyin.tournament_id);
    var answer2 = await actions.tournament.getCurrent(props.buyin.tournament_id);
    props.navigation.push('VerifyTicket', {
        action: store.action,
        tournament: store.currentTournament.tournament,
        buyins: store.currentTournament.buyins,
        navigation: props.navigation,
        flights: store.currentTournament.tournament.flights,
        my_buyin: store.currentTournament.my_buyin
    });
  }

  const rebuyAlert = () =>{
    Alert.alert(
      "Rebuy Confirmation",
      "Are you going re-enter?",
      [
        { text: 'Yes', onPress: () => rebuyEnter() },
        { text: 'No', onPress: () => setVisible(true) },
        {text:'Cancel', onPress: ()=> console.log('Cancel Pressed')}
      ]
    )
  }

  return(
    <View>
      <View style={ styles.update.view }>
        <Icon type='FontAwesome5' name='angle-double-down'
          style={ styles.update.icon } />
        <Text style={ styles.update.title }>
          STATUS UPDATE
        </Text>
        <Icon type='FontAwesome5' name='angle-double-down'
          style={ styles.update.icon } />
      </View>

      <Modal
        animationType='fade'
        visible={visible}
        presentationStyle='overFullScreen'
        transparent={true}>
        <AModal 
          setVisible={setVisible} buyin_id={props.buyin.id} 
          newTable={newTable} newSeat={newSeat} newChips={newChips} 
          setNewChips={setNewChips}
          tournament_id={props.buyin.tournament_id}/>  
      </Modal>

      <Card style={{width:'80%', alignSelf:'center', paddingVertical:10}}>
        <CardItem style={{justifyContent:'center'}}>
          <Text style={{textAlign:'center', fontSize:30}}>
            {props.buyin.user_name}
          </Text>
        </CardItem>

        <CardItem style={ styles.field.container }>
          
          <View style={ styles.field.view }>
            <Text style={ styles.field.text }>
              Table: 
            </Text>
            <TextInput 
              // placeholder={props.buyin.table.toString()}
              style={ styles.field.textInput }              
              placeholderTextColor='red'
              keyboardType="number-pad"
              blurOnSubmit={false}
              returnKeyType="done"
              autoCapitalize='none'
              autoCorrect={false} 
              onSubmitEditing={() => { txtSeat.focus(); }}          
              value={newTable}    
              onChangeText={table => setNewTable( table )}
            />
          </View>
          
          <View style={ styles.field.view }>
            <Text style={ styles.field.text }>
              Seat: 
            </Text>
            <TextInput 
              // placeholder={props.buyin.seat.toString()}
              style={ styles.field.textInput }              
              placeholderTextColor='red'
              keyboardType="number-pad"
              blurOnSubmit={false}
              returnKeyType="done"
              autoCapitalize='none'
              autoCorrect={false} 
              ref={(input) => { txtSeat = input; }} 
              onSubmitEditing={() => { txtChips.focus(); }}
              value={newSeat}    
              onChangeText={seat => setNewSeat(seat)}/>
          </View>

          <View style={ styles.field.view }>
            <Text style={ styles.field.text }>
              Chips: 
            </Text>
            <TextInput 
              // placeholder={props.buyin.chips.toString()}
              style={ styles.field.textInput }
              placeholderTextColor='red'
              keyboardType="number-pad"
              returnKeyType="done"
              autoCapitalize='none'
              autoCorrect={false} 
              blurOnSubmit={true}
              ref={(input) => { txtChips = input; }} 
              value={newChips}    
              onChangeText={chips => setNewChips(chips)}/>
          </View>
        
        </CardItem>

      </Card>
     
      <Button large 
        style={ styles.update.button }
        onPress={()=> buyinEdit()}>
        <Text style={ styles.update.text }>
          UPDATE 
        </Text>
      </Button>

      <Button large danger
        style={styles.busted.button}
        onPress={()=> bustedAlert()} >
        <Text style={styles.button.text}> 
          BUSTED? 
        </Text>
      </Button>
        
    </View>
  )
}

const styles = {
  busted:{
    button:{
      marginBottom:30, width:'40%', 
      alignSelf:'center', justifyContent:'center' },
    text:{
      textAlign:'center', fontWeight:'bold'}
  },
  field:{
    container:{
      justifyContent:'center', flex:1, flexDirection:'row' },
    text:{
      fontSize:24, textAlign:'center', marginBottom:10 },
    textInput:{
      alignSelf:'center',fontSize:24, textAlign:'center', 
      paddingVertical:5,borderWidth:1, borderRadius:10,
      width:100, borderColor:'rgba(0,0,0,0.2)' },
    view:{
      flex:1, flexDirection:'column', justifyContent:'center' }
  },
  update:{
    button:{
      marginVertical:30, width:'100%', 
      justifyContent:'center' },
    icon:{
      marginLeft:10, fontSize:16 },
    text:{
      fontWeight:'600',textAlign:'center' },
    title:{
      fontWeight:'600', textAlign:'center',
      alignSelf:'center', marginVertical:10 },
    view:{
      flexDirection:'row', justifyContent:'center', 
      alignItems:'center' }
  }
}