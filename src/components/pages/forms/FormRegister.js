import React from 'react';
import api, { apiUrl } from '../../../services/api';

import { END_POINT_REGISTER, storeProfile } from '../../../services/auth';

let registerData = {
  name: '',
  email: '',
  password: '',
  confirmpwd: '',
  role: 'admin'
};

let myProps = '';
const handleInputRegisterName = e => {
  //registerData[e.target.name] = e.target.value;
  registerData = {
    name: e.target.value,
    email: registerData.email,
    password: registerData.password,
    confirmpwd: registerData.confirmpwd,
    role: 'admin'
  };
};
const handleInputRegisterEmail = e => {
  //registerData[e.target.name] = e.target.value;
  registerData = {
    name: registerData.name,
    email: e.target.value,
    password: registerData.password,
    confirmpwd: registerData.confirmpwd,
    role: 'admin'
  };
};
const handleInputRegisterPwd = e => {
  //registerData[e.target.name] = e.target.value;
  registerData = {
    name: registerData.name,
    email: registerData.email,
    password: e.target.value,
    confirmpwd: registerData.confirmpwd,
    role: 'admin'
  };
};

const handleInputRegisterCfPwd = e => {
  //registerData[e.target.name] = e.target.value;
  registerData = {
    name: registerData.name,
    email: registerData.email,
    password: registerData.password,
    confirmpwd: e.target.value,
    role: 'admin'
  };
};

const register = async e => {
  e.preventDefault();
  const url = apiUrl + END_POINT_REGISTER;
  if (registerData.password !== registerData.confirmpwd) {
    setAlert({
      error: true,
      message: {
        type: 'warning',
        value:
          'A senha e a confirmação de senha são diferentes. Reveja sua digitação.'
      }
    });
    return false;
  } else {
    try {
      const data = {
        email: registerData.email,
        name: registerData.name,
        password: registerData.password,
        role: registerData.role
      };
      api.post(url, data).then(res => {
        let alert = {
          error: null,
          message: {
            type: '',
            value: ''
          }
        };
        console.log(res);
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
                value: 'Cadastro feito com sucesso'
              }
            };
            storeProfile(res.data.user);
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
  }
};

const setAlert = alertMessage => {
  let { alert, next } = myProps;
  if (!alertMessage.error) {
    alert(alertMessage.message);
    next(true);
  } else {
    alert(alertMessage.message);
    next(false);
  }
};

const FormRegister = props => {
  myProps = props;
  return (
    <form className="il-form il-form--login" onSubmit={e => register(e)}>
      <div className="il-form--field">
        <label htmlFor="name">Nome Completo</label>
        <input
          type="text"
          name="name"
          className="il-add--description"
          placeholder="Informe seu nome"
          id="name"
          onChange={handleInputRegisterName}
        />
      </div>
      <div className="il-form--field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className="il-add--description"
          placeholder="Informe seu email"
          id="emailR"
          onChange={handleInputRegisterEmail}
        />
      </div>
      <div className="il-form--field">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          className="il-add--description"
          placeholder="Informe a senha"
          id="passwordR"
          autoComplete="off"
          onChange={handleInputRegisterPwd}
        />
      </div>
      <div className="il-form--field">
        <label htmlFor="confirmpwd">Repita senha</label>
        <input
          type="password"
          name="confirmpwd"
          className="il-add--description"
          placeholder="Repita a senha"
          id="confirmpwd"
          autoComplete="off"
          onChange={handleInputRegisterCfPwd}
        />
      </div>
      <div className="il-form--buttom">
        <button className="il-btn il-btn--submit" type="submit">
          <i className="far fa-keyboard"></i>
          <span>Registrar-se</span>
        </button>
      </div>
    </form>
  );
};

export default FormRegister;
