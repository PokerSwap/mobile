import React, {useState, useContext} from 'react'

import {TextInput, View} from 'react-native'
import {Text, Card, CardItem, Button} from 'native-base'

import {Context} from '../../../Store/appContext'

export default EditPath = (props) => {

  const { store, actions } = useContext(Context)

  const [newTable, setNewTable] = useState(props.table)
  const [newSeat, setNewSeat] = useState(props.seat)
  const [newChips, setNewChips] = useState(props.chips)

  let txtSeat = null;
  let txtChips = null;

  const buyinEdit = async() => {
    var answer = await actions.buy_in.edit(
      props.buyin_id,
      newTable,
      newSeat,
      newChips
    )
    props.navigation.goBack()
  }

  var isDisabled;

  newTable != '' && newSeat != '' && newChips != '' ?
    isDisabled = false : isDisabled = true


  return(
    <View>
      <Text style={{textAlign:'center',alignSelf:'center', marginVertical:10}}>NEW BUYIN</Text>
      
      <Card style={{width:'80%', alignSelf:'center'}}>
        <CardItem style={{justifyContent:'center'}}>
          <Text style={{textAlign:'center', fontSize:30}}>{props.user_name}</Text>
        </CardItem>

        <CardItem style={{justifyContent:'center', flex:1, flexDirection:'row'}}>
          <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
            <Text style={{fontSize:24, textAlign:'center'}}>Table: </Text>
            <TextInput 
              placeholder={newTable.toString()}
              style={{fontSize:24, textAlign:'center'}}
              placeholderTextColor='gray'
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
          
          <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
          <Text style={{fontSize:24, textAlign:'center'}}>Seat: </Text>
          <TextInput 
            placeholder={newSeat.toString()}
            style={{fontSize:24, textAlign:'center'}}
            placeholderTextColor='gray'
            keyboardType="number-pad"
            blurOnSubmit={false}
            returnKeyType="done"
            autoCapitalize='none'
            autoCorrect={false} 
            ref={(input) => { txtSeat = input; }} 
            onSubmitEditing={() => { txtChips.focus(); }}
            value={newSeat}    
            onChangeText={seat => setNewSeat(seat)}
          />
        </View>

        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>

            <Text style={{fontSize:24, textAlign:'center'}}>Chips: </Text>
            <TextInput 
              placeholder={newChips.toString()}
              style={{fontSize:24, textAlign:'center'}}
              placeholderTextColor='gray'
              keyboardType="number-pad"
              returnKeyType="done"
              autoCapitalize='none'
              autoCorrect={false} 
              blurOnSubmit={true}
              ref={(input) => { txtChips = input; }} 
              value={newChips}    
              onChangeText={chips => setNewChips(chips)}
            />
          </View>
        </CardItem>

      </Card>

      <Card transparent>
        <CardItem transparent style={{justifyContent:'center'}}>
          <Button disabled={isDisabled} onPress={()=> buyinEdit()}>
            <Text> Update </Text>
          </Button>
        </CardItem>
      </Card>
    </View>
  )
}