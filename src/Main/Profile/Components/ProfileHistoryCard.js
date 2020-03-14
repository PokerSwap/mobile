import React, {useContext} from 'react';
import { View } from 'react-native'
import { ListItem, Text, Button } from 'native-base';
import { Row, Col} from 'react-native-easy-grid'

import {Context} from '../../../Store/appContext';
 
export default ProfileHistoryCard = (props) => {

	const { store, actions } = useContext(Context)

	return(
		<View>
			<ListItem noIndent style={{ flexDirection:'column',
				paddingVertical:5, backgroundColor:'black', 
				justifyContent:'center'}}>
				<Text style={{fontSize:20, width:'90%',
					color:'white', fontWeight:'600', textAlign:'center'}}>
					{props.buyin.tournament_name}
				</Text>
			</ListItem>
			<ListItem noIndent style={{flexDirection:'row', backgroundColor:'black'}}>
				<Col style={{width:'30%'}}>
					<Text style={{color:'white'}}>Status</Text>
				</Col>
				<Col style={{width:'30%'}}>
					<Text style={{color:'white'}}>Date {'&'} Time</Text>
				</Col>
				<Col style={{width:'20%'}}>
					<Text style={{color:'white'}}>Your %</Text>
				</Col>
				<Col style={{width:'20%'}}>
					<Text style={{color:'white'}}>Their %</Text>
				</Col>
			</ListItem>

			{props.allSwaps != null ?
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
				}  else{
					startM = ' A.M.'
				}
				
				var startDate = startMonth + '. ' + startDay + ', ' + startYear
				var startTime = day_name + ' ' + startHour + ':' + swapTime.substring(20,22) + startM

				var bgColor, path;
				if (swap.status == 'agreed'){bgColor = 'green'}
				else if (swap.status == 'incoming'){bgColor = 'green'}
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
								<Text style={{textTransform:'capitalize', color:'white'}}>
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
									{swap.percentage}%
								</Text>
							</Col>
							<Col style={styles.percentage.container}>
								<Text style={styles.percentage.text}>
									{swap.counter_percentage}%
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
			width:'20%' },
		text:{
			textAlign:'center', color:'white', 
			fontSize:18, fontWeight:'600' },
		button:{
			paddingVertical:10, justifyContent:'center' }
	},
	status:{
		container:{
			width:'30%', color:'white'},
		text:{
			color:'white', textTransform:'capitalize', fontSize:18}
	},
	time:{
		container:{
			width:'30%'},
		text:{
			color:'white',fontSize:18, textAlign:'center'}
	},
}