import React, { useCallback }  from 'react'
import { throttle } from 'lodash';

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