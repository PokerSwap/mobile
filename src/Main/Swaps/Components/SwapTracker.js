import React, {Component} from 'react';
import { View } from 'react-native';
import {  Text } from 'native-base';
import { Context } from '../../../Store/appContext';

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
              {content.flight.tournament}
            </Text>
          </View>
          
          {/* MY BUYIN */}
          <Context.Consumer>
            {({store, actions})=> {
              var mybuyIns = store.profile_in_session.buy_ins;
              return mySwaps.map((content, index) => {
                return(
                  <BuyIn
                    key={index} 
                    percentage={content.percentage}
                    first_name={content.user.first_name}
                    last_name={content.user.last_name}
                  />
              )})}}
          </Context.Consumer>  

          {/* BUYIN AND SWAP LIST */}
          <Context.Consumer>
            {({store, actions})=> {
              var mySwaps = store.profile_in_session.receiving_swaps;
              return mySwaps.map((content, index) => {
                return(
                  <BuyIn
                    key={index} 
                    percentage={content.percentage}
                    first_name={content.user.first_name}
                    last_name={content.user.last_name}
                  />
              )})}}
          </Context.Consumer>  
        
        </View>
      )
    }
}