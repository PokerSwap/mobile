import React, {Component} from 'react';
import { View } from 'react-native';
import { ListItem, Text } from 'native-base';
import BuyIn  from '../../Shared/BuyIn'

export default class FlightSchedule extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
    
  render(){      
    
    // var navigation = this.props.navigation ;

    var startMonth = this.props.start_at.substring(8,11)
    var startDay = this.props.start_at.substring(5,7)
    
    var startTime = this.props.start_at.substring(16,22)
    var endTime = this.props.end_at.substring(16,22)

    var buy_ins_list = this.props.buy_ins

    var Buy_Ins = buy_ins_list.map((buy_in) => 
      <BuyIn
        key = {buy_in.id}
        user_id = {buy_in.user.id}
        tournament_id={this.props.tournament_id}
        first_name={buy_in.user.first_name}
        last_name={buy_in.user.last_name}
        table={buy_in.table}
        seat={buy_in.seat}
        chips={buy_in.chips}
        navigation={this.props.navigation}
      />
    )
    
    return(
      <View>
        <ListItem noIndent seperator style={{backgroundColor:'lightgray', justifyContent:'space-between'}}>
          <Text> Day {this.props.day} - {startMonth}. {startDay} </Text>
          <Text>{startTime} - {endTime} </Text>
        </ListItem> 
   
      {Buy_Ins}
                
      </View>
    )
  }
}