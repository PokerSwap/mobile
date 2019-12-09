import React from 'react'

import {TextInput} from 'react-native'
import {Text, Card, Button, CardItem} from 'native-base'
import {Row} from 'react-native-easy-grid'

export default IncomingPath = (props) => {
  return(
    <Card>

      <CardItem>
        <Row style={{justifyContent:'center'}}><Text> Swap Offer: </Text></Row>
        <Row style={{justifyContent:'center'}}><Text> {props.percentage}% </Text></Row>
      </CardItem>

      <CardItem>
        <Button success><Text> Accept Offer </Text></Button>
      </CardItem>

      <CardItem>
        <Button warning><Text> Counter Offer </Text></Button>
      </CardItem>

      <CardItem>
        <Button danger><Text> No Thanks </Text></Button>
      </CardItem>

    </Card>
  )
}