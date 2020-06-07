import React from 'react'
import { View } from 'react-native'
import { Text, Button, CardItem, Icon } from 'native-base'

export default StandardOffer = (props) => {
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
            <Button style={{width:'100%', height:50, justifyContent:'center', alignSelf:'flex-end',
              backgroundColor:'blue', alignContent:'center'}} 
              onPress={()=> props.tAdd()}>
                <Icon type='FontAwesome5' name='plus'
                  style={{color:'white', fontSize:24}}/>
            </Button>
            <View style={{justifyContent:'center',paddingVertical:2}}>
              <Text style={{fontSize:48,  fontWeight:'600', color:'black',  textAlign:'center'}}> 
                {'  '}{props.percentage}% 
              </Text>
            </View>
            {/* SUBTRACT BUTTON */}
            <Button style={{width:'100%', height:50, justifyContent:'center', alignSelf:'flex-end',
              backgroundColor:'blue', alignContent:'center'}} 
              onPress={()=> props.tSubtract()}>
              <Icon type='FontAwesome5' name='minus'
                style={{color:'white', fontSize:24}}/>
            </Button>
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
          onPress={() => props.confirmationAlert('offer')}
          >
          <Text> Offer Swap </Text>
        </Button>
      </CardItem>
    </View>
  )
}