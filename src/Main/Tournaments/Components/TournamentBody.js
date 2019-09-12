import React, {Component} from 'react';
import { Button, ListItem, Text, Left, Icon, Right, H3} from 'native-base';
import { Col } from 'react-native-easy-grid'

export default class TournamentBody extends Component {
    constructor(props){
      super(props);
      this.state={
  
      }
    }
    
    render(){      
      
      var bgColor, textColor, buttonColor, path;
      var navigation = this.props.reel ;

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
      return(
        <ListItem 
          noIndent style={{backgroundColor: bgColor}}
          onPress={()=> navigation.navigate(path)} >
          
          {/* Tournament Start Date */}
          <Left>
            <Button bordered 
              style={{
                borderColor:buttonColor,
                borderRadius: borderWidth,
                alignContent:'center',
                flexDirection:"column",
                flex:0,
                justifyContent:"center",
                width:75, height:75
              }}
            >
              <Text style={{fontWeight:"600", color:textColor}}>
                {this.props.month} 
              </Text>
              <Text style={{fontWeight:"600", color:textColor}}>
                {this.props.day}
              </Text>
              
            </Button>        
          </Left>
          
          {/* Tournament Title and Address */}
          <Col style={{width: 230}}>
            <Text 
              style={{color:textColor, 
              alignSelf:"flex-start",
              fontSize:20, fontWeight:'600'}}> 
              {this.props.title}
            </Text>
            <Text 
              style={{color:textColor, 
              alignSelf:"flex-start"}}> 
              {this.props.street} 
            </Text>
            <Text 
              style={{color:textColor, 
              alignSelf:"flex-start"}}> 
              {this.props.city}, {this.props.state} {this.props.zip} 
            </Text>
          </Col>
          
          {/* Right Arrow Icon */}
          <Right>
              <Icon type="FontAwesome5" name="angle-right"/>
          </Right>

        </ListItem>
      )
    }
}