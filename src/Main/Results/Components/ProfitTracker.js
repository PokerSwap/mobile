import React, { useContext } from 'react';
import {  ListItem, Text  } from 'native-base';
import { Image } from 'react-native'
import { Grid, Row, Col} from 'react-native-easy-grid'

import {Context} from '../../../Store/appContext'

export default ProfitTracker = (props) => {

  const {store, actions} = useContext(Context)

  return(
    <ListItem noIndent transparent 
      style={{justifyContent:'center'}}>
      <Grid style={{justifyContent:'center',
        alignItems:'center', marginVertical:40}}>
        
        <Row style={{justifyContent:'center'}}>
          <Col style={{width:'33%'}}></Col>
          {/* Your Profile */}
          <Col style={{alignSelf:'center'}}>           
            <Image source={{uri: store.myProfile.profile_pic_url}} 
              style={{height:100, width:100, 
                borderRadius:500, alignSelf:'center'}}/>
            <Text style={{marginTop:10}}>You</Text>
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
                  Swap {index +1}
                </Text>
              </Col>
              <Col>
                <Text style={{ fontSize:24, alignSelf:'center'}}>
                  {swap.percentage}%
                </Text>
                <Text style={{fontSize:24, alignSelf:'center'}}>
                  ${swap.you_owe}
                </Text>
                </Col>
                <Col style={{justifyContent:'flex-start'}}>
                  <Text style={{alignSelf:'center', fontSize:24}}>
                    {swap.counter_percentage}%
                  </Text>
                  <Text style={{fontSize:24, alignSelf:'center'}}>
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
            <Text style={{fontSize:24}}>
              Total
            </Text>
          </Col>
          <Col >
            <Text style={{
              fontSize:24, fontWeight:'600',textAlign:'center'}}>
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
            Swap Profit {"\n"} ${props.buyin.you_won}
          </Text>
        </Row>

      </Grid>
    </ListItem>
  )
}
