import React, { Component } from 'react';

import { UserRegisterContext } from '../../../contexts/UserRegisterContext';

export default class FormRegister extends Component {
  static contextType = UserRegisterContext;
  constructor(props) {
    super(props);
    this.state = {
      register: {
        name: '',
        email: '',
        password: '',
        confirmpwd: '',
        role: 'admin',
      },
    };
  }

  setAlert = (alertMessage) => {
    let { alert, next } = this.props;
    if (!alertMessage.error) {
      alert(alertMessage.message);
      next(true);
    } else {
      alert(alertMessage.message);
      next(false);
    }
  };

  handledData = (e) => {
    let dataRegister = this.state.register;
    let register = dataRegister;
    for (let props in dataRegister) {
      if (props === e.target.name) {
        register[e.target.name] = e.target.value;
        break;
      }
    }
    this.setState({
      register: register,
    });
  };

  checkInputs = () => {
    let dataUser = this.state.register;
    let error = [];
    for (let props in dataUser) {
      if (dataUser[props] === '') {
        error.push('a propriedade ' + props + ' é obrigatoria');
      }
    }
    return error;
  };

  formSend = (e) => {
    e.preventDefault();
    const fieldsError = this.checkInputs();
    if (fieldsError.length) {
      let errors = fieldsError.map((err, index) => (
        <li key={'error_' + index}>{err}</li>
      ));
      errors = <ul>{errors}</ul>;
      this.setAlert({
        error: true,
        message: {
          type: 'warning',
          value: errors,
        },
      });
      return false;
    } else {
      //compare confirmpwd and pwd
      if (this.state.register.password !== this.state.register.confirmpwd) {
        this.setAlert({
          error: true,
          message: {
            type: 'warning',
            value:
              'A senha e a confirmação de senha são diferentes. Reveja sua digitação.',
          },
        });
        return false;
      }
      this.submitRegister();
    }
  };

  submitRegister = async () => {
    const dataRegister = {
      name: this.state.register.name,
      email: this.state.register.email,
      password: this.state.register.password,
      role: this.state.register.role,
    };
    const register = await this.context.register(dataRegister);
    this.setAlert(register);
    if (!register.error) {
      this.props.next(true, 'register/account');
    } else {
      this.setAlert(register.message);
      this.props.next(false, '');
    }
  };

  render() {
    return (
      <div>
        <form className="il-form il-form--login" onSubmit={this.formSend}>
          <div className="il-form--field">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              name="name"
              className="il-add--description"
              placeholder="Informe seu nome"
              id="name"
              onChange={this.handledData}
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
              onChange={this.handledData}
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
              onChange={this.handledData}
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
              onChange={this.handledData}
            />
          </div>
          <div className="il-form--buttom">
            <button
              className="il-btn il-btn--plan il-background--color__gradient"
              type="submit"
            >
              <i className="far fa-keyboard"></i>
              <span>Registrar-se</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
