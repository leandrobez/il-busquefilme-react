import React from 'react';

export default function PayChoices(props) {
  const getVisibility = props.show ? 'il-visible' : '';

  return (
    <div className={'il-pay--choices ' + getVisibility}>
      <h4 className="il-text-color--light">Como gostaria de Pagar?</h4>
      <div className="il-choice il-background--color__gradient">
        <div>
          <label htmlFor="banking_billet il-text-color--light">
            <i className="fa fa-money check-alt"></i>
            <span>Boleto</span>
          </label>
          <input
            type="radio"
            name="pay"
            id="banking_billet"
            value="banking_billet"
            onClick={(e) => {
              props.typePay('banking_billet');
            }}
          />
        </div>
        <div>
          <label htmlFor="credit_card il-text-color--light">
            <i className="fa fa-credit-card"></i>
            <span>Cartão de Crédito</span>
          </label>
          <input
            type="radio"
            name="pay"
            id="credit_card"
            value="credit_card"
            onClick={(e) => {
              props.typePay('credit_card');
            }}
          />
        </div>
      </div>
    </div>
  );
}
