import React, {Component} from 'react';
import AppContainer from './AppContainer.js'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      seconds:5,
      language: 3
    }
  }

  render(){
    return(
        <AppContainer 
        />
    )
  }
}
