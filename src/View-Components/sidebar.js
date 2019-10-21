import React from 'react'
import { DrawerItems } from 'react-navigation'
import { Container, Content, Text, Header, Button } from 'native-base'
import {Alert} from 'react-native'

// DRAWER PHYSICAL COMPONENT
const SideBar = props => (
  <Container>
    <Header><Text> Swap Profit </Text></Header>
    <Content>
      
      {/* DEFAULT BUTTONS */}
      <DrawerItems {...props} />
      
      {/* LOGOUT OPTION */}
      <Button transparent onPress={()=>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    props.navigation.navigate('LogIn')
                  }},
                ],
                { cancelable: false }
              )  
            }>
              <Text style={{margin: 16,fontWeight: 'bold'}}>Logout</Text>
            </Button>
    
    </Content>
  </Container>
)

export default SideBar;