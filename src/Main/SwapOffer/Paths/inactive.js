import React, {useContext, useState} from 'react'

import {TouchableOpacity, View, Alert} from 'react-native'
import {Text, Button, Card, CardItem, Icon} from 'native-base'

import {Context} from '../../../Store/appContext'

SpecialOffer = (props) => {
  return(
    <View>
      <View style={{flexDirection:'row', justifyContent:'center'}}>
        <CardItem style={{justifyContent:'center', flexDirection:'column'}}>
          {/* SWAP PERCENTAGE */}
          <Text style={{fontSize:36}}> 
            You
          </Text>
          <Text style={{fontSize:36}}> 
            {props.percentage}%
          </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>

          {/* SUBTRACT BUTTON */}
          <Button style={{width:50, height:50, borderRadius: 5, 
            backgroundColor:'blue', alignContent:'center'}} 
            onPress={()=> props.pSubtract()}>
              <Icon type='FontAwesome5' name='minus'
                style={{color:'white', fontSize:24}}/>
          </Button>



          {/* ADD BUTTON */}
          <Button style={{width:50, height:50, borderRadius: 5, 
            backgroundColor:'blue', alignContent:'center'}} 
            onPress={()=> props.pAdd()}>
              <Icon type='FontAwesome5' name='plus'
                style={{color:'white', fontSize:24}}/>
          </Button>

          </View>
          

        </CardItem>

        <CardItem style={{justifyContent:'center', flexDirection:'column'}}>
          
          <Text style={{fontSize:36}}> 
            {props.otherUser}
          </Text>

          <Text style={{fontSize:36}}> 
            {props.counterPercentage}%
          </Text>

          {/* SUBTRACT BUTTON */}
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Button style={{width:50, height:50, borderRadius: 5, 
              backgroundColor:'blue', alignContent:'center'}} 
              onPress={()=> props.cSubtract()}>
                <Icon type='FontAwesome5' name='minus'
                  style={{color:'white', fontSize:24}}/>
            </Button>

            {/* ADD BUTTON */}
            <Button style={{width:50, height:50, borderRadius: 5, 
              backgroundColor:'blue', alignContent:'center'}} 
              onPress={()=> props.cAdd()}>
                <Icon type='FontAwesome5' name='plus'
                  style={{color:'white', fontSize:24}}/>
            </Button>
          </View>

        </CardItem>
      </View>

      <Button onPress={()=>props.counterSwitch()}>
        <Text>
          CHANGE NOW
        </Text>
      </Button>

      <CardItem style={{justifyContent:'center'}}>
        <Button large 
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
      <CardItem style={{justifyContent:'center'}}>
        {/* SUBTRACT BUTTON */}
        <Button style={{width:50, height:50, borderRadius: 5, 
          backgroundColor:'blue', alignContent:'center'}} 
          onPress={()=> props.tSubtract()}>
            <Icon type='FontAwesome5' name='minus'
              style={{color:'white', fontSize:24}}/>
        </Button>

        {/* SWAP PERCENTAGE */}
        <Text style={{fontSize:36, marginHorizontal:10}}> 
          {props.percentage}% 
        </Text>

        {/* ADD BUTTON */}
        <Button style={{width:50, height:50, borderRadius: 5, 
          backgroundColor:'blue', alignContent:'center'}} 
          onPress={()=> props.tAdd()}>
            <Icon type='FontAwesome5' name='plus'
              style={{color:'white', fontSize:24}}/>
        </Button>

      </CardItem>

      <Button onPress={()=>props.counterSwitch()}>
        <Text>
          CHANGE NOW
        </Text>
      </Button>

      <CardItem style={{justifyContent:'center'}}>
        <Button large 
          onPress={() => props.showAlert('offer')}>
          <Text> Offer Swap </Text>
        </Button>
      </CardItem>
    </View>)
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
    <Card>
      
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