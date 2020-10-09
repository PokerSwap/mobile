import React, { useState, useContext } from 'react'
import { Context } from '../../../Store/appContext'

import { View } from 'react-native';
import { Card, CardItem, Text, Spinner } from 'native-base'

import CompareCard from '../Components/CompareCard'
import IntroOffer from '../Components/introOffer'
import CounterOffer from '../Components/counterOffer'

import lightStyle from '../../../Themes/light'
import darkStyle from '../../../Themes/dark'

export default IncomingPath = (props) => {
  const { store, actions } = useContext(Context)

  const [ counter, setCounter ] = useState(false)
  var {swap, buyin} = props;
  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  return(
    <Card transparent style={{ backgroundColor:currentStyle.background.color,
      alignSelf:'center', width:'95%', justifyContent:'center'}}>
      {/* INCOMING SWAP INFO */}
      <CardItem style={{ alignSelf:'center', backgroundColor:currentStyle.background.color}}>
        {swap.percentage ?
          <View style={{width:'100%'}}>
            <Text style={{fontSize:20, textAlign:'center', color:currentStyle.text.color}}>
              INCOMING SWAP{'\n'}{props.swapSince}
            </Text>
            <CompareCard 
              percentage={swap.percentage} 
              youColor={'blue'} themColor={'green'}
              counter_percentage={swap.counter_percentage}
              buyin={buyin}/>
          </View>
          : <Spinner />} 
      </CardItem>
      {/* INCOMING SWAP INTERACTION UI */}
      {swap.percentage ?
        !counter ?
          <IntroOffer 
            swap_id={swap.id} buyin_id={buyin.id}
            currentStatus={swap.status}
            percentage={swap.percentage}
            counter_percentage={swap.counter_percentage}
            tournament_id={props.tournament_id} 
            setRefreshing={props.setRefreshing}
            setLoading={props.setLoading}
            counter={counter} setCounter={setCounter}/>
          :
          <CounterOffer  
            swap_id={swap.id} buyin_id={buyin.id}
            currentStatus={swap.status}
            percentage={swap.percentage} 
            counter_percentage={swap.counter_percentage}
            tournament_id={props.tournament_id} 
            setRefreshing={props.setRefreshing}
            setLoading={props.setLoading}
            counter={counter} setCounter={setCounter} />
        : null} 
    </Card>
  )
}