import React, {Component} from 'react';
import { Container, Content } from 'native-base';
import _Header from '../View-Components/header'

export default class SwapPot extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
    
  render(){

    return(
      <Container>
        <_Header 
          title={'Swap Pot'} 
          drawer={() => this.props.navigation.toggleDrawer()}/>
        <Content>

        </Content>
      </Container>
    )
  }
}