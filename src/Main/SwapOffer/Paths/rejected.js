import React from 'react'
import {Text, Card, CardItem, Button} from 'native-base'

export default RejectedPath = (props) => {
  return(
    <Card transparent>
      <CardItem style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center', fontSize:24}}> 
          You rejected a swap of {props.swap.percentage}% with{' '}
          {props.buyin.user_name}. 
        </Text>
      </CardItem>

      {props.tournament_status == 'open' ?
        <CardItem  style={{justifyContent:'center', marginTop:30}}>
          <Button large success onPress={()=> A}>
            <Text>Swap Again?</Text>
          </Button>
        </CardItem>
        : null}

    </Card>
  )
}