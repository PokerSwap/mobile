import React, { useState, useContext } from 'react'
import { Context } from '../../../Store/appContext'

import { View, Pressable } from 'react-native'
import { Text, Button, Icon } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'

import lightStyle from '../../../Themes/light'
import darkStyle from '../../../Themes/dark'

export default SpecialOffer = (props) => {

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

  var w = () => props.pAdd()
  var x = () => props.pSubtract()
  var y = () => props.cAdd()
  var z = () => props.cSubtract()

    return(
        <View style={{backgroundColor:currentStyle.background.color, flex:1,
             flexDirection:'column', justifyContent:'flex-start'}}>
             {/* SWAP PERCENTAGE OFFER - START */}
            <View style={{ alignSelf:'center', flexDirection:'row', height:225,  marginTop:10,  
                width:'90%', backgroundColor:currentStyle.background.color}}>
           
                {/* PERCENTAGE (MINE) - START */}
                <View style={{width:'50%', height:220, flexDirection:'column',  alignItems:'center'}}>
                        

                    {/* PERCENTAGE COUNTER */}
                    
                    <Text style={{fontSize:36, fontWeight:'600', textAlign:'center', paddingBottom:10,
                        color:currentStyle.text.color}}>
                        You
                    </Text>
                            
                    {/* PERECENTAGE - ADD BUTTON */}
                    <Pressable 
                        onPress={()=>props.pAdd()}
                        onLongPress={()=> setup(w)}
                        onPressOut={() => stop()}>
                        <View style={{width:120, height:50, justifyContent:'center', 
                            backgroundColor:'blue', alignContent:'center', 
                            borderTopLeftRadius:10, borderTopRightRadius:10}} >                      
                            <Icon type='FontAwesome5' name='plus'
                                style={{color:'white', alignSelf:'center', 
                                    fontSize:24, textAlign:'center'}}/>
                        </View>
                    </Pressable>

                    {/* PERCENTAGE - TEXT */}
                    <Text style={{fontSize:40, paddingVertical:4, fontWeight:'600',
                            textAlign:'center', color:currentStyle.text.color}}>
                        {'  '}{props.percentage}%
                    </Text>

                    {/* PERCENTAGE - SUBTRACT BUTTON */}
                    <Pressable 
                        onPress={()=> props.pSubtract()}
                        onLongPress={()=> setup(x)}
                        onPressOut={() => stop()}>
                        <View style={{width:120, height:50, justifyContent:'center', 
                            backgroundColor:'blue', alignContent:'center',
                            borderBottomLeftRadius:10, borderBottomRightRadius:10}} >                      
                            <Icon type='FontAwesome5' name='minus'
                                style={{color:'white', alignSelf:'center', 
                                    fontSize:24, textAlign:'center'}}/>
                        </View>
                    </Pressable>
                </View>
                {/* PERCENTAGE (MINE) - END */}

                {/* COUNTER PERCENTAGE (THEM) - START */}
                <View style={{width:'50%', height:220, flex:1, flexDirection:'column',  alignItems:'center'}}>
                    <Text style={{fontSize:36, fontWeight:'600', textAlign:'center', paddingBottom:10,
                        color:currentStyle.text.color}}> 
                        Them
                    </Text>

                    {/* COUNTER PERCENTAGE COUNTER*/}
                    
                    {/* COUNTER PERCENTAGE - ADD BUTTON */}
                    <Pressable 
                        onPress={()=>props.cAdd()}
                        onLongPress={()=> setup(y)}
                        onPressOut={() => stop()}>
                        <View style={{width:120, height:50, justifyContent:'center',
                            backgroundColor:'rgb(38, 171, 75)', alignContent:'center', 
                            borderTopLeftRadius:10, borderTopRightRadius:10}} >                      
                            <Icon type='FontAwesome5' name='plus'
                                style={{color:'white', alignSelf:'center', 
                                fontSize:24, textAlign:'center'}}/>
                        </View>
                    </Pressable>

                    {/* COUNTER PERCENTAGE TEXT */}
                    <Text style={{fontSize:40, paddingVertical:4, fontWeight:'600', 
                        textAlign:'center', color:currentStyle.text.color}}> 
                        {'  '}{props.counterPercentage}%
                    </Text>
                    
                    {/* COUNTER PERCENTAGE - SUBTRACT BUTTON */}
                    <Pressable info
                        onPress={()=> props.cSubtract()}
                        onLongPress={()=> setup(z)}
                        onPressOut={() => stop()}>
                        <View style={{width:120, height:50, justifyContent:'center', 
                            backgroundColor:'rgb(38, 171, 75)', alignContent:'center', 
                            borderBottomLeftRadius:10, borderBottomRightRadius:10}} >                      
                            <Icon type='FontAwesome5' name='minus'
                                style={{color:'white', alignSelf:'center', 
                                    fontSize:24, textAlign:'center'}}/>
                        </View>
                    </Pressable>
                </View>
                {/* COUNTER PERCENTAGE (THEM) - END */}

            {/* SWAP PERCENTAGE OFFER - END */}
            </View>
        

            {/* SWAP BUTTONS - START */}
            <View style={{alignSelf:'center', flexDirection:'row', marginTop:10, justifyContent:'space-around',
                width:'90%',  backgroundColor:currentStyle.background.color}}>
                
                    {/* CHANGE SWAP TYPE */}
                    <Button large info style={{width:'45%', justifyContent:'center'}} 
                        onPress={()=>props.counterSwitch()}>
                        <Text style={{textAlign:'center', fontWeight:'600', 
                            fontSize:24, paddingVertical:10}}>
                            HAGGLE
                        </Text>
                    </Button>

                
                    {/* OFFER SWAP BUTTON */}
                    <Button large success style={{width:'45%', justifyContent:'center'}}
                        onPress={() => props.confirmationAlert('offer')} >
                        <Text style={{textAlign:'center', fontWeight:'600', 
                            fontSize:24, paddingVertical:10}}>
                            OFFER
                        </Text>
                    </Button>
               
                 

            </View>
            
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:10}}>
                <Button style={{alignSelf:'center',  width:'85%', justifyContent:'center', textAlign:'center'}} 
                     transparent 
                    onPress={()=> props.setCounter(!props.counter)}>
                    <Text style={{width:'100%', fontSize:24, textAlign:'center'}}>Go Back</Text>
                </Button>
            </View>
            
           
        </View>
    )
}

var styles = {

}