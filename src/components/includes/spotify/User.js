import React, { Component } from 'react';
import { SpotifyContext } from '../../../contexts/SpotifyContext';

export default class User extends Component {
  static contextType = SpotifyContext;
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount = () => {
    this.setUser();
  };

  setUser = () => {
    if (this.state.user === null) {
      const access = this.context.access();
      const dataUser = this.context.getUser(access._token);
      dataUser.then(data => {
        if (data.error) {
          this.setState({
            user: null
          });
        } else {
          this.setState({
            user: data.user
          });
         
        }
      });
    }
  };

  getAlbums = e => {
    e.preventDefault();
    this.props.toggle()
  };

  redirectLoginSpotify = () => {
    let strWindowFeatures =
      'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
    setTimeout(() => {
      window.open('/spotify/618355/superman', '_top', strWindowFeatures);
    }, 4000);
  };

  render() {
    const profil = (
      <div className="il-user-spotify">
        <div className="il-avatar">
          <img
            src={
              this.state.user && this.state.user.images.length
                ? this.state.user.images[0].url
                : 'https://www.cinemark.com.br/Content/uploads/banner/bannerhome_mercado_pago_tablet_1420x543px.jpg'
            }
            alt={this.state.user ? this.state.user.display_name : '...'}
          />
        </div>
        <div className="il-info">
          <span>
            {this.state.user
              ? 'Olá ' + this.state.user.display_name + '!'
              : 'Olá visitante!'}
          </span>
          <p>Clique no botão abaixo para ver a trilha sonora desse filme.</p>
          <button
            className="il-btn il-btn--spotify"
            onClick={e => this.getAlbums(e)}
          >
            Carregar lista
          </button>
        </div>
      </div>
    );
    return <div>{this.state.user ? profil : <h3>Carregando...</h3>}</div>;
  }
}
