import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, StatusBar } from 'react-native'
import { Text, Icon, Header } from 'native-base';
import { useNavigation } from '@react-navigation/native'

import Spinner from 'react-native-loading-spinner-overlay'
import { Context } from '../Store/appContext'

export default FeedbackScreen = (props) => {
  const { store, actions } = useContext(Context) 
  const [ loading, setLoading ] = useState(false) 

const navigation = useNavigation()

  const goToCategory = async() => {
    setLoading(true)
    var answer1 = await actions.tracker.getCurrent()
    var answer2 = await actions.tracker.getPast()
    var answer3 = await actions.tournament.getInitial()
    setLoading(false)
    navigation.navigate('Swap Dashboard')
  }
  
  return(
    <View style={{backgroundColor:'green', flex:1, height:'100%', flexDirection:'column'}}>
      <Spinner visible={loading} />
      <StatusBar barStyle="light-content" backgroundColor={'green'} />
      <Header style={{backgroundColor:'green'}}>
        <Text style={{color:'white', fontSize:24,textAlignVertical:'center'}}>
          FeedBack
        </Text>
      </Header>
    </View>
  )
}