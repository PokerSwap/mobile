import React, { useContext, useState, useEffect } from 'react';
import { Alert, TextInput, View } from 'react-native'
import { Container, Content, Button, Text, Toast } from 'native-base';

import { Context } from '../../Store/appContext'
import '../../Images/placeholder.jpg';

export default ChangeNickname = () => {
  const { store, actions } = useContext(Context)

  const [newNickname, setNewNickname] = useState('')
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    newNickname.length == 0 ? setDisabled(false): setDisabled(true)
    console.log('diabled', disabled)
    console.log('new nickname', newNickname)

    return () => {
      //cleanup
    }
  }, [true])

    
  const showAlert = () =>{
    Alert.alert(
      "Confirmation",
      "Remember if you solely rely on your nickname for your buyin ticket,you may not be able to verify your buyin ticket on SwapProfit if its different than what is registered.\n\n  Do you wish to continue?",
      [
        { text: 'Yes', onPress: () => changeNickname() },
        { text: 'No',  onPress: () => console.log("Cancel Pressed"), }
      ]
    )
  }

  const changeNickname = async() => {
    console.log(newNickname)
      var answer = await actions.profile.changeNickName(newNickname)
  }

  return(
    <Container style={{justifyContent:'center'}}>
      <Content contentContainerStyle={{paddingTop:50,
        justifyContent:'flex-start', alignItems:'center', flex:1, flexDirection:'column'}}>
        {/* TEXT FIELD */}
        <Text style={{fontSize:20, marginTop:20, textAlign:'center',marginBottom:5}}>
          Change Nickname: 
        </Text>
        <View style={{borderColor:'black', borderWidth:1, width:'80%', padding:10, marginVeritcal:5}}>
          <TextInput 
            style={{fontSize:20, textAlign:'center', width:'100%'}}
            placeholder="Enter New Nickname"
            placeholderTextColor='gray'
            blurOnSubmit={false}
            selectionColor={'black'}
            returnKeyType="next"
            autoCapitalize='none'
            autoCorrect={false} 
            value={newNickname}    
            onChangeText={nickname => setNewNickname( nickname )}  />
        </View>
        <View style={{justifyContent:'center'}}>
          <Button large disabled={disabled} style={{marginTop:40, selfAlign:'center', justifyContent:'center'}}
            onPress={()=> showAlert()}>
            <Text style={{fontSize:30, fontWeight:'600'}}> 
              SUBMIT 
            </Text>
          </Button>
        </View>
        {/* SUBMIT BUTTON */}
        
      </Content>  
    </Container>
  )
}
