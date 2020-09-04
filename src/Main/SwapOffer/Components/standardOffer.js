import React, {useCallback, useState, useEffect} from 'react'
import { View, TouchableOpacity, Pressable } from 'react-native'
import { Text, Button, CardItem, Icon } from 'native-base'

export default StandardOffer = (props) => {

  const [intervalID, setIntervalID] = useState(null)

  var interval

  function setup(aFunction){
    interval = setInterval(aFunction, 200)
    console.log(interval)
    setIntervalID(interval)
  }

  function stop(){
    return clearInterval(intervalID)
  }

  var x = () => props.tAdd()
  var y = () => props.tSubtract()


  return(
    <View>
      {/* BOTH SWAP TITLE */}
      <CardItem style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center', fontSize:24}}>
          You Both Swap:
        </Text>
      </CardItem>
      {/* BOTH SWAP PERCENTAGE */}
      <CardItem style={{flex:1, justifyContent:'space-around'}}>
          {/* THE PERCENTAGE */}
          <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            {/* ADD BUTTON */}
            <Pressable 
              onPress={()=>props.tAdd()}
              onLongPress={()=> setup(x)}
              onPressOut={() => stop()}>
                <View style={{width:180, height:50, justifyContent:'center', alignSelf:'flex-end',
              backgroundColor:'blue', alignContent:'center'}} >
                <Icon type='FontAwesome5' name='plus'
                  style={{color:'white', alignSelf:'center', fontSize:24}}/>
                </View>
                
            </Pressable>
            <View style={{justifyContent:'center',paddingVertical:2}}>
              <Text style={{fontSize:48,  fontWeight:'600', color:'black',  textAlign:'center'}}> 
                {'  '}{props.percentage}% 
              </Text>
            </View>
            {/* SUBTRACT BUTTON */}
            <Pressable style={{width:'100%', height:50, justifyContent:'center', alignSelf:'flex-end',
              backgroundColor:'blue', alignContent:'center'}} 
              onPress={()=>props.tSubtract()}
              onLongPress={()=> setup(y)}
              onPressOut={() => stop()}
              >
                <View style={{width:180, height:50, justifyContent:'center', alignSelf:'flex-end',
              backgroundColor:'blue', alignContent:'center'}}>
                  <Icon type='FontAwesome5' name='minus' 
                    style={{color:'white', fontSize:24, alignSelf:'center'}}/>
                </View>
              
            </Pressable>
          </View>
      </CardItem>
      {/* SWAP BUTTONS */}
      <CardItem style={{justifyContent:'space-around'}}>
        {/* CHANGE SWAP TYPE */}
        <Button large info onPress={()=>props.counterSwitch()}>
          <Text> Toggle Type </Text>
        </Button>
        {/* OFFER SWAP BUTTON */}
        <Button large success
          onPress={() => props.confirmationAlert('offer')}>
          <Text> Offer Swap </Text>
        </Button>
      </CardItem>
    </View>
  )
}