import React from 'react'

import {Text, Button, Card, CardItem} from 'native-base'

export default AgreedPath = (props) => {
  return(
    <Card>
      <CardItem>
        <Text>{props.user_name}</Text>
      </CardItem>
      <CardItem>
        <Button>
          <Text>Ante Up</Text>
        </Button>
      </CardItem>
    </Card>
  )
}