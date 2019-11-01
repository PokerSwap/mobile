import React, {Component} from 'react';
import { List } from 'native-base';
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
				{/* <Context.Consumer>
					{({store, actions}) => {
						var user = store.tournaments
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
				</Context.Consumer> */}
			</List>				
		)
	}
}