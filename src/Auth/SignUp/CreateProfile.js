import React, {Component, useState} from 'react';
import { Content, Container, Header, Tab, Tabs } from 'native-base';

import { Context } from '../../Store/appContext'
import Spinner from 'react-native-loading-spinner-overlay';

import ProfileReview from './ProfileReview'
import NameSetup from './NameSetup';
import PictureSetup from './PictureSetup';
import HendonSetup from './HendonSetup';

export default CreateProfile = (props) => {

    const [ page, setPage ] = useState(0)
    const [ loading, setLoading ] = useState(false)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ first_name, setFirstName ] = useState('')
    const [ last_name, setLastName ] = useState('')
    const [ username, setUserName ] = useState('')
    const [ picture, setPicture]  = useState('https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png')
    const [ hendon, setHendon] = useState('')

  // NEXT SIGNUP STEP
  nextPage = () => {
    if (page >= 0){
      setPage(page + 1)
    } 
};
  // NEXT SIGNUP STEP
  prevPage = () => {
    if (page <= 5){
      setPage(page- 1)
    } 
  }

  // LOADING SPINNER ACTIVATION
  loading = () => {
    setLoading(!loading)
  }

  // CREATE PROFILE FUNCTION
  createProfile = async(x) => {
    this.loading();
    var answer = await x.user.signup(
      email, 
      password, 
      username,
      first_name,
      last_name,
      picture,
      hendon,
      props.navigation
      );
    console.log('response', answer)
    loading();	
  }


    return(
      <Container>

        <Content 
          contentContainerStyle={{
            flex:1, 
            justifyContent:"center"}}>
         
         <Spinner visible={loading} style={{color: '#FFF'}}/>
         
          <Tabs initialPage={0} page={page}>

            <Tab disabled heading="Name">
              <NameSetup 
                prev={() => prevPage()}
                next={() => nextPage()} 
                first_name= {first_name} 
                onChangeFirstName={first_name => setFirstName( first_name )}
                last_name= {last_name} 
                onChangeLastName={last_name => setLastName( last_name )}
                username= {username}
                onChangeUserName={username => setUserName( username )}
              />
            </Tab>

            <Tab disabled heading="Picture">
              <PictureSetup 
                prev={() => prevPage()}
                next={() => nextPage()}
                picture= {picture}
                onChangePicture={picture => setPicture( picture )}
              />
            </Tab>

            <Tab disabled heading="Hendon">
              <HendonSetup 
                prev={() => this.prevPage()}
                next={() => this.nextPage()}
                hendon= {hendon}
                onChangeHendon={hendon => hendonSet(hendon )}
              />
            </Tab>

            <Tab disabled heading="Review">
              <ProfileReview 
                prev={() => prevPage()}
                createUser= {createUser}
                navigation= {props.navigation}
                first_name= {first_name} 
                last_name= {last_name} 
                username= {username}
                picture= {picture}
                hendon= {hendon}

              />
            </Tab>

          </Tabs>

        </Content>
      
      </Container>  
    )
  }

