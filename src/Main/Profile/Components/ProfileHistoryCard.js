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

			{props.allSwaps != null ?
				props.allSwaps.map((swap,index) => {

				var swapTime = swap.updated_at
				var day_name = swapTime.substring(0,3)
				var startMonth = swapTime.substring(8,11)
				var startDay = swapTime.substring(5,7)
				var startTime = swapTime.substring(16,22)
		
				var startHour = parseInt(swapTime.substring(16,19))
				var startM 
				if (startHour/12 >= 1){
					startM = ' P.M.', startHour%=12
				}  else{
					startM = ' A.M.'
				}
				
				var startDate =  day_name + '. ' + startMonth + '. ' + startDay
				var startTime = startHour + ':' + swapTime.substring(20,22) + startM
				var labelTime = startDate + ', ' +   startTime

				var bgColor, path;
				if (swap.status == 'agreed'){bgColor = 'green'}
				else if (swap.status == 'incoming'){bgColor = 'green'}
				else if (swap.status == 'pending'){bgColor = 'orange'}
				else if (swap.status == 'counter-incoming'){bgColor = 'orange'}
				else if (swap.status == 'canceled'){bgColor = 'grey'}
				else if (swap.status == 'rejected'){bgColor = 'red'}

				return(
					<ListItem noIndent key={index} style={{backgroundColor:bgColor}}>
					<Row  style={{backgroundColor:bgColor,
						marginBottom:10, alignItems:'center'}}>
						<Col style={{width:'20%', color:'white'}}>
							<Text style={{color:'white',
								textTransform:'capitalize', fontSize:18}}>
								{swap.status}
							</Text>
						</Col>
						
						<Col style={{width:'55%'}}>
							<Text style={{color:'white',fontSize:18, textAlign:'center'}}>
								{labelTime}
							</Text>
						</Col>

						<Col style={{width:'20%'}}>
							<Button bordered light style={{ 
								paddingVertical:10, justifyContent:'center'}}>
								<Text style={{textAlign:'center',
									color:'white', fontSize:18, fontWeight:'600'}}>
									{swap.percentage}%
								</Text>
							</Button>
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
