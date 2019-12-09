import React, {Component, useEffect, useState} from 'react';
import {Container, Content, Text} from 'native-base';

export default ForgotPassword = (props) => {

	// STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	wrong = () => {
		if(store.userToken==null){
			Toast.show({
				text:'wrongPassword',
			duration:3000})
		}
	}
	// useEffect(() => {
  //   console.log('In 3 seconds, another message will appear'); 
  //   console.log('hasSomething', hasSomething)
  //   setTimeout(()=>{
  //     console.log('3 seconds have passed');
  //     props.navigation.navigate('Login')
  //   }, 3000)
  //   return () => {
  //     //cleanup
  //   };
  // }, []);

	passwordStart = () => {

	}

	return(
		<View style={loginStyle.container}>
			<StatusBar barStyle="light-content" />
				<KeyboardAvoidingView behavior='padding' style={loginStyle.container}>
				<TouchableWithoutFeedback style={loginStyle.container} onPress={Keyboard.dismiss}>						
					<View style={loginStyle.logoContainer}>
						{/* LOGO IMAGE */}
						<Text style={{fontSize:24, width:'90%', color:'white', fontWeight:'600', textAlign:'center'}}> Enter the email associated with your BreatheCode account </Text>

						{/* EMAIL INPUT */}
						<TextInput 
							style={{
								height:40,
								width:'70%',
								marginTop: '5%',
								backgroundColor: 'rgba(255,255,255,0.2)',
								color: "#FFF",
								paddingHorizontal: 10}}
							placeholder={i18n.t("enterEmail")}
							placeholderTextColor='rgba(255,255,255,0.8)'
							keyboardType="email-address"
							blurOnSubmit={true}
							returnKeyType="next"
							autoCapitalize='none'
							autoCorrect={false} 
							// onSubmitEditing={() => { this.txtPassword.focus(); }}
							value={email}    
							onChangeText={email => setEmail(email)}
						/>
									
						{/* LOGIN BUTTON */}
				
										<View style={{marginTop:'5%'}}>
											<Button block
												style={loginStyle.buttonContainer} 
												onPress={
													async() => {
														Keyboard.dismiss();
														var x = await passwordStart()
														wrong()}
													}
											>
												<Text style={loginStyle.buttonText} > Submit </Text>
											</Button>
										</View>

						<Button transparent light style={{justifyContent:'center'}}
							onPress={()=> props.navigation.goBack()}>
							<Text> Go Back </Text>
						</Button>
					</View>

				</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
		</View>
	)
}
				
			
		
	


const styles = {
    container:{
        flex:1, 
        justifyContent: "center",
        alignItems:'center',
        backgroundColor: 'rgb(12,85,32)'
    },
    text:{
        fontSize:48,
        fontWeight:"bold",
        color: 'white'
    }
}