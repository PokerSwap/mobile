import {TextInput} from 'react-native'
import {Text, Card, CardItem} from 'native-base'

export default RejectedPath = (props) => {
  return(
    <Card>
      <CardItem>
        <Row style={{justifyContent:'center'}}><Text > Rejected Swap With: </Text></Row>
        <Row style={{justifyContent:'center'}}><Text> {props.name} </Text></Row>
      </CardItem>

      <CardItem>
        <Row style={{justifyContent:'center'}}><Text> Swap Offer: </Text></Row>
        <Row style={{justifyContent:'center'}}><Text> {percent}% </Text></Row>
      </CardItem>
    </Card>
  )
}