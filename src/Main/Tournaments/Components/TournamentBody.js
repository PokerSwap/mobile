import React, {Component} from 'react';
import { View } from 'react-native';
import { ListItem, Text, Icon } from 'native-base';
import { Col } from 'react-native-easy-grid'

export default class TournamentBody extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
    
  render(){      
    
    var bgColor, textColor, buttonColor, path;
    var navigation = this.props.navigation;

    const enterTournament = () => {
      navigation.push(path, {
        tournament_id: this.props.id,
        name: this.props.name,
        address: this.props.address,
        longitude: this.props.longitude,
        latitude: this.props.latitude,
        start_at: this.props.start_at,
        end_at: this.props.end_at,
        flights: this.props.flights
      });
    }
    console.log('flights',this.props.flights)
    console.log('my buyins', this.props.my_buy_ins)

    var x = this.props.my_buy_ins.map((buy_in) => buy_in.id)
    var z=[]
    var y = this.props.flights.forEach((flight) => 
      flight.buy_ins.forEach((buy_in) => z.push(buy_in.id))
    )
  console.log('x',x)
 console.log('z',z)
    var matches
      x.forEach((buy_in) =>
        z.forEach((other_buyin)=> {
          if(buy_in!=other_buyin){
            matches = true
          } else {
            matches =false
          }
        })
      )

    console.log(matches)
    // ACTIVE TOURNAMENT VIEW
    if (matches) {
      bgColor = 'green';
      textColor = 'white';
      buttonColor = 'white';
      borderWidth = 4;
      path = 'TourneyLobby'
    } else {
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

      <ListItem noIndent 
        style={{backgroundColor: bgColor, flexDirection:'row', justifyContent:'space-between'}}
        onPress={()=> enterTournament()} 
      >
        
        {/* TOURNAMENT DATE */}
        <Col style={{width:'28%', alignItems:'center'}}>

          {/* TOURNAMENT DATE BOX */}
          <View  
            style={{
              backgroundColor: bgColor,
              borderColor:buttonColor, borderRadius: borderWidth, alignContent:'center',
              flexDirection:"column", flex:0, justifyContent:"center", width:85, height:85
            }}
          >
            {/* TOURNAMENT START DATE*/}
            <Text style={{fontWeight:"600", fontSize:24, color:textColor}}>{month} {day}</Text>
            <Text style={{fontWeight:"600", fontSize:12, color:textColor, marginTop:5}}>{day_name}</Text>
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