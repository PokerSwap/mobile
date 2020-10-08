import React from 'react'

import { View } from 'react-native'
import { Text, CardItem } from 'native-base'
import { Row, Col } from 'react-native-easy-grid'

export default CompareCard = (props) => {

  return(
    <CardItem style={{justifyContent:'center'}}>
      <Row>
        {/* YOUR SWAP PERCENTAGE */}
        <Col>
          <Text style={styles.userTitle}> You </Text>
          <View style={[styles.percentageView,{backgroundColor:props.youColor}]}>
            <Text style={styles.percentageText}>
              {props.percentage}%</Text>
          </View>
        </Col>
        {/* THEIR SWAP PERCENTAGE */}
        <Col>
          <Text style={styles.userTitle}> Them </Text>
          <View style={[styles.percentageView,{backgroundColor:props.themColor}]}>
            <Text style={styles.percentageText}>
            {props.counter_percentage}%</Text>
          </View>
        </Col>
      </Row>
    </CardItem>
  )
}

const styles = {
  percentageText:{
    color:'white', textAlign:'center', fontSize:36, fontWeight:'600'},
  percentageView:{
      justifyContent:'center', alignSelf:'center', alignItems:'center',
       height:60, width:'75%',},
  userTitle:{
    fontSize:24, fontWeight:'600', marginBottom:5, textAlign:'center'},
}