import React, {useContext} from 'react';
import { View } from 'react-native'
import { ListItem,Text } from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid'

import {Context} from '../../../Store/appContext';
 
export default ProfileHistoryCard = (props) => {

	const { store, actions } = useContext(Context)

	return(
		<View>
		<ListItem noIndent style={{ flexDirection:'column',
		paddingVertical:5, 
			backgroundColor:'black', justifyContent:'center'}}>
			<Text style={{fontSize:20, width:'90%',
				color:'white', fontWeight:'600', textAlign:'center'}}>
				{props.buyin.tournament_name}
			</Text>
			</ListItem>
			<ListItem>
			<Grid>

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

				return(
					<Row key={index} style={{marginBottom:10, justifyContent:'space-between'}}>
						
						<Text style={{
							textTransform:'capitalize', fontSize:20}}>
							{swap.status}
						</Text>

						<Text style={{fontSize:20}}>
							{labelTime}
						</Text>

						<Text style={{}}>
							{swap.percentage}
						</Text>
					</Row>
				)})
				:
				<Text>You have not swapped with this person</Text>
			}
			</Grid>	
		</ListItem>		
		</View>		
	)
}
