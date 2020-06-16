import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">
          <i className="fas fa-hotel"></i>
          <span>Home</span>
        </h2>
        <p className="il-section--description il-text-color--light">
          Gosta de filmes e busca informações sobre eles?
          <br />
          BusqueFilme é o local certo.
          <br />
          Ao acessar os resultados através da busca ou ao navegar nas categorias
          você será apresentando a belas miniaturas renderizadas a partir de
          onde você para reproduzir filmes, obter informações, ouvir a trilha
          sonora, ver os atores, as imagens e muito mais.
          <br />
          <br />
          Faça buscas por filmes, navegue por categorias, fique a par dos vinte
          melhores filmes do ano, veja os preferidos dos editores, acesse e faça
          downloads de posters e papéis de parede, conheça o elenco, assista a
          trailers, compartilhe com seus amigos, tenha acesso a ficha técnica da
          produção, visite os sites oficiais, visite as redes sociais e, além
          disso, ouça a trilha sonora do filme...
          <br />
          <br />
          Ufa! Isso só aqui no{' '}
          <b className="il-text-color--gold">BusqueFilme</b>.
        </p>
      </section>
    );
  }
}

export default Home;
