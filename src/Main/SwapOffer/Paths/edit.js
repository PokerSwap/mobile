import React from 'react'

import {TextInput} from 'react-native'
import {Text, Card, CardItem, Button} from 'native-base'

export default EditPath = (props) => {
  return(
    
  <Card>
      <CardItem style={{justifyContent:'center'}}>
        <Text style={{fontSize:24}}>Table: </Text>
        <TextInput 
          placeholder={props.table.toString()}
          style={{fontSize:24}}
          placeholderTextColor='gray'
          keyboardType="number-pad"
          blurOnSubmit={false}
          returnKeyType="next"
          autoCapitalize='none'
          autoCorrect={false} 
          // onSubmitEditing={() => next()}
          value={props.table}    
          onChangeText={table => props.setTable( table )}
        />
      </CardItem>

      <CardItem style={{justifyContent:'center'}}>
        <Text style={{fontSize:24}}>Seat: </Text>
        <TextInput 
          placeholder={props.seat.toString()}
          style={{fontSize:24}}

          placeholderTextColor='gray'
          keyboardType="number-pad"
          blurOnSubmit={false}
          returnKeyType="next"
          autoCapitalize='none'
          autoCorrect={false} 
          // ref={(input) => { no = input; }} 
          // onSubmitEditing={() => { txtChips.focus(); }}
          value={props.seat}    
          onChangeText={seat => props.setSeat(seat)}
        />
      </CardItem>

      <CardItem style={{justifyContent:'center'}}>
        <Text style={{fontSize:24}}>Chips: </Text>
        <TextInput 
          placeholder={props.chips.toString()}
          style={{fontSize:24}}
          placeholderTextColor='gray'
          keyboardType="number-pad"
          returnKeyType="go"
          autoCapitalize='none'
          autoCorrect={false} 
          // ref={(input) => { txtChips = input; }} 
          value={props.chips}    
          onChangeText={chips => props.setChips(chips)}
        />
      </CardItem>

      <CardItem style={{justifyContent:'center'}}>
        <Button onPress={()=> props.buyinEdit()}>
          <Text> Update </Text>
        </Button>
      </CardItem>
      
    </Card>
  )
}