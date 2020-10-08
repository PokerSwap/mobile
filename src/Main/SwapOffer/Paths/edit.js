import React, { useState, useContext } from 'react'
import { Context } from '../../../Store/appContext'
import { useNavigation } from '@react-navigation/native'

import { TextInput, View, Alert, Modal } from 'react-native'
import { Text, Card, CardItem, Button, Icon } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'

import BustedModal from '../Components/BustedModal'

export default EditPath = (props) => {
  const { store, actions } = useContext(Context)
  const [ newTable, setNewTable ] = useState(parseInt(props.buyin.table))
  const [ newSeat, setNewSeat ] = useState(props.buyin.seat)
  const [ newChips, setNewChips ] = useState(props.buyin.chips)
  const [ visible, setVisible ] = useState(false)

  const navigation = useNavigation()

  let txtSeat = null, txtChips = null, isDisabled;

  newTable != '' && newSeat != '' && newChips != '' ?
    isDisabled = false : isDisabled = true

  const buyinEdit = async() => {
    if(newChips !== '0'){
    props.setLoading(true)
    var answer = await actions.buy_in.edit(
      props.buyin.id, newTable, newSeat, newChips, props.buyin.tournament_id, false
    )
    props.setRefreshing(true)
    props.setLoading(false)
    }else{
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

  const rebuyAlert = () =>{
    Alert.alert(
      "Rebuy Confirmation",
      "Are you going re-enter?",
      [
        { text: 'Yes', onPress: () => rebuyEnter() },
        { text: 'No', onPress: () => setVisible(true) },
        { text:'Cancel', onPress: () => console.log('Cancel Pressed') }
      ]
    )
  }

  const rebuyEnter = async() => {
    var answer1 = await actions.tournament.getAction(props.buyin.tournament_id);
    var answer2 = await actions.tournament.getCurrent(props.buyin.tournament_id);
    navigation.push('Verify Ticket', {
        action: store.action,
        tournament_name: store.currentTournament.tournament.name,
        tournament_start: store.currentTournament.tournament.start_at,
        tournament: store.currentTournament.tournament,
        buyins: store.currentTournament.buyins,
        flights: store.currentTournament.tournament.flights,
        my_buyin: store.currentTournament.my_buyin
    });
  }

  var bustedEnter = async() => {
    setNewChips(0)
    var answer1 = await actions.buy_in.edit(
      props.buyin_id, props.newTable, props.newSeat, 0, props.tournament_id, false)
    var answer2 = await actions.buy_in.busted(
      props.buyin_id, place, winnings, props.tournament_id )
    setVisible(false)
    navigation.goBack()
  } 

  return(
    <View style={{justifyContent:'center'}}>
      <View style={ styles.update.view }>
        <Icon type='FontAwesome5' name='angle-double-down'
          style={ styles.update.icon } />
        <Text style={ styles.update.title }>
        {' '}STATUS UPDATE
        </Text>
        <Icon type='FontAwesome5' name='angle-double-down'
          style={ styles.update.icon } />
      </View>

      <Modal
        animationType='fade'
        visible={visible}
        presentationStyle='overFullScreen'
        transparent={true}>
        <BustedModal 
          setNewChips={setNewChips} 
          setVisible={setVisible} setLoading={props.setLoading}
          buyin_id={props.buyin.id} 
          newTable={newTable} newSeat={newSeat} newChips={newChips} 
          bustedEnter={bustedEnter}
          tournament_id={props.buyin.tournament_id}
          mode={'busted'}
          />  
      </Modal>
      <Card style={{width:'90%', alignSelf:'center', paddingBottom:10}}>
        <CardItem style={ styles.field.container }>
          <Row style={{alignItems:'center'}}>
              <Text style={ styles.field.text }>
                Table:{'  '}
              </Text>
              <TextInput 
                // placeholder={props.buyin.table.toString()}
                style={ [styles.field.textInput, {width:'20%', marginRight:'5%'}] }              
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
              
            
              <Text style={ styles.field.text }>
                Seat: {'  '}
              </Text>

              <TextInput 
                // placeholder={props.buyin.seat.toString()}
                style={ [styles.field.textInput, {width:'20%'}] }              
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
          </Row>

          <Row style={{marginTop:30, alignItems:'center', alignItems:'center'}}>
            <Text style={ styles.field.text }>
              Chips:{'  '} 
            </Text>
            <TextInput 
              // placeholder={props.buyin.chips.toString()}
              style={ [styles.field.textInput, {width:'40%', paddingRight:'2%', height:40, textAlign:'right'}]  }
              placeholderTextColor='red'
              keyboardType="number-pad"
              returnKeyType="done"
              autoCapitalize='none'
              autoCorrect={false} 
              blurOnSubmit={true}
              ref={(input) => { txtChips = input; }} 
              value={newChips}    
              onChangeText={chips => setNewChips(chips)}/>
            <Button danger
              style={styles.busted.button}
              onPress={()=> bustedAlert()} >
              <Text style={styles.busted.text}> 
                BUSTED? 
              </Text>
            </Button>
          </Row>
        </CardItem>     
      </Card>
        <Button large  style={ styles.update.button }
        onPress={()=> buyinEdit()}>
        <Text style={ styles.update.text }>
          UPDATE 
        </Text>
      </Button>
      
      

        
    </View>
  )
}

const styles = {
  busted:{
    button:{
      alignSelf:'center', borderRadius:0, justifyContent:'center', height:40 },
    text:{
      textAlign:'center', fontSize:12, fontWeight:'bold'}
  },
  field:{
    container:{
      justifyContent:'center', flex:1, flexDirection:'column', paddingHorizontal:0 },
    text:{
      fontSize:24, alignItems:'center', textAlign:'center', marginBottom:10 },
    textInput:{
      alignSelf:'center',fontSize:20, textAlign:'center', 
      paddingVertical:5,borderWidth:1, borderColor:'rgba(0,0,0,0.2)' },
    view:{
      flex:1, justifyContent:'center' }
  },
  update:{
    button:{
      marginTop:10, marginLeft:'5%', width:'90%', selfAlign:'center',
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