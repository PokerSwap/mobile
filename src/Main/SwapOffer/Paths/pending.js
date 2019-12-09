import React from 'react'
import {TextInput} from 'react-native'
import {Text, Card, Button, CardItem} from 'native-base'

export default PendingPath = (props) => {

  return(
    <Card>
      <CardItem>
        <Text>{props.user_name}</Text>
        <Button>
          <Text>Cancel</Text>
        </Button>
      </CardItem>
    </Card>
  )
}