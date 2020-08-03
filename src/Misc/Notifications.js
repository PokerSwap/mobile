import React, {Component} from 'react';
import { Container, Content, Text, List, ListItem, Separator } from 'native-base';
import OtherHeader from '../View-Components/OtherHeader'

export default NotificationsScreen = (props) => {

  return(
    <Container>

      <Content>
        <List>
          
          <Separator>
            <Text style={styles.separator.text}> 
              Recent 
            </Text>
          </Separator>

          <Separator>
            <Text style={styles.separator.text}> 
              A Month Ago
            </Text>
          </Separator>
          
          <Separator>
            <Text style={styles.separator.text}>
              Earlier
            </Text>
          </Separator>


        </List>
      </Content>
    </Container>
  )
}

const styles ={
  separator:{
    text:{textAlign:'center', fontSize:20, fontWeight:'500'}
  }
}