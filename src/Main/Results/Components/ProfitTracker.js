import React, { useContext, useState } from 'react';
import {  ListItem, Text, Button, Icon  } from 'native-base';
import { Image, Modal, Alert, View, TextInput, TouchableOpacity } from 'react-native'
import { Grid, Row, Col} from 'react-native-easy-grid'

import {Context} from '../../../Store/appContext'

import { Dropdown } from 'react-native-material-dropdown';


AnModal = (props) => {
  const {store, actions} = useContext(Context)

  const paySwap = async() => {
    var answer = actions.swap.paid(props.buyin.id)
  }


  return(

      <View style={{
        backgroundColor:'rgba(0,0,0,0.6)', 
        height:'150%', alignContent:'stretch'}}>

        <View style={{ 
          alignSelf:'center', backgroundColor:'white', 
          width:'80%', height:'40%', margin: 'auto',
          position: 'relative',
          top: '13%', left: 0, bottom: 0, right: 0}}>        
          <Grid style={{marginVertical:10}}>
            <Col style={{justifyContent:'center'}}>
              <Row style={{justifyContent:'center', alignSelf:'center', width:'80%'}}>
                <Text style={{fontSize:20, textAlign:'center'}}>
                  Enter the type and amount of cash you're being paid
                </Text>
              </Row>
              <Row style={{ justifyContent:'center', alignItems:'center', paddingTop:0}}>
                <Icon type='FontAwesome5' name='money-bill-wave'/>
                <Text style={{fontSize:24, textAlign:'center'}}>
                {'  '}Payment Type
                </Text>
              </Row>

              <View style={{width:'70%', alignSelf:'center', marginTop:-30}}>
                <Dropdown label='Payment Type'
                  style={{alignSelf:'center', width:'50%', fontSize:24}}
                  data={[{value:'Cash'}, {value:'PayPal'}, {value:'Other'}]}/>
              </View>

              <View style={{flexDirection:'row', justifyContent:'center', marginBottom:10, marginTop:25}}>
                <Icon type='FontAwesome5' name='dollar-sign'/>
                <Text style={{fontSize:24, textAlign:'center'}}>
                  {'  '}Cash Paid
                </Text>
              </View>

              <TextInput style={{
                padding:10, borderRadius:10, alignSelf:'center',fontSize:24, borderWidth:1, width:'50%', 
                textAlign:'center',
                borderColor:'rgba(0,0,0,0.2)'}}
                placeholder='$100.00'
                placeholderTextColor='gray' />

            <Row style={{marginTop:20}}>
              
              <Col>
                <TouchableOpacity onPress={()=>props.setVisible(false)}>
                  <Text style={{textAlign:'center', fontSize:24}}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </Col>

              <Col>
                <TouchableOpacity onPress={()=>props.setVisible(false)}>
                  <Text style={{textAlign:'center', fontSize:24}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </Col>
              
            </Row>
            </Col>
          </Grid>
          
        </View>
      </View>
  )
}

PayButton = (props) => {
  return(
    <Button large 
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


    const paidAlert = () => {
      Alert.alert(
        "Paid Confirmation",
        "Are you sure this person paid what they owe?",
        [
          {text: 'Yes', onPress: () => setVisible(true)},
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

    let swap_profit = props.buyin.they_owe_total - props.buyin.you_owe_total


    console.log('buyin here',props.buyin)

  return(
    <ListItem noIndent transparent 
      style={{justifyContent:'center'}}>

      <Modal
        animationType='fade'
        visible={visible}
        presentationStyle='overFullScreen'
        transparent={true}>
        <AnModal setVisible={setVisible}/>  
      </Modal>
      <Grid style={{justifyContent:'center',
        alignItems:'center', marginVertical:40}}>
        
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
          <Col style={{}}>
            <Text style={{alignSelf:'center',  fontSize:24}}>
              ${props.buyin.you_won}
            </Text>
          </Col> 
          <Col>
            <Text style={{alignSelf:'center', fontSize:24}}>
              ${props.buyin.they_won}
            </Text>
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
              <Col>
                <Text style={{ fontSize:24, alignSelf:'center', marginBottom:5}}>
                  {swap.percentage}%
                </Text>
                <Text style={{fontSize:24, alignSelf:'center'}}>
                  ${swap.you_owe}
                </Text>
              </Col>
              <Col style={{justifyContent:'flex-start'}}>
                <Text style={{alignSelf:'center', fontSize:24, marginBottom:5, textAlign:'center'}}>
                  {swap.counter_percentage}%
                </Text>
                <Text style={{fontSize:24, alignSelf:'center', textAlign:'center'}}>
                  ${swap.they_owe}
                  </Text>
              </Col>
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
            <Text style={{fontSize:24, fontWeight:'600',textAlign:'center'}}>
              ${props.buyin.you_owe_total}
            </Text>
          </Col>
          
          <Col>
            <Text style={{
              fontSize:24, fontWeight:'600',textAlign:'center'}}>
              ${props.buyin.they_owe_total}
            </Text>
          </Col>
          
        </Row>
        
        {/* SWAP PROFIT OWE */}
        <Row>
          <Text style={{ fontSize:36, fontWeight:'600',
          textAlign:'center', marginTop:30}}>
            Swap Profit {"\n"} ${swap_profit}
          </Text>
        </Row>
        
        <Row style={{marginTop:30}}>
          {swap_profit !== 0 ?
            swap_profit > 0 ?
              props.buyin.agreed_swaps[0].paid ?
                <PayButton message={"You were Paid"} color={'green'}/>
                : 
                <PayButton message={"Waiting on Them"} color={'rgb(241, 191, 86)'}/>
              :  
              props.buyin.agreed_swaps[0].paid ?
                <PayButton message={"You Paid"} color={'green'}/>
                :
                <PayButton message={"Pay Now"} color={'green'}/>
            :
          null}
        </Row>

      </Grid>
    </ListItem>
  )
}
