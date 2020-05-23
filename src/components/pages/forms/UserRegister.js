import React, { Component } from 'react';
import { GerencianetContext } from '../../../contexts/GerencianetContext';

class UserRegister extends Component {
  static contextType = GerencianetContext;
  constructor(props) {
    super(props);
    this.state = {
      register: {
        repeats: 3,
        name: '',
        email: '',
        cpf: '',
        birth: '',
        phone_number: '',
        pay: 'banking_billet',
        address: {
          street: '',
          number: '',
          complement: '',
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
    const urlCorreio = 'https://viacep.com.br/ws';
    fetch(`${urlCorreio}/${code}/json/`).then((res) => {
      if (res.status === 200 && res.statusText === 'OK') {
        res.json().then((address) => {
          addressSuburb.value = address.bairro;
          addressRua.value = address.logradouro;
          addressCity.value = address.localidade;
          addressUF.value = address.uf;
          //reset register
          register.address.neighborhood = address.bairro;
          register.address.street = address.logradouro;
          register.address.city = address.localidade;
          register.address.state = address.uf;
          this.setState({
            register: register,
          });
        });
      }
    });
  };

  formSend = (values) => {
    setTimeout(() => {
      //alert(JSON.stringify(values, null, 2));
      //setSubmitting(false);
      let alert = {
        error: true,
        message: {
          type: 'warning',
          value: 'Preencha todos os campos',
        },
      };
      this.setState({
        register: values,
      });
      this.props.alert(alert.message);
      this.props.pay(values);
    }, 400);
  };

  handledData = (e) => {
    let dataRegister = this.state.register;
    let register = dataRegister;
    for (let props in dataRegister) {
      if (props === e.target.name) {
        register[e.target.name] = e.target.value;
        if (props === 'pay' && e.target.value === 'credit_card') {
          this.props.setModal();
          document.getElementById('name').focus();
        }
      } else {
        if (props === 'address') {
          let dataRegisterAddress = this.state.register.address;
          let address = dataRegisterAddress;
          for (let props1 in address) {
            if (props1 === e.target.name) {
              register.address[e.target.name] = e.target.value;
            }
          }
        }
      }
      this.setState({
        register: register,
      });
    }
  };

  render() {
    return (
      <div className="il-gerencianet--form">
        <h2 className="il-section--title il-text-color--medium-dark">
          Contratar o plano {this.props.plan}
        </h2>
        <h3 className="il-subtitle">Preencha o formulário para continuar</h3>
        <p className="il-description">
          Esses dados não serão divulgados e sua importância é apenas para o
          controle eficiente dos pagamentos.<br></br>No formulário abaixo
          escolha como deseja fazer o pagamento e escolha o total de meses que
          gostaria.
        </p>

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
          </div>
          <div className="il-form--field il-flex">
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
              <label className="il-text-color--light" htmlFor="dnasc">
                Data de Nasc
              </label>
              <input
                type="date"
                name="dnasc"
                id="dnasc"
                onChange={this.handledData}
              />
            </div>
          </div>
          <div className="il-form--field il-flex">
            <div>
              <label className="il-text-color--light" htmlFor="rua_av">
                Rua/Av
              </label>
              <input
                type="text"
                name="address.rua_av"
                onChange={this.handledData}
                id="rua_av"
              />
              <label className="il-text-color--light" htmlFor="nr">
                Nr
              </label>
              <input
                type="text"
                name="address.nr"
                id="nr"
                onChange={this.handledData}
              />
            </div>
          </div>
          <div className="il-form--field il-flex">
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
              <label className="il-text-color--light" htmlFor="suburb">
                Bairro
              </label>
              <input
                type="text"
                name="address.suburb"
                onChange={this.handledData}
                id="suburb"
              />
            </div>
          </div>
          <div className="il-form--field il-flex">
            <div>
              <label className="il-text-color--light" htmlFor="postcode">
                CEP
              </label>
              <input
                type="text"
                name="address.postcode"
                id="postcode"
                onChange={this.handledData}
                onBlur={(e) => {
                  this.getAddress(e);
                }}
              />
              <label className="il-text-color--light" htmlFor="city">
                Cidade
              </label>
              <input
                type="text"
                name="address.city"
                id="city"
                onChange={this.handledData}
              />
              <label className="il-text-color--light" htmlFor="uf">
                UF
              </label>
              <input
                type="text"
                name="address.UF"
                id="uf"
                onChange={this.handledData}
              />
            </div>
          </div>
          <div className="il-form--field il-flex">
            <div>
              <label className="il-text-color--light" htmlFor="fone">
                Fone
              </label>
              <input
                type="phone"
                name="address.fone"
                id="fone"
                onChange={this.handledData}
              />
              <label className="il-text-color--light" htmlFor="clr">
                Celular
              </label>
              <input type="phone" name="address.clr" id="clr" />
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

export default UserRegister;
