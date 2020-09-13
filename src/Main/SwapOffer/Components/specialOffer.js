import React, {useState} from 'react'
import { View, Pressable } from 'react-native'
import { Text, Button, CardItem, Icon } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'

export default SpecialOffer = (props) => {

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
    <View >
      {/* SWAP PERCENTAGES */}
      <CardItem style={{justifyContent:'center', flexDirection:'column', paddingTop:0}}>
        <Grid>         
          {/* MY PERCENTAGE */}
          <Col style={{width:'50%'}}>
            <Row style={{justifyContent:'center'}}>
              <Text style={{fontSize:40, fontWeight:'600', textAlign:'center'}}>
                You
              </Text>
            </Row>
            <Row style={{justifyContent:'center',  alignItems:'center'}}>
              <View style={{flexDirection:'column', justifyContent:'space-around'}}>
                {/* ADD BUTTON */}
                <Pressable 
                  onPress={()=>props.pAdd()}
                  onLongPress={()=> setup(w)}
                  onPressOut={() => stop()}>
                  <View style={{width:120, height:50, justifyContent:'center', 
                    backgroundColor:'blue', alignContent:'center', borderTopLeftRadius:10, borderTopRightRadius:10}} >                      
                    <Icon type='FontAwesome5' name='plus'
                      style={{color:'white', alignSelf:'center', fontSize:24, textAlign:'center'}}/>
                  </View>
                </Pressable>
                <Text style={{fontSize:40, paddingVertical:4, fontWeight:'600', textAlign:'center'}}>
                {'  '}{props.percentage}%
                </Text>
                {/* SUBTRACT BUTTON */}
                <Pressable 
                  onPress={()=> props.pSubtract()}
                  onLongPress={()=> setup(x)}
                  onPressOut={() => stop()}>
                  <View style={{width:120, height:50, justifyContent:'center', 
                    backgroundColor:'blue', alignContent:'center', borderBottomLeftRadius:10, borderBottomRightRadius:10}} >                      
                    <Icon type='FontAwesome5' name='minus'
                      style={{color:'white', alignSelf:'center', fontSize:24, textAlign:'center'}}/>
                  </View>
                </Pressable>
              </View>
            </Row>
          </Col>
          {/* THEIR PERCENTAGE */}
          <Col style={{width:'50%', justifyContent:'center', }}>
            <Row style={{justifyContent:'center'}}>
              <Text style={{fontSize:40, fontWeight:'600', textAlign:'center'}}> 
                Them
              </Text>
            </Row>
            <Row style={{justifyContent:'center',  alignItems:'center'}}>
              <View style={{flexDirection:'column', justifyContent:'center'}}>
                {/* ADD BUTTON */}
                <Pressable 
                   onPress={()=>props.cAdd()}
                   onLongPress={()=> setup(y)}
                   onPressOut={() => stop()}>
                  <View style={{width:120, height:50, justifyContent:'center',
                    backgroundColor:'rgb(38, 171, 75)', alignContent:'center', borderTopLeftRadius:10, borderTopRightRadius:10}} >                      
                    <Icon type='FontAwesome5' name='plus'
                      style={{color:'white', alignSelf:'center', fontSize:24, textAlign:'center'}}/>
                  </View>
                </Pressable>
                <Text style={{fontSize:40, paddingVertical:4, fontWeight:'600', textAlign:'center'}}> 
                  {'  '}{props.counterPercentage}%
                </Text>
                {/* SUBTRACT BUTTON */}
                <Pressable info
                  onPress={()=> props.cSubtract()}
                  onLongPress={()=> setup(z)}
                  onPressOut={() => stop()}>
                  <View style={{width:120, height:50, justifyContent:'center', 
                    backgroundColor:'rgb(38, 171, 75)', alignContent:'center', borderBottomLeftRadius:10, borderBottomRightRadius:10}} >                      
                    <Icon type='FontAwesome5' name='minus'
                      style={{color:'white', alignSelf:'center', fontSize:24, textAlign:'center'}}/>
                  </View>
                </Pressable>
              </View>

            </Row>
          </Col>
        </Grid>
      </CardItem>
      {/* SWAP BUTTONS */}
      <CardItem style={{justifyContent:'space-around'}}>
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