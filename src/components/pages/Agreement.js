import React, { Component } from 'react';

import GerencianetContextProvider from '../../contexts/GerencianetContext';
import Alert from '../includes/Alert';
import UserRegister from './forms/UserRegister';
export default class Agreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: {},
      subscription: {},
      alert: {
        show: false,
        message: null,
      },
    };
  }

  setAlert = (message) => {
    this.setState({
      alert: {
        show: true,
        message: message,
      },
    });
    setTimeout(() => {
      this.setState({
        alert: {
          show: false,
          message: {},
        },
      });
    }, 5000);
  };

  render() {
    return (
      <section className="il-section">
        {this.state.alert.show ? (
          <Alert message={this.state.alert.message} />
        ) : (
          ''
        )}
        
        <GerencianetContextProvider>
          <UserRegister
            alert={this.setAlert}
            plan={this.props.match.params.plan}
            {...this.props}
          />
        </GerencianetContextProvider>
      </section>
    );
  }
}
