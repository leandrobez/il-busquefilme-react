import React, { Component } from 'react';

import FormLogin from './forms/FormLogin';
import FormRegister from './forms/FormRegister';
import Alert from '../includes/Alert';

import UserRegisterContextProvider from '../../contexts/UserRegisterContext';

const dotenv = require('dotenv');

//initialize dotenev
dotenv.config();

class Login extends Component {
  state = {
    abas: {
      login: true,
      register: false,
    },
    alert: {
      show: false,
      message: {},
    },
  };

  empty = () => {
    return;
  };

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

  setLogin = () => {
    this.setState({
      abas: {
        login: true,
        register: false,
      },
    });
  };

  setRegister = () => {
    this.setState({
      abas: {
        login: false,
        register: true,
      },
    });
  };

  next = (change, local) => {
    if (change) {
      setTimeout(() => {
        const strWindowFeatures =
          'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
        window.open('/' + local, '_top', strWindowFeatures);
      }, 4000);
    }
  };

  render() {
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">
          <i className="fas fa-sign-in-alt"></i>
          <span>Sua Conta</span>
        </h2>

        <div className="il-account">
          <div className="il-account--header">
            <ul className="il-abas">
              <li className="il-aba--login">
                <span
                  className="il-text-color--light"
                  onClick={!this.state.abas.login ? this.setLogin : this.empty}
                >
                  login
                </span>
              </li>
              <li className="il-aba--register">
                <span
                  className="il-text-color--light"
                  onClick={
                    !this.state.abas.register ? this.setRegister : this.empty
                  }
                >
                  registrar-se
                </span>
              </li>
            </ul>
          </div>
          {this.state.alert.show ? (
            <Alert message={this.state.alert.message} />
          ) : (
            ''
          )}{' '}
          <nav className="il-nav--tabs">
            <div
              className={
                this.state.abas.login
                  ? 'il-login il-show'
                  : 'il-login il-hidden'
              }
            >
              <h4>Faça seu login</h4>
              <FormLogin alert={this.setAlert} next={this.next} />
            </div>
            <div
              className={
                this.state.abas.register
                  ? 'il-register il-show'
                  : 'il-register il-hidden'
              }
            >
              <h4>Sem conta ainda? Crie uma agora</h4>
              <UserRegisterContextProvider>
                <FormRegister alert={this.setAlert} next={this.next} />
              </UserRegisterContextProvider>
            </div>
          </nav>
        </div>
      </section>
    );
  }
}

export default Login;
