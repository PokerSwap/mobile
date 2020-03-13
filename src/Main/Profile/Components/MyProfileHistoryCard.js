import React, {useContext} from 'react';
import { View } from 'react-native'
import { ListItem, Text, Button } from 'native-base';
import { Row, Col} from 'react-native-easy-grid'

import {Context} from '../../../Store/appContext';
 
export default MyProfileHistoryCard = (props) => {

	const { store, actions } = useContext(Context)

	return(
		<View>
			<ListItem noIndent style={{ flexDirection:'column',
				paddingVertical:5, backgroundColor:'black', 
				justifyContent:'center'}}>
				<Text style={{fontSize:20, width:'90%',
					color:'white', fontWeight:'600', textAlign:'center'}}>
					{props.tournament.name}
				</Text>
			</ListItem>

			{props.buyins.map((buyin, index) => {
				console.log('buyin', buyin)
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
					<ListItem key={index}>
						<Col>
						<Row style={{justifyContent:'center'}}>
							<Text style={{textAlign:'center', fontSize:20, fontWeight:'500', marginVertical:7 }}>{fullName}</Text>
						</Row>

						{allSwaps != null ?
							allSwaps.map((swap, sIndex)=>{
								console.log('swap',swap)
								return(
									<MyHistoryAccordion 
										swap={swap} key={sIndex} />
								)
							})
							:
							<Row>
								<Text>
									You did not make any swaps in this tournament
								</Text>
							</Row>}
							</Col>
					</ListItem>
				)
			})}

			</View>)}

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


	return(
		<Row>
			<Col>
				<Text style={{textTransform:'capitalize'}}>{props.swap.status}</Text>
			</Col>
			<Col>
				<Text style={{textAlign:'center'}}>{startDate}{'\n'}{startTime}</Text>
			</Col>
			<Col>
				<Text>{props.swap.percentage}</Text>
			</Col>
		</Row>
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