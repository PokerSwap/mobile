import React, { useContext } from 'react';
import { TouchableOpacity, View, StatusBar } from 'react-native'
import { Text, Icon, Header } from 'native-base';

import { Grid, Row, Col} from 'react-native-easy-grid'

import { Context } from '../Store/appContext'

// CategorySquare = (props) => {

//   const [ store, actions ] = useContext(Context)  
  
//   const goToCategory = async() => {
//     var answer1 = await actions.tracker.getAll()
//     var answer2 = await actions.tracker.getPast()
//     var answer3 = await actions.tournament.getInitial()
//     props.navigation.navigate('SwapDashboard')
//   }

//   return(
//     <TouchableOpacity onPress={() => goToCategory()}>
//       <Col style={{backgroundColor:props.bgColor}}>
//         <Icon style={{color:'white'}}
//           type={props.type} name={props.name}/>
//         <Text style={{textAlign:'center', color:'white'}}>
//           {props.category}
//         </Text>
//       </Col>
//     </TouchableOpacity>
//   )
// }

export default Categories = (props) => {

  const { store, actions } = useContext(Context)  

  const goToCategory = async() => {
    var answer1 = await actions.tracker.getAll()
    var answer2 = await actions.tracker.getPast()
    var answer3 = await actions.tournament.getInitial()
    props.navigation.navigate('SwapDashboard')
  }
  
  return(
    <View style={{backgroundColor:'green', flex:1, height:'100%', flexDirection:'column'}}>
      <StatusBar barStyle="light-content" backgroundColor={'green'} />
      <Header style={{backgroundColor:'green'}}>
        <Text style={{color:'white', fontSize:24,textAlignVertical:'center'}}>
          Choose a Category
        </Text>
      </Header>


      <Row style={{height:200}}>
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
        <View style={{width:'50%',backgroundColor: 'rgb(38, 171, 75)',justifyContent:'center'}}>
          <Icon style={{color:'white', marginBottom:10, alignSelf:'center', fontSize:80}}
            type={'MaterialCommunityIcons'} name={'golf'}/>
          <Text style={{textAlign:'center', color:'white'}}>
            Golf{'\n'}(Coming Soon)
          </Text>
        </View>
      </Row>
        <Row style={{height:200}}>
          <View 
            style={{width:'50%',backgroundColor: 'rgb(38, 171, 75)', color:'white', flexDirection:'column',justifyContent:'center'}}>
            <Icon style={{color:'white', marginBottom:10, alignSelf:'center', fontSize:80}}
              type={'MaterialCommunityIcons'} name={'bowling'}/>
            <Text style={{textAlign:'center', color:'white'}}>
              Bowling{'\n'}(Coming Soon)
            </Text>
          </View>
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