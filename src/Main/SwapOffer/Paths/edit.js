import React, {useState, useContext} from 'react'

import {TextInput, View, Alert, Modal, TouchableOpacity} from 'react-native'
import {Text, Card, CardItem, Button, Item, Icon} from 'native-base'

import {Context} from '../../../Store/appContext'

import {Grid, Row, Col} from 'react-native-easy-grid'

AModal = (props) => {
  const [modal, setModal] = useState(props.visible)

  return(

      <View style={{
        backgroundColor:'rgba(0,0,0,0.6)', 
        height:'100%', alignContent:'center'}}>
        <View style={{ padding:15,
          alignSelf:'center', backgroundColor:'white', 
          width:'80%', height:'45%', margin: 'auto',
          position: 'relative',
          top: '25%', left: 0, bottom: 0, right: 0}}>        
          <Text style={{fontSize:24, textAlign:'center'}}>
            Enter your place and cash amount you won.
          </Text>
          <Grid style={{marginVertical:10}}>
            <Col style={{justifyContent:'center'}}>
              
              <View style={{flexDirection:'row', justifyContent:'center', marginVertical:10}}>
                <Icon type='Ionicons' name='ios-ribbon'/>

                <Text style={{fontSize:24, textAlign:'center'}}>
                {'  '}Place
                </Text>
              </View>

              <TextInput 
                style={{
                  padding:10, borderRadius:10, alignSelf:'center',fontSize:24, borderWidth:1, width:'50%', 
                  textAlign:'center',
                  borderColor:'rgba(0,0,0,0.2)'}}
                  placeholder='Place #'
                  placeholderTextColor='gray' />
           
              <View style={{flexDirection:'row', justifyContent:'center', marginBottom:10, marginTop:25}}>
                <Icon type='FontAwesome5' name='dollar-sign'/>
                <Text style={{fontSize:24, textAlign:'center'}}>
                  {'  '}Cash Amount
                </Text>
              </View>

              <TextInput 
                style={{
                  padding:10, borderRadius:10, alignSelf:'center',fontSize:24, borderWidth:1, width:'50%', 
                  textAlign:'center',
                  borderColor:'rgba(0,0,0,0.2)'}}
                  placeholder='$100.00'
                  placeholderTextColor='gray' />

            <Row style={{marginTop:20}}>
              <Col>
               <TouchableOpacity onPress={()=>props.setVisible(false)}>
                <Text style={{textAlign:'center', fontSize:24}}>
                  Submit
                </Text>
               </TouchableOpacity>
              </Col>
              <Col>
              <TouchableOpacity onPress={()=>props.setVisible(false)}>

                <Text style={{textAlign:'center', fontSize:24}}>
                  Cancel
                </Text>
                </TouchableOpacity>
              </Col>
            </Row>
            </Col>
          </Grid>
          
        </View>
      </View>
  )
}

export default EditPath = (props) => {

  const { store, actions } = useContext(Context)

  const [newTable, setNewTable] = useState(props.table)
  const [newSeat, setNewSeat] = useState(props.seat)
  const [newChips, setNewChips] = useState(props.chips)
  const [visible, setVisible] = useState(false)

  let txtSeat = null, txtChips = null;

  const buyinEdit = async() => {
    console.log('newChips',newChips, typeof(newChips))
    if(newChips !== '0'){
    var answer = await actions.buy_in.edit(
      props.buyin.id, newTable, newSeat, newChips, props.buyin.tournament_id
    )}else{
      bustedAlert()
    }
  }
 
  var isDisabled;

  newTable != '' && newSeat != '' && newChips != '' ?
    isDisabled = false : isDisabled = true

    const bustedAlert = () =>{
      Alert.alert(
        "Confirmation",
        "Are you officially busted out of the tournament?",
        [
          {
            text: 'Yes',
            onPress: () => setVisible(true)
          },
          {
            text: 'No',
            onPress: () => console.log("Cancel Pressed"),
          }
        ]
      )
      }

  return(
    <View>
      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      <Icon type='FontAwesome5' name='angle-double-down'
        style={{marginRight:10, fontSize:16}}/>
      <Text style={{fontWeight:'600',
        textAlign:'center',alignSelf:'center', marginVertical:10}}>
          STATUS UPDATE
      </Text>
      <Icon type='FontAwesome5' name='angle-double-down'
        style={{marginLeft:10, fontSize:16}}/>
      </View>

      <Modal
        animationType='fade'
        visible={visible}
        presentationStyle='overFullScreen'
        transparent={true}>
        <AModal setVisible={setVisible}/>  
      </Modal>

      <Card style={{width:'80%', alignSelf:'center', paddingVertical:10}}>
        <CardItem style={{justifyContent:'center'}}>
          <Text style={{textAlign:'center', fontSize:30}}>
            {props.buyin.user_name}
          </Text>
        </CardItem>

        <CardItem style={{
          justifyContent:'center', flex:1, flexDirection:'row'}}>
          <View style={{
            flex:1, flexDirection:'column', justifyContent:'center'}}>
            <Text style={{fontSize:24, textAlign:'center', marginBottom:10}}>
              Table: 
            </Text>
            <TextInput 
              placeholder={props.buyin.table.toString()}
              style={{alignSelf:'center',fontSize:24, width:'60%', textAlign:'center', 
              paddingVertical:5, borderColor:'rgba(0,0,0,0.2)',
               borderWidth:1, borderRadius:10}}              placeholderTextColor='red'
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
          
          <View style={{
            flex:1, flexDirection:'column', justifyContent:'center'}}>
            <Text style={{fontSize:24, textAlign:'center', marginBottom:10}}>
              Seat: 
            </Text>
            <TextInput 
              placeholder={props.buyin.seat.toString()}
              style={{alignSelf:'center',fontSize:24, width:'60%', textAlign:'center', 
              paddingVertical:5, borderColor:'rgba(0,0,0,0.2)',
               borderWidth:1, borderRadius:10}}              placeholderTextColor='red'
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

          <View style={{
            flex:1, flexDirection:'column', justifyContent:'center'}}>
            <Text style={{ fontSize:24, textAlign:'center', marginBottom:10}}>
                Chips: 
            </Text>
            <TextInput 
              placeholder={props.buyin.chips.toString()}
              style={{alignSelf:'center',fontSize:24, textAlign:'center', 
                paddingVertical:5, width:100, borderColor:'rgba(0,0,0,0.2)',
                 borderWidth:1, borderRadius:10}}
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
      style={{ marginVertical:30, width:'100%', justifyContent:'center'}}
        disabled={isDisabled} onPress={()=> buyinEdit()}>
        <Text style={{fontWeight:'600',textAlign:'center', textAlign:'center'}}>
          UPDATE 
        </Text>
      </Button>
      <Button large danger disabled={isDisabled} 
        style={{marginBottom:30,width:'40%', 
          alignSelf:'center', justifyContent:'center'}}
        onPress={()=> bustedAlert()}>
        <Text style={{textAlign:'center'}}> 
          BUSTED? 
        </Text>
      </Button>
        
        
    </View>
  )
}