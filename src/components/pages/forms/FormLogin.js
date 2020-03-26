import React from 'react';
import { apiUrl } from '../../../services/api';
import api from '../../../services/api';

import {
  END_POINT_LOGIN,
  storeLogin,
  storeProfile,
  isAuthenticated
} from '../../../services/auth';

let loginData = { email: '', password: '' };

let myProps = '';
const handleInputLoginEmail = e => {
  loginData = {
    email: e.target.value,
    password: loginData.password
  };
};

const handleInputLoginPwd = e => {
  loginData = {
    email: loginData.email,
    password: e.target.value
  };
};


const login = async e => {
  e.preventDefault();
  const url = apiUrl + END_POINT_LOGIN;

  try {
    api.post(url, loginData).then(res => {
      let alert = {
        error: null,
        message: {
          type: '',
          value: ''
        }
      };
      if (res.status === 200 && res.statusText === 'OK') {
        if (res.data.error) {
          alert = {
            error: true,
            message: res.data.message
          };
        } else {
          alert = {
            error: false,
            message: {
              type: 'success',
              value: 'Seu login foi feito com sucesso.'
            }
          };
          storeLogin(res.data.user.token);
          storeProfile(res.data.user);
          isAuthenticated();
        }

        setAlert(alert);
      }
    });
  } catch (error) {
    setAlert({
      error: true,
      message: error.message
    });
  }
};

const setAlert = alertMessage => {
  let { alert, next } = myProps;
  if (alertMessage.error !== null) {
    alert(alertMessage.message);
    next();
  }
};

const FormLogin = props => {
  myProps = props;
  return (
    <form className="il-form il-form--login" onSubmit={login}>
      <div className="il-form--field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className="il-add--description"
          placeholder="Informe seu email"
          id="email"
          onChange={handleInputLoginEmail}
        />
      </div>
      <div className="il-form--field">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          className="il-add--description"
          placeholder="Informe a senha"
          autoComplete="off"
          id="password"
          onChange={handleInputLoginPwd}
        />
      </div>
      <div className="il-input--info il-center">
        <button className="il-btn il-btn--entrance" type="submit">
          <span>Logar</span>
          <span className="icon">
            <i className="mdi mdi-24px mdi-check"></i>
          </span>
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
