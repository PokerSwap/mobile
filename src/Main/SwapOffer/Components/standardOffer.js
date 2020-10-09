import React, { useState, useContext } from 'react'
import { Context } from '../../../Store/appContext'

import { View, Pressable } from 'react-native'
import { Text, Button, CardItem, Icon } from 'native-base'

import lightStyle from '../../../Themes/light'
import darkStyle from '../../../Themes/dark'

export default StandardOffer = (props) => {
  const {store, actions } = useContext(Context)
  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  const [intervalID, setIntervalID] = useState(null)

  var interval

  function setup(aFunction){
    interval = setInterval(aFunction, 100)
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
      <Text style={{textAlign:'center', fontSize:24, color:currentStyle.text.color}}>
        You Both Swap:
      </Text>
      {/* BOTH SWAP PERCENTAGE */}
      <CardItem style={{flex:1, justifyContent:'space-around', backgroundColor:currentStyle.background.color}}>
      
          {/* THE PERCENTAGE */}
          <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            {/* ADD BUTTON */}
            <Pressable 
              onPress={()=>props.tAdd()}
              onLongPress={()=> setup(x)}
              onPressOut={() => stop()}>
              <View style={{width:180, height:50, justifyContent:'center', alignSelf:'flex-end',
                backgroundColor:'blue', alignContent:'center', borderTopLeftRadius:10, borderTopRightRadius:10}} >
                <Icon type='FontAwesome5' name='plus'
                  style={{color:'white', alignSelf:'center', fontSize:24}}/>
              </View>
            </Pressable>
            <View style={{justifyContent:'center',paddingVertical:2}}>
              <Text style={{fontSize:48,  fontWeight:'600', color:currentStyle.text.color,  textAlign:'center'}}> 
                {'  '}{props.percentage}% 
              </Text>
            </View>
            {/* SUBTRACT BUTTON */}
            <Pressable 
              onPress={()=>props.tSubtract()}
              onLongPress={()=> setup(y)}
              onPressOut={() => stop()} >
              <View style={{width:180, height:50, justifyContent:'center', alignSelf:'flex-end',
                backgroundColor:'blue', alignContent:'center',borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                <Icon type='FontAwesome5' name='minus' 
                  style={{color:'white', fontSize:24, alignSelf:'center'}}/>
              </View>
            </Pressable>
          </View>
      </CardItem>
      {/* SWAP BUTTONS */}
      <CardItem style={{justifyContent:'space-around', backgroundColor:currentStyle.background.color}}>
        {/* CHANGE SWAP TYPE */}
        <Button large info style={{width:'50%', justifyContent:'center'}} 
          onPress={()=>props.counterSwitch()}>
          <Text style={{textAlign:'center', fontWeight:'600', fontSize:24, paddingVertical:10}}>
            TOGGLE
          </Text>
        </Button>
        {/* OFFER SWAP BUTTON */}
        <Button large success style={{width:'40%', justifyContent:'center'}}
          onPress={() => props.confirmationAlert('offer')} >
          <Text style={{textAlign:'center', fontWeight:'600', fontSize:24, paddingVertical:10}}>
            OFFER
          </Text>
        </Button>
      </CardItem>
    </View>
  )
}