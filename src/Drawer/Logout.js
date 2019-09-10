import React, {Component} from 'react';

const LogOutScreen  = (props) => {
  const showAlert = () =>{
    Alert.alert(
      "Confirmation",
      'Are you sure this is you?',
      [
        { text: 'Yes', onPress: () => this.props.navigation.navigate('LogIn')},
        { text: 'No', onPress: () => console.log("No Pressed")}
      ]
    )

    return (
      <Modal large success onPress = {showAlert}>
        
      </Modal>
    )
  }
}

export default LogOutScreen