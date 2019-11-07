import { Button, Segment, Text} from 'native-base';

export default TournamentSort = (props) => {

  return(
    <Segment >
      <Button first active onPress={()=> 
        props.setSort('Zip Code')

        }>
        <Text>Zip Code</Text>
      </Button>
      <Button last onPress={()=> {
        props.setSort('Current Location')
        }}>
        <Text>Current Location</Text>
      </Button>
    </Segment>
  )
}