import React, { useState } from 'react';
import { Content, Container, Tab, Tabs } from 'native-base';

import ProfileReview from './ProfileReview'
import NameSetup from './NameSetup';
import PictureSetup from './PictureSetup';
import HendonSetup from './HendonSetup';

export default CreateProfile = (props) => {
  const [ page, setPage ] = useState(0)
  const [ first_name, setFirstName ] = useState('')
  const [ last_name, setLastName ] = useState('')
  const [ username, setUserName ] = useState('')
  const [ picture, setPicture]  = useState('https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png')
  const [ hendon, setHendon] = useState('')

  // NEXT SIGNUP STEP
  const nextPage = () => {
    if (page >= 0){
      setPage(page + 1)
    } 
  };
  // NEXT SIGNUP STEP
  const prevPage = () => {
    if (page <= 5){
      setPage(page- 1)
    } 
  }

  return(
    <Container>
      <Content contentContainerStyle={{flex:1, justifyContent:"center"}}>         
        <Tabs locked initialPage={0} page={page}>
          {/* NAME PAGE */}
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
          {/* PICTURE PAGE */}
          <Tab disabled heading="Picture">
            <PictureSetup 
              prev={() => prevPage()}
              next={() => nextPage()}
              picture= {picture}
              onChangePicture={picture => setPicture( picture )}/>
          </Tab>
          {/* HENDON PAGE */}
          <Tab disabled heading="Hendon">
            <HendonSetup 
              prev={() => prevPage()}
              next={() => nextPage()}
              hendon= {hendon}
              onChangeHendon={hendon => setHendon(hendon)}/>
          </Tab>
          {/* REVIEW PAGE */}
          <Tab disabled heading="Review">
            <ProfileReview 
              prev={() => prevPage()}
              navigation= {props.navigation}
              first_name= {first_name} 
              last_name= {last_name} 
              username= {username}
              picture= {picture}
              hendon= {hendon} />
          </Tab>
        </Tabs>
      </Content>     
    </Container>  
  )
}