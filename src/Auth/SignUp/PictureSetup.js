import React, {useState} from 'react';
import { openSettings, requestMultiple, PERMISSIONS } from 'react-native-permissions';

import { Image, Platform, View } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import ImagePicker from 'react-native-image-picker';

import '../../Images/placeholder.jpg';

export default  PictureSetup = (props) => {

    const [ image, setImage ] = useState(props.picture)
    
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

        if(Platform.OS == 'ios'){
        var cameraStatus = PERMISSIONS.IOS.CAMERA;
        var libraryStatus = PERMISSIONS.IOS.PHOTO_LIBRARY;
        
        requestMultiple([cameraStatus, libraryStatus]).then(
            (statuses) => {
                console.log('Camera', statuses[cameraStatus]);
                console.log('Library', statuses[libraryStatus]);
                statuses[cameraStatus] == 'granted' && 
                    statuses[libraryStatus] == 'granted' ? 
                    choosePhoto() : showAlert()
        })
        }
        
        else if (Platform.OS == 'android') {
        var cameraStatus = PERMISSIONS.ANDROID.CAMERA
        var libraryStatus = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        requestMultiple([cameraStatus, libraryStatus]).then(
            (statuses) => {
                console.log('Camera', statuses[cameraStatus]);
                console.log('Library', statuses[libraryStatus]);
                statuses[cameraStatus] == 'granted' && 
                    statuses[libraryStatus] == 'granted' ? 
                    choosePhoto() : showAlert()
        })
        }
    };

    const choosePhoto = async() => {

        const options = {
            title: 'Submit Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        
        ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', Object.keys(response));
        
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
        props.onChangePicture(selectedImage)
        setImage(selectedImage.uri );
        }
        });
    };

    props.f()

    return(
        <View style={{justifyContent:'center', alignSelf:'center', flex:1, flexDirection:'column',
            backgroundColor:'white',  textAlign:'center'}}>

<View style={{width:'80%', flex:1, alignSelf:'center', justifyContent:'center'}}>

            {/* IMAGE PREVIEW */}
            <Image source={{uri:image}}
                style={{height:200, alignSelf:'center', width:200, marginTop:20, borderRadius:500}}>
            </Image>
                {/* PICTURE INSTRUCTIONS */}
                <Text style={{fontSize:24, marginTop:20, marginBottom:20,  textAlign:'center'}}>
                    Choose a profile picture of yourself to upload.
                </Text>
                {/* UPLOAD BUTTON */}
                <Button large style={{alignSelf:'center'}} large onPress={() => choosePhoto()}>
                    <Text> UPLOAD </Text>
                </Button>
            </View>
                
            
            

            <View style={{flexDirection:'row', marginTop:20}}>
                <View style={{width:'50%'}}>
                    {props.page !== 0 ?
                        <Button  large iconLeft transparent 
                            style={{alignSelf:'center'}} onPress={()=> props.prev()}>
                            <Icon name='arrow-back'/>
                            <Text>Prev.</Text>
                        </Button>
                        :
                        null}
                </View>
                
                <View style={{width:'50%'}}>
                    {props.page !== 2 ?
                        <Button disabled={x} large iconRight transparent 
                            style={{alignSelf:'center'}} onPress={() => props.next()}>
                            <Text>Next</Text>
                            <Icon name='arrow-forward'/>
                        </Button>
                        :
                        <Button style={{alignSelf:'center'}} large  transparent 
                            onPress={() => createProfile()}>
                            <Text>Finalize</Text>
                        </Button>}
                    </View>
                </View>
                
            <Button large style={{marginBottom:30, marginTop:30, alignSelf:'center'}} 
                onPress={() => navigation.goBack()}>
                <Text>Exit To Login</Text>
            </Button>
        </View>
    )
}