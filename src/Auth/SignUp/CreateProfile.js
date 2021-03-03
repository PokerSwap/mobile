import React, { useState, useEffect, useContext } from 'react';
import { Content, Container, Tab, Tabs,Icon, Button, Text } from 'native-base';
import { View, Platform, KeyboardAvoidingView, SafeAreaView, Keyboard} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

import {Context} from '../../Store/appContext'

import ProfileReview from './ProfileReview'
import NameSetup from './NameSetup';
import PictureSetup from './PictureSetup';
import HendonSetup from './HendonSetup';
import { useNavigation } from '@react-navigation/native'


var a_behavior, offBy, marginee
if (Platform.OS == 'ios'){
  a_behavior='position', offBy= -100, marginee=20
} else {
  a_behavior='padding', offBy = -600, marginee = 30}

export default CreateProfile = (props) => {

    const { store, actions } = useContext(Context)

    const [ page, setPage ] = useState(0)
    const [ first_name, setFirstName ] = useState('')
    const [ last_name, setLastName ] = useState('')
    const [ nickname, setNickName ] = useState('')
    const [ picture, setPicture]  = useState('https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png')

    const [ disabled1, setDisabled1 ] = useState(true)
    const [ disabled2, setDisabled2 ] = useState(true)
    const [ loading, setLoading ] = useState(false) 

    const navigation = useNavigation()


    page == 0 ? x = disabled1 : x = disabled2

    var e = () => {
        var rrr = /^[A-Za-z]+$/
        if (first_name == '' || last_name == ''){
            setDisabled1(true)
        } else {
            if (rrr.test(first_name) && rrr.test(last_name)){
                setDisabled1(false)
            } else {
                setDisabled1(true)
            }
        }
    }

    var f = () => {
        picture == 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' ?  
            setDisabled2(true) : setDisabled2(false)
    }


    // NEXT SIGNUP STEP
    const nextPage = () => {
        if (page >= 0){
            setPage(page + 1)
        } 
    };
    // PREVIOUS SIGNUP STEP
    const prevPage = () => {
        if (page <= 5){
            setPage(page- 1)
        } 
    }

    const createProfile = async() => {
        setLoading(true)
        var creatingProfile = await actions.profile.add(
            nickname, first_name, last_name, null, picture, navigation) 
        setLoading(false)
    }

    return(
        <SafeAreaView style={{flex:1, flexGrow:1}}>
            <Spinner visible={loading} />


            {/* CREATE PROFILE TABS */}
            <Tabs  locked initialPage={0} page={page}>
            

                {/* NAME PAGE */}
                <Tab style={{flex:1}} disabled heading="Name">
                    <NameSetup 
                        e={()=> e()}
                        prev={() => prevPage()} 
                        next={() => {nextPage(); Keyboard.dismiss()}} 
                        page={page}
                        first_name= {first_name} 
                        onChangeFirstName={first_name => setFirstName( first_name )}
                        last_name= {last_name} 
                        onChangeLastName={last_name => setLastName( last_name )}
                        nickname= {nickname}
                        onChangeNickName={nickname => setNickName( nickname )}/>
                </Tab>


                {/* PICTURE PAGE */}
                <Tab disabled heading="Picture">
                    <PictureSetup 
                        f={() => f()}
                        page={page}
                        prev={() => prevPage()}
                        next={() => nextPage()}
                        picture= {picture}
                        onChangePicture={picture => setPicture( picture )}/>
                </Tab>
                {/* REVIEW PAGE */}
                <Tab disabled heading="Review">
                    <ProfileReview 
                        page={page}
                        prev={() => prevPage()}
                        createProfile={createProfile}
                        first_name= {first_name} 
                        last_name= {last_name} 
                        nickname= {nickname}
                        picture= {picture}  />
                </Tab>
            </Tabs>
            
            {/* CREATE PROFILE NAVIGATION
            <View style={{flexDirection:'column', backgroundColor:'white',}}>
                <View style={{flexDirection:'row', marginTop:20}}>
                    <View style={{width:'50%'}}>
                        {page !== 0 ?
                            <Button  large iconLeft transparent 
                                style={{alignSelf:'center'}} onPress={()=> prevPage()}>
                                <Icon name='arrow-back'/>
                                <Text>Prev.</Text>
                            </Button>
                            :
                            null}
                    </View>
                    
                    <View style={{width:'50%'}}>
                        {page !== 2 ?
                            <Button disabled={x} large iconRight transparent 
                                style={{alignSelf:'center'}} onPress={() => nextPage()}>
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
            </View> */}

        </SafeAreaView>  
    )
}