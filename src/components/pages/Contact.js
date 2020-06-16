import React, { Component } from 'react';

class Contact extends Component {
  render() {
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">
          <i className="fas fa-file-signature"></i>
          <span>Contact</span>
        </h2>
        <div className="il-contact">
          <div className="il-contact--info">
            <h4 className="il-text-color--light">Busque Filme</h4>
            <ul className="il-address">
              <li>
                <span>Av Jacuí 1248</span>
              </li>
              <li>
                <span>+55 (51) 99976-7179</span>
              </li>
              <li>
                <span>busquefilme@busquefilme.com.br</span>
              </li>
            </ul>
          </div>
          <div className="il-contact--form">
            <h4 className="il-text-color--light">Envie uma mensagem</h4>
            <form className="il-form il-form--login">
              <div className="il-form--field">
                <label className="il-text-color--light">Nome</label>
                <input type="text" name="name" />
              </div>
              <div className="il-form--field">
                <label className="il-text-color--light">Empresa</label>
                <input type="text" name="corpore" />
              </div>
              <div className="il-form--field">
                <label className="il-text-color--light">Email</label>
                <input type="email" nome="email" />
              </div>
              <div className="il-form--field">
                <label className="il-text-color--light">Fone</label>
                <input type="text" name="phone" maxLength="15" />
              </div>
              <div className="il-form--field">
                <label className="il-text-color--light">Mensagem</label>
                <textarea rows="5" name="mensagem"></textarea>
              </div>
              <div className="il-form--buttom">
                <button
                  type="submit"
                  name="enviar"
                  className="il-btn il-btn--plan il-background--color__gradient"
                >
                  <i className="far fa-keyboard"></i>
                  <span>Enviar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
