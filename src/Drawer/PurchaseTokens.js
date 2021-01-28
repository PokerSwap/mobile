import React, { useContext, useState } from 'react';
import { Context } from '../Store/appContext';

import { ScrollView, Image, View, Modal } from 'react-native';
import { Container, Content,  Button, Text } from 'native-base';
import { Grid, Col, Row} from 'react-native-easy-grid'

import darkStyle from '../Themes/dark.js'
import lightStyle from '../Themes/light.js'

import PayForTokenModal from './PayScenes/PayForTokenModal'
import OtherHeader from '../View-Components/OtherHeader'

PriceOption = (props) => {

  const [ visible, setVisible] = useState(false)

  return(
    <Col style={{ 
      justifyContent:'center', alignItems:'center',
       borderColor:'#d3d3d3', borderRightWidth:1, 
      borderTopWidth:1}}>
        <Modal
          animationType='fade'
          visible={visible}
          presentationStyle='overFullScreen'
          transparent={true}>
          <PayForTokenModal  setVisible={setVisible}
            dollars={props.dollars}
            swapTokens={props.swapTokens} />
        </Modal>
        
      <View style={{overflow:'hidden', height:props.hx}}>
        <Image source={props.image} style={{
          width:props.w, height:props.h, alignSelf:'center'}}/>
      </View>

      <Text style={{textAlign:'center', fontWeight:'500', 
        fontSize:24, marginBottom:10}}> 
        {props.swapTokens} Tokens
      </Text>

      <Button full style={{ alignSelf:'center', justifyContent:'center', width:'100%'}} 
       onPress={() => setVisible(true)}>
        <Text style={{textAlign:'center'}}>
          ${props.dollars}
        </Text>
      </Button>
    </Col>
  )
}

export default PurchaseTokens = (props) => {

  const { store, actions } = useContext(Context)
  
  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

  return(
        <Container>
            <OtherHeader title={'Purchase Tokens'} />
            <Content>
                <ScrollView style={{ alignSelf: 'stretch' }}>    
                    <Button onPress={()=> actions.swapToken.buy(5)}>
                        <Text>ADD 5 TOKENS</Text>
                    </Button>       
                    <Grid transparent>
                        {/* TIER 1 PURCHASES */}
                        <Row style={{alignItems:'center'}}>
                            <PriceOption image={require('../Images/5Real.png')}
                                dollars={4.99} swapTokens={5} w={100} h={100} hx={100} />
                            <PriceOption image={require('../Images/10Real.png')}
                                dollars={9.99} swapTokens={10} w={100} h={100} hx={100} />
                        </Row>
                        {/* TIER 2 PURCHASES */}
                        <Row style={{alignItems:'center'}}>
                            <PriceOption image={require('../Images/25Real.png')}
                                dollars={19.99} swapTokens={25} w={100} h={100} hx={100}/>
                            <PriceOption image={require('../Images/50Real.png')}
                                dollars={34.99} swapTokens={50}  w={100} h={100} hx={100}/>
                        </Row>
                        {/* TIER 3 PURCHASES */}
                        <Row>
                            <PriceOption image={require('../Images/100Real.png')}
                                dollars={69.99} swapTokens={100} w={100} h={100} />
                            <PriceOption image={require('../Images/150Real.png')}
                                dollars={99.99} swapTokens={150} w={100} h={100} />
                        </Row>
                    </Grid>
                </ScrollView>
            </Content>
        </Container>
    )
}