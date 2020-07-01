import React from 'react'
import { View } from 'react-native'
import { Text, Icon } from 'native-base'

export default SwapHeader = (props) => {

  var swapNum
  props.allSwaps.length > 1 ? swapNum = 's' : swapNum = ''

  return(
    <View>
      {props.expanded ?
        <View style={styles.view}>
          <Text>hello</Text>
          {/* <Text>Close All</Text>
          <Icon type='Ionicons' name='ios-arrow-up' 
            style={styles.icon}/> */}
        </View>
        : 
        <View style={styles.view}>
          <Text>bye</Text>
          {/* <Text>
            See {props.allSwaps.length} Swap{swapNum} 
          </Text>
          <Icon type='Ionicons' name='ios-arrow-down' 
            style={styles.icon}/> */}
        </View>}
    </View>
  )
}

const styles = {
  icon:{
    fontSize: 24, alignSelf:'center' },
  view:{
    flexDirection:'column', justifyContent:'center' }
}