import React from 'react';
import { ListItem, Text, Icon } from 'native-base';
import {View } from 'react-native'
import { Col } from 'react-native-easy-grid'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

export default ResultsTracker = (props) => {  
  
  const navigation = useNavigation()
  const enterProfitResults = () => {
    console.log('the final profit is', props.final_profit)
    navigation.push('Profit Results', {
      tournament: props.tournament,
      my_buyin: props.my_buyin,
      buyins: props.buyins,
      final_profit: props.final_profit,
      tournament_end: props.tournament_end
    })
  }

  var allPaid = []
  const isTrues = (currentValue) => currentValue ==true;

  var eee = props.buyins.forEach(buyin => buyin.agreed_swaps.forEach(swap => allPaid.push(swap.paid)))

  var x = 'You have ' + ' to pay your swaps for a ' + + ' star rating'
  const fiveStar = moment(props.tournament.updated_at).add(48, 'hours')
  const fourStar = moment(props.tournament.updated_at).add(96, 'hours')
  const threeStar = moment(props.tournament.updated_at).add(134, 'hours')
  const twoStar = moment(props.tournament.updated_at).add(192, 'hours')
  const oneStar = moment(props.tournament.updated_at).add(240, 'hours')
  const now = moment()

  var x = (e, f) =>  'To recieve a ' + f + ' star Swap rating,\ncomplete full payment of your Swaps by :\n' + e
  var y, wColor
  if(allPaid.every(isTrues)){
    y = 'All Swaps Paid'
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
 
  return(
    <View style={{width:'100%'}}>
      {/* WHEN TOURNAMENT ENDED */}
      <ListItem noIndent itemHeader style={{
        width:'100%', backgroundColor:'black', height:15, justifyContent:'center'}}>
        <Text style={{textAlignVertical:'center', textAlign:'center', color:'white', 
          marginTop:15, fontSize:18, fontWeight:'600'}}>
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
            alignContent:'center', textAlign:'center' }}> 
            {props.tournament.name}
          </Text>
        </Col>
        {/* RIGHT ARROW NAVIGATION */}
        <Col style={{width:'20%', justifyContent:'flex-end'}}>
          <Icon type="FontAwesome5" name="angle-right" 
            style={{justifyContent:'center', alignSelf:'center'}} />    
        </Col>
      </ListItem>
    </View>
  )
}