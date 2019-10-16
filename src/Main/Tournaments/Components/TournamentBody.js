import React, {Component} from 'react';
import { View } from 'react-native';
import { Button, ListItem, Text, Left, Icon, Right } from 'native-base';
import { Col } from 'react-native-easy-grid'

export default class TournamentBody extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
    
  render(){      
    
    var bgColor, textColor, buttonColor, path;
    var navigation = this.props.navigation ;

    // ACTIVE TOURNAMENT VIEW
    if (this.props.status=='active') {
      bgColor = 'green';
      textColor = 'white';
      buttonColor = 'white';
      borderWidth = 4;
      path = 'TourneyLobby'
    } 

    // INACTIVE TOURNAMENT VIEW
    else {
      bgColor = 'white';
      textColor = 'black';
      buttonColor = null;
      borderWidth = 2;
      path = 'VerifyTicket'
    }

    var month = this.props.start_at.substring(8,11)
    var day = this.props.start_at.substring(5,7)
    var day_name = this.props.start_at.substring(0,3)

    return(

      <ListItem 

        noIndent style={{backgroundColor: bgColor}}
        onPress={()=> navigation.navigate(path)} 
        style={{flexDirection:'row', justifyContent:'space-between'}}>
        
        {/* TOURNAMENT DATE */}
        <Col style={{width:'28%', alignItems:'center'}}>

          {/* TOURNAMENT DATE BOX */}
          <View  
            style={{
              borderColor:buttonColor,
              borderRadius: borderWidth,
              alignContent:'center',
              flexDirection:"column",
              flex:0,
              justifyContent:"center",
              width:85, height:85
            }}
          >
            {/* TOURNAMENT START DATE*/}
            <Text style={{fontWeight:"600", fontSize:24, color:textColor}}>{month} {day}</Text>
            <Text style={{fontWeight:"600", fontsize:12, color:textColor, marginTop:5}}>{day_name}</Text>
          </View>        
       
        </Col>
                
        {/* TOURNAMENT DETAILS */}
        <Col style={{width: '62%'}}>

          {/* TOURNAMENT TITLE */}
          <Text 
            style={{color:textColor, 
            alignContent:'center',
            textAlign:'center',
            fontSize:20, fontWeight:'600'}}> 
            {this.props.name}
          </Text>

          {/* TOURNAMENT ADDRESS */}
          <Text 
            style={{color:textColor, 
            alignSelf:"flex-start",
            fontSize:16, fontWeight:'400'}}> 
            {/* {this.props.address} */}
          </Text>
        
        </Col>
        
        {/* RIGHT ARROW NAVIGATION */}
        <Col style={{justifyContent:'flex-end', width:'10%'}}>
            <Icon style={{justifyContent:'flex-end', alignSelf:'flex-end'}} type="FontAwesome5" name="angle-right"/>
        </Col>

      </ListItem>
    )
  }
}