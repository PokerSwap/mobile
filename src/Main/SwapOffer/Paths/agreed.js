import React from 'react'

import {Text, Button, Card, CardItem} from 'native-base'

export default AgreedPath = (props) => {
  return(
    <Card>
      <CardItem>
        <Text>{props.user_name}</Text>
        <Text>{props.percentage}</Text>
        <Text>{props.counter_percentage}</Text>
      </CardItem>
      <CardItem>
        <Button>
          <Text>Ante Up</Text>
        </Button>
      </CardItem>
    </Card>
  )
}