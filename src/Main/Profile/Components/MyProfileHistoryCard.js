import React, { useContext } from 'react';
import { View } from 'react-native'
import { ListItem, Text } from 'native-base';
import { Row, Col} from 'react-native-easy-grid'

import { Context } from '../../../Store/appContext';
 
export default MyProfileHistoryCard = (props) => {
	const { store, actions } = useContext(Context)

	return(
		<View style={{marginVertical:10}}>
			{/* TOURNAMENT NAME */}
			<ListItem noIndent style={{ flexDirection:'column',
				paddingVertical:5, backgroundColor:'black', 
				justifyContent:'center'}}>
				<Text style={{fontSize:20, width:'90%',
					color:'white', fontWeight:'600', textAlign:'center'}}>
					{props.tournament.name}
				</Text>
			</ListItem>
			{/* ALL RELATED SWAPS */}
			{props.buyins.map((buyin, index) => {
				var fullName = buyin.recipient_buyin.user_name
				var allSwaps 
				if (buyin.agreed_swaps.length !== 0){
					if (buyin.other_swaps.length !== 0){
						allSwaps = [ ...buyin.agreed_swaps, ...buyin.other_swaps ]
					}else{
						allSwaps = [ ...buyin.agreed_swaps ]
					}
				}else{
					if (buyin.other_swaps.length !== 0){
						allSwaps = [ ...buyin.other_swaps ]
					}else{
						allSwaps = null
					}
				}

				return(
					<View>
						{/* USERS NAME */}
						<ListItem noIndent key={index} style={{flexDirection:'column', backgroundColor:'#fffafa'}}>
							<Text style={{textAlign:'center', fontSize:24, 
							fontWeight:'500', marginVertical:7, color:'black' }}>
								{fullName}
							</Text>
						</ListItem>
						{/* ROW OF SWAP ATTRIBUTE HEADERS */}
						<ListItem noIndent style={{backgroundColor:'#a3a3a3'}}>
							<Col style={{width:'25%', justifyContent:'center'}}>
								<Text style={{textAlign:'center', color:'white'}}>
									Status
								</Text>
							</Col>
							<Col style={{width:'35%'}}>
								<Text style={{color:'white'}}>Date {'&'} Time</Text>
							</Col>
							<Col style={{width:'40%'}}>
								<Text style={{color:'white'}}>Yours / Theirs %</Text>
							</Col>
						</ListItem>
						{/* ROW OF SWAP DETAILS */}
						{allSwaps ?
							allSwaps.map((swap, sIndex)=>{
								// console.log('alls',allSwaps)
								return(
									<MyHistoryAccordion 
										swap={swap} key={sIndex} />
								)
							})
							: <Row><Text>You did not make any swaps in this tournament</Text></Row>
						}
					</View>
				)
			})}
		</View>
	)
}

MyHistoryAccordion = (props) => {
	
	var swapTime = props.swap.updated_at

	var day_name = swapTime.substring(0,3)
	var startMonth = swapTime.substring(8,11)
	var startDay = swapTime.substring(5,7)
	var startTime = swapTime.substring(16,22)
	var startYear = swapTime.substring(12,16)

	var startHour = parseInt(swapTime.substring(16,19))
	var startM 
	if (startHour % 12!==0){
		if(startHour/12 >= 1){
			startM = ' P.M.', startHour%=12
		}else{
			startM = ' A.M.'
		}
	} else{
		if(startHour == 0){
			startM = ' A.M.', startHour=12
		}else{
			startM = ' P.M.'
		}
	}

	var startDate = startMonth + '. ' + startDay + ', ' + startYear
	var startTime = day_name + ' ' + startHour + ':' + swapTime.substring(20,22) + startM
	let d
	var swap = props.swap
	var bgColor, path;
	if (swap.status == 'agreed'){bgColor = 'green'}
	else if (swap.status == 'incoming'){bgColor = 'green'}
	else if (swap.status == 'pending'){bgColor = 'orange'}
	else if (swap.status == 'counter_incoming'){bgColor = 'orange', d="Counter\nIncoming"}
	else if (swap.status == 'canceled'){bgColor = 'grey'}
	else if (swap.status == 'rejected'){bgColor = 'red'}

	return(
		<ListItem noIndent style={{backgroundColor:bgColor, paddingVertical:5}}>
			{/* SWAP STATUS */}
			<Col style={{width:'25%'}}>
				{props.swap.status !== 'counter_incoming' ?
					<Text style={{textTransform:'capitalize', color:'white'}}>
						{props.swap.status}
					</Text>
					: 
					<Text style={{ color:'white', textAlign:'center'}}>
						Counter{'\n'}Incoming
					</Text>}
			</Col>
			{/* DATE & TIME */}
			<Col style={{width:'35%'}}>
				<Text style={{textAlign:'center', color:'white'}}>
					{startDate}{'\n'}{startTime}</Text>
			</Col>
			{/* PERCENTAGE & COUNTER PERCENTAGE */}
			<Col style={{width:'40%'}}>
				<Text style={{color:'white'}}>
					{props.swap.percentage}%{' / '}
					{props.swap.counter_percentage}%
				</Text>
			</Col>
		</ListItem>
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
			width:'20%', color:'white'},
		text:{
			color:'white', textTransform:'capitalize', fontSize:18}
	},
	time:{
		container:{
			width:'55%'},
		text:{
			color:'white',fontSize:18, textAlign:'center'}
	},
}