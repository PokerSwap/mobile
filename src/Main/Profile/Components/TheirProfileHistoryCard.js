import React, {useContext} from 'react';
import {Context} from '../../../Store/appContext';
import { useNavigation } from '@react-navigation/native'

import { View, TouchableOpacity } from 'react-native'
import { ListItem, Text } from 'native-base';
import { Row, Col} from 'react-native-easy-grid'

import darkStyle from '../../../Themes/dark.js'
import lightStyle from '../../../Themes/light.js'
 
export default TheirProfileHistoryCard = (props) => {

	const { store, actions } = useContext(Context)
	const navigation = useNavigation()

	var currentStyle
	store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
	console.log('check here',Object.keys(props.buyin.recipient_buyin))

	const goToSwapResults = async() => {

		var x = await actions.tracker.getPastSpecific(props.buyin.recipient_buyin.tournament_id)


		navigation.push('Swap Results', { 
			tournament: x.tournament,
            results_link: x.results_link,
            my_buyin: x.my_buyin,
            agreed_buyins: x.agreed_buyins,
            final_profit: x.final_profit,
            allPaid: x.allPaid,
            tournament_end: x.tournament_end})
	}

	return(
		<View>
			
				<ListItem noIndent style={{ flexDirection:'column',  backgroundColor:'black', 
					justifyContent:'center'}}>
						<TouchableOpacity onPress={()=> goToSwapResults()}>
						<Text style={{fontSize:20, width:'90%',
						color:'white', fontWeight:'600', textAlign:'center'}}>
						{props.buyin.tournament_name}
					</Text>
						</TouchableOpacity>
					
				</ListItem>
		
			
			<ListItem noIndent style={{flexDirection:'row', backgroundColor:'#a3a3a3'}}>
				<Col style={{width:'25%'}}>
					<Text style={{color:'white'}}>Status</Text>
				</Col>
				<Col style={{width:'35%'}}>
					<Text style={{color:'white'}}>Date {'&'} Time</Text>
				</Col>
				<Col style={{width:'40%'}}>
					<Text style={{color:'white'}}>
						You / Them
					</Text>
				</Col>
			</ListItem>

			{props.allSwaps !== null ?
				props.allSwaps.map((swap,index) => {
				var swapTime = swap.updated_at
				var day_name = swapTime.substring(0,3)
				var startMonth = swapTime.substring(8,11)
				var startDay = swapTime.substring(5,7)
				var startYear = swapTime.substring(12,16)

				var startTime = swapTime.substring(16,22)
		
				var startHour = parseInt(swapTime.substring(16,19))
				var startM 
				if (startHour/12 >= 1){
					startM = ' P.M.', startHour%=12
				}  else {
					startM = ' A.M.'
				}
				
				var startDate = startMonth + '. ' + startDay + ', ' + startYear
				var startTime = day_name + ' ' + startHour + ':' 
					+ swapTime.substring(20,22) + startM

				var bgColor, path;
				if (swap.status == 'agreed'){bgColor = 'green'}
				else if (swap.status == 'incoming'){bgColor = 'orange'}
				else if (swap.status == 'pending'){bgColor = 'orange'}
				else if (swap.status == 'counter_incoming'){bgColor = 'orange'}
				else if (swap.status == 'canceled'){bgColor = 'grey'}
				else if (swap.status == 'rejected'){bgColor = 'red'}

				return(
					<ListItem noIndent key={index} 
						style={{backgroundColor:bgColor, paddingVertical:5}}>
						<Row style={{ 
							alignItems:'center', backgroundColor:bgColor}}>
							
							<Col style={styles.status.container}>
							{swap.status !== 'counter_incoming' ?
								<Text style={{textTransform:'capitalize', 
									textAlign:'left', color:'white'}}>
									{swap.status}
								</Text>
								: 
								<Text style={{ color:'white', textAlign:'center'}}>
									Counter{'\n'}Incoming
								</Text>}
							</Col>
							
							<Col style={styles.time.container}>
								<Text style={styles.time.text}>
									{startDate}{'\n'}{startTime}
								</Text>
							</Col>

							<Col style={styles.percentage.container}>
								<Text style={styles.percentage.text}>
									{swap.percentage}% / {swap.counter_percentage}%
								</Text>
							</Col>

						</Row>
					</ListItem>
				)})
				:
				<Text>You have not swapped with this person</Text>
			}
		</View>		
	)
}

const styles = {
	mainContainer:{
		marginBottom:10, alignItems:'center'},
	percentage:{
		container:{
			width:'40%' },
		text:{
			textAlign:'center', color:'white', 
			fontSize:18, fontWeight:'600' },
		button:{
			paddingVertical:10, justifyContent:'center' }
	},
	status:{
		container:{
			width:'25%', color:'white', justifyContent:'flex-start'},
		text:{
			color:'white', textTransform:'capitalize', fontSize:18}
	},
	time:{
		container:{
			width:'35%'},
		text:{
			color:'white',fontSize:16, textAlign:'center'}
	},
}