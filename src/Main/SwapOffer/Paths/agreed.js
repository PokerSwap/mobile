import React, {useContext, useState} from 'react'
import {Text, Button, Card, CardItem, Spinner} from 'native-base'

import InactivePath from './inactive'

import {Context} from '../../../Store/appContext'

export default AgreedPath = (props) => {

  const {store, actions} = useContext(Context)
  const [again, setAgain] = useState(false)

  var {swap} = props, {buyin} = props;

  return(
    <Card transparent>
      <CardItem 
        style={{justifyContent:'center', flexDirection:'column'}}>
        {swap ?
          swap.percentage == swap.counter_percentage ?
            <Text style={{textAlign:'center', fontSize:24, width:'80%'}}>
              You and {buyin.user_name} both agreed to swap{' '}
              {swap.percentage}% 
            </Text>
            :
            <Text style={{textAlign:'center', fontSize:24}}>
              You agreed to swap {swap.percentage}% while {'\n'}
              {buyin.user_name} agreed to swap{' '}
              {swap.counter_percentage}%
            </Text>
          :
          <Spinner/>}


      </CardItem>
    </Card>
  )
}