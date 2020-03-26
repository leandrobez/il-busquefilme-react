import React, { Component } from 'react';
import Alert from './includes/Alert';
import Routes from '../Routes';

class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false
    };
  }
  render() {
    return (
      <div className="il-container--wrapper">
        {this.state.showAlert && <Alert />}
        <Routes />
      </div>
    );
  }
}

export default Pages;
