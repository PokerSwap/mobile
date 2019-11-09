import React, {} from "react";

import { Context } from "../../../Store/appContext";

import { ListItem, Button, Text } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid'

SwapHead = (props) => {
  return(
    <Row>

      <Col style={{justifyContent:'center'}}>
        
        <Button large bordered info style={{
          flexDirection:"column", 
          justifyContent:"center",
          marginTop:20,
          marginLeft:10,
          height:80,
          width:80}}>
          <Text 
            style={{
              fontWeight:"bold", 
              textAlign:'center'}}>
            {props.date}
          </Text>
        </Button> 
      
      </Col>              
      
      <Col style={{ 
        alignItems:'flex-start', 
        width:'70%',
        justifyContent:'flex-start'}}
      >
        <Row style={{justifyContent:'flex-start'}}>
          <Text style={{
            fontSize:24, 
            textAlign:'left',
            fontWeight:'600'}}>
            {props.tournament}
          </Text>
        </Row>
      </Col>      
    
    </Row>
        
  )
}

SwapBody = (props) => {

  return(
    <Row  style={{  displayFlex:1, marginVertical:10, alignItems:'center'}}>
        
      <Context.Consumer>
        {({ store, actions}) => {
          return(
            <Col  style={{justifyContent:'flex-end', width:'75%', alignItems:'center'}}>

              {/* SWAP USERNAME */}
              <Text 
                // onPress={()=> actions.swap(props.navigation, props.name)}
                style={{ textAlign:'right', fontSize:30}}>
                {props.name}
              </Text>  
                
              {/* SWAP PERCENT  */}
              <Button success large style={{ width:65, marginRight:25}}>
                <Text>{props.percent}%</Text>
              </Button>
              
            </Col>
          )
        }} 
      </Context.Consumer> 
    </Row>
  )
}

export default  WinningTracker = (props) => {

  return(
    <ListItem noIndent style={{flex:1, flexDirection:'column'}}>
      <Grid>
        <Col>
          {/* SWAP HEAD */}
          <Context.Consumer>
            {({store, actions}) => {
              return(
                <SwapHead 
                tournament={props.tournament} 
                date={props.startat}
                swaps={props.swaps}/>
              )
            }}
          </Context.Consumer>
          
          {/* SWAP BODY  */}
          {/* <Context.Consumer>
            {({store, actions}) => {
              
                return store.my_swaps.map((content, index) => {
                return(
                  <SwapBody
                    id = {content.id}
                    name={content.name}
                    percent={content.percent}
                    status={content.status}
                    navigation={props.navigation}/>
                )
              })
            }}
          </Context.Consumer> */}
        </Col>
      </Grid>
    </ListItem>
  )
}
  