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
            <form>
              <p>
                <label>Nome</label>
                <input type="text" name="name" />
              </p>
              <p>
                <label>Empresa</label>
                <input type="text" name="corpore" />
              </p>
              <p>
                <label>Email</label>
                <input type="email" nome="email" />
              </p>
              <p>
                <label>Fone</label>
                <input type="text" name="phone" maxLength="15" />
              </p>
              <p className="full">
                <label>Mensagem</label>
                <textarea rows="5" name="mensagem"></textarea>
              </p>
              <p className="full">
                <button type="submit" name="enviar">
                  Enviar
                </button>
              </p>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
