import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../Store/appContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import {openSettings, requestMultiple, PERMISSIONS} from 'react-native-permissions';

import { Image,  TextInput, KeyboardAvoidingView, Modal, 
  Platform, Alert, StatusBar, View, Keyboard, SafeAreaView } from 'react-native';
import { Container,  Button, Text, Content, Card, CardItem, Icon} from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import Spinner from 'react-native-loading-spinner-overlay'
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import _Header from "../../View-Components/HomeHeader";
import InfoModal from './Components/InfoModal'

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'
import moment from 'moment';

export default CustomCreation = (props) => {
    const { store, actions } = useContext(Context)
    const de = require('../../Images/placeholder.jpg'); 
    // const [ image, setImage ]= useState(de);
    // const [ table, setTable ]= useState('');
    // const [ seat, setSeat ] = useState('');
    // const [ chips, setChips ] = useState('');
    // // const [ submittedChips, setSubmittedChips ] = useState(false);
    // const [ loading, setLoading ] = useState(false)
    // const [ info, setInfo ] = useState(false)
    // const [ visible, setVisible ] = useState(false)
    // const [ currentTournament, setCurrentTournament ] = useState('')
    // const [ disabled, setDisabled] = useState(false)

    const [date, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    var nowDate = date
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    var navigation = useNavigation();
    var route = useRoute();
    // const { tournament, tournament_id } = route.params;


    useEffect(() => {
        getTournament()
        return () => {
        // cleanup
        }
    }, [])

    const getTournament = async() => {
        var xw = await actions.tournament.getCurrent(tournament_id)
        setCurrentTournament(xw)
    }
    
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

    const confirmationAlert = () =>{
        Alert.alert(
            "Confirmation Needed",
            'Are you sure you wish to enter this event?',
            [
                { text: 'Confirmation', onPress: () => BuyInStart() },
                { text: 'Cancel', onPress: () => console.log("Cancel Pressed"), }
            ]
        )
    }

    Platform.OS == 'ios' ? styles = iosStyles : styles = androidStyles
    
    // const BuyInStart = async() => {
    //     setLoading(true)
    //     var x = await actions.buy_in.add( 
    //     image, table, seat, chips,
    //     tournament, tournament_id, navigation )
    //     setLoading(false)
    // }
    

    // const handler = () => {
    //     setDisabled(true)
    //     BuyInStart();
    //     setTimeout(()=>{setDisabled(false)}, 2000)
    // }
    
    let textSeat = null, textChips = null;
   
    return(
        <Container>
            <View style={{height:20, position:'absolute', top:0, alignSelf:'flex-start',  
                backgroundColor:currentStyle.header.color}}>
                <StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
                    backgroundColor={'rgb(38, 171, 75)'}/>
            </View>
            <SafeAreaView style={{flex:1,backgroundColor:currentStyle.header.color}}>

            <OtherHeader title={"Custom Event Creation"} />
            <Content style={{backgroundColor:currentStyle.background.color, flexGrow:1}}>
                {/* <Spinner visible={loading} /> */}
                <KeyboardAvoidingView style={{flex:1,}} 
                    behavior='position' keyboardVerticalOffset={-180}>

                    <View transparent style={{backgroundColor:currentStyle.background.color, display:'flex', flexDirection:'column'}}>
                    
                    <View>
        <Text style={{color:'white'}}>{date.toLocaleTimeString()} {date.toDateString()}</Text>
        <Button onPress={showDatepicker}>
            <Text>open1</Text>
        </Button>
      </View>
      <View>
        <Button onPress={showTimepicker} >

        <Text>open2</Text>
        </Button>
      </View>
      {show ? 
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
          minimumDate={new Date(Date.now())nowDate.setDate(nowDate.getDate() - 1)}
          maximumDate={nowDate.setDate(nowDate.getDate() +90)}
        />
        : null
      }
                        {/* <Text>Event Name:</Text>
                        <View style={{borderWidth:1, paddingVertical:10, width:'80%',alignSelf:'center', 
                            borderColor:currentStyle.text.color}}>
                            <TextInput 
                                placeholder="Enter Event Name"
                                placeholderTextColor='gray'
                                selectionColor={currentStyle.text.color}
                                keyboardType="number-pad"
                                blurOnSubmit={false}
                                style={[styles.input, {color:currentStyle.text.color}]}
                                returnKeyType="done"
                                allowFontScaling={false}
                                autoCorrect={false} 
                                onSubmitEditing={() => { textSeat.focus({pageYOffset:56})}}
                                value={table}    
                                onChangeText={tableX => setTable( tableX )}/>
                        </View>
                        {/* TABLE INPUT - END */}

                        <Text>Start Time:</Text>
                        <View style={{borderWidth:1, paddingVertical:10, width:'80%',alignSelf:'center', 
                            borderColor:currentStyle.text.color}}>
                            
                        </View>
                        {/* TABLE INPUT - END */}

                        <Text>Duration:</Text>
                        <View style={{borderWidth:1, paddingVertical:10, width:'80%',alignSelf:'center', 
                            borderColor:currentStyle.text.color}}>
                            
                        </View>
                        {/* TABLE INPUT - END */}

                        {/* <Text>Place:</Text>
                        <View style={{borderWidth:1, paddingVertical:10, width:'80%',alignSelf:'center', 
                            borderColor:currentStyle.text.color}}>
                            <TextInput 
                                placeholder="Enter Place"
                                placeholderTextColor='gray'
                                selectionColor={currentStyle.text.color}
                                keyboardType="number-pad"
                                blurOnSubmit={false}
                                style={[styles.input, {color:currentStyle.text.color}]}
                                returnKeyType="done"
                                allowFontScaling={false}
                                autoCorrect={false} 
                                onSubmitEditing={() => { textSeat.focus({pageYOffset:56})}}
                                value={table}    
                                onChangeText={tableX => setTable( tableX )}/>
                                                    </View>

                        <Text>Address (Optional):</Text>
                        <View style={{borderWidth:1, paddingVertical:10, width:'80%',alignSelf:'center', 
                            borderColor:currentStyle.text.color}}>
                            <TextInput 
                                placeholder="Enter Address"
                                placeholderTextColor='gray'
                                selectionColor={currentStyle.text.color}
                                keyboardType="number-pad"
                                blurOnSubmit={false}
                                style={[styles.input, {color:currentStyle.text.color}]}
                                returnKeyType="done"
                                allowFontScaling={false}
                                autoCorrect={false} 
                                onSubmitEditing={() => { textSeat.focus({pageYOffset:56})}}
                                value={table}    
                                onChangeText={tableX => setTable( tableX )}/> */}
                                                    {/* </View>  */}

                        {/* TABLE INPUT - END */}
                        {/* TABLE INPUT - END */}

                        <View style={{display:'flex', alignSelf:'center'}}>
                            <Button onPress={() => confirmationAlert()} success large block>
                                <Text>CREATE</Text>
                            </Button>
                        </View>

                    </View>

                </KeyboardAvoidingView>
            </Content>
            </SafeAreaView>
        </Container>
    )
}

var styles


const iosStyles = {
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
            fontSize:24, marginBottom:0, textAlign:'center', marginTop:10, marginBottom:3},
        instruction:{
            fontSize:20, textAlign:'center', marginTop:0},
        button:{
            fontWeight:'600', fontSize:24, textAlign:'center'}
    }
}

const androidStyles = {
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
        justifyContent:'center', fontSize:20, color:'black', textAlign:'center'},
    text:{
        input:{
            fontSize:20, marginBottom:0, textAlign:'center', marginTop:3, marginBottom:-3},
        instruction:{
            fontSize:20, textAlign:'center', marginTop:0},
        button:{
            fontWeight:'600', fontSize:24, textAlign:'center'}
    }
    }