import React from 'react'
import { View } from 'react-native'
import {Text, Button, Card, CardItem, Spinner} from 'native-base'

import {Context} from '../../../Store/appContext'

export default AgreedPath = (props) => {

  var {swap} = props, {buyin} = props;

  return(
    <Card transparent>
      <CardItem 
        style={{justifyContent:'center', flexDirection:'column'}}>
        {swap.percentage ?
          <View>
            <Text style={{textAlign:'center'}}>This swap with {buyin.user_name} was agreed to{'\n'} as of {swap.updated_at}</Text>
            <CompareCard 
              youColor={'green'} themColor={'green'}
              percentage={swap.percentage} 
              counter_percentage={swap.counter_percentage}
              buyin={buyin}/>
          </View>
          :
          <Spinner/>}


      </CardItem>
    </Card>
  )
}