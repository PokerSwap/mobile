import React from 'react'
import { View } from 'react-native';
import {Text, Card, CardItem, Spinner} from 'native-base'

import CompareCard from '../Components/CompareCard'

export default CanceledPath = (props) => {
  var {swap} = props, {buyin} = props;

  return(
    <Card transparent>
      {swap.percentage ?
        <View>
          <Text style={{textAlign:'center'}}> 
            You canceled this swap with {buyin.user_name}{'\n'}as of {swap.updated_at}</Text>
           <CompareCard 
            percentage={swap.percentage} 
            youColor={'#a3a3a3'} themColor={'#c3c3c3'}
            counter_percentage={swap.counter_percentage}
            buyin={buyin}/>
        </View>
          : 
            <CardItem style={{justifyContent:'center'}}>
              <Spinner />
            </CardItem>}
    </Card>
  )
}