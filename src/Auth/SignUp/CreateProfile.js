import React, { useState, useEffect, useContext } from 'react';
import { Content, Container, Tab, Tabs,Icon, Button, Text } from 'native-base';
import { View} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

import {Context} from '../../Store/appContext'

import ProfileReview from './ProfileReview'
import NameSetup from './NameSetup';
import PictureSetup from './PictureSetup';
import HendonSetup from './HendonSetup';
import { useNavigation } from '@react-navigation/native'

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
        <Container>
            <Content contentContainerStyle={{flex:1, justifyContent:"center"}}>      
            <Spinner visible={loading} />
   
                <Tabs locked initialPage={0} page={page}>
                    
                    {/* NAME PAGE */}
                    <Tab disabled heading="Name">
                        <NameSetup 
                        e={()=> e()}
                        prev={() => prevPage()} 
                        next={() => nextPage()} 
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
                        prev={() => prevPage()}
                        next={() => nextPage()}
                        picture= {picture}
                        onChangePicture={picture => setPicture( picture )}/>
                    </Tab>
                    {/* REVIEW PAGE */}
                    <Tab disabled heading="Review">
                        <ProfileReview 
                        prev={() => prevPage()}
                        first_name= {first_name} 
                        last_name= {last_name} 
                        nickname= {nickname}
                        picture= {picture}
                        // hendon= {hendon} 
                        />
                    </Tab>
                </Tabs>
                <View style={{flexDirection:'column'}}>
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
                </View>
                
            </Content>   
        </Container>  
    )
}