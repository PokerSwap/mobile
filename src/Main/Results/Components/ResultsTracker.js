import React, {useContext} from 'react';
import { Context } from '../../../Store/appContext'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

import {View, Text, Platform } from 'react-native'
import { ListItem, Icon } from 'native-base';
import { Col } from 'react-native-easy-grid'

import darkStyle from '../../../Themes/dark.js'
import lightStyle from '../../../Themes/light.js'

export default ResultsTracker = (props) => {  

  const { store, actions } = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  
  const navigation = useNavigation()
  const enterProfitResults = () => {
    console.log('the final profit is', props.final_profit)
    console.log('buyins as normal', props.buyins)
    navigation.push('Swap Results', {
      tournament: props.tournament,
      my_buyin: props.my_buyin,
      buyins: props.buyins,
      final_profit: props.final_profit,
      tournament_end: props.tournament_end
    })
  }

  var allPaid = []
  var allConfirmed = []
  const isTrues = (currentValue) => currentValue ==true;

  var eee = props.buyins.forEach(buyin => buyin.agreed_swaps.forEach(swap => allPaid.push(swap.paid)))
  var xxx = props.buyins.forEach(buyin => buyin.agreed_swaps.forEach(swap => allConfirmed.push(swap.confirmed)))

  var x = 'You have ' + ' to pay your swaps for a ' + + ' star rating'
  const fiveStar = moment(props.tournament.updated_at).add(48, 'hours')
  const fourStar = moment(props.tournament.updated_at).add(96, 'hours')
  const threeStar = moment(props.tournament.updated_at).add(134, 'hours')
  const twoStar = moment(props.tournament.updated_at).add(192, 'hours')
  const oneStar = moment(props.tournament.updated_at).add(240, 'hours')
  const now = moment()

  var x = (e, f) =>  'To recieve a ' + f + ' star Swap rating,\ncomplete full payment of your Swaps by :\n' + e
  var y, wColor
  if(allPaid.every(isTrues) && allConfirmed.every(isTrues)){
    y = 'All Swaps Paid and Confirmed'
    wColor = 'black'
  }else if(allPaid.every(isTrues)){
    y = 'All Swaps Paid, Waiting on Confirmation'
    wColor = 'black'
  }else if(now.isBefore(fiveStar)){
    y = x(fiveStar.format('h:mm A dddd MMMM Do'), 5)
    wColor = 'green'
  }else if(now.isBefore(fourStar)){
    y = x(fourStar.format('h:mm A dddd MMMM Do'), 4)
    wColor = '#99cc33'
  }else if(now.isBefore(threeStar)){
    y = x(threeStar.format('h:mm A dddd MMMM Do'), 3)
    wColor = 'orange'
  }else if(now.isBefore(twoStar)){
    y = x(twoStar.format('h:mm A dddd MMMM Do'), 2)
    wColor = 'red'
  }else if(now.isBefore(oneStar)){
    y = "You will recieve a one star Swap rating.\nFailure to pay all Swaps after this deadline\nwill result in an account suspension:\n"+oneStar.format('h:mm A dddd MMMM Do')
    wColor = '#5c1010'
  }else{
    y = "You must pay these swaps in order to reestablish your account"
  }
 
  var space, heightx
  Platform.OS === 'ios' ? (space=-20, heightx=50) : (space =18, heightx=30)

  return(
    <View style={{width:'100%'}}>
      {/* WHEN TOURNAMENT ENDED */}
      <ListItem noIndent itemHeader style={{flex:1, backgroundColor:'black', height:heightx, justifyContent:'center'}}>
        <Text style={{ textAlign:'center', color:'white', marginTop:space,
           fontSize:18, fontWeight:'600'}}>
          {props.tournament_end}
        </Text>
      </ListItem>

      {props.tournament.results_link ?
        <ListItem noIndent style={{backgroundColor:wColor, justifyContent:'center'}}>
          <Text style={{textAlign:'center', color:'white'}}>{y}</Text>
        </ListItem>
       : null}
      <ListItem noIndent onPress={()=> enterProfitResults()}
        style={{justifyContent:'flex-end'}}>
        {/* TOURNAMENT TITLE */}
        <Col style={{width:'77%', justifyContent:'flex-end'}}>
          <Text style={{color:'black', fontSize:20, fontWeight:'600',
            alignContent:'center', textAlign:'center', color:currentStyle.text.color }}> 
            {props.tournament.name}
          </Text>
        </Col>
        {/* RIGHT ARROW NAVIGATION */}
        <Col style={{width:'20%', justifyContent:'flex-end'}}>
          <Icon type="FontAwesome5" name="angle-right" 
            style={{justifyContent:'center', alignSelf:'center', color:currentStyle.text.color}} />    
        </Col>
      </ListItem>
    </View>
  )
}