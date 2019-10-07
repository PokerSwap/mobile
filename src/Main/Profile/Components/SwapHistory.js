import React, {Component} from 'react';
import { Text, List, ListItem } from 'native-base';
import SwapMain from './SwapMain';
import { Context } from '../../../Store/appContext';

export default class ProfileHistory extends Component {
	constructor(props){
		super(props);
		this.state={
		}
	}
	render(){
		return(
			<List header>
				<ListItem noIndent>
					<Text>Tournaments</Text>
				</ListItem>
				<Context.Consumer>
					{({store, actions}) => {
						var user = store.my_profile.buy_ins
						return user.map((content, index) => {
							return(
								<SwapMain 
									navigation = {this.props.navigation}
									tournament={content.flight_id}
									swaps={content.swaps}
								/>
							)
							})
					}}
				</Context.Consumer>
			</List>				
		)
	}
}