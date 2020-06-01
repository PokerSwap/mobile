import React, {useContext} from 'react'
import {Text, Card, CardItem, Spinner} from 'native-base'

import { Context } from '../../../Store/appContext'

export default CanceledPath = (props) => {
  const { store, actions } = useContext(Context)

  var {swap} = props, {buyin} = props;

  return(
    <Card transparent>
      <CardItem style={{justifyContent:'center'}}>
        {swap ?
          <Text style={{textAlign:'center', fontSize:24}}> 
            You canceled this swap of {swap.percentage}%{' '}
            with {buyin.user_name} that you asked for{' '}
            {swap.counter_percentage}%
          </Text>
          : <Spinner />
        }
        
      </CardItem>

    </Card>
  )
}