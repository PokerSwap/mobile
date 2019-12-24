import React, {useContext} from 'react';
import { Container, Content, Text } from 'native-base';
import _Header from '../View-Components/header'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Context } from '../Store/appContext'

export default ChangeEmail = (props) => {

  const { store, actions } = useContext(Context)
  
  return(
    <Container>
      <_Header title={'Email Change'} drawer={() => props.navigation.toggleDrawer()}
      tutorial={() => props.navigation.push('Tutorial')}/>
      <Content>
        <List>
          <TouchableOpacity>
            <ListItem>
              <Text> Change Email </Text>
            </ListItem>
          </TouchableOpacity>
        </List>
       
      </Content>  
    </Container>
  )
}
