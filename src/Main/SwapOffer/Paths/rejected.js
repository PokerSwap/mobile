import React from 'react'
import {TextInput} from 'react-native'
import {Text, Card, Button, CardItem} from 'native-base'

import {Row} from 'react-native-easy-grid'

export default RejectedPath = (props) => {
  return(
    <Card>
      <CardItem>
        <Row style={{justifyContent:'center'}}><Text > Rejected Swap With: </Text></Row>
        <Row style={{justifyContent:'center'}}><Text> {props.name} </Text></Row>
      </CardItem>

      <CardItem>
        <Row style={{justifyContent:'center'}}><Text> Swap Offer: </Text></Row>
        <Row style={{justifyContent:'center'}}><Text> {props.percentage}% </Text></Row>
      </CardItem>
    </Card>
  )
}