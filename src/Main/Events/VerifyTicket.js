import React, { useState, useContext, useCallback } from 'react';
import { Image,  TextInput, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import { Container,  Button, Text, Content, Card, CardItem, Icon} from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { throttle } from 'lodash'
import {openSettings, requestMultiple, PERMISSIONS} from 'react-native-permissions';
import Spinner from 'react-native-loading-spinner-overlay'
import { useRoute, useNavigation } from '@react-navigation/native';


import ImagePicker from 'react-native-image-picker';

import { Context } from '../../Store/appContext';
import _Header from "../../View-Components/HomeHeader";
import placeholder from '../../Images/placeholder.jpg';

export default VerifyTicket = (props) => {
  const { store, actions } = useContext(Context)
  const de = require('../../Images/placeholder.jpg'); 
  const [ image, setImage ]= useState(de);
  const [ table, setTable ]= useState('');
  const [ seat, setSeat ] = useState('');
  const [ chips, setChips ] = useState('');
  const [ loading, setLoading ] = useState(false)

  var navigation = useNavigation();
  var route = useRoute();
  const { tournament_name } = route.params;
  const { tournament_start } = route.params;
  const { flight_id } = route.params;
  const { tournament_id } = route.params;
  const { casino } = route.params;

  console.log('tID', tournament_id)
  
  const openSets = () => {
    openSettings().catch(() => console.warn('cannot open settings'));
  }

  const showAlert = () =>{
    Alert.alert(
      "Permissions Needed",
      'In order to proceed you must have Camera and Photo Library permissions',
      [
        { text: 'Go To Settings', onPress: () => openSets() },
        { text: 'Cancel', onPress: () => console.log("Cancel Pressed"), }
      ]
    )
  }

  const askPersmission = async () => {
    var cameraStatus, libraryStatus;
    Platform.OS == 'ios' ? 
      cameraStatus = PERMISSIONS.IOS.CAMERA 
      : cameraStatus = PERMISSIONS.ANDROID.CAMERA
    Platform.OS == 'ios' ? 
      libraryStatus = PERMISSIONS.IOS.PHOTO_LIBRARY 
      : libraryStatus = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    
    requestMultiple([cameraStatus, libraryStatus]).then(
      (statuses) => {
        console.log('Camera', statuses[cameraStatus]);
        console.log('Library', statuses[libraryStatus]);
        statuses[cameraStatus] == 'granted' && statuses[libraryStatus] == 'granted' ? 
          UploadTicketPhoto() : showAlert()
      }
    )
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
    setLoading(true)
    var x = await actions.buy_in.add( 
    image, table, seat, chips, flight_id, tournament_id, tournament_name, tournament_start, casino, navigation )
    setLoading(false)
  }
 
  const handler = throttle(BuyInStart, 1000, { leading: true, trailing: false });
 
  let textSeat = null, textChips = null;
   
  return(
    <Container>
      <Content>
        <Spinner visible={loading} />
      <KeyboardAvoidingView style={{flex:1,}} 
        behavior='position' keyboardVerticalOffset={-180}>
        {/* TOURNEY INFO */}
        <Card transparent >
          {/* TOURNAMENT INFO */}
          <CardItem style={{justifyContent:'center', flexDirection:'column'}}>
            <Text style={{textAlign:'center', fontSize:24, fontWeight:'bold'}}>
              {tournament_name} 
            </Text>
            <Text style={{textAlign:'center', fontSize:18, marginTop:10}}>
              {tournament_start}
            </Text>
          </CardItem>
          {/* INSTRUCTION TEXT  */}
          <CardItem style={{selfAlign:'center', flex:1, 
            justifyContent:'center', flexDirection:'column'}}>
            <Text style={{textAlign:'center', fontSize:18,  flex:1}}>
              Enter the information and upload a photo of your tournament buyin ticket.
            </Text>
          </CardItem>
        </Card>
        {/* TICKET INPUT */}
        <Card transparent>
          <CardItem>
            <Grid>
              <Col style={{justifyContent:'center'}}>
                {/* IMAGE UPLOADED  */}
                <Image source={image} style={{width:175, height:175}} />
                <Button style={{width:175, justifyContent:'center'}} 
                  onPress={()=> askPersmission()}>
                  <Icon type='FontAwesome5' name='plus' style={{color:'white'}}/>
                </Button>
              </Col>
              {/* ALL BUYIN INPUTS */}
              <Col style={{justifyContent:'center'}}>
                {/* TABLE INPUT */}
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
                    onChangeText={tableX => setTable( tableX )}/>
                {/* SEAT INPUT */}
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
                    onChangeText={seatX => setSeat( seatX )}/>
                  {/* CHIPS INPUT */}
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
                    onChangeText={chips => setChips( chips )}/>
                </Col>
            </Grid>
          </CardItem>
          {/* SUBMIT BUTTON */}
          <CardItem>
            <Button large style={styles.button} 
              onPress={() => handler()}>
              <Text style={styles.text.button}> 
                SUBMIT 
              </Text>
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
    paddingVertical:20, width:'100%', justifyContent:'center' 
  },
  container:{
    button:{
      justifyContent:'center', width:1000, 
      paddingTop:0, marginTop:0, paddingRight:0, paddingLeft:0},
    main:{
      alignItems:'center', justifyContent:'center', marginBottom:0 },
    image:{
      justifyContent:'center', width:200, flex:1, flexDirection:'column' }
  },
  image:{
    height:200, width:200, marginTop:10 },
  input:{
    justifyContent:'center', fontSize:24, color:'black', textAlign:'center'},
  text:{
    input:{
      fontSize:20, marginBottom:0, textAlign:'center'},
    instruction:{
       fontSize:20, textAlign:'center', marginTop:0},
    button:{
      fontWeight:'600', fontSize:24, textAlign:'center'}
  }
}