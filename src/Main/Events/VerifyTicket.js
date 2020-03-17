import React, {useState, useContext} from 'react';
import {Image,  TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback} from 'react-native';
import {Container,  Button, Text, Form, Picker, Content, Card, CardItem, Icon} from 'native-base';

import {check, PERMISSIONS} from 'react-native-permissions';

import ImagePicker from 'react-native-image-picker';

import { Context } from '../../Store/appContext';
import _Header from "../../View-Components/HomeHeader";
import placeholder from '../../Images/placeholder.jpg';

export default VerifyTicket = (props) => {

  const { store, actions } = useContext(Context)

  const de = require('../../Images/placeholder.jpg');
 
  const [image, setImage ]= useState(de);
  const [table, setTable ]= useState('');
  const [seat, setSeat] = useState('');
  const [chips, setChips] = useState('');

  var navigation = props.navigation;
  let name = navigation.getParam('name', 'NO-ID');
  let flight_id = navigation.getParam('flight_id', 'NO-ID');
  let tournament_id = navigation.getParam('tournament_id', 'NO-ID');

  const askPersmission = async () => {
    if(Platform.OS == 'ios'){
      Promise.all([
        check(PERMISSIONS.IOS.CAMERA),
        check(PERMISSIONS.IOS.PHOTO_LIBRARY),
      ]).then(([cameraStatus, photoLibraryStatus]) => {
        console.log({cameraStatus, photoLibraryStatus});
      });
      UploadTicketPhoto()

    } else if (Platform.OS == 'android') {
      Promise.all([
        check(PERMISSIONS.ANDROID.CAMERA),
        check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE),
      ]).then(([cameraStatus, readExternalStorageStatus]) => {
        console.log({cameraStatus, readExternalStorageStatus});
      });
      UploadTicketPhoto()
    }
  };

  const UploadTicketPhoto = async() => {

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

        if (!response.uri) return;

      let type = response.type;

      if (type === undefined && response.fileName === undefined) {
        const pos = response.uri.lastIndexOf('.');
        type = response.uri.substring(pos + 1);
        if (type) type = `image/${type}`;
      }
      if (type === undefined) {
        const splitted = response.fileName.split('.');
        type = splitted[splitted.length - 1];
        if (type) type = `image/${type}`;
      }

      let name = response.fileName;
      if (name === undefined && response.fileName === undefined) {
        const pos = response.uri.lastIndexOf('/');
        name = response.uri.substring(pos + 1);
      }

      const selectedImage = {
        uri: response.uri,
        type: type.toLowerCase(),
        name: name,
      };
      setImage(selectedImage);
      }
    });
  };

  const BuyInStart = async() => {
    var answer = await actions.buy_in.add( 
      image, table, seat, chips, flight_id, tournament_id, props.navigation )
  };
 
  let textSeat = null, textChips = null;
   
  return(
    <Container>
      <Content>
      <KeyboardAvoidingView style={{flex:1,}} 
        behavior='position' keyboardVerticalOffset={-180}>
        
        {/* IMAGE INPUT */}
        <Card transparent >

          <CardItem style={{justifyContent:'center'}}>
            <Text style={{textAlign:'center', fontSize:24, fontWeight:'bold'}}>
              {name} 
            </Text>
          </CardItem>
          
          {/* INSTRUCTION TEXT  */}
          <CardItem style={{selfAlign:'center', flex:1, 
            justifyContent:'center', flexDirection:'column'}}>
            <Text style={{textAlign:'center', fontSize:18,  flex:1}}>
              Enter the information and upload a photo of your tournament buyin ticket.
            </Text>
          </CardItem>

          {/* IMAGE UPLOADED  */}
          <CardItem style={{justifyContent:'center', 
            flex:1, flexDirection:'column', alignItems:'center'}}>
            <Image source={image} style={{width:200, height:200}} />
            <Button style={{width:200, justifyContent:'center'}} 
              onPress={()=> askPersmission()}>
              <Icon type='FontAwesome5' name='plus' style={{color:'white'}}/>
            </Button>
          </CardItem>

        </Card>
        
        {/* ALL BUYIN INPUTS */}
        <Card transparent style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          {/* TABLE INPUT */}
          <CardItem style={{flexDirection:'column', alignItems:'flex-end', width:'33%'}}>
            <Text style={styles.text.input}>
              Table: 
            </Text>
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
              onChangeText={tableX => setTable( tableX )}
            />
          </CardItem>
         
          {/* SEAT INPUT */}
          <CardItem style={{flexDirection:'column', justifyContent:'center', width:'33%'}}>
            <Text style={styles.text.input}>
              Seat: 
            </Text>
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
              onChangeText={seatX => setSeat( seatX )}
            />
          </CardItem>

          {/* CHIPS INPUT */}
          <CardItem style={{flexDirection:'column', alignItems:'flex-start', width:'33%'}}>
            <Text style={styles.text.input}>
              Chips: 
            </Text>
            <TextInput 
              placeholder="Chip #"
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
        
        {/*  */}
        
        <Button large style={styles.button} 
          onPress={() => BuyInStart()}>
          <Text style={styles.text.button}> 
            SUBMIT 
          </Text>
        </Button>

        </KeyboardAvoidingView>

      </Content>
    </Container>
  )
}

const styles = {
  button:{
    paddingVertical:20, width:'100%', justifyContent:'center'},
  container:{
    button:{
      justifyContent:'center', width:1000, paddingRight:0, paddingLeft:0},
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
      fontWeight:'600', fontSize:24, textAlign:'center'}
  }
}