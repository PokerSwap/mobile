import { Button, Header, Icon, Input, Item, Text} from 'native-base';

export default TournamentSearchBar = (props) => {
  return(
    <Header searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input 
          value={props.search}
          onChangeText={(value)=> props.setSearch(value)}
          placeholder="Search Tournaments" />
      </Item>
      <Button transparent onPress={()=> actions.tournament.getSpecific(props.search)}>
        <Text>Search</Text>
      </Button>
    </Header>
  )

}