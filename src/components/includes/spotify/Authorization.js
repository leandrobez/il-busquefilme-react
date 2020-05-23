import React, { Component } from 'react';

import { SpotifyContext } from '../../../contexts/SpotifyContext';

class Authorization extends Component {
  static contextType = SpotifyContext;
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  componentDidMount = () => {
    this.checkAuthenticated();
  };

  checkAuthenticated = () => {
    if (this.context.isAuthenticatedSpotify) {
      // set state request data for user
      this.setState({
        isAuthenticated: true
      });
    }
  };

  getUrl = e => {
    e.preventDefault();
    let url = this.context.getUrl(),
      strWindowFeatures =
        'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
    window.open(url, '_top', strWindowFeatures);
  };
  user = () => {
    const container = (
      <>
        <h3 className="il-section--title il-text-color--light il-center">
          Olá usuário do spotify! Faça seu login para continuar
        </h3>
        <button
          className="il-btn il-btn--spotify"
          onClick={e => this.getUrl(e)}
        >
          Login Spotify
        </button>
      </>
    );
    if (!this.state.isAuthenticated) {
      return container;
    } else {
      return (
        <>
          <h3 className="il-section--title il-text-color--light il-center">
            Bem vindo
          </h3>
        </>
      );
    }
  };
  render() {
    return <div className="il-spotify--button">{this.user()}</div>;
  }
}

export default Authorization;
