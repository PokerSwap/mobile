import React, {useState} from 'react';
import { Container, Content } from 'native-base';
import _Header from '../View-Components/header'

export default SwapPot = (props) => {

    
  return(
    <Container>
      <_Header 
        title={'Swap Pot'} 
        drawer={() => props.navigation.toggleDrawer()}/>
      <Content>

      </Content>
    </Container>
  )
}
