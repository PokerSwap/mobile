import React, {Component} from 'react';
import { View } from 'react-native';
import { ListItem, Text } from 'native-base';

import { Context } from '../../../Store/appContext'

export default class FlightSchedule extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
    
  render(){      
    
    // var navigation = this.props.navigation ;

    // var startMonth = this.props.start_at.substring(8,11)
    // var startDay = this.props.start_at.substring(5,7)
    // var startDayName = this.props.start_at.substring(0,3)

    // var endMonth = this.props.end_at.substring(8,11)
    // var endDay = this.props.end_at.substring(5,7)
    // var endDayName = this.props.end_at.substring(0,3)


    return(
      <View>
        <ListItem seperator>
          {/* <Text> {startMonth} {startDay}, {startDayName} - {endMonth} {endDay}, {endDayName} </Text> */}
          <Text>LOL</Text>
        </ListItem> 

        <Context.Consumer>
          {({ store, actions }) =>{
            return store.buy_ins.map((content, index) => {
              return(
                <BuyIn
                  id = {content.id}
                  name={content.name}
                  table={content.table}
                  seat={content.seat}
                  chips={content.chips}
                  navigation={this.props.navigation}
                />
              )
            })
          }}
        </Context.Consumer>
      </View>
    )
  }
}