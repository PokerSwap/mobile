import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Store/appContext'
import { throttle } from 'lodash'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'

import { Button, ListItem, Text, Icon } from 'native-base';
import { View, TouchableOpacity } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'

import BuyInAttribute from './Components/BuyInAttribute'
import SwapButton from './Components/SwapButton'
import SwapRow from './Components/SwapRow'

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default BuyIn = (props) => {
  const { store, actions } = useContext(Context)
  const navigation = useNavigation()  
  const {buyin} = props;
  // console.log('bbb',buyin)
  const [buyinSince, setBuyinSince] = useState(null)
  const [refreshing, setRefreshing] = useState(true)
  const [ isExpanded, setIsExpanded ] = useState(false)

  const [disabled, setDisabled] = useState(false)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  const shortenedTime = async() => {
    var ol = await actions.time.convertShort(moment(buyin.updated_at).fromNow())
    setBuyinSince(ol)
    setRefreshing(false)
  }

  useEffect(() => {
    shortenedTime()
    return () => {
      // cleanup
    }
  }, [refreshing])

  var allSwaps 
  buyin.user_id != store.myProfile.id ?   
    props.agreed_swaps !== [] ?
      props.other_swaps !== [] ?
        allSwaps = [...props.agreed_swaps, ...props.other_swaps]
        : allSwaps = [...props.agreed_swaps]
      : props.other_swaps !== [] ?
        allSwaps = [...props.other_swaps]
        : allSwaps = null
    : allSwaps = null


  const _renderContent = () => {
    return(
      <View>
        {allSwaps.map((swap, index) => {
          return(
            <SwapRow key={index}
              swap={swap}
              tournament={props.tournament}
              buyin={buyin}/>)})}
      </View>
  )}

  const enterProfile = () => {
    navigation.push('Profile',{
      user_id: buyin.user_id,
      nickname: buyin.user_name,
      from_tournament: props.tournament.id
    });
  }

  const handler = () => {
    setDisabled(true)
    enterProfile();
    setTimeout(()=>{setDisabled(false)}, 2000)
  }
  
    var bg, txt;


    if (buyin.chips !== 0){
        if (buyin.user_id == store.myProfile.id){
            bg='grey', txt='white'
        } else { 
            bg=currentStyle.background.color, txt=currentStyle.text.color}
    } else {
        bg='red', txt='white'
    }
    
    return(
        <ListItem noIndent style={{ backgroundColor:bg, flexDirection:'column',marginleft:0, paddingLeft:0}}>
            <Grid style={{marginVertical:10, marginleft:0,}}>
                <Row style={{width:'100%',  justifyContent:'space-between'}}>
                    {/* BUYIN ACCORDION BUTTON */}
                    {buyin.user_id !== store.myProfile.id ?
                        <Col style={{width:'15%', marginleft:10,  justifyContent:'center'}}>
                            <TouchableOpacity  onPress={() => setIsExpanded(!isExpanded)}
                                style={{ justifyContent:'center', width:'100%', height:'100%'}}>
                                {isExpanded ?
                                <Icon style={{textAlign:'center', color:txt}} 
                                    type='FontAwesome5' name='angle-up'/> 
                                : 
                                <Icon style={{textAlign:'center', color:txt}} 
                                    type='FontAwesome5' name='angle-down'/>}
                            </TouchableOpacity>
                        </Col>
                        : 
                        <Col style={{width:'15%'}}/>}

                    {/* BUYIN INFORMATION */}
                    <Col style={{width:'60%'}}>
                        {/* PROFILE NAME */}
                        <Row style={{justifyContent:'center'}}>
                            <Button disabled={disabled} transparent 
                                onPress={()=> handler()}>
                                <Text style={{fontSize:24, color:txt,
                                    textTransform:'capitalize'}}> 
                                    {buyin.user_id !== store.myProfile.id ? 
                                        buyin.user_name  :  store.myProfile.first_name }
                                </Text>
                            </Button>
                        </Row>
                        {/* BUYIN DETAILS */}
                        <Row style={{marginTop:10}}>
                            <BuyInAttribute top=' Table ' 
                                bottom={buyin.table} txt={txt}/>
                            <BuyInAttribute top=' Seat ' 
                                bottom={buyin.seat} txt={txt}/>
                            <BuyInAttribute top=' Chips ' 
                                bottom={buyin.chips} txt={txt}/>
                        </Row>
                    </Col>
                    {/* BUTTON WITH VARIABLE PATHS */}
                    <SwapButton 
                        allSwaps={allSwaps}  
                        my_buyin={props.my_buyin}
                        agreed_swaps={props.agreed_swaps}
                        other_swaps={props.other_swaps}
                        tournament={props.tournament} action={props.action}
                        updated_at={props.buyin.updated_at}
                        buyin={buyin} buyinSince={buyinSince}
                        txt={txt}
                        setRefreshing={props.setRefreshing}/>  
                </Row>
                
                {/* BUSTED TITLE */}
                { buyin.chips == 0 ?
                    <Row style={{backgroundColor:'red', 
                        justifyContent:'space-around', paddingTop:10}}>
                        <Text style={{color:'white', fontSize:16, 
                            fontWeight:'600', textAlign:'center'}}>
                            BUSTED
                        </Text>
                        <Text style={{fontWeight:'600',color:'white'}}>
                            Place: {buyin.place}
                        </Text>
                        <Text style={{fontWeight:'600',color:'white'}}>
                            Cashed: ${parseInt(buyin.winnings).toFixed(2)}
                        </Text>
                    </Row>
                    : 
                    null }
            </Grid>
            {/* BUYIN ACCORIDION CONTENT */}
            { allSwaps !== null  && isExpanded  ?
                _renderContent() : null }
        </ListItem>
    )
}
