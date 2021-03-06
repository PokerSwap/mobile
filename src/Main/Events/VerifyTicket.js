import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../Store/appContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import {openSettings, requestMultiple, PERMISSIONS} from 'react-native-permissions';

import { Image,  TextInput, KeyboardAvoidingView, Modal, 
  Platform, Alert, StatusBar, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Container,  Button, Text, Content, Card, CardItem, Icon} from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import Spinner from 'react-native-loading-spinner-overlay'
import ImagePicker from 'react-native-image-picker';

import _Header from "../../View-Components/HomeHeader";
import InfoModal from './Components/InfoModal'

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default VerifyTicket = (props) => {
    const { store, actions } = useContext(Context)
    const de = require('../../Images/placeholder.jpg'); 
    const [ image, setImage ]= useState(de);
    const [ table, setTable ]= useState('');
    const [ seat, setSeat ] = useState('');
    const [ chips, setChips ] = useState('');
    // const [ submittedChips, setSubmittedChips ] = useState(false);
    const [ loading, setLoading ] = useState(false)
    const [ info, setInfo ] = useState(false)
    const [ visible, setVisible ] = useState(false)
    const [ currentTournament, setCurrentTournament ] = useState('')
    const [ disabled, setDisabled] = useState(false)


    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    var navigation = useNavigation();
    var route = useRoute();
    const { tournament, tournament_id } = route.params;


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

    Platform.OS == 'ios' ? styles = iosStyles : styles = androidStyles


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
            name: 'default',
        };
        setImage(selectedImage);
        }
        });
    };
    
    const BuyInStart = async() => {
        setLoading(true)
        var x = await actions.buy_in.add( 
        image, table, seat, chips,
        tournament, tournament_id, navigation )
        setLoading(false)
    }
    

    const handler = () => {
        setDisabled(true)
        BuyInStart();
        setTimeout(()=>{setDisabled(false)}, 2000)
    }
    
    let textSeat = null, textChips = null;
   
    return(
        <Container>
            <View style={{height:20, position:'absolute', top:0, alignSelf:'flex-start',  
                backgroundColor:currentStyle.header.color}}>
                <StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
                    backgroundColor={'rgb(38, 171, 75)'}/>
            </View>
            <SafeAreaView style={{flex:1,backgroundColor:currentStyle.header.color}}>

            <OtherHeader title={"Verify Ticket"} />
            <Content style={{backgroundColor:currentStyle.background.color, flexGrow:1}}>
                <Spinner visible={loading} />
                <KeyboardAvoidingView style={{flex:1,}} 
                    behavior='position' keyboardVerticalOffset={-180}>
                    
                    {/* EVENT INFO MODAL */}
                    <Modal
                        animationType='fade'
                        visible={visible}
                        presentationStyle='overFullScreen'
                        transparent={true}>
                        <InfoModal  
                            setVisible={setVisible}
                            tournament={tournament} />
                    </Modal>

                    {/* EVENT INFO - START */}
                    <Card transparent style={{backgroundColor:currentStyle.background.color}}>
                    
                        {/* TOURNAMENT INFO */}
                        <CardItem style={{justifyContent:'center', flexDirection:'column',
                            backgroundColor:currentStyle.background.color}}>
                            <Text style={{textAlign:'center', fontSize:20, marginBottom:10, 
                                fontWeight:'600',color:currentStyle.text.color}}>
                                {tournament.name} 
                            </Text>
                            <Button block info onPress={() => setVisible(!visible)}>
                                <Text>Event Info</Text>
                            </Button>  
                        </CardItem>

                        {/* INSTRUCTION TEXT  */}
                        <CardItem style={{selfAlign:'center', flex:1, marginBottom:-10,
                            backgroundColor:currentStyle.background.color,
                            justifyContent:'center', flexDirection:'column'}}>
                            <Text style={{textAlign:'center', fontWeight:'600', fontSize:16, 
                                color:currentStyle.text.color,  flex:1}}>
                                Enter the information and upload a photo of your tournament buy-in ticket.
                            </Text>
                        </CardItem>

                    </Card>
                    {/* EVENT INFO - END */}

                    {/* BUYIN TICKET SUBMISSION - START */}
                    <Card transparent 
                        style={{backgroundColor:currentStyle.background.color, marginTop:0}}>
                        <CardItem style={{backgroundColor:currentStyle.background.color, flex:1, 
                            justifyContent:'space-between'}}>

                                {/* BUYIN TICKET - IMAGE UPLOAD FIELD */}
                                <View style={{ width:'50%', justifyContent:'flex-end'}}>
                                    <Image source={image} style={{width:175, height:175}} />
                                    <Button style={{width:175, justifyContent:'center'}} 
                                        onPress={()=> askPersmission()}>
                                        <Icon type='FontAwesome5' name='plus' style={{color:'white'}}/>
                                    </Button>
                                </View>
                                
                                {/* BUYIN TICKET - DETAIL INPUTS - START */}
                                <View style={{justifyContent:'center',width:'45%'}}>
                                    
                                    {/* TABLE INPUT - START */}
                                    
                                    <Text style={[styles.text.input, {color:currentStyle.text.color, marginTop:0}]}>
                                        Table: 
                                    </Text>
                                    <View style={{borderWidth:1, paddingVertical:10, width:'80%',alignSelf:'center', 
                                        borderColor:currentStyle.text.color}}>
                                        <TextInput 
                                            placeholder="Table #"
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

                                    {/* SEAT INPUT - START */}
                                        <Text style={[styles.text.input, {color:currentStyle.text.color}]}>
                                            Seat: 
                                        </Text>
                                        <View style={{borderWidth:1, paddingVertical:10, width:'80%',
                                            alignSelf:'center', borderColor:currentStyle.text.color}}>
                                        <TextInput 
                                            placeholder="Seat #"
                                            placeholderTextColor='gray'
                                            selectionColor={currentStyle.text.color}
                                            keyboardType="number-pad"
                                            blurOnSubmit={false}
                                            returnKeyType="done"
                                            autoCorrect={false} 
                                            style={[styles.input, {color:currentStyle.text.color}]}
                                            ref={(input) => { textSeat = input; }} 
                                            onSubmitEditing={() => { textChips.focus(); }}
                                            value={seat}    
                                            onChangeText={seatX => setSeat( seatX )}/>
                                    </View>
                                    {/* SEAT INPUT - END */}

                                    {/* CHIPS INPUT - START */}
                                    
                                                <Text style={[styles.text.input, {color:currentStyle.text.color}]}>
                                                    Chips: 
                                                </Text>
                                                <View style={{borderWidth:1, paddingVertical:10, width:'80%', 
                                                    alignSelf:'center', borderColor:currentStyle.text.color}}>
                                                    <TextInput 
                                                        placeholder="# of Chips"
                                                        placeholderTextColor='gray'
                                                        selectionColor={currentStyle.text.color}
                                                        keyboardType="number-pad"
                                                        returnKeyType="done"
                                                        autoCorrect={false} 
                                                        blurOnSubmit={true}
                                                        style={[styles.input, {color:currentStyle.text.color}]}
                                                        ref={(input) => { textChips = input; }} 
                                                        value={chips}    
                                                        onChangeText={chips => setChips( chips )}/>
                                                </View>

                                    {/* CHIPS INPUT - END */}

                                </View>
                                {/* BUYIN TICKET - DETAIL INPUTS - END */}
                        </CardItem>

                        {/* SUBMIT BUTTON */}
                        <CardItem style={{backgroundColor:currentStyle.background.color}}>
                            <Button disabled={disabled} large style={styles.button} 
                                onPress={() => handler()}>
                                <Text style={styles.text.button}> 
                                    SUBMIT 
                                </Text>
                            </Button>
                        </CardItem>
                    
                    </Card>
                    {/* BUYIN TICKET SUBMISSION - END */}

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