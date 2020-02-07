import React from 'react';
import { ListItem,Text } from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid'

export default ProfileHistoryCard = (props) => {

	return(
		<ListItem noIndent>
			<Grid>
				<Row>
					<Col style={{width:'25%'}}><Text>May27</Text></Col>
					<Col><Text>Tournament {props.id}</Text></Col>
				</Row>
				<Row>

				</Row>
			</Grid>
			
		</ListItem>				
	)
}
