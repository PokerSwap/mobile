import React, {Component} from 'react';
import { Content, Container, Header, Tab, Tabs } from 'native-base';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

import ProfileReview from './ProfileReview'

export default class SignUpScreen extends Component {
  constructor(){
    super();
    this.state={
      page:0
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

  render(){
    return(
      <Container>

        <Content 
          contentContainerStyle={{
            flex:1, 
            justifyContent:"center"}}>
          <Tabs initialPage={0} page={this.state.page}>
            <Tab disabled heading="Email">
              <StepOne 
                next={() => this.nextPage()}
                />
            </Tab>
            <Tab disabled heading="Name">
              <StepTwo 
                prev={() => this.prevPage()}
                next={() => this.nextPage()} />
            </Tab>
            <Tab disabled heading="Picture">
              <StepThree 
                prev={() => this.prevPage()}
                next={() => this.nextPage()}
              />
            </Tab>
            <Tab disabled heading="Hendon">
              <StepFour 
                prev={() => this.prevPage()}
                next={() => this.nextPage()}
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
