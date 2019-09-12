import React, {Component} from 'react';
import { Text, List, ListItem } from 'native-base';
import SwapMain from './SwapMain';

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
				<ListItem seperator noIndent>
					<Text>2019</Text>
				</ListItem>
					<SwapMain 
						navigation = {this.props.navigation}
						date='SEP 13' year='2019'
						tournament='2019 Triton Poker Super High Roller Series London' swaps='3'
						percents={['2','5','7']}
						names={['Peter Shiao','Scooby Doo','Peter Griffin']}/>
						
					<SwapMain 
					navigation = {this.props.navigation}
						date='JUL 22' year='2019'
						tournament='#DEEE'swaps='3'
						percents={['5','5','3']}
						names={['Homer Simpson','Danny Devito','Ashley Williams']}
					/>
				<ListItem seperator noIndent>
					<Text>2018</Text>
				</ListItem>	
					<SwapMain 
					navigation = {this.props.navigation}
						date='SEP 13' year='2019'
						tournament='#SHRPO' swaps='3'
						percents={['6','2','3']}
						names={['Dimitri Monroe','Prince Alibaba','Megatron']}
					/>
				
			</List>				
		)
	}
}