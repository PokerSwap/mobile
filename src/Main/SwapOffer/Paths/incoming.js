import {TextInput} from 'react-native'
import {Text, Card, CardItem} from 'native-base'

export default IncomingPath = (props) => {
  return(
    <Card>

      <CardItem>
        <Row style={{justifyContent:'center'}}><Text > Swap With: </Text></Row>
        <Row style={{justifyContent:'center'}}><Text> {name} </Text></Row>
      </CardItem>

      <CardItem>
        <Row style={{justifyContent:'center'}}><Text> Swap Offer: </Text></Row>
        <Row style={{justifyContent:'center'}}><Text> {percent}% </Text></Row>
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