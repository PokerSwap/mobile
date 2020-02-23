import React from 'react'
import { View } from 'react-native'
import { Text, Icon } from 'native-base'

export default SwapHeader = (props) => {

  var swapNum
  props.allSwaps.length > 1 ?
      swapNum = 's' : swapNum = ''

  return(
    <View>
        {props.expanded ?
          <View style={{
            flexDirection:'column', justifyContent:'center' }}>
            <Text>
              Close All
            </Text>
            <Icon name='ios-arrow-up' style={{ 
              fontSize: 24, alignSelf:'center' }} />
          </View>
          : 
          <View style={{
            flexDirection:'column', justifyContent:'center'}}>
            <Text>
              See {props.allSwaps.length} Swap{swapNum} 
            </Text>
            <Icon name='ios-arrow-down' style={{ 
              fontSize: 24, alignSelf:'center' }}/>
          </View>
        }
      </View>
  )
}