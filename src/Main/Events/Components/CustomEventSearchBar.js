import React, { useContext, useState } from 'react'
import { Context } from '../../../Store/appContext'
import Geolocation from '@react-native-community/geolocation';
import { openSettings, request, PERMISSIONS } from 'react-native-permissions';

import { useNavigation } from '@react-navigation/native'

import { TextInput, View, TouchableOpacity, Platform, Alert } from 'react-native';
import { Icon, Item, Text} from 'native-base';
 
import darkStyle from '../../../Themes/dark.js'
import lightStyle from '../../../Themes/light.js'

export default CustomEventSearchBar = (props) => {
    const { store, actions } = useContext(Context)
    const navigation = useNavigation()
    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    const [ value, setValue ] = useState('')
    const testValue = async(value) => {
        const regexZip = new RegExp('^\\d{5}$');
        const regexName = new RegExp('^[a-zA-Z0-9_ .-]+$');
        if(regexZip.test(value)){
            var answer1 = await actions.tournament.getInitial('/custom','zip', value)    
        props.setMode('byZip')
        } else if (regexName.test(value)){
            var answer2 = await actions.tournament.getInitial('/custom','name', value)
            props.setMode('byName')    
        } else {
            props.setPage(1)
            var answer2 = await actions.tournament.getInitial('/custom',)
            props.setMode('byDate')
        }
    }

    const openSets = () => {
        openSettings().catch(() => console.warn('cannot open settings'));
    }

    const showAlert = () =>{
        Alert.alert(
            "Permissions Needed",
            'In order to proceed, you must have Location Services permissions allowed',
            [
                { text: 'Go To Settings', onPress: () => openSets() },
                { text: 'Cancel', onPress: () => console.log("Cancel Pressed"), }
            ]
        )
    }

    const askPersmission = async () => {
        var locationStatus;
        
        Platform.OS == 'ios' ?
        locationStatus = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : locationStatus = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        
        request(locationStatus).then(
        (status) => {
            console.log('staus', status);
            status == 'granted' ? getByLocation() : showAlert()
        })
    };

    let getByLocation = () => {
        let a_latitude, a_longitude;
        let myCoordinates = Geolocation.getCurrentPosition(info => {
            console.log('locationinfo',info);
            a_latitude = info.coords.latitude;
            a_longitude = info.coords.longitude;
            props.setMode('byLocation')
            props.setMyCoords({latitude:a_latitude,longitude:a_longitude})
        getNearest(a_latitude, a_longitude)
        })
    }

    const getNearest = async(myLatitude, myLongitude) => {
        var answer = await actions.tournament.getInitial('/custom','lat',myLatitude,'lon', myLongitude)
    }

    return(
        <View style={{flex:1, flexDirection:'row',
        alignItems:'center', justifyContent:'space-between',  marginVertical:0}}>
            <View rounded style={{width:'65%',height:40,flexDirection:'row',marginLeft:10, alignItems:'center', justifyContent:'flex-start'}}>

            {/* SEARCH INPUT */}
            <Item rounded style={{ paddingRight:10, height:50, flexDirection:'row', marginRight:10,
                backgroundColor:currentStyle.searchInput.color}}>
                <Icon name="ios-search" style={{color:currentStyle.text.color}} />
                <TextInput 
                value={value}
                autoCorrect={false}
                style={{width:'75%', color: currentStyle.text.color}}
                onChangeText={valueX=> setValue(valueX)}
                clearButtonMode='always'
                placeholder="Search Events"
                placeholderTextColor={currentStyle.text.color} />
            </Item>

            {/* SEARCH BUTTON */}
            <TouchableOpacity onPress={()=> testValue(value)}>
                <Text style={{color:currentStyle.text.color}}>Search</Text>
            </TouchableOpacity>
            </View>

            {/* SEARCH BY LOCATION BUTTON */}
            {/* <TouchableOpacity style={{marginRight:5}}
                onPress={()=> askPersmission()}>
                <Icon name='location-arrow' type='FontAwesome5'
                style={{color:currentStyle.text.color, fontSize:18}} />
            </TouchableOpacity> */}

            {/* SEARCH BY LOCATION BUTTON */}
            <TouchableOpacity style={{marginRight:15, height:40}}
                onPress={()=> navigation.navigate("Custom Creation")}>
                <Icon name='plus-circle' type='FontAwesome5' 
                style={{color:currentStyle.text.color, fontSize:36}} />
            </TouchableOpacity>
        </View>
    )
}