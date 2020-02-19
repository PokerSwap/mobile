import React, {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native'
import {  Text, ListItem, Button, Icon, Accordion } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import moment from 'moment'

import { Context } from '../../Store/appContext'

BuyInAttribute = (props) => {

  return(
    <Col>

      <Row style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center', color:props.txt}}> 
          {props.top} 
        </Text>
      </Row>

      <Row style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center', color:props.txt}}> 
          {props.bottom} 
        </Text>
      </Row>

    </Col> 
  )
}




export default BuyIn = (props) => {

  const { store, actions } = useContext(Context)
  const { navigation } = props;
  let path, lastCol, buttonColor;

  var allSwaps

  props.user_id !== undefined || props.user_id !== store.myProfile.id ?
    props.agreed_swaps.length !== 0 ?
      props.other_swaps.length !== 0 ?
        allSwaps = [...props.agreed_swaps, ...props.other_swaps]
        :
        allSwaps = [...props.agreed_swaps]
      :
      props.other_swaps.length !== 0 || props.other_swaps.length !== undefined ?
        allSwaps = [...props.other_swaps]
        :
        allSwaps = null
    :
  null


  let dataArray =[{title:'lol'}]
  

  const _renderHeader = (item, expanded) => {
    return(
      <View>
        {expanded ?
          <View style={{flexDirection:'column', justifyContent:'center' }}>
            <Text>Close All</Text>
            <Icon style={{ fontSize: 24, alignSelf:'center' }}  name='ios-arrow-up'/>
          </View>
          : 
          <View style={{flexDirection:'column', justifyContent:'center'}}>
            <Text>See All</Text>
            <Icon style={{ fontSize: 24, alignSelf:'center' }}  name='ios-arrow-down'/>
          </View>
        }
      </View>
  )
  }

  const _renderContent= () => {
    return(

    <Grid style={{width:'100%'}}>
      {allSwaps.map((swap, index) => {

        if (swap.user_id == store.myProfile.id){
          lastCol = 
            <Icon type="Entypo" name="edit"
              style={{ alignSelf:'center', 
              fontSize:36, color:'white'}}/>;
          path = "edit";
          buttonColor= 'grey';
        } 
        // AGREED SWAP VIEW
        else if (swap.status == 'agreed'){
          lastCol = 
            <Text style={{
              fontWeight:'600', color:'white',
              fontSize:16, top:8}}> 
              {swap.percentage}% 
            </Text>;
          buttonColor= 'green';
          path = 'agreed'
        } 
        // PENDING SWAP VIEW
        else if(swap.status == 'pending') {
          lastCol =  
            <Text style={{
              fontWeight:'600', fontSize:16, 
              color:'white', top:8}}> 
              {swap.percentage}% 
            </Text>;
          path = "pending";
          buttonColor= 'orange';
        } 
        // INCOMING SWAP VIEW
        else if (swap.status == 'incoming'){
          lastCol = 
            <Icon type="FontAwesome5" name="exclamation"
              style={{alignSelf:'center', fontSize:18, 
              color:'white' , top:8}}/>;
          path = 'incoming';
          buttonColor= 'green';
        } 
        // CANCELED SWAP OFFER VIEW
        else if (swap.status == 'canceled'){
          lastCol = 
          <Icon type="FontAwesome5" name="times"
            style={{alignSelf:'center', fontSize:24, 
            color:'white', top:8}} />;
          path = 'canceled';
          buttonColor= 'grey';
        }
        // REJECTED SWAP OFFER VIEW
        else if (swap.status == 'rejected'){
          lastCol = 
          <Icon 
            style={{alignSelf:'center', fontSize:24, color:'white', top:8}}
            type="FontAwesome5" name="times" />;
          path = 'rejected';
          buttonColor= 'red';
        }
        // SWAP OFFER VIEW
        else {
          lastCol = 
            <Icon style={{alignSelf:'center', fontSize:24}} type="FontAwesome5" name="handshake" />;
          path = "inactive";
          buttonColor= 'rgb(56,68,165)';
        } 

        
        var swapTime = swap.updated_at
        var day_name = swapTime.substring(0,3)
        var startMonth = swapTime.substring(8,11)
        var startDay = swapTime.substring(5,7)
        var startTime = swapTime.substring(16,22)

        var startHour = parseInt(swapTime.substring(16,19))
        var startM 
        if (startHour/12 >= 1){
          startM = ' P.M.'
          startHour%=12
        }
        else{
          startM = ' A.M.'
        }
          
        var startTime = startHour + ':' + swapTime.substring(20,22) + startM
        var labelTime = day_name + '. ' + startMonth + '. ' + startDay + ', ' +   startTime
        return(
          <Row key={index} style={{height:60, width:'100%', alignItems:'center', borderTopWidth:1, borderTopColor:'#d3d3d3'}}>
            <Col style={{width:'20%'}}>
              <Text style={{textTransform:'capitalize'}}>
                {swap.status}
              </Text>
            </Col>
            <Col>
              <Text>{labelTime}</Text>
            </Col>
            <Col style={{width:'20%', }}>
              <TouchableOpacity>
                <View style={{backgroundColor:buttonColor,height:40, alignItems:'center'}}>
                  {lastCol}  
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
        )
      })}
    </Grid>
    )
  }

  var allStatuses = allSwaps.map(swap => swap.status)
  console.log('allStatuses', allStatuses)

  // YOUR SWAP VIEW
  if (allStatuses.includes('incoming')){
    lastCol = 
      <Icon name='exclamation'
        style={{alignSelf:'center', fontSize:24}}
        type="FontAwesome5" name="exclamation"/>;
    buttonColor= 'green';
    path = 'agreed'
  } 
  // PENDING SWAP VIEW
  else if(allStatuses.includes('pending')) {
    var pendingPercentage = 0
    var comSqaps = allSwaps.filter(swap => swap.status == 'agreed' || swap.status == 'pending')
    var addingPercentage = comSqaps.forEach(swap => pendingPercentage+= swap.percentage)
    lastCol =  
    <Text 
      style={{fontWeight:'600', fontSize:18, color:'white', textAlignVertical:'center'}}> 
      {pendingPercentage}% 
    </Text>;
    path = "pending";
    buttonColor= 'orange';
  } 
  // INCOMING SWAP VIEW
  else if (allStatuses.includes('agreed')){
    var lol = 0
    var eee = props.agreed_swaps.forEach(swap => lol+=swap.percentage)
    lastCol = 
      <Text style={{fontWeight:'600', fontSize:18,}}>{lol}%</Text>;
    path = 'incoming';
    buttonColor= 'green';
  
  } 
  // CANCELED SWAP OFFER VIEW
  else if (allStatuses.includes('canceled')){
    lastCol = 
    <Icon 
      style={{alignSelf:'center', fontSize:36}}
      type="FontAwesome5" name="times" />;
    path = 'canceled';
    buttonColor= 'grey';
  }
  // REJECTED SWAP OFFER VIEW
  else if (allStatuses.includes('rejected')){
    lastCol = 
    <Icon 
      style={{alignSelf:'center', fontSize:36}}
      type="FontAwesome5" name="times" />;
    path = 'rejected';
    buttonColor= 'red';
  }
  // SWAP OFFER VIEW
  else {
    lastCol = 
      <Icon style={{alignSelf:'center', fontSize:24}} type="FontAwesome5" name="handshake" />;
    path = "inactive";
    buttonColor= 'rgb(56,68,165)';
  } 

  const enterSwapOffer = async() => {
    var answer = await actions.tournament.getAction()
    navigation.push('SwapOffer',{
      status: path,
      swap_id: props.swap_id,
      flight_id: props.flight_id,
      user_id: props.user_id,
      user_name: props.user_name,
      updated_at:props.updated_at,

      tournament_id: props.tournament_id,
      tournament_name: props.tournament_name,
      address: props.address,
      city: props.city,
      state: props.state,
      start_at: props.start_at,
      swap_updated_at:props.swap_updated_at,

      buyin_id: props.buyin_id,
      table: props.table,
      seat: props.seat,
      chips: props.chips,
      counter_percentage: props.counter_percentage,
      percentage: props.percentage,
      start_at: props.start_at,
      action: store.action

    });
  }

  const enterProfile = async() => {
    var answer = await actions.profile.view(props.user_id);
    var profile = store.profileView
    console.log('profile:',profile)
    navigation.push('Profile',{
      id: profile.id,
      first_name: profile.first_name,
      nickname: profile.nickname,
      last_name: profile.last_name,
      roi_rating: profile.roi_rating,
      swap_rating: profile.swap_rating,
      total_swaps: profile.total_swaps,
      profile_pic_url: profile.profile_pic_url,
      hendon_url: profile.hendon_url
    });
  }

  var x = moment(props.updated_at).fromNow()
  var y, since
  x.includes('a ')? y = '1' : y = parseInt(x.replace(/[^0-9\.]/g, ''), 10);
  if (x.includes('second')) {
    since = 'Just Now' 
  } else if(x.includes('minute')){
    since = y + 'm' 
  } else if(x.includes('hour')){
    since = y + 'h' 
  } else if(x.includes('day')){
    since = y + 'd' 
  } else if(x.includes('week')){
    since = y + 'w' 
  }else if(x.includes('month')){
    since = y + 'M' 
  }else if(x.includes('year')){
    since = y + 'Y' 
  }
  else{
null
  }
  var bg, txt;
  props.chips != 0 ?
    bg='white' || (txt='black') : bg='red' || (txt='white')
  
  return(
    <ListItem noIndent style={{backgroundColor:bg, flexDirection:'column'}}>
      <Grid style={{marginVertical:10}}>
        <Col style={{width:'70%'}}>

          {/* PROFILE NAME */}
          <Row style={{justifyContent:'center'}}>
            <Button transparent onPress={()=> enterProfile()}>
              <Text style={{fontSize:24, textTransform:'capitalize', color:txt}}> {props.user_name} </Text>
            </Button>
          </Row>

          {/* DETAILS */}
          <Row style={{marginTop:10}}>
            <BuyInAttribute top=' Table ' 
              bottom={props.table} txt={txt}/>
            <BuyInAttribute top=' Seat ' 
              bottom={props.seat} txt={txt}/>
            <BuyInAttribute top=' Chips ' 
              bottom={props.chips} txt={txt}/>
          </Row>

        </Col>


        {/* BUTTON WITH VARIABLE PATHS */}
        <Col style={{justifyContent:'center', 
          marginLeft:20, textAlign:'center'}}>
          <Button 
            onPress={()=> enterSwapOffer()}
            style={{
              backgroundColor:buttonColor, width:70, height:70, 
              justifyContent:'center', alignSelf:'center'}}>
            {lastCol}
          </Button>
          <Text style={{
            marginTop:10, color:txt, textAlign:'center', alignSelf:'center'}}>
            {since}
          </Text>
        </Col>

      </Grid>

      <Accordion
        style={{width:'100%'}}
        dataArray={dataArray}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        animation={true}
        expanded={true}/>

      
    </ListItem>
  )
}

const styles ={
  button:{
    button:{},
    container:{},
    text:{}
  }
}
