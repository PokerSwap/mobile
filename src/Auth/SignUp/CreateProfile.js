import React, {Component} from 'react';
import { Content, Container, Header, Tab, Tabs } from 'native-base';

import { Context } from '../../Store/appContext'
import Spinner from 'react-native-loading-spinner-overlay';

import ProfileReview from './ProfileReview'
import NameSetup from './NameSetup';
import PictureSetup from './PictureSetup';
import HendonSetup from './HendonSetup';

export default class CreateProfile extends Component {
  constructor(){
    super();
    this.state={
      page:0,
      loading:false,
      email:'',
      password:'',
      first_name:'',
      last_name:'',
      username:'',
      picture:'',
      hendon:''
    }
  }
  // NEXT SIGNUP STEP
  nextPage = () => {
    if (this.state.page >= 0){
      this.setState({ page: this.state.page + 1})
    } 
};
  // NEXT SIGNUP STEP
  prevPage = () => {
    if (this.state.page <= 5){
      this.setState({ page: this.state.page - 1})
    } 
  }

  // LOADING SPINNER ACTIVATION
  loading = () => {
    this.setState({loading: !this.state.loading})
  }

  // CREATE PROFILE FUNCTION
  createProfile = async(x) => {
    this.loading();
    var answer = await x.user.signup(
      this.state.email, 
      this.state.password, 
      this.state.username,
      this.state.first_name,
      this.state.last_name,
      this.state.picture,
      this.state.hendon,
      this.props.navigation
      );
    console.log('response', answer)
    this.loading();	
  }

  render(){
    return(
      <Container>

        <Content 
          contentContainerStyle={{
            flex:1, 
            justifyContent:"center"}}>
         
         <Spinner visible={this.state.loading} style={{color: '#FFF'}}/>
         
          <Tabs initialPage={0} page={this.state.page}>

            <Tab disabled heading="Name">
              <NameSetup 
                prev={() => this.prevPage()}
                next={() => this.nextPage()} 
                first_name= {this.state.first_name} 
                onChangeFirstName={first_name => this.setState({ first_name })}
                last_name= {this.state.last_name} 
                onChangeLastName={last_name => this.setState({ last_name })}
                username= {this.state.username}
                onChangeUserName={username => this.setState({ username })}
              />
            </Tab>

            <Tab disabled heading="Picture">
              <PictureSetup 
                prev={() => this.prevPage()}
                next={() => this.nextPage()}
                picture= {this.state.picture}
                onChangePicture={picture => this.setState({ picture })}
              />
            </Tab>

            <Tab disabled heading="Hendon">
              <HendonSetup 
                prev={() => this.prevPage()}
                next={() => this.nextPage()}
                hendon= {this.state.hendon}
                onChangeHendon={hendon => this.setState({ hendon })}
              />
            </Tab>

            <Tab disabled heading="Review">
              <ProfileReview 
                prev={() => this.prevPage()}
                createUser= {this.createUser}
                navigation= {this.props.navigation}
                first_name= {this.state.first_name} 
                last_name= {this.state.last_name} 
                username= {this.state.username}
                picture= {this.state.picture}
                hendon= {this.state.hendon}
              />
            </Tab>

          </Tabs>

        </Content>
      
      </Container>  
    )
  }
}
