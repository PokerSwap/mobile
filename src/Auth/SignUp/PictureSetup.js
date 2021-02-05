import React, {useState} from 'react';
import { openSettings, requestMultiple, PERMISSIONS } from 'react-native-permissions';

import { Image, Platform } from 'react-native';
import { Button, Card, CardItem, Text } from 'native-base';
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
        <Card transparent>

            {/* IMAGE PREVIEW */}
            <CardItem header style={{justifyContent:'center'}}>
                <Image source={{uri:image}}
                    style={{height:150, width:150, marginTop:25, borderRadius:500}}>
                </Image>
            </CardItem>

            {/* PICTURE INSTRUCTIONS */}
            <CardItem body style={{justifyContent:'center'}}>
                <Text style={{fontSize:24}}>
                    Choose a profile picture of yourself to upload.
                </Text>
            </CardItem>
            
            {/* UPLOAD BUTTON */}
            <CardItem footer style={{justifyContent:"center"}}>
                <Button large onPress={() => choosePhoto()}>
                    <Text> UPLOAD </Text>
                </Button>
            </CardItem>
        </Card>
    )
}