import React, {Component} from 'react';
import {Container, Content, Text} from 'native-base';

export default class SplashScreen extends Component {
	constructor(){
		super();
		this.state = {}
	}

	componentDidMount () {
		console.log('In 3 seconds, another message will appear'); 
		setTimeout(()=>{
			console.log('3 seconds have passed');
			this.props.navigation.navigate('LogIn')
		}, 3000)
	}

	render(){
		return(
			<Container>
				<Content contentContainerStyle={styles.container}>
					<Text style={styles.text}>Swap Poker</Text> 
				</Content>
			</Container>
		)
	}
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