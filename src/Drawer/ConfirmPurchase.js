import React from 'react';
import { Text, Button } from 'native-base';

const BuyButton = (props) => {
	const showAlert = () =>{
    Alert.alert(
      "Confirmation", 'Are you sure this is you?',
      [
        {text: 'Confrim', onPress: () => props.addOne()},
        {text: 'Cancel', onPress: () => console.log("Cancel Pressed"),}
      ]
    )
  }
  
	return (
		<Button large success onPress = {showAlert}>
		  <Text>BUY</Text>
		</Button>
	)
}

export default BuyButton;