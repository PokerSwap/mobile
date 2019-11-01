import React, {Component} from 'react';
import { View } from 'react-native';
import {  Text } from 'native-base';
import { Context } from '../../../Store/appContext';

import BuyIn from '../../Shared/BuyIn'

export default class SwapTracker extends Component {
    constructor(props){
      super(props);
      this.state={  
         
      }
    }

    render(){

      return(
        <View>
          {/* TOURNAMENT TITLE */}
          <View 
            style={{justifyContent:'center', backgroundColor:'black', paddingVertical:10}}>
            <Text 
              style={{fontSize:18, fontWeight:'600', width:'75%',
                      alignSelf:'center',textAlign:'center', color:'white'}}>
              {this.props.tournament_name}
            </Text>
          </View>
          <BuyIn
            navigation={this.props.navigation}
            id={this.props.id}
            first_name = {this.props.first_name} 
            last_name = {this.props.last_name} 
            table = {this.props.table}
            seat = {this.props.seat}
            chips = {this.props.chips}
            username={this.props.username}
            tournament_name={this.props.tournament_name}
            
          />
        </View>
      )
    }
}