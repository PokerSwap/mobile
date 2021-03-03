import React, { useState, useContext } from 'react'
import { Context } from '../../../Store/appContext'

import { View, Pressable } from 'react-native'
import { Text, Button, Icon } from 'native-base'

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
        <View style={{backgroundColor:currentStyle.background.color, width:'90%', marginTop:10,
             flexDirection:'column', justifyContent:'flex-start'}}>
                <Text style={{textAlign:'center', fontSize:24, color:currentStyle.text.color, paddingBottom:10}}>
                    You Both Swap:
                </Text>
            
            {/* BOTH SWAP PERCENTAGE */}
            {/* <View style={{flex:1, justifyContent:'space-around', 
                backgroundColor:currentStyle.background.color}}> */}
            
                {/* THE PERCENTAGE */}
                <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom:10}}>
                    
                    {/* ADD BUTTON */}
                    <Pressable 
                        onPress={()=>props.tAdd()}
                        onLongPress={()=> setup(x)}
                        onPressOut={() => stop()}>
                        <View style={{width:180, height:50, justifyContent:'center', 
                            alignSelf:'flex-end', backgroundColor:'blue', alignContent:'center', 
                            borderTopLeftRadius:10, borderTopRightRadius:10}} >
                            <Icon type='FontAwesome5' name='plus'
                                style={{color:'white', alignSelf:'center', fontSize:24}}/>
                        </View>
                    </Pressable>

                    <View style={{justifyContent:'center',paddingVertical:2}}>
                        <Text style={{fontSize:48,  fontWeight:'600', 
                            color:currentStyle.text.color,  textAlign:'center'}}> 
                            {'  '}{props.percentage}% 
                        </Text>
                    </View>

                    {/* SUBTRACT BUTTON */}
                    <Pressable 
                        onPress={()=>props.tSubtract()}
                        onLongPress={()=> setup(y)}
                        onPressOut={() => stop()} >
                        <View style={{width:180, height:50, justifyContent:'center', 
                            alignSelf:'flex-end',
                            backgroundColor:'blue', alignContent:'center',
                            borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                            <Icon type='FontAwesome5' name='minus' 
                            style={{color:'white', fontSize:24, alignSelf:'center'}}/>
                        </View>
                    </Pressable>
                </View>
            {/* </View> */}
            {/* SWAP BUTTONS */}
            {/* <View style={{flex:1, alignSelf:'center', flexDirection:'column', marginTop:30,
                width:'90%',  backgroundColor:currentStyle.background.color}}> */}
                {/* CHANGE SWAP TYPE */}
                <View style={{width:'100%', flexDirection:'row', justifyContent:'space-around', marginTop:20}}>
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
                        <Text style={{textAlign:'center', fontWeight:'600', fontSize:24, paddingVertical:10}}>
                            OFFER
                        </Text>
                    </Button>
                </View>
                <View style={{marginTop:10}}>
                    <Button style={{alignSelf:'center',  width:'85%', justifyContent:'center', textAlign:'center'}} 
                        transparent 
                        onPress={()=> props.setCounter(!props.counter)}>
                        <Text style={{width:'100%', fontSize:24, textAlign:'center'}}>Go Back</Text>
                    </Button>
                </View>
                
            {/* </View> */}
            
        </View>
    )
}