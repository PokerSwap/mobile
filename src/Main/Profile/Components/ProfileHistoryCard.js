import React, {useContext} from 'react';
import { ListItem,Text } from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid'

import {Context} from '../../../Store/appContext';
 
export default ProfileHistoryCard = (props) => {

	const { store, actions } = useContext(Context)


	console.log('check on history',store.myPastTrackers)

    // var history =  store.myPastTrackers.map(
    //   tracker => {
    //     var x = tracker.tournament
    //     var y = tracker.buyins.filter(
    //       buyin => buyin.recipient_user.id == profile.id
    //     )
    //     return({
    //       "buyin":y[0],
    //       "tournament":x
    //     })
    //   }
    // )

	return(
		<ListItem noIndent>
			<Grid>

				<Row>
			
					
						<Text>
							Tournament {props.tournament.name}
						</Text>
				</Row>

				{props.allSwaps != null ?
					props.allSwaps.map(swap =>
						<Row>
							<Text>lol</Text>
							{/* <Text>{swap.percentage}</Text>
							<Text>{swap.status}</Text>
							<Text>{swap.updated_at}</Text> */}
						</Row>	
					)
					: 
					<Text>You have not swapped with this person</Text>

				}


			</Grid>
			
		</ListItem>				
	)
}
