import React, { Component } from 'react';

import { getUserAuthenticated, getUser } from '../../services/auth';

import UserRegisterContextProvider from '../../contexts/GerencianetContext';
import Alert from '../includes/Alert';
import Customer from './forms/Customer';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busquefilmeToken: null,
      customer: {},
      alert: {
        show: false,
        message: null,
      },
    };
  }

  componentDidMount = () => {
    const _token = getUserAuthenticated();
    if (!_token) {
      const strWindowFeatures =
        'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';

      setTimeout(() => {
        window.alert('Você precisa se logar ou cadastrar-se. Aguarde...');
        window.open(
          process.env.REACT_APP_URL_BASE +
            process.env.REACT_APP_CLIENT_PORT +
            '/login',
          '_top',
          strWindowFeatures
        );
      }, 2000);
    }
    this.setState({
      busquefilmeToken: _token,
    });
  };

  setAlert = (message) => {
    this.setState(
      {
        alert: {
          show: true,
          message: message,
        },
      },
      (cb) => {
        this.closeAlert();
      }
    );
  };

  closeAlert = () => {
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
        <UserRegisterContextProvider>
          <Customer
            alert={this.setAlert}
            currentUser={getUser()}
            {...this.props}
          />
        </UserRegisterContextProvider>
      </section>
    );
  }
}
