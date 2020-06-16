import React, { createContext, Component } from 'react';

import { registerUser, registerNewCustomer } from '../services/UserService';
import { storeProfile } from '../services/auth';

export const UserRegisterContext = createContext();

export default class UserRegisterContextProvider extends Component {
  state = {
    user: {},
  };

  register = async (dataRegister) => {
    return registerUser(dataRegister)
      .then((res) => {
        try {
          if (res.status === 200) {
            if (!res.data.error) {
              storeProfile(res.data.user);
              return {
                error: false,
                message: {
                  type: 'success',
                  value:
                    'Sua conta foi criada com sucesso. Por favor complemente suas informações na próxima tela.',
                },
              };
            } else {
              return {
                error: true,
                message: res.data.message,
              };
            }
          }
        } catch (error) {
          return {
            error: true,
            message: error.message,
          };
        }
      })
      .catch((error) => {});
  };

  registerCustomer = async (dataRegisterCustomer) => {
    return registerNewCustomer(dataRegisterCustomer)
      .then((res) => {
        try {
          if (res.status === 200) {
            if (!res.data.error) {
              storeProfile(res.data.user);
              return {
                error: false,
                message: {
                  type: 'success',
                  value: 'Parabéns seu cadastro foi feito com sucesso.',
                },
              };
            } else {
              return {
                error: true,
                message: res.data.message,
              };
            }
          }
        } catch (error) {
          return {
            error: true,
            message: error.message,
          };
        }
      })
      .catch((error) => {});
  };

  render() {
    return (
      <UserRegisterContext.Provider
        value={{
          ...this.state,
          register: this.register,
          registerCustomer: this.registerCustomer,
        }}
      >
        {this.props.children}
      </UserRegisterContext.Provider>
    );
  }
}
