import React, {useContext, useState} from 'react'
import {Text, Button, Card, CardItem} from 'native-base'
import {View} from 'react-native'

import InactivePath from './inactive'

import {Context} from '../../../Store/appContext'

export default AgreedPath = (props) => {

  const {store, actions} = useContext(Context)
  const [again, setAgain] = useState(false)

  const swapAdd = async() => {
    var ee = await actions.swap.add(props.tournament_id, props.user_id, props.percentage, props.navigation)
    props.navigation.goBack(null)
  }

  return(
    <Card transparent>
      <CardItem style={{justifyContent:'center', flexDirection:'column'}}>
        {!again ?
          props.percentage == props.counter_percentage ?
            <Text style={{textAlign:'center', fontSize:24}}>
              You and {props.user_name} agreed to swap {props.percentage}% while {props.user_name} agreed to swap {props.counter_percentage}%
            </Text>
            :
            <View style={{flex:1, flexDirection:'column'}}>
              <Text style={{textAlign:'center', fontSize:24}}>
                You agreed to swap {props.percentage}% while
              </Text>
              <Text style={{textAlign:'center', fontSize:24}}>
                {props.user_name} agreed to swap {props.counter_percentage}%
              </Text>
            </View>
          :
          <InactivePath navigation={props.navigation} user_name={props.user_name}
          tournament_id={props.tournament_id} user_id={props.user_id}/>
        }
        {!again ?
          <Button onPress={()=> setAgain(!again)}>
            <Text>SWAP AGAIN?</Text>
          </Button>
          :
          <Button onPress={()=> setAgain(!again)}>
            <Text>NeverMind</Text>
          </Button>
        }
      </CardItem>
    </Card>
  )
}