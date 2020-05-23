import React, { Component } from 'react';

import Alert from '../includes/Alert';
import Cards from './card/cardResult';
import MoviesContextProvider from '../../contexts/MoviesContext';

export default class SliderAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchs: [
        {
          item: '',
        },
        {
          item: '',
        },
        {
          item: '',
        },
        {
          item: '',
        },
      ],
      movies: [],
      getSearch: false,
      alert: {
        show: false,
        message: {},
      },
    };
  }

  handleInputMovie = (e, key) => {
    e.preventDefault();
    let value = e.target.value;
    if (value && value !== '') {
      if (value.length > 4) {
        let searchs = this.state.searchs;
        searchs[key].item = value;
        this.setState({
          searchs: searchs,
        });
      }
    }
  };

  setAlert = (message) => {
    this.setState({
      alert: {
        show: true,
        message: message,
      },
    });
    setTimeout(() => {
      this.setState({
        alert: {
          show: false,
          message: {},
        },
      });
    }, 5000);
  };

  getConfig = () => {
    return {
      type: 'searchs',
      searchs: this.state.searchs,
    };
  };

  searchs = (e) => {
    e.preventDefault();
    let error = false;
    let errors = [];
    this.state.searchs.forEach((items, index) => {
      if (items.item === '') {
        error = true;
        errors.push('Informe o valor para ' + e.target.name);
      }
    });
    if (error) {
      this.setAlert({
        type: 'warning',
        value: 'Todos os campos devem ser preenchidos',
      });
      return;
    }
    this.setState({ getSearch: true });
  };

  render() {
    const content = (
      <MoviesContextProvider>
        <Cards config={this.getConfig()} />
      </MoviesContextProvider>
    );
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium--dark">
          <i className="fas fa-sign-in-alt"></i>Slider Manager
        </h2>
        <p>Busque por pelo menos 4 filmes que vão compor os slider do site.</p>
        {this.state.alert.show ? (
          <Alert message={this.state.alert.message} />
        ) : (
          ''
        )}{' '}
        <div className="il-admin">
          <form
            action="#!"
            className="il-form"
            onSubmit={(e) => this.searchs(e)}
          >
            <div className="il-form--field">
              <label className="il-text-color--light" htmlFor="movie_one">
                Filme 1
              </label>
              <input
                type="text"
                name="movie_one"
                id="movie_two"
                placeholder="Escolha o filme 1"
                onChange={(e) => this.handleInputMovie(e, 0)}
              />
              <label className="il-text-color--light" htmlFor="movie_two">
                Filme 2
              </label>
              <input
                type="text"
                name="movie_two"
                id="movie_two"
                placeholder="Escolha o filme 2"
                onChange={(e) => this.handleInputMovie(e, 1)}
              />
              <label className="il-text-color--light" htmlFor="movie_three">
                Filme 3
              </label>
              <input
                type="text"
                name="movie_three"
                id="movie_three"
                placeholder="Escolha o filme 3"
                onChange={(e) => this.handleInputMovie(e, 2)}
              />
              <label className="il-text-color--light" htmlFor="movie_four">
                Filme 4
              </label>
              <input
                type="text"
                name="movie_four"
                id="movie_four"
                placeholder="Escolha o filme 4"
                onChange={(e) => this.handleInputMovie(e, 3)}
              />
            </div>
            <div className="il-form--buttom">
              <button className="il-btn il-btn--submit" type="submit">
                <i className="fas fa-search"></i>
                <span>Buscar</span>
              </button>
            </div>
          </form>
        </div>
        {this.state.getSearch ? content : ''}
      </section>
    );
  }
}
