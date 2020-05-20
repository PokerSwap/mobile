import React, { useContext, useState } from 'react'

import { View, Alert } from 'react-native'
import { Text, Button, Card, CardItem, Icon } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'

import { Context } from '../../../Store/appContext'

SpecialOffer = (props) => {
  return(
    <View>
      {/* SWAP PERCENTAGES */}
      <CardItem style={{justifyContent:'center', flexDirection:'column'}}>
        <Grid>         
          {/* MY PERCENTAGE */}
          <Col style={{width:'50%', backgroundColor:'blue'}}>
            <Row style={{justifyContent:'center', marginRight:20, marginTop:10}}>
              <Text style={{fontSize:40, fontWeight:'600', textAlign:'center', color:'white'}}>
                You
              </Text>
            </Row>
            <Row style={{justifyContent:'flex-start',  alignItems:'center', backgroundColor:'blue'}}>
              <View style={{flexDirection:'column', justifyContent:'space-around'}}>
                {/* ADD BUTTON */}
                <Button style={{width:60, height:50, justifyContent:'center', 
                  backgroundColor:'blue', alignContent:'center'}} 
                  onPress={()=> props.pAdd()}>
                  <Icon type='FontAwesome5' name='plus'
                    style={{color:'white', fontSize:24}}/>
                </Button>
                {/* SUBTRACT BUTTON */}
                <Button style={{width:60, height:50, justifyContent:'center', 
                backgroundColor:'blue', alignContent:'center'}} 
                onPress={()=> props.pSubtract()}>
                  <Icon type='FontAwesome5' name='minus'
                    style={{color:'white', fontSize:24}}/>
              </Button>
              </View>
              <Text style={{fontSize:40, fontWeight:'600', color:'white', marginBottom:10, marginLeft:10}}>{props.percentage}%</Text>
            </Row>
          </Col>
          {/* THEIR PERCENTAGE */}
          <Col style={{width:'50%', justifyContent:'center', backgroundColor:'rgb(38, 171, 75)'}}>
            <Row style={{justifyContent:'center', marginTop:10}}>
              <Text style={{fontSize:40, fontWeight:'600', color:'white', textAlign:'center'}}> 
                Them
              </Text>
            </Row>
            <Row style={{justifyContent:'flex-end',  alignItems:'center'}}>
              <Text style={{fontSize:40, fontWeight:'600', color:'white',  marginBottom:10}}> 
                {props.counterPercentage}%
              </Text>
              <View style={{flexDirection:'column'}}>
                {/* ADD BUTTON */}
                <Button  style={{width:60, height:50, justifyContent:'center',
                   backgroundColor:'rgb(38, 171, 75)', alignContent:'center'}} 
                  onPress={()=> props.cAdd()}>
                  <Icon type='FontAwesome5' name='plus'
                    style={{color:'white', fontSize:24}}/>
                </Button>
                {/* SUBTRACT BUTTON */}
                <Button info style={{width:60, height:50, justifyContent:'center',
                   backgroundColor:'rgb(38, 171, 75)', alignContent:'center'}} 
                  onPress={()=> props.cSubtract()}>
                  <Icon type='FontAwesome5' name='minus'
                    style={{color:'white', fontSize:24}}/>
                </Button>
              </View>

            </Row>
          </Col>
        </Grid>
      </CardItem>
      {/* SWAP BUTTONS */}
      <CardItem style={{justifyContent:'space-around'}}>
        {/* CHANGE SWAP TYPE */}
        <Button large info onPress={()=>props.counterSwitch()}>
          <Text> Toggle Type </Text>
        </Button>
        {/* OFFER SWAP BUTTON */}
        <Button large success
          onPress={() => props.showAlert('offer')}>
          <Text> Offer Swap </Text>
        </Button>
      </CardItem>
    </View>
  )
}

StandardOffer = (props) => {
  return(
    <View>
      {/* BOTH SWAP TITLE */}
      <CardItem style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center', fontSize:24}}>
          You Both Swap:
        </Text>
      </CardItem>
      {/* BOTH SWAP PERCENTAGE */}
      <CardItem style={{flex:1, justifyContent:'space-around'}}>
        <View style={{  paddingLeft:'20%',backgroundColor:'blue', flexDirection:'row', alignItems:'center'}}>
          {/* THE PERCENTAGE */}
          <View>
            <Text style={{fontSize:48,  fontWeight:'600', color:'white',  textAlign:'left'}}> 
              {props.percentage}% 
            </Text>
          </View>
          <View style={{flexDirection:'column', alignItems:'flex-end', justifyContent:'flex-end'}}>
            {/* ADD BUTTON */}
            <Button style={{width:'100%', height:50, justifyContent:'center', alignSelf:'flex-end',
              backgroundColor:'blue', alignContent:'center'}} 
              onPress={()=> props.tAdd()}>
                <Icon type='FontAwesome5' name='plus'
                  style={{color:'white', fontSize:24}}/>
          </Button>
            {/* SUBTRACT BUTTON */}
            <Button style={{width:'100%', height:50, justifyContent:'center', alignSelf:'flex-end',
              backgroundColor:'blue', alignContent:'center'}} 
              onPress={()=> props.tSubtract()}>
              <Icon type='FontAwesome5' name='minus'
                style={{color:'white', fontSize:24}}/>
            </Button>
          </View>
        </View>
      </CardItem>
      {/* SWAP BUTTONS */}
      <CardItem style={{justifyContent:'space-around'}}>
        {/* CHANGE SWAP TYPE */}
        <Button large info onPress={()=>props.counterSwitch()}>
          <Text> Toggle Type </Text>
        </Button>
        {/* OFFER SWAP BUTTON */}
        <Button large success
          onPress={() => props.showAlert('offer')}>
          <Text> Offer Swap </Text>
        </Button>
      </CardItem>
    </View>
  )
}

export default InactivePath = (props) => {

  const {store, actions} = useContext(Context)
  
  const [percentage, setPercentage] = useState(1)
  const [counterPercentage, setCounterPercentage] = useState(1)

  const [visible, setVisible] = useState(false)

  var counterSwitch = () => {
    setVisible(!visible)
    setCounterPercentage(percentage)
  }


  const pAdd = () => {
    percentage < 50 ? 
      setPercentage(percentage+ 1) : setPercentage(50)
  }

  const pSubtract = () => {
    percentage > 1 ? 
      setPercentage(percentage-1) : setPercentage(1)
  }

  const cAdd = () => {
    counterPercentage < 50 ? 
      setCounterPercentage(counterPercentage+ 1) 
      : setCounterPercentage(50)
  }

  const cSubtract = () => {
    counterPercentage > 1 ? 
      setCounterPercentage(counterPercentage-1) 
      : setCounterPercentage(1)
  }

  const tAdd = () => {
    if(percentage < 50){
      setPercentage(percentage + 1) 
      setCounterPercentage(percentage) 
    } else {
      setPercentage(50), setCounterPercentage(50)
    }     
  }

  const tSubtract = () => {
    if(percentage > 1){
      setPercentage(percentage - 1) 
      setCounterPercentage(percentage) 
    } else {
      setPercentage(1), setCounterPercentage(1)
    }     
  }


  const showAlert = (action) =>{
    Alert.alert(
      "Confirmation",
      'Are you want to ' + action + ' this swap?',
      [
        { text: 'Yes', onPress: () => swapStart()},
        { text: 'No', onPress: () => console.log("Cancel Pressed")}
      ]
    )
  }

  const swapStart = async() => {
    
    var answer1 = await actions.swap.add(
      props.tournament.id, props.buyin.user_id, percentage, props.navigation);
  }

  return(
    <Card transparent>
      
      {store.myProfile.coins > 0 ? 
        !visible ?
          <StandardOffer showAlert={showAlert}
            counterSwitch={counterSwitch}
            percentage={percentage}
            tAdd={tAdd} tSubtract={tSubtract} />
          :
          <SpecialOffer showAlert={showAlert}
            otherUser={props.buyin.user_name} 
            counterSwitch={counterSwitch}
            percentage={percentage}
            counterPercentage={counterPercentage}
            pAdd={pAdd} pSubtract={pSubtract}
            cAdd={cAdd} cSubtract={cSubtract} />

        : 
        <View>
          <CardItem>
            <Text> 
              You need to purchase tokens in order 
              to swap with this person.
            </Text>
          </CardItem>

          <CardItem>
            <Button large success 
              onPress={()=> props.navigation.navigate('PurchaseTokens')}>
              <Text>Purchase Tokens</Text>
            </Button>
          </CardItem>
        </View>
      }


    </Card>
  )
}