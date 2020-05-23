import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUserAuthenticated, storeLogout } from '../../services/auth';
import { PanelMenuContext } from '../../contexts/PanelMenuContext';

class Nav extends Component {
  static contextType = PanelMenuContext;
  constructor(props) {
    super(props);
    this.isAuthenticate = false;
  }

  closePanel = () => {
    this.context.toggle();
  };

  genreClosePanel = (e, key) => {
    e.preventDefault();
    window.localStorage.setItem(
      'currentGenre',
      JSON.stringify(this.genreMenu[key].name)
    );
    this.context.toggle();
    let strWindowFeatures =
      'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
    setTimeout(() => {
      window.open(
        '/genres/' + this.genreMenu[key].id,
        '_top',
        strWindowFeatures
      );
    }, 150);
  };

  genreMenu = [
    {
      id: 28,
      name: 'Ação',
      icon: 'mdi mdi-ferry',
      show: true,
    },
    {
      id: 12,
      name: 'Aventura',
      icon: 'mdi mdi-motorbike',
      show: true,
    },
    {
      id: 16,
      name: 'Animação',
      icon: 'mdi mdi-castle',
      show: true,
    },
    {
      id: 35,
      name: 'Comédia',
      icon: 'mdi mdi-castle',
      show: false,
    },
    {
      id: 80,
      name: 'Crime',
      icon: 'mdi mdi-castle',
      show: false,
    },
    {
      id: 99,
      name: 'Documentário',
      icon: 'mdi mdi-castle',
      show: false,
    },
    {
      id: 18,
      name: 'Drama',
      icon: 'mdi mdi-emoticon-sad',
      show: true,
    },
    {
      id: 10751,
      name: 'Família',
      icon: 'mdi mdi-heart-outline',
      show: true,
    },
    {
      id: 14,
      name: 'Fantasia',
      icon: 'mdi mdi-panda',
      show: true,
    },
    {
      id: 36,
      name: 'História',
      icon: 'mdi mdi-castle',
      show: false,
    },
    {
      id: 27,
      name: 'Terror',
      icon: 'mdi mdi-castle',
      show: false,
    },
    {
      id: 10402,
      name: 'Música',
      icon: 'mdi mdi-castle',
      show: false,
    },
    {
      id: 9648,
      name: 'Mistério',
      icon: 'mdi mdi-snowman',
      show: true,
    },
    {
      id: 10749,
      name: 'Romance',
      icon: 'mdi mdi-castle',
      show: false,
    },
    {
      id: 878,
      name: 'Ficção',
      icon: 'mdi mdi-rocket',
      show: true,
    },
    {
      id: 10770,
      name: 'TV',
      icon: 'mdi mdi-monitor',
      show: true,
    },
    {
      id: 53,
      name: 'Thriller',
      icon: 'mdi mdi-timer',
      show: true,
    },
    {
      id: 10752,
      name: 'Guerra',
      icon: 'mdi mdi-sword',
      show: true,
    },
    {
      id: 37,
      name: 'Faroeste',
      icon: 'mdi mdi- mdi-star-outline',
      show: true,
    },
  ];

  genres = () => {
    const listGenre = this.genreMenu.map((genre, index) => (
      <li className="il-menu--item" key={'genre-' + index}>
        <span>
          <Link
            onClick={(e) => this.genreClosePanel(e, index)}
            to={'/genres/' + genre.id}
          >
            {genre.name}
          </Link>
        </span>
      </li>
    ));
    return listGenre;
  };

  getAuthenticate = () => {
    let user = getUserAuthenticated();
    if (user) {
      return (
        <div className="il-welcomme">
          <span className="il-text-color--medium">Bem Vindo</span>
          <span className="il-user il-text-color--medium">{user.name}</span>
          <span onClick={storeLogout}>
            <a href="#!" className="il-logout">
              Logout
            </a>
          </span>
        </div>
      );
    }
    return (
      <div className="il-welcomme">
        <span className="il-text-color--medium">Bem Vindo</span>
        <span className="il-user il-text-color--medium">visitante</span>
      </div>
    );
  };

  render() {
    const { showPanel } = this.context;
    const menu = (
      <div className="il-main--menu">
        <h3 className="il-text-color--dark">Menu</h3>
        <ul className="il-menu">
          <li className="il-menu--item">
            <span>
              <Link to="/" onClick={this.closePanel}>
                Home
              </Link>
            </span>
          </li>
          <li className="il-menu--item">
            <span>
              <Link to="/about" onClick={this.closePanel}>
                About
              </Link>
            </span>
          </li>
          <li className="il-menu--item">
            <span>
              <Link to="/choices" onClick={this.closePanel}>
                Choices
              </Link>
            </span>
          </li>
          <li className="il-menu--item">
            <span>
              <Link to="/thebests" onClick={this.closePanel}>
                The Bests
              </Link>
            </span>
          </li>
          <li className="il-menu--item">
            <span>
              <Link to="/plans" onClick={this.closePanel}>
                Plans
              </Link>
            </span>
          </li>
          <li className="il-menu--item">
            <span>
              <Link to="/contact" onClick={this.closePanel}>
                Contact
              </Link>
            </span>
          </li>
          <li className="il-menu--item">
            <span>
              <Link to="/login" onClick={this.closePanel}>
                Login
              </Link>
            </span>
          </li>
        </ul>
      </div>
    );
    const genre = (
      <div className="il-genre--menu">
        <h3 className="il-text-color--dark">Generos</h3>
        <ul className="il-menu">
          <li className="il-menu--item">
            <ul className="il-menu">{this.genres()}</ul>
          </li>
        </ul>
      </div>
    );
    return (
      <div className={showPanel ? 'il-nav il-open' : 'il-nav'}>
        <div className="il-content--nav">
          {this.getAuthenticate()}
          {menu}
          {genre}
        </div>
      </div>
    );
  }
}

export default Nav;
