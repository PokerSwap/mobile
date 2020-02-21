import React, { useContext } from 'react';
import {  ListItem, Text  } from 'native-base';
import { Image, View } from 'react-native'
import { Grid, Row, Col} from 'react-native-easy-grid'

import {Context} from '../../../Store/appContext'

export default ProfitTracker = (props) => {

  const {store, actions} = useContext(Context)

  return(
    <ListItem noIndent transparent 
      style={{justifyContent:'center'}}>
      <Grid style={{justifyContent:'center',
        alignItems:'center', marginVertical:40}}>
        
        <Row>
          {/* Your Profile */}
          <Col style={{alignSelf:'center'}}>
            <Row style={{justifyContent:'center'}}>
           
              <Image source={{uri: store.myProfile.profile_pic_url}} 
                style={{height:150, width:150, 
                  borderRadius:500, justifyContent:'center'}}/>
            </Row>

          </Col>
          
          {/* Their Profile */}
          <Col>
            <Row style={{justifyContent:'center'}}>
              <Image source={{uri: props.buyin.recipient_user.profile_pic_url}} 
                style={{height:150, width:150, 
                borderRadius:500, justifyContent:'center'}}/>  
            </Row>

            

          </Col>
        </Row>

        <Row>
          <Text style={{fontSize:24}}>
            Winnings
          </Text>
        </Row>

        <Row style={{justifyContent:'flex-end'}}>
          <Col style={{justifyContent:'flex-end'}}>
            <Text style={{alignSelf:'flex-end', 
              marginRight:5, fontSize:18}}>
              ${props.buyin.you_won}
            </Text>
          </Col> 
          <Col>
            <Text style={{alignSelf:'flex-start', marginLeft:5, fontSize:18}}>
              ${props.buyin.they_won}
            </Text>
          </Col>
        </Row>

        <Row>
          <Text style={{fontSize:24}}>
            Agreed Swaps
          </Text>
        </Row>

        {props.agreed_swaps.map((swap, index) =>{
          <Row style={{justifyContent:'flex-end'}}>
            <Col style={{justifyContent:'flex-end'}}>
              <Text style={{alignSelf:'flex-end', 
                marginRight:5, fontSize:18}}>
                {swap.percentage}%
              </Text>
              <Text>You Owe: ${swap.you_owe}</Text>
            </Col>
            <Col>
              <Text style={{alignSelf:'flex-start', marginLeft:5, fontSize:18}}>
                {swap.counter_percentage}%
              </Text>
              <Text>They Owe: ${swap.they_owe}</Text>
            </Col>
          </Row>


        })}
      
        <Row>
          <Text style={{fontSize:24, fontWeight:'600'}}>
            Swap Profit
          </Text>
        </Row>
        <Row>
          <Text style={{fontSize:24, fontWeight:'600'}}>
            Your Total: ${props.buyin.you_owe_total}
          </Text>
          <Text style={{fontSize:24, fontWeight:'600'}}>
            Their Total: ${props.buyin.they_owe_total}
          </Text>
        </Row>
        <Row style={{
          justifyContent:'flex-end', flexDirection:'column'}}>
          <Text style={{fontSize:36, fontWeight:'600'}}>
            ${props.buyin.you_won}
          </Text>
        </Row>
      </Grid>
    </ListItem>
  )
}
