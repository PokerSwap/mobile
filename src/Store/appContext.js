import React from 'react';
import getState from './store.js';

export const Context = React.createContext(null);
 
const Store = (PassedComponent) =>{
	class StoreWrapper extends React.Component{
		constructor(props) {
		super(props);
		this.state = getState({
			getStore: () => this.state.store,
			getActions: () => this.state.actions,
			setStore: updatedStore =>
				this.setState({
					store: Object.assign(this.state.store, updatedStore)
			})
	});
}

		componentDidMount() {
			// The place to fetch.

		}

		render(){
			return(
				<Context.Provider value={this.state}>
					<PassedComponent {...this.props} />
				</Context.Provider>
					);
		}
	}

	return StoreWrapper;
};

export default Store;