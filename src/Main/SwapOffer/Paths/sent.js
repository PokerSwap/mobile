import {TextInput} from 'react-native'
import {Text, Card, CardItem} from 'native-base'

export default SentPath = (props) => {

  const {store, actions} = useContext(Context)

  return(
    <Card>

      

      <CardItem>
        <Button>
          <Text>Cancel</Text>
        </Button>
      </CardItem>

    </Card>
  )
}