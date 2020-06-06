import React, { useContext, useState, useEffect } from 'react';
import { ListItem, Text, Button } from 'native-base';
import { Image, Modal, Alert } from 'react-native'
import { Grid, Row, Col} from 'react-native-easy-grid'
import  Spinner  from 'react-native-loading-spinner-overlay'

import { Context } from '../../../Store/appContext'

import PayModal from './PayModal'

PayButton = (props) => {
  return(
    <Button large onPress={() => props.fn()}
      style={{height:60, justifyContent:'center', backgroundColor:props.color}} >
      <Text style={{textAlign:'center', fontWeight:'600'}}>
        {props.message}
      </Text> 
    </Button>
  )
}

export default ProfitTracker = (props) => {
  const {store, actions} = useContext(Context)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(props.buyin.agreed_swaps[0].paid)

  // const [loading, setLoading] = useState(false)
  // const [loading, setLoading] = useState(false)


  const paidAlert = () => {
    Alert.alert(
      "Paid Confirmation",
      "Are you sure this person paid what they owe?",
      [
        {text: 'Yes', onPress: () => paySwap()},
        {text: 'No', onPress: () => console.log("Cancel Pressed"),}
      ]
    )
  }

  const payAlert = () => {
    Alert.alert(
      "Pay Confirmation",
      "Are you sure you paid what you owe to this person?",
      [
        {text: 'Yes', onPress: () => setVisible(true)},
        {text: 'No', onPress: () => console.log("Cancel Pressed"),}
      ]
    )
  }

  const paySwap = async() => {
    setLoading(true)
    var answer = actions.swap.paid(
      props.buyin.recipient_buyin.tournament_id, props.buyin.recipient_user.id, props.buyin.agreed_swaps[0].id)
    setPaid(true)
    setVisible(false)
    setLoading(false)
  }

  const a = () => {
    console.log('nothing')
  }

  let swap_profit = props.buyin.they_owe_total - props.buyin.you_owe_total

  let final_swap_profit
  swap_profit < 0 ?
    final_swap_profit = '-$' + Math.abs(swap_profit).toFixed(2)
    : final_swap_profit = "$" + Math.abs(swap_profit).toFixed(2)
  return(
    <ListItem noIndent transparent 
      style={{justifyContent:'center'}}>
      <Spinner visible={loading}/>
      {/* MODAL */}
      <Modal
        animationType='fade'
        visible={visible}
        presentationStyle='overFullScreen'
        transparent={true}>
        <PayModal fn={paySwap} />  
      </Modal>
      {/* MAIN BODY */}
      <Grid style={{justifyContent:'center',
        alignItems:'center', marginVertical:40}}>
        {/* USERS ROW */}
        <Row style={{justifyContent:'center'}}>
          <Col style={{width:'33%'}}></Col>
          {/* Your Profile */}
          <Col style={{alignSelf:'center'}}>           
            <Image source={{uri: store.myProfile.profile_pic_url}} 
              style={{height:100, width:100, 
                borderRadius:500, alignSelf:'center'}}/>
            <Text style={{marginTop:10}}>
              You
            </Text>
          </Col>
          
          {/* Their Profile */}
          <Col style={{alignSelf:'center'}}>
            <Image source={{uri: props.buyin.recipient_user.profile_pic_url}} 
              style={{height:100, width:100,
              borderRadius:500, alignSelf:'center'}}/>  
            <Text style={{marginTop:10}}>
              {props.buyin.recipient_user.first_name}
            </Text>
          </Col>
        </Row>
        {/* WINNINGS ROW */}
        <Row style={{padding:15}}>
          <Col style={{width:'33%'}}>
            <Text style={{fontSize:24}}>
              Winnings
            </Text>
          </Col>
          <Col>
            {props.buyin.you_won ? 
              <Text style={{alignSelf:'center',  fontSize:24}}>
                ${parseInt(props.buyin.you_won).toFixed(2)}
              </Text>
              : <Text> Pending </Text>}
          </Col> 
          <Col>
            {props.buyin.they_won ? 
              <Text style={{alignSelf:'center',  fontSize:24}}>
                ${parseInt(props.buyin.they_won).toFixed(2)}
              </Text>
              : <Text> Pending </Text>}
          </Col>
        </Row>
        {/* INDIVIDUAL SWAPS ROW */}
        {props.agreed_swaps.map((swap, index) =>{
          return(
            <Row style={{padding:15, borderTopWidth:1, 
              borderColor:'#D3D3D3' }}>
              <Col style={{width:'33%', alignSelf:'center'}}>
                <Text style={{textAlign:'center',  fontSize:24}}>
                  Swap {index + 1}
                </Text>
              </Col>
              {swap.you_owe ?
              <Col>
                <Text style={{ fontSize:24, alignSelf:'center', marginBottom:5}}>
                  {swap.percentage}%
                </Text>
                <Text style={{fontSize:24, alignSelf:'center'}}>
                  ${swap.you_owe.toFixed(2)}
                </Text>
              </Col>
              :
              <Col style={{justifyContent:'flex-start'}}>
                <Text style={{alignSelf:'center', fontSize:24, marginBottom:5, textAlign:'center'}}>
                  {swap.counter_percentage}%
                </Text>
                <Text style={{fontSize:36}}>-</Text>                
              </Col>}
              {swap.they_owe ?
                <Col style={{justifyContent:'flex-start'}}>
                  <Text style={{alignSelf:'center', fontSize:24, marginBottom:5, textAlign:'center'}}>
                    {swap.counter_percentage}%
                  </Text>
                  <Text style={{fontSize:24, alignSelf:'center', textAlign:'center'}}>
                    ${swap.they_owe.toFixed(2)}
                  </Text>
                </Col>
                :
                <Col style={{justifyContent:'flex-start'}}>
                  <Text style={{alignSelf:'center', fontSize:24, marginBottom:5, textAlign:'center'}}>
                    {swap.counter_percentage}%
                  </Text>
                  <Text style={{fontSize:36}}>-</Text>                
                </Col>}
            </Row>
          )
        })}
        {/* TOTAL OWE ROW */}
        <Row style={{paddingTop:20, 
          borderTopWidth:1, borderColor:'#D3D3D3'}}>
          <Col>
            <Text style={{fontSize:24}}>Total</Text>
          </Col>
          <Col >
            {props.buyin.you_owe_total ?
              <Text style={{fontSize:24, fontWeight:'600',textAlign:'center'}}>
                ${props.buyin.you_owe_total.toFixed(2)}
              </Text>
              :
              <Text style={{fontSize:36, textAlign:'left'}}>-</Text>}
          </Col>
          
          <Col style={{justifyContent:'flex-start'}}>
            {props.buyin.they_owe_total ?
              <Text style={{
                fontSize:24, fontWeight:'600',textAlign:'center'}}>
                ${props.buyin.they_owe_total.toFixed(2)}
              </Text>
              :
              <Text style={{fontSize:36, textAlign:'left'}}>-</Text>}
            
          </Col>
          
        </Row>
        {/* SWAP PROFIT OWE */}
        <Row>
          {props.buyin.they_owe_total && props.buyin.you_owe_total ?
            <Text style={{ fontSize:36, fontWeight:'600',
            textAlign:'center', marginTop:30}}>
              Swap Profit {"\n"} {final_swap_profit}
            </Text>
            :
            <Text style={{ fontSize:36, fontWeight:'600',
            textAlign:'center', marginTop:30}}>
              Swap Profit {"\n"} Pending
            </Text>}

        </Row>
        {/* PAY/PAID BUTTON */}
        <Row style={{marginTop:30}}>
          {swap_profit !== 0 && (props.buyin.they_owe_total && props.buyin.you_owe_total) ?
            swap_profit > 0 ?
              paid ?
                <PayButton message={"You were Paid"} color={'green'} fn={a}/>
                : <PayButton message={"Confirm Payment"} color={'rgb(241, 191, 86)'} fn={paidAlert}/>
              :  
              paid ?
                <PayButton message={"You Paid"} color={'green'} fn={a}/>
                : <PayButton message={"Pay Now"} color={'rgb(241, 191, 86)'} fn={payAlert} />
            : null}
        </Row>
      </Grid>
    </ListItem>
  )
}