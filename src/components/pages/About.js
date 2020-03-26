import React, { Component } from 'react';

class About extends Component {
  state = {
    cards: [
      {
        id: 1,
        title: 'busca',
        description:
          'A caixa de pesquisa na parte superior do site é seu amigo número um para encontrar seus filmes. A pesquisa é atualizada rapidamente e você receberá até 20 resultados por página. Nas miniaturas você pode clicar no ícone da câmera que permitirá o acesso a página que trás detalhes e nformações sobre o filme pesquisado.',
        icons: '/images/icons/012-film-roll.png',
        alt: '012-film-roll.png'
      },
      {
        id: 2,
        title: 'detalhes',
        description:
          'Na página de detalhes você pode acessar a ficha técnica, o elenco, as imagens para posters e papéis de parede, poderá ouvir a trilha sonora e ver os trailers oficiais, saber o nome do diretor, o nome do estúdio, a classificação por gêneros, o país de origem, a classificação e muito mais.',
        icons: './images/icons/016-clapperboard.png',
        alt: '016-clapperboard.png'
      },
      {
        id: 3,
        title: 'spotify',
        description:
          'A estória contada no filme fica ainda mais empolgante quando a trilha sonora do filme pode ser ouvida. Se você é assinante do spotify você pode escutar a trilha sonora e relembrar aqueles momentos inesquecíveis do filme. Aroveite!',
        icons: './images/icons/006-projector.png',
        alt: '006-projector.png'
      },
      {
        id: 4,
        title: 'trailers',
        description:
          'Não ficou satisfeito com as informações da produção. Então assista aos trailers oficiais, visite os sites e as redes sociais do filme e, claro, compartilhe com seus amigos e, ufa! Dê sua pinião. Bem vindo ao BusqueFilme - Filmes e Trilhas Sonora na palma da sua mão.',
        icons: './images/icons/008-movie.png',
        alt: '008-movie.png'
      }
    ]
  };
  render() {
    const aboutPanel = this.state.cards.map(item => (
      <div className="il-panel--card" key={'panel-' + item.id}>
        <div className="il-panel--img">
          <div className="il-icon--img">
            <img src={item.icons} alt={item.alt} />
          </div>
        </div>
        <div className="il-panel--content">
          <h1 className="il-panel--title">{item.title}</h1>
          <p className="il-panel--description">{item.description}</p>
          <a
            href="!#"
            className="il-btn il-btn--slider il-background--color__red"
          >
            Saiba mais
          </a>
        </div>
      </div>
    ));
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">
          <i className="fas fa-low-vision"></i>
          <span>About</span>
        </h2>
        <div className="il-panel">{aboutPanel}</div>
      </section>
    );
  }
}

export default About;
