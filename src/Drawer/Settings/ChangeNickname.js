import React, { useContext, useState } from 'react';
import { Alert, TextInput} from 'react-native'
import { Container, Content, Button, Text, Toast } from 'native-base';

import { Context } from '../../Store/appContext'
import '../../Images/placeholder.jpg';

export default ChangeNickname = () => {
  const { store, actions } = useContext(Context)

  const [newNickname, setNewNickname] = useState('')
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    newNickname.length == 0 ? setDisabled(false): setDisabled(true)
    return () => {
      //cleanup
    }
  }, [])

    
  const showAlert = () =>{
    Alert.alert(
      "Confirmation",
      'Remember if you solely rely on your nickname for your buyin ticket,'+
      'you may not be able to verify your buyin ticket on SwapProfit if its different'+
      "than what's registered.\n\n Do you wish to continue?"
      [
        { text: 'Yes',
          onPress: () => changeNickname() },
        { text: 'No',
          onPress: () => console.log("Cancel Pressed"), }
      ]
    )
  }

  const changeNickname = async() => {
      var answer = await actions.user.changePassword(newNickname)
  }

  return(
    <Container style={{justifyContent:'center'}}>
      <Content contentContainerStyle={{paddingTop:50,
        justifyContent:'flex-start', alignItems:'center', flex:1, flexDirection:'column'}}>
        {/* TEXT FIELD */}
        <Text style={{textAlign:'center'}}> 
          Change Nickname: 
        </Text>
        <TextInput 
          style={{fontSize:24, textAlign:'center', width:'100%'}}
          placeholder="Enter New Nickname"
          placeholderTextColor='gray'
          blurOnSubmit={false}
          selectionColor={'black'}
          returnKeyType="next"
          autoCapitalize='none'
          autoCorrect={false} 
          value={newNickname}    
          onChangeText={nickname => setNewNickname( nickname )}  />
        {/* SUBMIT BUTTON */}
        <Button large disabled={disabled} style={{marginTop:40, selfAlign:'center', justifyContent:'center'}}
          onPress={()=> showAlert()}>
          <Text style={{fontSize:30, fontWeight:'600'}}> 
            SUBMIT 
          </Text>
        </Button>
      </Content>  
    </Container>
  )
}
