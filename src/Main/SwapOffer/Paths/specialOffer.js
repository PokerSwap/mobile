import React from 'react'
import { View } from 'react-native'
import { Text, Button, CardItem, Icon } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'

export default SpecialOffer = (props) => {
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
          onPress={() => props.confirmationAlert('offer')}>
          <Text> Offer Swap </Text>
        </Button>
      </CardItem>
    </View>
  )
}