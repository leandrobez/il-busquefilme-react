import React, { Component } from 'react';

import { UserRegisterContext } from '../../../contexts/UserRegisterContext';
import { UserAddress } from '../../../services/CorreiosService';

export default class Customer extends Component {
  static contextType = UserRegisterContext;
  constructor(props) {
    super(props);
    this.state = {
      register: {
        name: 'Leandro Bezerra',
        email: 'leanbezerra@terra.com.br',
        cpf: '70334641772',
        birth: '1961-06-26',
        phone_number: '',
        address: {
          street: '',
          number: '1248',
          complement: 'Casa 5',
          neighborhood: '',
          zipcode: '',
          city: '',
          state: '',
        },
      },
    };
  }

  getAddress = (e) => {
    e.preventDefault();
    let register = this.state.register;
    const code = e.target.value;
    let addressSuburb = window.document.getElementById('neighborhood'),
      addressRua = window.document.getElementById('street'),
      addressCity = window.document.getElementById('city'),
      addressUF = window.document.getElementById('state');
    const address = UserAddress(code);
    addressSuburb.value = address.suburb;
    addressRua.value = address.street;
    addressCity.value = address.city;
    addressUF.value = address.state;
    //reset register
    register.address.neighborhood = address.bairro;
    register.address.street = address.logradouro;
    register.address.city = address.localidade;
    register.address.state = address.uf;
    register.address.zipcode = code;
    this.setState({
      register: register,
    });
  };

  handledData = (e) => {
    let dataRegister = this.state.register;
    let register = dataRegister;
    for (let props in dataRegister) {
      if (props === e.target.name) {
        register[e.target.name] = e.target.value;
        break;
      } else {
        if (props === 'address') {
          let dataRegisterAddress = this.state.register.address;
          let address = dataRegisterAddress;
          for (let props1 in address) {
            if (props1 === e.target.name) {
              register.address[e.target.name] = e.target.value;
              break;
            }
          }
        }
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
      this.props.alert({
        type: 'warning',
        value: errors,
      });
    } else {
      const dataRegister = this.state.register;
      let register = {};
      for (let props in dataRegister) {
        register[props] = dataRegister[props];
      }
      this.registerCustomer();
      return;
    }
  };

  registerCustomer = async () => {
    const customer = await this.context.registerCustomer(this.stateRegister);
    this.setAlert(customer);
    /* if (!customer.error) {
      this.props.next(true, 'register/account');
    } else {
      this.setAlert(customer.message);
      this.props.next(false, '');
    } */
  };

  render() {
    return (
      <div>
        <form className="il-form" onSubmit={this.formSend}>
          <div className="il-form--field il-flex">
            <div>
              <label className="il-text-color--light" htmlFor="name">
                Nome
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={this.handledData}
              />
            </div>
          </div>
          <div className="il-form--field il-flex">
            <div>
              <label className="il-text-color--light" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={this.handledData}
              />
            </div>
            <div>
              <label className="il-text-color--light" htmlFor="cpf">
                CPF
              </label>
              <input
                type="text"
                name="cpf"
                id="cpf"
                onChange={this.handledData}
              />
            </div>
            <div>
              <label className="il-text-color--light" htmlFor="dnasc">
                Data de Nasc
              </label>
              <input
                type="date"
                name="birth"
                id="dnasc"
                onChange={this.handledData}
              />
            </div>
          </div>
          <div className="il-form--field il-flex">
            <div>
              <label className="il-text-color--light" htmlFor="street">
                Rua/Av
              </label>
              <input
                type="text"
                name="address.street"
                onChange={this.handledData}
                id="street"
              />
            </div>
          </div>
          <div className="il-form--field il-flex">
            <div>
              <label className="il-text-color--light" htmlFor="number">
                Nr
              </label>
              <input
                type="text"
                name="address.number"
                id="number"
                onChange={this.handledData}
              />
            </div>
            <div>
              <label className="il-text-color--light" htmlFor="complement">
                Complemento
              </label>
              <input
                type="text"
                name="address.complement"
                id="complement"
                onChange={this.handledData}
              />
            </div>
            <div>
              <label className="il-text-color--light" htmlFor="neighborhood">
                Bairro
              </label>
              <input
                type="text"
                name="address.neighborhood"
                onChange={this.handledData}
                id="neighborhood"
              />
            </div>
          </div>
          <div className="il-form--field il-flex">
            <div>
              <label className="il-text-color--light" htmlFor="zipcode">
                CEP
              </label>
              <input
                type="text"
                name="address.zipcode"
                id="zipcode"
                onChange={this.handledData}
                onBlur={(e) => {
                  this.getAddress(e);
                }}
              />
            </div>
            <div>
              <label className="il-text-color--light" htmlFor="city">
                Cidade
              </label>
              <input
                type="text"
                name="address.city"
                id="city"
                onChange={this.handledData}
              />
            </div>
            <div>
              <label className="il-text-color--light" htmlFor="state">
                UF
              </label>
              <input
                type="text"
                name="address.state"
                id="state"
                onChange={this.handledData}
              />
            </div>
            <div>
              <label className="il-text-color--light" htmlFor="fone">
                Fone
              </label>
              <input
                type="phone"
                name="phone_number"
                id="fone"
                onChange={this.handledData}
              />
            </div>
          </div>
          <div className="il-form--field il-flex">
            <div>
              <input type="hidden" name="user_id" onChange={this.handledData} />
            </div>
          </div>
          <button type="submit" className="il-btn il-btn--center">
            Enviar
          </button>
        </form>
      </div>
    );
  }
}
