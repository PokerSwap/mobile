import React, {useState, useContext} from 'react';
import {Image, TextInput, KeyboardAvoidingView, View, TouchableWithoutFeedback} from 'react-native';
import {Container, Picker, Button, Text, Form, Content, Card, CardItem, Icon} from 'native-base';

import {request, check, PERMISSIONS} from 'react-native-permissions';

import ImagePicker from 'react-native-image-picker';

import { Context } from '../../Store/appContext';
import _Header from "../../View-Components/header";
import '../../Images/placeholder.jpg';

import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'


export default VerifyTicket = (props) => {

  const { store, actions } = useContext(Context)
 
  const [image, setImage ]= useState(require('../../Images/placeholder.jpg'));
  const [table, setTable ]= useState('');
  const [seat, setSeat] = useState('');
  const [chips, setChips] = useState('');
  const [flight_id, setFlight] = useState('-1')
  var navigation = props.navigation;

  let action = navigation.getParam('action', 'NO-ID');
  let tournament_id = navigation.getParam('tournament_id', 'NO-ID');
  let name = navigation.getParam('name', 'default value');
  let address = navigation.getParam('address', 'default value');
  let city = navigation.getParam('city', 'default value');
  let state = navigation.getParam('state', 'default value');
  let longitude = navigation.getParam('longitude', 'NO-ID');
  let latitude = navigation.getParam('latitude', 'NO-ID');
  let start_at = navigation.getParam('start_at', 'NO-ID');
  let flights = navigation.getParam('flights', 'NO-ID');
  let buy_ins = navigation.getParam('buy_ins', 'NO-ID');
  let swaps = navigation.getParam('swaps', 'NO-ID');

  var FlightSelection = flights.map((flight) => {
      
    var startMonth = flight.start_at.substring(8,11)
    var startDay = flight.start_at.substring(5,7)
    
    var startTime = flight.start_at.substring(16,22)

    var day_name = flight.start_at.substring(0,3)
    var day_num = flight.day

 
    var labelTime = 'Day ' + day_num + ' ' + day_name + '.  ' + startMonth + '. ' + startDay + ', ' + startTime 
      
    return(
        <Picker.Item 
          label= {labelTime}
          value={flight.id}
        />
      )
  })

  const BuyInStart = async() => {    
    var answer = await actions.buy_in.add( flight_id, table, seat, chips )
    var answer2 = await actions.buy_in.uploadPhoto(image)
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: "Update Your Buyin", // (required)
      date: new Date(Date.now() + 20 * 1000) // in 60 secs
    });
    var answer3 = await props.navigation.push('TourneyLobby', {
      action: action,
      tournament_id: tournament_id,
      name: name,
      address: address,
      city: city,
      state: state,
      longitude: longitude,
      latitude: latitude,
      start_at: start_at,
      buy_ins: buy_ins,
      swaps: swaps,
      flights: flights
    });
  }

  const requestAll = async() => {
    const cameraStatus = await check(PERMISSIONS.IOS.CAMERA);
    const photosStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    return {cameraStatus, photosStatus};
  }

  const UploadTicketPhoto = async() => {

    // var answer = await requestAll().then(statuses => console.log(statuses));;

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

  let textSeat = null;
  let textChips = null;
  
  return(
    <Container>
      <Content contentContainerStyle={styles.container.main}>
      <KeyboardAvoidingView style={{flex:1,}} behavior='position' keyboardVerticalOffset={-180}>
        {/* IMAGE INPUT */}
        <Card transparent style={{justifyContent:'center', flex:1}}>
          
          {/* INSTRUCTION TEXT  */}
          <CardItem style={{textAlign:'center', flex:1, flexDirection:'column'}}>
            <Text style={{textAlign:'center', fontSize:20}}>
              Enter the information and upload a photo 
            </Text>
            <Text style={{textAlign:'center', fontSize:20}}>  
              of your tournament buyin ticket.
            </Text>
          </CardItem>

          {/* IMAGE UPLOADED  */}
          <CardItem style={{justifyContent:'center', flex:1, flexDirection:'column', alignItems:'center'}}>
            <Image source={image} style={{width:200, height:200}} />
            <Button style={{width:200, justifyContent:'center'}} onPress={()=> UploadTicketPhoto()}>
              <Icon type='FontAwesome5' name='plus' style={{color:'white'}}/>
            </Button>
          </CardItem>

        </Card>
        
        {/* ALL BUYIN INPUTS */}
        <Card transparent style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          {/* TABLE INPUT */}
          <CardItem style={{flexDirection:'column', alignItems:'flex-end', width:'25%'}}>
            <Text style={styles.text.input}>Table: </Text>
            <TextInput 
              placeholder="Table #"
              placeholderTextColor='gray'
              keyboardType="number-pad"
              blurOnSubmit={false}
              style={styles.input}
              returnKeyType="done"
              allowFontScaling={false}
              autoCorrect={false} 
              onSubmitEditing={() => { textSeat.focus({pageYOffset:56})}}
              value={table}    
              onChangeText={table => setTable( table )}
            />
          </CardItem>
         
          {/* SEAT INPUT */}
          <CardItem style={{flexDirection:'column', justifyContent:'center', width:'25%'}}>
            <Text style={styles.text.input}>Seat: </Text>
            <TextInput 
              placeholder="Seat #"
              placeholderTextColor='gray'
              keyboardType="number-pad"
              blurOnSubmit={false}
              returnKeyType="done"
              autoCorrect={false} 
              style={styles.input}
              ref={(input) => { textSeat = input; }} 
              onSubmitEditing={() => { textChips.focus(); }}
              value={seat}    
              onChangeText={seat => setSeat( seat )}
            />
          </CardItem>

          {/* CHIPS INPUT */}
          <CardItem style={{flexDirection:'column', alignItems:'flex-start', width:'33%'}}>
            <Text style={styles.text.input}>Chips: </Text>
            <TextInput 
              placeholder="Enter Chips"
              placeholderTextColor='gray'
              keyboardType="number-pad"
              returnKeyType="done"
              autoCorrect={false} 
              blurOnSubmit={true}
              style={styles.input}
              ref={(input) => { textChips = input; }} 
              value={chips}    
              onChangeText={chips => setChips( chips )}
            />
          </CardItem>
        </Card>
        
        <Card transparent style={{ justifyContent:'center', flex:1, flexDirection:'column'}}>
          <Text style={{textAlign:'center', fontSize:18, marginBottom:5}}>Selected Flight:</Text> 
          <Form style={{justifyContent:'center', alignSelf:'center'}}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Please select your flight..."
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={flight_id}
              onValueChange={ (itemValue, itemIndex) => setFlight(itemValue) }
            >
              {FlightSelection}
            </Picker>
          </Form>
        </Card>

        <Card transparent>
          {/* SUBMIT BUTTON */}
          <CardItem style={styles.container.button}> 
            <Button large disabled={x} style={styles.button} onPress={() => BuyInStart()}>
              <Text style={styles.text.button}> SUBMIT </Text>
            </Button>
          </CardItem>
        </Card>
        </KeyboardAvoidingView>

      </Content>
    </Container>
  )
}

const styles = {
  button:{
    padding:20},
  container:{
    button:{
      justifyContent:'center', width:500},
    main:{
      alignItems:'center', justifyContent:'center'},
    image:{
      justifyContent:'center', width:200, flex:1, flexDirection:'column'},
    
    picker:{
      width:'80%'}
  },
  image:{
    height:200, width:200, marginTop:10},
  input:{
    justifyContent:'center', fontSize:24, color:'black'},
  text:{
    input:{
      fontSize:24, marginVertical:10},
    instruction:{
       fontSize:20, textAlign:'center', marginTop:10},
    button:{
      fontWeight:'600', fontSize:24}
  }
}