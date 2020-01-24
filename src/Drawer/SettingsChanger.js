import React, {useContext} from 'react';
import { Container, Content, Text } from 'native-base';

import {Context } from '../Store/appContext'

export default SettingsChanger = (props) => {

  const { store, actions } = useContext(Context)

  return(
    <Container>
      <Content>
        <Text>Seeee</Text>
      </Content>  
    </Container>
  )
}
