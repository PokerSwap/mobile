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
          <Col style={{width:'50%'}}>
            <Row style={{justifyContent:'center'}}>
              <Text style={{fontSize:40, fontWeight:'600', textAlign:'center'}}>
                You
              </Text>
            </Row>
            <Row style={{justifyContent:'center',  alignItems:'center'}}>
              <View style={{flexDirection:'column', justifyContent:'space-around'}}>
                {/* ADD BUTTON */}
                <Button style={{width:'100%', height:50, justifyContent:'center', 
                  backgroundColor:'blue', alignContent:'center'}} 
                  onPress={()=> props.pAdd()}>
                  <Icon type='FontAwesome5' name='plus'
                    style={{color:'white', fontSize:24}}/>
                </Button>
                <Text style={{fontSize:40, paddingVertical:4, fontWeight:'600', textAlign:'center'}}>
                {'  '}{props.percentage}%
                </Text>
                {/* SUBTRACT BUTTON */}
                <Button style={{width:'100%', height:50, justifyContent:'center', 
                  backgroundColor:'blue', alignContent:'center'}} 
                  onPress={()=> props.pSubtract()}>
                  <Icon type='FontAwesome5' name='minus'
                    style={{color:'white', fontSize:24}}/>
                </Button>
              </View>
              
            </Row>
          </Col>
          {/* THEIR PERCENTAGE */}
          <Col style={{width:'50%', justifyContent:'center', }}>
            <Row style={{justifyContent:'center'}}>
              <Text style={{fontSize:40, fontWeight:'600', textAlign:'center'}}> 
                Them
              </Text>
            </Row>
            <Row style={{justifyContent:'center',  alignItems:'center'}}>
              <View style={{flexDirection:'column', justifyContent:'center'}}>
                {/* ADD BUTTON */}
                <Button  style={{width:'100%', height:50, justifyContent:'center',
                   backgroundColor:'rgb(38, 171, 75)', alignContent:'center'}} 
                  onPress={()=> props.cAdd()}>
                  <Icon type='FontAwesome5' name='plus'
                    style={{ fontSize:24}}/>
                </Button>
                <Text style={{fontSize:40, paddingVertical:4, fontWeight:'600', textAlign:'center'}}> 
                  {'  '}{props.counterPercentage}%
                </Text>
                {/* SUBTRACT BUTTON */}
                <Button info style={{width:'100%', height:50, justifyContent:'center',
                   backgroundColor:'rgb(38, 171, 75)', alignContent:'center'}} 
                  onPress={()=> props.cSubtract()}>
                  <Icon type='FontAwesome5' name='minus'
                    style={{ fontSize:24}}/>
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
          {/* THE PERCENTAGE */}
          
          <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            {/* ADD BUTTON */}
            <Button style={{width:'100%', height:50, justifyContent:'center', alignSelf:'flex-end',
              backgroundColor:'blue', alignContent:'center'}} 
              onPress={()=> props.tAdd()}>
                <Icon type='FontAwesome5' name='plus'
                  style={{color:'white', fontSize:24}}/>
            </Button>
            <View style={{justifyContent:'center',paddingVertical:2}}>
              <Text style={{fontSize:48,  fontWeight:'600', color:'black',  textAlign:'center'}}> 
                {'  '}{props.percentage}% 
              </Text>
            </View>
            {/* SUBTRACT BUTTON */}
            <Button style={{width:'100%', height:50, justifyContent:'center', alignSelf:'flex-end',
              backgroundColor:'blue', alignContent:'center'}} 
              onPress={()=> props.tSubtract()}>
              <Icon type='FontAwesome5' name='minus'
                style={{color:'white', fontSize:24}}/>
            </Button>
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