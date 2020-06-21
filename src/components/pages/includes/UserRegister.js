import React, { Component } from 'react';

import PayChoices from '../forms/PayChoices';
import User from '../forms/User';

import { GerencianetContext } from '../../../contexts/GerencianetContext';
class UserRegister extends Component {
  static contextType = GerencianetContext;
  constructor(props) {
    super(props);
    this.state = {
      typePay: null,
      showChoices: true,
      showRegister: false,
      showCreditCard: false,
      showLoader: true
    };
  }

  setAlert = (msg) => {
    this.props.alert(msg);
  };

  setTypePay = (type) => {
    this.setState({
      typePay: type,
      showRegister: true,
    });
  };

  submitRegister = async (dataRegister, repeats) => {
    this.setState({
      showLoad: true,
    });
    let msg = '';
    //register client
    /* if (this.props.userAuthenticated) {
      this.setAlert({
        type: 'warning',
        value: 'Tudo ok',
      });
    } */
    const register = await this.context.register(dataRegister, repeats);
    if (register.customer) {
      if (dataRegister.pay === 'credit_card') {
        this.setState({
          showCreditCard: true,
          showRegister: false,
        });
      } else {
        //execute pay process
        this.initCheckout('banking_billet');
      }
    } else {
      msg = register.message;
      this.setAlert(msg);
    }
  };

  initCheckout = async (type) => {
    const checkout = await this.context.createCheckout(this.props.plan, type);
    let path = '';
    if (!checkout.error) {
      path = '/checkout/success';
      this.setLocalStorage(checkout.data);
    } else {
      path = '/checkout/fail';
    }
    setTimeout(() => {
      this.setState({
        showLoad: false,
      });
      window.location = path;
    }, 2000);
  };

  render() {
    return (
      <div className="il-gerencianet--form">
        <h2 className="il-section--title il-text-color--medium-dark">
          Contratar o plano {this.props.plan}
        </h2>
        <h3 className="il-subtitle il-text-color--light">
          Preencha o formulário para continuar
        </h3>
        <p className="il-description">
          Os dados coletados não serão divulgados. Usamos apenas para o controle
          eficiente das inscrições.<br></br>Abaixo escolha como deseja fazer o
          pagamento e preencha o formulário que será mostrado logo em seguida.
        </p>
        <PayChoices typePay={this.setTypePay} show={this.state.showChoices} />
        <div
          className={
            this.state.showRegister
              ? 'il-pay--register il-visible'
              : 'il-pay--register'
          }
        >
          <User
            typePay={this.state.typePay}
            submitRegister={this.submitRegister}
            currentUser={this.props.user}
          />
        </div>
      </div>
    );
  }
}

export default UserRegister;
