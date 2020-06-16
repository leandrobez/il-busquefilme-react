import React, { Component } from 'react';

import { getUserAuthenticated, getUser } from '../../services/auth';

import GerencianetContextProvider from '../../contexts/GerencianetContext';
import Alert from '../includes/Alert';
import UserRegister from './includes/UserRegister';

export default class Agreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busquefilmeToken: null,
      plan: {},
      subscription: {},
      alert: {
        show: false,
        message: null,
      },
    };
  }

  componentDidMount = () => {
    const _token = getUserAuthenticated();
    if (!_token) {
      let message = {
        type: 'info',
        value: 'Você precisa se logar ou cadastrar-se. Aguarde...',
      };
      this.setAlert(message);
    } else {
      this.setState({
        busquefilmeToken: _token,
      });
    }
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
    const strWindowFeatures =
      'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
    setTimeout(() => {
      this.setState({
        alert: {
          show: false,
          message: {},
        },
      });
      window.open(
        process.env.REACT_APP_URL_BASE +
          process.env.REACT_APP_CLIENT_PORT +
          '/login',
        '_top',
        strWindowFeatures
      );
    }, 6000);
  };

  setUser = () => {
    let user = getUser();
    if (!user) {
      user = {
        name: '',
        email: '',
      };
    }
    return user;
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
            userAuthenticated={getUserAuthenticated()}
            user={this.setUser()}
          />
        </GerencianetContextProvider>
      </section>
    );
  }
}
