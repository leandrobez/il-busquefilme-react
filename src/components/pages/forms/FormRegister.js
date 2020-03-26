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
const handleInputRegister = e => {
  registerData[e.target.name] = e.target.value;
};

const register = async e => {
  e.preventDefault();
  if (registerData.password !== registerData.confirmpwd) {
    setAlert({
      error: true,
      message: {
        type: 'warning',
        value:
          'A senha e a confirmação de senha são diferentes. Reveja sua digitação.'
      }
    });
    return;
  }
  const url = apiUrl + END_POINT_REGISTER;

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
};

const setAlert = alertMessage => {
  let { alert, next } = myProps;
  if (alertMessage.error !== null) {
    alert(alertMessage.message);
    next();
  }
};

const FormRegister = props => {
  myProps = props;
  return (
    <form className="il-form il-form--login" onSubmit={register}>
      <div className="il-form--field">
        <label htmlFor="name">Nome Completo</label>
        <input
          type="text"
          name="name"
          className="il-add--description"
          placeholder="Informe seu nome"
          id="name"
          onChange={handleInputRegister}
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
          onChange={handleInputRegister}
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
          onChange={handleInputRegister}
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
          onChange={handleInputRegister}
        />
      </div>
      <div className="il-input--info il-center">
        <button className="il-btn il-btn--entrance">
          <span>Registrar-se</span>
          <span className="icon">
            <i className="mdi mdi-24px mdi-account"></i>
          </span>
        </button>
      </div>
    </form>
  );
};

export default FormRegister;
