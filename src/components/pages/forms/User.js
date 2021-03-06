import React, { Component } from 'react';

import { UserAddress } from '../../../services/CorreiosService';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      register: {
        repeats: 3,
        name: this.props.currentUser.name,
        email: this.props.currentUser.email,
        cpf: '70334641772',
        birth: '1961-06-26',
        phone_number: '',
        pay: this.props.typePay,
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

  componentDidUpdate = () => {
    /* let dataRegister = this.state.register;
    dataRegister.name = this.props.currentUser.name;
    dataRegister.email = this.props.currentUser.email;
    this.setState({
      register: dataRegister,
    }); */
  };

  getAddress = (e) => {
    e.preventDefault();
    let register = this.state.register;
    let addressSuburb = window.document.getElementById('neighborhood'),
      addressRua = window.document.getElementById('street'),
      addressCity = window.document.getElementById('city'),
      addressUF = window.document.getElementById('state');
    register.address.zipcode = e.target.value;
    UserAddress(e.target.value).then((data) => {
      //reset register
      register.address.neighborhood = data.suburb;
      register.address.street = data.street;
      register.address.city = data.city;
      register.address.state = data.state;

      //reset fields
      addressSuburb.value = data.suburb;
      addressRua.value = data.street;
      addressCity.value = data.city;
      addressUF.value = data.state;
      this.setState({
        register: register,
      });
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
        error.push('o campo ' + props + ' é obrigatorio');
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
        if (props !== 'repeats') {
          register[props] = dataRegister[props];
        }
      }
      register.pay = this.props.typePay;
      this.props.submitRegister(register, this.state.register.repeats);
      return;
    }
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
                defaultValue={this.props.currentUser.name}
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
                defaultValue={this.props.currentUser.email}
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
                onBlur={this.getAddress}
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
              <input
                type="hidden"
                name="user_id"
                defaultValue={this.props.currentUser._id}
              />
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
