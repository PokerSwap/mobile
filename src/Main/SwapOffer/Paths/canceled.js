import React, {useContext} from 'react'
import {Text, Card, CardItem, Button} from 'native-base'

import { Context } from '../../../Store/appContext'

export default CanceledPath = (props) => {

  const { store, actions } = useContext(Context)

  return(
    <Card transparent>
      <CardItem style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center', fontSize:24}}> 
          You canceled this swap of {props.swap.percentage}%{' '}
          with {props.buyin.user_name} who offered{' '}
          {props.swap.counter_percentage}%
        </Text>
      </CardItem>

    </Card>
  )
}