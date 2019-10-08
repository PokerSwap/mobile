import React, {Component} from 'react';
import { Content, Container, Header, Tab, Tabs } from 'native-base';

import { Context } from '../Store/appContext'
import Spinner from 'react-native-loading-spinner-overlay';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import ProfileReview from './ProfileReview'

export default class SignUpScreen extends Component {
  constructor(){
    super();
    this.state={
      page:0,
      loading:false,
      email:'',
      password:'',
      first_name:'',
      last_name:'',
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

  createUser = async(x) => {
    this.loading();
    var answer = await x.user.signup(
      this.state.email, 
      this.state.password, 
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

            <Tab disabled heading="Email">
              <StepOne 
                next={() => this.nextPage()}
                email={this.state.email}
                password={this.state.password}
                />
            </Tab>

            <Tab disabled heading="Name">
              <StepTwo 
                prev={() => this.prevPage()}
                next={() => this.nextPage()} 
                first_name={this.state.first_name} 
                last_name={this.state.last_name} 
              />
            </Tab>

            <Tab disabled heading="Picture">
              <StepThree 
                prev={() => this.prevPage()}
                next={() => this.nextPage()}
                picture={this.state.picture}
              />
            </Tab>

            <Tab disabled heading="Hendon">
              <StepFour 
                prev={() => this.prevPage()}
                next={() => this.nextPage()}
                hendon={this.state.hendon}
              />
            </Tab>

            <Tab disabled heading="Review">
              <ProfileReview 
                prev={() => this.prevPage()}
                navigation={this.props.navigation}
              />
            </Tab>

          </Tabs>
        </Content>
      </Container>  
    )
  }
}
