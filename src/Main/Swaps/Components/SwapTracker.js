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

      var mySwaps = this.props.swaps;
      var mySwappers = mySwaps.map((swap) => swap.sender_user)
      console.log('mySwappers', mySwappers)
      
      
      var i = 2
      var j = 3
      var k = 4
      var l = 3000

      var theirBuyIns = mySwappers.map((buyin) => {
        i += 2
        j += 3
        k += 4
        l += 2000
        return(
          <BuyIn
            percentage={i}
            table={j}
            seat={k}
            chips={l}
            first_name={buyin.first_name}
            last_name={buyin.last_name}
            offer='agreed'
            // table={content.table}
            // seat={content.seat}
            // chips={content.chips}
        />)})

      return(
        <View>
          {/* TOURNAMENT TITLE */}
          <View 
            style={{justifyContent:'center', backgroundColor:'black', paddingVertical:10}}>
            <Text 
              style={{fontSize:18, fontWeight:'600', width:'75%',
                      alignSelf:'center',textAlign:'center', color:'white'}}>
              {this.props.name}
            </Text>
          </View>
          <BuyIn
            id={this.props.id}
            first_name = {this.props.first_name} 
            last_name = {this.props.last_name} 
            table = {this.props.table}
            seat = {this.props.seat}
            chips = {this.props.chips}
          />
          {theirBuyIns}
        </View>
      )
    }
}