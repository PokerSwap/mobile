import React, {useContext, useState} from 'react'
import {Text, Button, Card, CardItem} from 'native-base'
import {View} from 'react-native'

import InactivePath from './inactive'

import {Context} from '../../../Store/appContext'

export default AgreedPath = (props) => {

  const {store, actions} = useContext(Context)
  const [again, setAgain] = useState(false)

  const swapAdd = async() => {
    var ee = await actions.swap.add(
      props.tournament.id, props.buyin.user_id, props.swap.percentage, props.navigation)
    props.navigation.goBack(null)
  }

  return(
    <Card transparent>
      <CardItem 
        style={{justifyContent:'center', flexDirection:'column'}}>
        {!again ?
          props.swap.percentage == props.swap.counter_percentage ?
            <Text style={{textAlign:'center', fontSize:24}}>
              You and {props.buyin.user_name} agreed to swap{' '}
              {props.swap.percentage}% while {props.buyin.user_name}{' '}
              agreed to swap {props.swap.counter_percentage}%
            </Text>
            :
            <View style={{flex:1, flexDirection:'column'}}>
              <Text style={{textAlign:'center', fontSize:24}}>
                You agreed to swap {props.swap.percentage}% while {'\n'}
                {props.buyin.user_name} agreed to swap{' '}
                {props.swap.counter_percentage}%
              </Text>
            </View>
          :
          <InactivePath navigation={props.navigation} 
            buyin={props.buyin} tournament={props.tournament}/>
        }
        {!again ?
          <Button onPress={()=> setAgain(!again)}>
            <Text>SWAP AGAIN?</Text>
          </Button>
          :
          <Button onPress={()=> setAgain(!again)}>
            <Text>Go Back</Text>
          </Button>
        }
      </CardItem>
    </Card>
  )
}