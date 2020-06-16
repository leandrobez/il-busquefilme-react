import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { plans } from '../common/listPlans';

export default class Plans extends Component {
  /*lightBox = () => {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    var v = parseInt(Math.random() * 1000000);
    s.src =
      'https://sandbox.gerencianet.com.br/v1/cdn/lightbox/b73a1b070c537a1010c3cca1d6df7092/' +
      v;
    s.async = false;
    s.id = 'b73a1b070c537a1010c3cca1d6df7092';
    if (!document.getElementById('b73a1b070c537a1010c3cca1d6df7092')) {
      document.getElementsByTagName('head')[0].appendChild(s);
    }
    $gn = {
      validForm: true,
      processed: false,
      done: {},
      ready: function(fn) {
        $gn.done = fn;
      }
    };
  };*/

  plans = () => {
    return plans.map((plan) => (
      <div className="il-plan--item" key={'plan-' + plan.id}>
        <div className="il-plan--header">
          <h4 className="il-text-color--light">{plan.title}</h4>
          <h6 className="il-text-color--light">{plan.subTitle}</h6>
        </div>
        <div className="il-plan--body">
          <span className="il-price il-text-color--dark">
            R$ {plan.price},00
          </span>
          <p>{plan.description}</p>
        </div>
        <div className="il-plan--footer">
          <Link
            to={'/agreement' + plan.path}
            className="il-btn il-btn--plan il-background--color__gradient"
            title={plan.title}
          >
            <i className="far fa-handshake"></i>
            Assinar
          </Link>
        </div>
      </div>
    ));
  };

  render() {
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">Plans</h2>
        <div className="il-plans">{this.plans()}</div>
      </section>
    );
  }
}
