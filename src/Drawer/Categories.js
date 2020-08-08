import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, StatusBar } from 'react-native'
import { Text, Icon, Header } from 'native-base';
import { Row } from 'react-native-easy-grid'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'

import { Context } from '../Store/appContext'

export default CategoriesScreen = (props) => {
  const { store, actions } = useContext(Context) 
  const [ loading, setLoading ] = useState(false) 

  const navigation = useNavigation()

  const goToCategory = async() => {
    setLoading(true)
    var answer1 = await actions.tracker.getCurrent()
    var answer1 = await actions.tracker.getUpcoming()

    var answer2 = await actions.tracker.getPast()
    var answer3 = await actions.tournament.getInitial()
    setLoading(false)
    navigation.navigate('Home', {screen:'Active Swaps'})
  }
  
  return(
    <View style={{backgroundColor:'green', flex:1, height:'100%', flexDirection:'column'}}>
      <Spinner visible={loading} />
      <StatusBar barStyle="light-content" backgroundColor={'green'} />
        <Header style={{backgroundColor:'green'}}>
          <Text style={{color:'white', marginTop:15, fontSize:24,textAlignVertical:'center'}}>
            Choose a Category
          </Text>
        </Header>
        {/* FIRST CATEGORY ROW */}
        <Row style={{height:200}}>
          {/* POKER CATEGORY */}
          <TouchableOpacity onPress={()=> goToCategory()} 
            style={{width:'50%'}}>
            <View style={{ backgroundColor:'#228B22', height:200, justifyContent:'center'}}>
              <Icon style={{marginBottom:10,
                color:'white', alignSelf:'center', fontSize:80}}
                type={'MaterialCommunityIcons'} name={'poker-chip'}/>
              <Text style={{textAlign:'center', color:'white'}}>
                Poker
              </Text>
            </View>
          </TouchableOpacity>
          {/* GOLF CATEGORY */}
          <View style={{width:'50%',backgroundColor: 'rgb(38, 171, 75)',justifyContent:'center'}}>
            <Icon style={{color:'white', marginBottom:10, alignSelf:'center', fontSize:80}}
              type={'MaterialCommunityIcons'} name={'golf'}/>
            <Text style={{textAlign:'center', color:'white'}}>
              Golf{'\n'}(Coming Soon)
            </Text>
          </View>
        </Row>
        {/* SECOND CATEGORY ROW */}
        <Row style={{height:200}}>
          {/* BOWLING CATEGORY */}
          <View 
            style={{width:'50%',backgroundColor: 'rgb(38, 171, 75)', color:'white', flexDirection:'column',justifyContent:'center'}}>
            <Icon style={{color:'white', marginBottom:10, alignSelf:'center', fontSize:80}}
              type={'MaterialCommunityIcons'} name={'bowling'}/>
            <Text style={{textAlign:'center', color:'white'}}>
              Bowling{'\n'}(Coming Soon)
            </Text>
          </View>
          {/* FISHING CATEGORY */}
          <View style={{width:'50%',backgroundColor: '#228B22', flexDirection:'column',justifyContent:'center'}}>
            <Icon style={{color:'white', marginBottom:10,alignSelf:'center', fontSize:80}}
              type={'MaterialCommunityIcons'} name={'fish'}/>
            <Text style={{textAlign:'center', color:'white'}}>
              Fishing{'\n'}(Coming Soon)
            </Text>
          </View>          
        </Row>
    </View>
  )
}