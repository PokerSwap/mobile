import React, {useState, useContext} from 'react';
import {Image, TextInput, Picker} from 'react-native';
import {Container, Button, Text, Content, Card, CardItem} from 'native-base';

import ImagePicker from 'react-native-image-picker';

import { Context } from '../../Store/appContext';
import _Header from "../../View-Components/header";
import '../../Images/placeholder.jpg';

export default VerifyTicket = (props) => {

  const { store, actions } = useContext(Context)
 
  const [image, setImage ]= useState(require('../../Images/placeholder.jpg'));
  const [table, setTable ]= useState('');
  const [seat, setSeat] = useState('');
  const [chips, setChips] = useState('');
  const [flight_id, setFlight] = useState('')

  var navigation = props.navigation;
  let flights = navigation.getParam('flights', 'NO-ID');

  var FlightSelection = flights.map((flight) => {
      
    var startMonth = flight.start_at.substring(8,11)
    var startDay = flight.start_at.substring(5,7)
    
    var startTime = flight.start_at.substring(16,22)
    var endTime = flight.end_at.substring(16,22)

    var day_name = flight.start_at.substring(0,3)
    var day_num = flight.day


    var labelTime = 'Day ' + day_num + ' ' + day_name + '.  ' + startMonth + '. ' + startDay + ', ' + startTime + ' -' + endTime
      
    return(
        <Picker.Item 
          label= {labelTime}
          value={flight.id}
        />
      )
  })

  const BuyInStart = async() => {    
    var answer = await actions.buy_in.add(
      flight_id,
      table,
      seat,
      chips
    )
    var answer2 = await actions.buy_in.uploadPhoto( image)
    props.navigation.goBack()
  }

  const UploadTicketPhoto = () => {
    const options = {
      title: 'Submit Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setImage(source);
      }
    });
  };

  var x;

  const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  if (!isNumeric(table) || !isNumeric(seat) || !isNumeric(chips) || flight_id=='' || flight_id==-1 || 
      image == require('../../Images/placeholder.jpg')){
    x=true
  }else{
    x=false
  }

  return(
    <Container>
      <Content contentContainerStyle={{ alignItems:'center', justifyContent:'center' }}>
        
        <Card transparent>                 
          {/* IMAGE UPLOADED  */}
          <CardItem style={{justifyContent:'center'}}>
            <Image 
            source={image}
            style={{height:200, width:200, marginTop:10}}
            />
          </CardItem>

          {/* INSTRUCTION TEXT  */}
          <CardItem>
            <Text  style={{width:300, fontSize:24, textAlign:'center', marginTop:10}}>
              Upload a photo of your tournament buyin ticket.
            </Text>
          </CardItem>

          {/* UPLOAD BUTTON  */}
          <CardItem style={{justifyContent:'center'}}>
            <Button large style={{marginVertical:10}} onPress={() => UploadTicketPhoto()}>
              <Text style={{fontWeight: '600'}}>UPLOAD</Text>
            </Button>
          </CardItem>      

          {/* TABLE INPUT */}
          <CardItem style={{justifyContent:'flex-start', marginLeft:10}}>
            <Text style={{fontSize:24}}>Table: </Text>
            <TextInput 
              placeholder="Enter Table Number"
              placeholderTextColor='gray'
              keyboardType="number-pad"
              blurOnSubmit={false}
              style={{justifyContent:'center', fontSize:20}}
              returnKeyType="next"
              autoCapitalize='none'
              autoCorrect={false} 
              // onSubmitEditing={() => { txtSeat.focus(); }}
              value={table}    
              onChangeText={table => setTable( table )}
            />
          </CardItem>
          
          {/* SEAT INPUT */}
          <CardItem style={{justifyContent:'flex-start', marginLeft:10}}>
            <Text style={{fontSize:24}}>Seat: </Text>
            <TextInput 
              placeholder="Enter Seat Number"
              placeholderTextColor='gray'
              keyboardType="number-pad"
              blurOnSubmit={false}
              returnKeyType="next"
              autoCapitalize='none'
              autoCorrect={false} 
              style={{justifyContent:'center', fontSize:20}}
              // ref={(input) => { txtSeat = input; }} 
              // onSubmitEditing={() => { txtChips.focus(); }}
              value={seat}    
              onChangeText={seat => setSeat( seat )}
            />
          </CardItem>
          
          {/* CHIPS INPUT */}
          <CardItem style={{justifyContent:'flex-start', marginLeft:10}}>
            <Text style={{fontSize:24}}>Chips: </Text>
            <TextInput 
              placeholder="Enter Number of Chips"
              placeholderTextColor='gray'
              keyboardType="number-pad"
              returnKeyType="go"
              autoCapitalize='none'
              autoCorrect={false} 
              style={{justifyContent:'center', fontSize:20}}
              // ref={(input) => { txtChips = input; }} 
              // onSubmitEditing={() => { txtPassword.focus(); }}
              value={chips}    
              onChangeText={chips => setChips( chips )}
            />
          </CardItem>
          
          {/* FLIGHT SELECTION */}
          <Picker
            selectedValue={flight_id}
            onValueChange={(itemValue, itemIndex) =>
              setFlight(itemValue)
            }
          >
            <Picker.Item label='Please select an option...' value='-1' />
            {FlightSelection}
          </Picker>

          {/* SUBMIT BUTTON */}
          <CardItem style={{justifyContent:'center'}}>
            
                  <Button disabled={x} onPress={() => BuyInStart()}>
                    <Text style={{fontWeight:'600'}}> SUBMIT </Text>
                  </Button>
                
          </CardItem>
        
        </Card>
      </Content>
    </Container>
  )
}
