import React, {useState, useContext} from 'react';
import {Image, TextInput, Picker, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {Container, Button, Text, Content, Card, CardItem} from 'native-base';

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
  const [flight_id, setFlight] = useState('')

  var navigation = props.navigation;
  let flights = navigation.getParam('flights', 'NO-ID');

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
    var answer = await actions.buy_in.add(
      flight_id,
      table,
      seat,
      chips
    )
    var answer2 = await actions.buy_in.uploadPhoto(image)
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: "Update Your Buyin", // (required)
      date: new Date(Date.now() + 20 * 1000) // in 60 secs
    });
    props.navigation.goBack()
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
        <Card transparent>
          
          {/* IMAGE UPLOADED  */}
          <CardItem style={styles.container.image}>
            <Image source={image} style={styles.image} />
          </CardItem>

          {/* INSTRUCTION TEXT  */}
          <CardItem>
            <Text style={styles.text.instruction}>
              Upload a photo of your tournament buyin ticket.
            </Text>
          </CardItem>

          {/* UPLOAD BUTTON  */}
          <CardItem style={styles.container.button}>
            <Button large style={styles.button} 
              onPress={()=> UploadTicketPhoto()}>
              <Text style={styles.text.button}>
                UPLOAD
              </Text>
            </Button>
          </CardItem>      
        </Card>
        
        
        {/* ALL BUYIN INPUTS */}
        <Card transparent style={{flex:1, flexDirection:'column'}}>

          {/* TABLE INPUT */}
          <CardItem style={styles.container.input}>
            <Text style={styles.text.input}>Table: </Text>
            <TextInput 
              placeholder="Enter Table Number"
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
          <CardItem style={styles.container.input}>
            <Text style={styles.text.input}>Seat: </Text>
            <TextInput 
              placeholder="Enter Seat Number"
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
          <CardItem style={styles.container.input}>
            <Text style={styles.text.input}>Chips: </Text>
            <TextInput 
              placeholder="Enter Number of Chips"
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
        
          
        <Card transparent style={{width:'100%'}}>
          
          {/* FLIGHT SELECTION */}
            <Picker
              selectedValue={flight_id}
              onValueChange={ (itemValue, itemIndex) => setFlight(itemValue) }
            >
              <Picker.Item label='Please select an option...' value='-1' />
              {FlightSelection}
            </Picker>
            

          {/* SUBMIT BUTTON */}
          <CardItem style={styles.container.button}> 
            <Button disabled={x} style={styles.button} onPress={() => BuyInStart()}>
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
    fontWeight:'600'},
  container:{
    button:{
      justifyContent:'center', marginBottom:0},
    main:{
      alignItems:'center', justifyContent:'center'},
    image:{
      justifyContent:'center'},
    input:{
      flexDirection:'column', justifyContent:'center'},
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
      width:300, fontSize:24, 
      textAlign:'center', marginTop:10},
    button:{
      fontWeight:'600'}
  }
}